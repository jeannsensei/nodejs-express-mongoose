const LocationAction = require('../actions/location');
const { Location } = require('../schema/Employee');

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

exports.getAllLocations = async (req, res) => {
  try {
    await Location.find({}).then((locations) => {
      console.log(locations);
      res.status(200).send({ status: 'success', location: locations });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error trayendo las localizaciones');
  }
};
