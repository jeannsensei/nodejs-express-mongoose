const User = require('../schema/User');

class userService {
  userLogin() {}
  /**
   * Trae toda la lista de usuarios
   */
  async getAllUsers() {
    return await User.find({}).then((usersList) => {
      return usersList;
    });
  }
  /**
   * Chequea si el usuario existe en la base de datos
   * @param {string} name
   * @param {string} email
   * @param {*} res
   * @param {*} next
   */
  findIfUserExists(req, res, next) {
    const { name, email } = req.body;
    // https://stackoverflow.com/questions/35833176/node-js-check-if-field-exists-in-mongo-db
    if (name && email) {
      User.findOne({ name, email }, (err, user) => {
        // handle err..
        if (user) {
          // El usuario existe
          res.status(401).json('El usuario ya existe');
          next();
        } else {
          // En caso de que no exista
          this.userSignup(name, email, res, next);
        }
      });
    } else {
      res
        .status(400)
        .json({ error: 'Faltan parámetros en el body', sent: req.body });
    }
  }
  /**
   * Crea un usuario, previa validación de que no existe
   * @param {string} name
   * @param {string} email
   * @param {*} res
   * @param {*} next
   */
  userSignup(name, email, res, next) {
    User.init(); // <- document gets generated
    // Datos del usuario
    const user = new User({
      name: name,
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
  }
}

module.exports = new userService();
