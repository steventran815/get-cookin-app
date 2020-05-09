require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

// GET Endpoint for view user's fridge/ingredients
app.get('/api/userIngredients/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId) || userId < 0) {
    return next(new ClientError('"userId" must be a positive integer', 400));
  }

  const sql = `
    select "u"."userId",
      "i"."ingredientId",
      "i"."name"
    from "users" as "u"
    join "userIngredients" using ("userId")
    join "ingredients" as "i" using ("ingredientId")
    where "userId" = $1
    order by "name";
  `;

  db.query(sql, [userId])
    .then(result => {
      const ingredients = result.rows;
      res.status(200).json(ingredients);
    })
    .catch(err => next(err));
});

app.get('/api/recipes', (req, res, next) => {
  const sql = `
    WITH "recipeIngredients" as (
      SELECT
        "r".*,
        json_agg("i"."name") as "ingredients"
      FROM "recipes" as "r"
      JOIN "recipeIngredients" as "ri" using ("recipeId")
      JOIN "ingredients" as "i" using ("ingredientId")
      GROUP BY "r"."recipeId"
    ),
    "recipeInstructions" as (
      SELECT
        "r".*,
        json_agg("i"."instruction") as "instructions"
      FROM "recipes" as "r"
      JOIN "recipeInstructions" as "rins" using ("recipeId")
      JOIN "instructions" as "i" using ("instructionId")
      GROUP BY "r"."recipeId"
      )
    SELECT
      "ring"."recipeId",
      "ring"."recipeTitle",
      "ring"."recipeImage",
      "ring"."ingredients" as "recipeIngredients",
      "rins"."instructions" as "recipeInstructions"
    FROM "recipeIngredients" as "ring"
    JOIN "recipeInstructions" as "rins" using ("recipeId")
    ORDER BY "recipeId" asc
  ;`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.delete('/api/userIngredients/:ingredientId', (req, res, next) => {
  const ingredientId = parseInt(req.params.ingredientId);

  if (isNaN(ingredientId) || ingredientId < 0) {
    return next(new ClientError('"ingredientId" must be a positive integer', 400));
  }

  // sql query with hard coded value for userId, to be revisited when more there is more than 1 user
  const sql = `
    delete from "userIngredients"
    where "userId" = 1
    and "ingredientId" = $1
    returning *;
  `;

  const values = [ingredientId];

  db.query(sql, values)
    .then(result => {
      const deletedIngredient = result.rows[0];
      if (!deletedIngredient) {
        return next(new ClientError(`Cannot find ingredient with id ${ingredientId}`, 404));
      } else {
        res.status(204).json(deletedIngredient);
      }
    })
    .catch(err => next(err));
});

app.get('/api/recipes/:recipeId', (req, res, next) => {
  const recipeId = parseInt(req.params.recipeId);
  const sql = `
    WITH "recipeIngredients" as (
      SELECT
        "r".*,
        json_agg("i"."name") as "ingredients"
      FROM "recipes" as "r"
      JOIN "recipeIngredients" as "ri" using ("recipeId")
      JOIN "ingredients" as "i" using ("ingredientId")
      GROUP BY "r"."recipeId"
    ),
    "recipeInstructions" as (
      SELECT
      "r".*,
      json_agg("i"."instruction") as "instructions"
      FROM "recipes" as "r"
      JOIN "recipeInstructions" as "rins" using ("recipeId")
      JOIN "instructions" as "i" using ("instructionId")
      GROUP BY "r"."recipeId"
    )
    SELECT
    "ring"."recipeId",
    "ring"."recipeTitle",
    "ring"."recipeImage",
    "ring"."recipePrepTime",
    "ring"."ingredients" as "recipeIngredients",
    "rins"."instructions" as "recipeInstructions"
    FROM "recipeIngredients" as "ring"
    JOIN "recipeInstructions" as "rins" using ("recipeId")
    WHERE "ring"."recipeId" = $1
    ORDER BY "recipeId" asc
  ;`;
  const params = [recipeId];

  if (Math.sign(recipeId) === -1 || Number.isNaN(recipeId)) {
    return res.status(400).json({
      error: 'recipeId must be a positive integer'
    });
  }

  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError('This recipeId does not exist', 400);
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.post('/api/ingredients', (req, res, next) => {
  const checkIngredients = (database, ingredient) => {
    for (let i = 0; i < database.rows.length; i++) {
      if (database.rows[i].name === ingredient) {
        return {
          name: database.rows[i].name,
          ingredientId: database.rows[i].ingredientId
        };
      }
    }
    const sql = `
      insert into "ingredients" ("ingredientId", "name")
      values (default, $1)
      returning *;
      `;
    const value = [ingredient];
    return db.query(sql, value)
      .then(result => {
        const newIngredient = result.rows[0];
        return newIngredient;
      });
  };
  const ingredient = req.body.name;
  const sql = `
    select *
    from "ingredients";
  `;
  db.query(sql)
    .then(allIngredients => {
      return checkIngredients(allIngredients, ingredient);
    })
    .then(ingredientResult => {
      const { ingredientId } = ingredientResult;

      const sql = `
        insert into "userIngredients" ("userId", "ingredientId")
        values (1, $1)
        on conflict ("userId","ingredientId") do nothing
        returning *;
      `;
      const values = [ingredientId];

      return db.query(sql, values)
        .then(addUserIngredientResult => {
          return addUserIngredientResult.rows[0];
        });
    })
    .then(newIngredient => {
      if (!newIngredient) {
        return res.status(400).send({
          message: 'The ingredient you are trying to add already exists!'
        });
      } else {
        const { userId, ingredientId } = newIngredient;
        return res.status(201).send({
          ingredientId: ingredientId,
          name: ingredient,
          userId: userId
        });
      }
    });
});

app.get('/api/availableRecipes', (req, res, next) => {
  const sql = `
    with "ingredientsNeeded" as (
      select "r"."recipeId",
         "r"."recipeTitle",
         "r"."recipeImage",
         "r"."recipePrepTime",
        count ("ri"."ingredientId") as "ingredientCount"
      from recipes as "r"
      join "recipeIngredients" as "ri" using("recipeId")
      group by "r"."recipeId", "r"."recipeTitle"
    ),
    "ingredientsInFridge" as (
      select "ui"."userId",
        "r"."recipeId",
        count("ui"."ingredientId") as "ingredientCount"
      from "recipes" as "r"
      join "recipeIngredients" as "ri" using ("recipeId")
      join "userIngredients" as "ui" using ("ingredientId")
      where "ui"."userId"=1
      group by "r"."recipeId", "ui"."userId"
    )
    select "in"."recipeTitle",
      "in"."recipeImage",
      "in"."recipePrepTime",
      "in"."recipeId"
    from "ingredientsNeeded" as "in"
    join "ingredientsInFridge" as "if" using("recipeId", "ingredientCount");
  `;

  db.query(sql)
    .then(availableRecipes => {
      if (!availableRecipes.rows[0]) {
        throw new ClientError('There are no recipes available that match the ingredients in your fridge', 404);
      } else {
        res.status(200).json(availableRecipes.rows);
      }
    })
    .catch(err => next(err));
});

app.get('/api/favoriteRecipes', (req, res, next) => {
  const sql = `
    SELECT
      "fr"."userId",
      "r".*,
      json_agg("i"."name") as "ingredients"
    FROM "favoriteRecipes" as "fr"
    JOIN "recipes" as "r" using ("recipeId")
    JOIN "recipeIngredients" as "ring" using ("recipeId")
    JOIN "ingredients" as "i" using ("ingredientId")
    GROUP BY "fr"."userId", "r"."recipeId";
  `;

  db.query(sql)
    .then(favRecipes => {
      if (!favRecipes.rows[0]) {
        throw new ClientError('There are no recipes in your favorites list!', 404);
      } else {
        res.json(favRecipes.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/users', (req, res, next) => {
  const sql = `
    select *
    from "users"
  `;
  db.query(sql)
    .then(result => {
      const users = result.rows;
      res.status(200).json(users);
    })
    .catch(err => next(err));
});

app.get('/api/users/:userId', (req, res, next) => {
  const { userId } = req.params;

  const sql = `
    select *
    from "users"
    where "userId" = $1;
  `;
  const values = [userId];

  db.query(sql, values)
    .then(result => {
      const user = result.rows[0];
      // eslint-disable-next-line no-console
      console.log(user);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
