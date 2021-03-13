/* eslint-disable no-unused-vars */
const { Router } = require('express');
const router = Router();
// Clase
const LocationService = require('../services/LocationService');
const TokenService = require('../services/TokenService');

router.get('/', TokenService.verifyJSWToken, LocationService.getAllLocations);
// Employee API
router.post(
  '/create',
  TokenService.verifyJSWToken,
  LocationService.registerLocation
);

module.exports = router;
