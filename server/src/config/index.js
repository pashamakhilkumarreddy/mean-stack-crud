require('dotenv').config();

module.exports = {
  PORT: parseInt(process.env.PORT, 10),
  db: {
    DB_NAME: process.env.DB_NAME,
  },
};
