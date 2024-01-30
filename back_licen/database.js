const sql = require('mysql2/promise')
require('dotenv').config()
require('dotenv').config()
const pool = sql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password : process.env.PASS_DB,
    database: process.env.DATABASE,
    connectionLimit: 10, //important
    dateStrings: true
})


module.exports = pool;