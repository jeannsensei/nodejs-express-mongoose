/**
 * Librería que carga el env al process.env y trae las variables de entorno
 * Se utiliza dotenv para traer el archivo de environment
 * * https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
 */
const dotenv = require('dotenv');
dotenv.config();
/**
 * Exporta las variables de entorno
 */
module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  atlas_url: process.env.ATLAS_URL,
  token_secret: process.env.ACCESS_TOKEN_SECRET,
};
