const express = require('express');
const app = express();

const {
  mongoose
} = require('./db');
const config = require('./config');

app.use(express.json());

const PORT = config.PORT;

require('./routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});