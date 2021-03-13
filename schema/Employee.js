const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      // https://stackoverflow.com/questions/36860342/mongoose-make-array-required
      // validate: (v) => Array.isArray(v) && v.length > 0,
      // required: true,
    },
  ],
});

const LocationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model('Employee', EmployeeSchema, 'employees');
const Location = mongoose.model('Location', LocationSchema, 'locations');

module.exports = {
  Employee,
  Location,
};
