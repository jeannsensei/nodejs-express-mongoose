const { Employee } = require('../../schema/Employee');

// https://stackoverflow.com/questions/37347802/find-by-id-with-mongoose
const readEmployee = async (req, res) => {
  const { id } = req.body;
  await Employee.findById(id)
    .populate('locations')
    .exec((err, employeeWithLocations) => {
      if (employeeWithLocations === null) {
        return res.status(400).send({
          message: 'Usuario no encontrado.',
        });
      } else {
        res.status(200).send(employeeWithLocations);
      }
    });
};

module.exports = { readEmployee };
