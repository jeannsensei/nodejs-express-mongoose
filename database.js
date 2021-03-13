const {
  atlas_url,
  local_mongo_user,
  local_mongo_password,
  local_mongo_hostname,
  local_mongo_port,
  local_mongo_db,
} = require('./config');
const mongoose = require('mongoose');

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// https://dba.stackexchange.com/questions/111727/mongo-create-a-user-as-admin-for-any-database-raise-an-error
const local_url = `mongodb://${local_mongo_user}:${local_mongo_password}@${local_mongo_hostname}:${local_mongo_port}/${local_mongo_db}?authSource=admin`;
/**
 * Al momento de hacer este proyecto, mongoose tiene un bug extraño por lo que toca utilizar la versión 5.11.15
 */
mongoose
  .connect(local_url, connectionParams)
  .then(() => {
    console.log('Connected to database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
