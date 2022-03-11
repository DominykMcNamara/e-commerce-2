require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

//EXPRESS CONFIGURATION
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`E-commerce API listening on port ${process.env.SERVER_PORT}`);
  });