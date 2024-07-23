const mysql=require('mysql2');
var express = require('express');
const db = require('../database');
var router = express.Router();
router.get('/getItems', async (req, res) => {
    try {
      const [rows] = await db.promise().query('SELECT item FROM category ORDER BY item');
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
  
  module.exports=router;