const LocationAction = require('../actions/location');
const { Location } = require('../schema/Employee');
const TokenService = require('../services/TokenService');

exports.registerLocation = async (req, res, next) => {
  try {
    const createdLocation = await LocationAction.createLocation(req);
    console.log(createdLocation);
    res.status(200).send({ status: 'success', location: createdLocation });
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
};

/**
 * @param {Request} req The date
 * @param {Response} res The string
 */
exports.getAllLocations = async (req, res) => {
  const user = await TokenService.getUserInfoFromToken(req);
  // console.log(req.headers.authorization);
  try {
    await Location.find({ createdBy: user._id }).then((locations) => {
      console.log(locations);
      res.status(200).send({ location: locations });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error trayendo las localizaciones');
  }
};
