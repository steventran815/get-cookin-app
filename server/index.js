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

// app.get('/api/users', (req, res, next) => {
//   const sql = `
//     select "u"."userId",
//       "i"."ingredientId",
//       "i"."name"
//     from "users" as "u"
//     join "userIngredients" using ("userId")
//     join "ingredients" as "i" using ("ingredientId")
//   `;
//   db.query(sql)
//     .then(result => console.log(result));
// }
// );

// app.post('/api/ingedients', (req, res, next) => {
//   const params = [req.body.name];
//   const sql = (`insert into "ingredients" ("ingredientId", "name")
//                 values (default, $1)
//                 returning "name";`, params);
//   db.query(`select *
//               from "ingredients";`)
//     .then(response => {
//       db.query(sql, params)
//         .then(data => {
//           for (let i = 0; i < data; i++) {
//             if (response.rows[i].name === data) {
//               return db.query(`insert into "userIngredients"("userId", "ingredientId")
//                             values (1, default);`);
//             } else {
//               const ingredientId = [response.rows[i].ingredientId];
//               return db.query(`insert into "userIngredients"("userId", "ingredientId")
//                             values (1, $1);`, ingredientId);
//             }
//           }
//         });
//     });
// });

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
