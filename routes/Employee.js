/* eslint-disable no-unused-vars */
const { Router } = require('express');
const router = Router();
// Clase
const EmployeeService = require('../services/EmployeeService');
const TokenService = require('../services/TokenService');

// Employee API
router.post(
  '/create',
  TokenService.verifyJSWToken,
  EmployeeService.registerEmployee
);
router.get(
  '/read',
  TokenService.verifyJSWToken,
  EmployeeService.readedEmployee
);

module.exports = router;
