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
app.get('/api/users/:userId', (req, res, next) => {
  const { userId } = req.params;

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
    select *
    from "recipes"
  ;`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.delete('/api/userIngredients/:ingredientId', (req, res, next) => {
  const { ingredientId } = req.params;

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
