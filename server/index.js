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

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

const checkIngredients = (database, ingredient) => {
  for (let i = 0; i < database.rows.length; i++) {
    if (database.rows[i].name === ingredient) {
      return { ingredient: database.rows[i].name, ingredientId: database.rows[i].ingredientId };
    }
  }
};

const checkIngredientId = (database, ingredientId) => {
  for (let i = 0; i < database.rows.length; i++) {
    if (database.rows[i].ingredientId === ingredientId) {
      return { userId: database.rows[i].userId, ingredientId: ingredientId };
    }
  }
};

app.post('/api/ingredients', (req, res, next) => {
  const ingredient = req.body.name;
  const params = [ingredient];
  const sql = `insert into "ingredients" ("ingredientId", "name")
                values (default, $1)
                returning "ingredientId";`;
  db.query(`select *
              from "ingredients";`)
    .then(response => {
      return checkIngredients(response, ingredient);
    })
    .then(data => {
      if (data === undefined) {
        return db.query(sql, params)
          .then(response => response.rows[0])
          .catch(err => next(err));
      } else {
        return db.query(`select *
                          from "userIngredients";`)
          .then(response => checkIngredientId(response, data.ingredientId))
          .then(result => {
            if (result === undefined) {
              return db.query(`insert into "userIngredients"("userId", "ingredientId")
                             values (1, $1)
                             returning *`, [data.ingredientId]);
            }
          })
          .catch(err => next(err));
      }
    })
    .then(result => {
      if (!result) {
        return res.status(500).send('The ingredient you are trying to add already exists!');
      } else {
        return db.query(`insert into "userIngredients"("userId", "ingredientId")
                        values (1, $1)
                        returning *`, [result.ingredientId])
          .then(response => res.status(201).send('Your ingredient has been successfully added!'));
      }
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
