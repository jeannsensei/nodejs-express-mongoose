const { Location } = require('../../schema/Employee');

const createLocation = async (req) => {
  const { location } = req.body;
  const locationFound = await Location.findOne({ location });

  if (locationFound) return locationFound;

  const newLocation = new Location({ location });
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
