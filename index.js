// Read environment variables
require('./database');

const app = require('./app');

// var log = console.log;
// console.log = function () {
//   log.apply(console, arguments);
//   // Print the stack trace
//   console.trace();
// };

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
  console.log('Environment:', process.env.NODE_ENV);
});
