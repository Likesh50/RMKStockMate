const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
let bodyParser = require('body-parser');
const purchaseRtr = require('./Routes/Purchase');
const Stocks = require('./Routes/Stocks');
const Dispatch = require('./Routes/Dispatch');
const addItems = require('./Routes/addItems');
const monthlyItem = require('./Routes/Monthly');
const categoryItem = require('./Routes/Category');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/purchase',purchaseRtr);
app.use('/stocks',Stocks);
app.use('/dispatch',Dispatch);
app.use('/addItems',addItems);
app.use('/monthly',monthlyItem);
app.use('/category',categoryItem);

app.listen(3002,()=>{
  console.log("You r up!!!");
})