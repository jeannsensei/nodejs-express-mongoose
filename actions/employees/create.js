const { Employee } = require('../../schema/Employee');

const createEmployee = async (data) => {
  const { employeeName } = data;
  const employeeFound = await Employee.findOne({ employeeName });

  if (employeeFound) return employeeFound;

  const newEmployee = new Employee(data);
  const createdEmployee = await newEmployee.save();
  createdEmployee
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = { createEmployee };
