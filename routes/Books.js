/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
//
const TokenService = require('../services/TokenService');

const books = [
  {
    author: 'Chinua Achebe',
    country: 'Nigeria',
    language: 'English',
    pages: 209,
    title: 'Things Fall Apart',
    year: 1958,
  },
  {
    author: 'Hans Christian Andersen',
    country: 'Denmark',
    language: 'Danish',
    pages: 784,
    title: 'Fairy tales',
    year: 1836,
  },
  {
    author: 'Dante Alighieri',
    country: 'Italy',
    language: 'Italian',
    pages: 928,
    title: 'The Divine Comedy',
    year: 1315,
  },
];

router.get('/', TokenService.verifyJSWToken, (req, res, next) => {
  console.log(req.user);
  res.status(200).send({
    books,
  });
});

module.exports = router;
