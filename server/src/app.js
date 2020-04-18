const express = require('express');
const app = express();
const cors = require('cors');

const {
  mongoose
} = require('./db');
const config = require('./config');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200/'
}))

const PORT = config.PORT;

require('./routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});