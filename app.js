/* eslint-disable no-unused-vars */
const { port } = require('./config');
const express = require('express');

const userRoutes = require('./routes/User');
const loginRoutes = require('./routes/Login');
const bookRoutes = require('./routes/Books');

// Initializations
const app = express();
// settings
app.set('port', port);

/**
 * https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json
 */
app.use(express.json());

/**
 * ? Multer - para manejar formdata
 * * https://www.npmjs.com/package/multer
 * ? nodemailer - para enviar correos
 * * https://www.w3schools.com/nodejs/nodejs_email.asp
 * https://github.com/LoginRadius/engineering-blog-samples/pull/39/commits/f2199c2fb26ad5b43bf988b3e8f8c51482e5b9e0
 *  * nodemon server.js localhost 8080
 * ? https://www.npmjs.com/package/nodemon
 */

/**
 * Rutas
 */
app.use('/', userRoutes);
app.use('/login', loginRoutes);
app.use('/books', bookRoutes);

module.exports = app;
