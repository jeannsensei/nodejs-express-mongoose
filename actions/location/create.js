const { Location } = require('../../schema/Employee');
const TokenService = require('../../services/TokenService');

const createLocation = async (req) => {
  const { location } = req.body;
  const user = await TokenService.getUserInfoFromToken(req);

  const locationFound = await Location.findOne({ location });

  if (locationFound) return locationFound;

  const newLocation = new Location({ location, createdBy: user._id });
  await newLocation
    .save()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = { createLocation };
