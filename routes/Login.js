/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
// Clase
const UserService = require('../services/UserService');

// User login api
router.post('/', (req, res, next) => {
  console.log(req.body);
  //
  UserService.userLogin(req, res, next);
});

module.exports = router;
