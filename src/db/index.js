require("dotenv").config();
const { Pool, Client } = require('pg')


const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
})



const client = new Client({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
})
client.connect()



module.exports = {
    query: (text, params) => pool.query(text, params),
  }
