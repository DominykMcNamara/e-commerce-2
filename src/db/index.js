const { Pool, Client } = require("pg")
require("dotenv").config();

const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
})

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})

const client = new Client({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}

