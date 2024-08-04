var express = require('express');
const db = require('../db');
var router = express.Router();
router.get('/getItems', async (req, res) => {
    try {
      console.log("working");
      const [rows] = await db.promise().query('SELECT item,category FROM category ORDER BY item');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/getCategoryVendor', async (req, res) => {
    const { item } = req.body;
  
    if (!item) {
      return res.status(400).json({ message: 'Item is required' });
    }
    try {
      const [rows] = await db.promise().query('SELECT category FROM category WHERE item = ?', [item]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/add', async (req, res) => {
    console.log("Processing request...");
    const arr = req.body.arr; 
    console.log(arr);
    const date = req.body.date;
  
    for (let item of arr) {  
      const { item: itemName, category, quantity, amount, totalAmount } = item;
      const purchaseQuantity = Number(quantity) || 0;
      const amountkg = Number(amount) || 0;
      const total = Number(totalAmount) || 0;
      
      console.log(itemName, purchaseQuantity, amountkg, total, date);
  

      const [rows] = await db.promise().query(
        `SELECT COALESCE(quantity, 0) as quantity FROM current WHERE item = ? LIMIT 1`, 
        [itemName]
      );
  
      const currentQuantity = rows.length > 0 ? rows[0].quantity : 0;
      const finalQuantity = currentQuantity + purchaseQuantity;
  
      await db.promise().query(
        `INSERT INTO purchase (item, category, quantity, amountkg, amount, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [itemName, category, purchaseQuantity, amountkg, total, date]
      );
  
      if (currentQuantity === 0) {
        await db.promise().query(
          `INSERT INTO current (item, category, quantity) VALUES (?, ?, ?)`,
          [itemName, category, finalQuantity]
        );
      } else {
        await db.promise().query(
          `UPDATE current SET quantity = ? WHERE item = ?`,
          [finalQuantity, itemName]
        );
      }
  
      await db.promise().query(
        `INSERT INTO closingstock (item, quantity, date, category) VALUES (?, ?, ?, ?)`,
        [itemName, finalQuantity, date, category]
      );
    }
  
    res.send("Items inserted");
  });
    
  module.exports=router;