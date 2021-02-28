/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
// Clase
const UserService = require('../services/UserService');
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
    ok: 'Server funcionando',
  });
});

/**
 * Ruta /user
 * GET - Trae la lista de usuarios
 * POST - Crea un usuario
 */
router
  .get('/user', (req, res) => {
    const body = req.body;
    console.log(body);
    // Trae todos los usuarios
    UserService.getAllUsers().then((data) => {
      console.log(data);
      res.status(200).send(data);
    });
  })
  /**
   * Cómo manejar las peticiones
   * * https://stackoverflow.com/a/7086621
   * * https://stackoverflow.com/a/48123354
   */
  .post('/user', (req, res, next) => {
    console.log(req.body);
    // Encuentra si el usuario existe
    UserService.findIfUserExists(req, res, next);
  });

/**
 * * https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object/28379965#28379965
 */
module.exports = router;
