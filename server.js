/* eslint-disable no-unused-vars */
const { port, atlas_url } = require('./config');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router();
const app = express();
/**
 * https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json
 */
app.use(express.json());

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
/**
 *
 * Para iniciar el servidor
 * * nodemon server.js localhost 8080
 * ? https://www.npmjs.com/package/nodemon
 */
function startServer() {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}
/**
 * Al momento de hacer este proyecto, mongoose tiene un bug extraño por lo que toca utilizar la versión 5.11.15
 */
mongoose
  .connect(atlas_url, connectionParams)
  .then(() => {
    console.log('Connected to database ');
    // Inicializa el servidor apenas se conecta a la base de datos.
    startServer();
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

/**
 * Rutas
 */
app.use('/', require('./routes/User'));
app.use('/login', require('./routes/Login'));

module.exports = router;
