const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
let bodyParser = require('body-parser');
const db = require('./db');
const purchaseRtr = require('../routes/Purchase');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/purchase',purchaseRtr);
app.listen(3002,()=>{
  console.log("You r up!!!");
})