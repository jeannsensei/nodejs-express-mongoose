const { token_secret } = require('../config');
const jwt = require('jsonwebtoken');
/**
 * https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
 * https://github.com/jkasun/stack-abuse-express-jwt/blob/master/books.js
 */
const Token = require('../schema/Token');

class tokenService {
  /**
   * Genera el token
   * @param {*} user Objeto del usuario que contiene nombre, email y password (no necesario aqui)
   */
  generateJSWToken(user) {
    console.log(user._id);
    //
    const accessToken = jwt.sign(
      { name: user.name, email: user.email, _id: user._id },
      token_secret,
      { expiresIn: '1d' }
    );
    // Creación del token en la base de datos
    // * https://stackoverflow.com/questions/439630/create-a-date-with-a-set-timezone-without-using-a-string-representation
    new Token({
      token: accessToken,
      date: new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }),
    }).save();
    return accessToken;
  }
  /**
   * Verificar el token
   */
  verifyJSWToken(req, res, next) {
    // Token en el header
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      // Se chequea el token
      jwt.verify(token, token_secret, (err, user) => {
        if (err) {
          return res.status(403).send({
            message: 'No tienes acceso.',
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(403).send({
        message: 'No se encontró token.',
      });
    }
  }
  /**
   * Retorna la informacion del token
   * @param {Request} req
   * @param {Response} res
   */
  async getUserInfoFromToken(req) {
    // Token en el header
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      // Se chequea el token
      // TODO: Chequear si el token existe en la base de datos
      return await jwt.verify(token, token_secret, (err, user) => {
        console.log(user);
        return user;
      });
    }
  }
}
module.exports = new tokenService();
