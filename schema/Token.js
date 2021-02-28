const mongoose = require('mongoose');

/**
 * Tipos de schema
 * * https://mongoosejs.com/docs/schematypes.html
 */
let tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
});
/**
 * El primer parámetro del modelo es el nombre de la colección
 * El segundo es el schema, es decir la interface
 */
module.exports = mongoose.model('tokens', tokenSchema);
