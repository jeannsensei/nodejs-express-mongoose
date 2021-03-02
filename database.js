const { atlas_url } = require('./config');
const mongoose = require('mongoose');

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

/**
 * Al momento de hacer este proyecto, mongoose tiene un bug extraño por lo que toca utilizar la versión 5.11.15
 */
mongoose
  .connect(atlas_url, connectionParams)
  .then(() => {
    console.log('Connected to database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
