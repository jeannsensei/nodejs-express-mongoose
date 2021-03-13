const User = require('../schema/User');

const TokenService = require('./TokenService');

class userService {
  /**
   * Funcion para loggear el usuario
   * Se chequea que llegue email y password para verificar
   * si existe el usuario y loggearlo
   * @param {*} req Request
   * @param {*} res Response
   */
  userLogin(req, res) {
    const userProps = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    // Find user with requested email
    if (userProps.email && userProps.password) {
      User.findOne({ email: userProps.email }, (err, user) => {
        if (user === null) {
          return res.status(400).send({
            message: 'Usuario no encontrado.',
          });
        } else {
          if (user.validPassword(userProps.password)) {
            const token = TokenService.generateJSWToken(user);
            return res.status(201).send({
              message: 'Usuario loggeado',
              token: token,
            });
          } else {
            return res.status(400).send({
              message: 'Contraseña incorrecta',
            });
          }
        }
      });
    } else {
      res
        .status(400)
        .json({ error: 'Faltan parámetros en el body', sent: req.body });
    }
  }
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
   * @param {*} req Request
   * @param {*} res Response
   * @param {*} next
   */
  findIfUserExists(req, res, next) {
    const { name, email, password } = req.body;
    // https://stackoverflow.com/questions/35833176/node-js-check-if-field-exists-in-mongo-db
    if (name && email && password) {
      User.findOne({ name, email }, (err, user) => {
        // handle err..
        if (user) {
          // El usuario existe
          res.status(401).json('El usuario ya existe');
          next();
        } else {
          // En caso de que no exista
          this.userSignup(name, email, password, res, next);
        }
      });
    } else {
      res
        .status(400)
        .json({ error: 'Faltan parámetros en el body', sent: req.body });
      next();
    }
  }
  /**
   * Crea un usuario, previa validación de que no existe
   * @param {string} name
   * @param {string} email
   * @param {*} res
   * @param {*} next
   */
  userSignup(name, email, password, res, next) {
    let newUser = new User(); // <- document gets generated
    // Datos del usuario
    // Initialize newUser object with request data
    (newUser.name = name),
      (newUser.email = email),
      (newUser.password = password);
    // Call setPassword function to hash password
    newUser.setPassword(password);
    // Creación del usuario en la base de datos
    newUser
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
