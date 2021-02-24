const mongoose = require('mongoose');
const validator = require('validator');

/**
 * Tipos de schema
 * * https://mongoosejs.com/docs/schematypes.html
 */
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
});
/**
 * El primer parámetro del modelo es el nombre de la colección
 * El segundo es el schema, es decir la interface
 */
module.exports = mongoose.model('users', userSchema);
