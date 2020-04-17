const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/crud', (err) => {
  if (!err) console.info('Connected to Mongo');
  else console.error(`Error connecting to db, ${JSON.stringify(err, undefined, 2)} `);
});

module.exports = {
  mongoose,
};
