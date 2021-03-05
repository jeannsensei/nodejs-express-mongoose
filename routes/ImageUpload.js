/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
// clase
const CloudinaryService = require('../services/cloudinary/CloudinaryService');

// https://stackoverflow.com/questions/38652848/filter-files-on-the-basis-of-extension-using-multer-in-express-js
const storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    var date = new Date().toISOString().split('T')[0];
    cb(
      null,
      file.fieldname +
        '-' +
        date +
        '-' +
        datetimestamp +
        '.' +
        file.originalname.split('.')[file.originalname.split('.').length - 1]
    );
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    // in bytes -> 1000000 -> 1 MB
    fileSize: 2000 * 2000,
  },
}).single('image');

// https://stackoverflow.com/questions/50662721/node-js-routes-and-async-function
router.post('/', upload, async (req, res, next) => {
  console.log(req.file);
  //   console.log(req.body);
  const cloudinaryImg = await CloudinaryService.fileUpload(req.file.path);
  //
  fs.unlinkSync(req.file.path);
  //   console.log(cloudinaryImg);

  res.status(200).send({
    ok: 'Imagen subida',
    url: cloudinaryImg.url,
  });
  next();
});

module.exports = router;
