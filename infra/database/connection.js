const mariadb = require('mariadb');
const path = require('path');
const result = require('dotenv').config();

module.exports = () => {
  console.log('Creating connection...');
  return mariadb.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE

    //rowsAsArray: true,
    //nestTables: true
  });
};
