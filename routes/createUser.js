/* eslint-disable no-unused-vars */
const User = require('../schema/User');
const express = require('express');
const app = express();
const router = express.Router();

/**
 * ? Multer - para manejar formdata
 * * https://www.npmjs.com/package/multer
 * ? nodemailer - para enviar correos
 * * https://www.w3schools.com/nodejs/nodejs_email.asp
 */

/**
 * * Manejar rutas en un solo archivo
 * https://stackoverflow.com/questions/45102662/node-js-multiple-routes-in-single-router-file
 * https://zellwk.com/blog/crud-express-mongodb/
 * https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas
 */

router.get('/', (req, res, next) => {
  console.log(req);
  //   console.log(res);
  //   console.log(next);
  res.status(200).send({
    sup: 'lal',
  });
});

router
  .get('/user', (req, res) => {
    const body = req.body;
    console.log(body);

    const all = User.find({}).then((usersList) => {
      res.status(200).send({ users: usersList });
    });
  })
  /**
   * Cómo manejar las peticiones
   * * https://stackoverflow.com/a/7086621
   * * https://stackoverflow.com/a/48123354
   */
  .post('/user', (req, res, next) => {
    console.log(req.body);
    const { username, email } = req.body;

    // https://stackoverflow.com/questions/35833176/node-js-check-if-field-exists-in-mongo-db
    User.findOne({ username, email }, (err, user) => {
      // handle err..
      if (user) {
        // user exists
        res.status(401).json('El usuario ya existe');
        next();
      } else {
        // user does not exist
        if (username && email) {
          User.init(); // <- document gets generated
          // Datos del usuario
          const user = new User({
            username: username,
            email: email,
          });
          // Creación del usuario en la base de datos
          user
            .save()
            .then((doc) => {
              console.log(doc);
              res.status(200).json('Usuario creado con éxito');
              next();
            })
            .catch((err) => {
              if (err.errors) {
                res.status(400).json({
                  message: 'Ocurrió un error en la validación',
                  error: err.errors,
                });
              } else {
                res.status(500).json({
                  message: 'Ocurrió un error en el servidor',
                  error: err,
                });
              }
            });
        } else {
          res.status(400).json('Hacen falta datos');
          res.end();
        }
      }
    });
  });

/**
 * * https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object/28379965#28379965
 */
module.exports = router;
