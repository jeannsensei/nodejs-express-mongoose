const { token_secret } = require('../config');
const jwt = require('jsonwebtoken');

class tokenService {
  /**
   *
   * @param {*} user Objeto del usuario que contiene nombre, email y password (no necesario aqui)
   */
  generateJSWToken(user) {
    const accessToken = jwt.sign(
      { name: user.username, email: user.role },
      token_secret
    );
    return accessToken;
    /**
     * TODO: Hacer colección de tokens para hacer después logout
     */
  }
}
module.exports = new tokenService();
