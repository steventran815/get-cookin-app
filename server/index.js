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
  const userId = parseInt(req.session.user.userId);
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
      "rins"."instructions" as "recipeInstructions",
      ("fr"."userId" is not null AND "fr"."userId" = $1) as "isFavorited"
    FROM "recipeIngredients" as "ring"
    JOIN "recipeInstructions" as "rins" using ("recipeId")
    LEFT JOIN "favoriteRecipes" as "fr" using ("recipeId")
    ORDER BY "recipeId" asc
  ;`;
  const params = [userId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.delete('/api/userIngredients/:userId/:ingredientId', (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const ingredientId = parseInt(req.params.ingredientId);

  if (isNaN(ingredientId) || ingredientId < 0) {
    return next(new ClientError('"ingredientId" must be a positive integer', 400));
  }

  const sql = `
    delete from "userIngredients"
    where "userId" = $1
    and "ingredientId" = $2
    returning *;
  `;

  const values = [userId, ingredientId];

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
  const userId = parseInt(req.session.user.userId);
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
    "rins"."instructions" as "recipeInstructions",
    ("fr"."userId" is not null AND "fr"."userId" = $2) as "isFavorited"
    FROM "recipeIngredients" as "ring"
    JOIN "recipeInstructions" as "rins" using ("recipeId")
    LEFT JOIN "favoriteRecipes" as "fr" using ("recipeId")
    WHERE "ring"."recipeId" = $1
    ORDER BY "recipeId" asc
  ;`;
  const params = [recipeId, userId];

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
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.post('/api/ingredients/:userId', (req, res, next) => {
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
  const userId = req.params.userId;

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
        values ($1, $2)
        on conflict ("userId","ingredientId") do nothing
        returning *;
      `;
      const values = [userId, ingredientId];

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
          .then(results => {
            const ingredients = results.rows;
            res.status(201).json(ingredients);
          });
      }
    });
});

app.get('/api/availableRecipes/', (req, res, next) => {
  const userId = parseInt(req.session.user.userId);
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
      where "ui"."userId" = $1
      group by "r"."recipeId", "ui"."userId"
    )
    select "in"."recipeTitle",
      "in"."recipeImage",
      "in"."recipePrepTime",
      "in"."recipeId",
      ("fr"."userId" is not null AND "fr"."userId" = $1) as "isFavorited"
    from "ingredientsNeeded" as "in"
    join "ingredientsInFridge" as "if" using("recipeId", "ingredientCount")
    left join "favoriteRecipes" as "fr" using ("recipeId");
  `;
  const values = [userId];

  db.query(sql, values)
    .then(availableRecipes => {
      if (!availableRecipes.rows[0]) {
        throw new ClientError('There are no recipes available that match the ingredients in your fridge', 404);
      } else {
        res.status(200).json(availableRecipes.rows);
      }
    })
    .catch(err => next(err));
});

app.route('/api/favoriteRecipes')
  .get((req, res, next) => {
    const sql = `
    SELECT
      "r".*
    FROM "favoriteRecipes"
    JOIN "recipes" as "r" using ("recipeId")
    WHERE "userId" = $1;
  `;

    const id = [req.session.user.userId];

    db.query(sql, id)
      .then(favRecipes => {
        if (!favRecipes.rows[0]) {
          throw new ClientError('There are no recipes in your favorites list!', 404);
        } else {
          res.status(200).json(favRecipes.rows);
        }
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    const sql = `
    INSERT INTO "favoriteRecipes"("userId", "recipeId")
    VALUES ($1, $2)
    RETURNING *;
  `;
    const params = [req.session.user.userId, req.body.recipe];

    db.query(sql, params)
      .then(newFav => {
        res.status(201).json(newFav.rows[0]);
      })
      .catch(err => next(err));
  });

app.delete('/api/favoriteRecipes/:recipeId', (req, res, next) => {
  const userId = parseInt(req.session.user.userId);
  const recipeId = parseInt(req.params.recipeId);

  const sql = `
    DELETE FROM "favoriteRecipes"
    WHERE "userId" = $1
    AND "recipeId" = $2
    RETURNING *;
  `;
  const params = [userId, recipeId];

  db.query(sql, params)
    .then(result => {
      const deletedFav = result.rows[0];
      res.status(204).json(deletedFav);
    })
    .catch(err => next(err));
});

app.get('/api/users', (req, res, next) => {
  const sql = `
    select *
    from "users";
  `;
  db.query(sql)
    .then(result => {
      const users = result.rows;
      res.status(200).json(users);
    })
    .catch(err => next(err));
});

app.get('/api/users/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId) || userId < 0) {
    return next(new ClientError('"userId" must be a positive integer', 400));
  }

  const sql = `
    select *
    from "users"
    where "userId" = $1;
  `;
  const values = [userId];

  db.query(sql, values)
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        throw new ClientError('userId does not exist', 404);
      } else {
        req.session.user = user;
        res.status(200).json(user);
      }
    })
    .catch(err => next(err));
});

app.post('/api/recipes', (req, res, next) => {
  const recipesSql = `
    INSERT INTO "recipes" ("recipeTitle", "recipeImage", "recipePrepTime")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const recipesParams = [req.body.recipeTitle, req.body.recipeImage, req.body.recipePrepTime];

  db.query(recipesSql, recipesParams)
    .then(insertedRecipe => {
      const ingredients = req.body.ingredients;
      ingredients.map(ingredient => {
        const ingredientsSql = `
              INSERT INTO "ingredients" ("ingredientId", "name")
              VALUES (default, $1)
              ON CONFLICT ("name") DO UPDATE SET "name"=$1
              RETURNING *;
            `;
        const ingredientsParams = [ingredient];

        db.query(ingredientsSql, ingredientsParams)
          .then(newIngredient => {
            const { recipeId } = insertedRecipe.rows[0];
            const { ingredientId } = newIngredient.rows[0];
            const recipeIngredientsSql = `
                INSERT INTO "recipeIngredients" ("recipeId", "ingredientId")
                VALUES ($1, $2)
                RETURNING *;
              `;
            const recipeIngredientsParams = [recipeId, ingredientId];

            db.query(recipeIngredientsSql, recipeIngredientsParams)
              .catch(err => next(err));
          })
          .catch(err => next(err));
      });

      const instructions = req.body.instructions;
      instructions.map(instruction => {
        const instructionsSql = `
          INSERT INTO "instructions" ("instruction")
          VALUES ($1)
          RETURNING*;
        `;
        const instructionsParams = [instruction];
        db.query(instructionsSql, instructionsParams)
          .then(newInstruction => {
            const { recipeId } = insertedRecipe.rows[0];
            const { instructionId } = newInstruction.rows[0];
            const recipeInstructionsSql = `
              INSERT INTO "recipeInstructions" ("recipeId", "instructionId")
              VALUES ($1, $2);
            `;
            const recipeInstructionsParams = [recipeId, instructionId];

            db.query(recipeInstructionsSql, recipeInstructionsParams)
              .catch(err => next(err));
          });
      });
      res.json({
        success: `${insertedRecipe.rows[0].recipeTitle} has been added!`
      });
    })
    .catch(err => next(err));
});

app.post('/api/newUser', (req, res, next) => {
  const { userName } = req.body;

  if (!userName) {
    return next(new ClientError('client has supplied invalid userName', 400));
  }

  const sql = `
    insert into "users" ("userId", "userName")
    values (default, $1)
    returning *;
  `;
  const values = [userName];

  db.query(sql, values)
    .then(result => {
      const newUser = result.rows[0];
      res.status(201).json(newUser);

    })
    .catch(err => next(err));
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
