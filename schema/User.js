const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');

/**
 * Tipos de schema
 * * https://mongoosejs.com/docs/schematypes.html
 */
let userSchema = new mongoose.Schema({
  name: {
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
  hash: String,
  salt: String,
});
/**
 * https://www.loginradius.com/blog/async/password-hashing-with-nodejs/
 */

// Method to set salt and hash the password for a user
userSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex');
  // Hashing user's salt and password with 1000 iterations,
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};
/**
 * El primer parámetro del modelo es el nombre de la colección
 * El segundo es el schema, es decir la interface
 */
module.exports = mongoose.model('users', userSchema);
