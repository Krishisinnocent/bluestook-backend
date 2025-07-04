require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool(); //this uses your .env variables

module.exports = pool;