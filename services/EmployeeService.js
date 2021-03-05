const EmployeeAction = require('../actions/employees');

exports.registerEmployee = async (req, res) => {
  try {
    const createdEmployee = await EmployeeAction.createEmployee(req.body);
    res.status(200).send(createdEmployee);
  } catch (error) {
    res.status(400).send('Hubo un error');
  }
};

exports.readedEmployee = async (req, res) => {
  try {
    await EmployeeAction.readEmployee(req, res);
  } catch (error) {
    res.status(400).send('Hubo un error');
  }
};
