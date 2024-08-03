var express = require('express');
const db = require('../db');
var router = express.Router();
router.get('/getCategory', async (req, res) => {
    try {
      console.log("working");
      const [rows] = await db.promise().query('SELECT category FROM category GROUP BY category');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/getItemCategory', async (req, res) => {
    try {
      console.log("working");
      const [rows] = await db.promise().query('SELECT item,category FROM category ORDER BY item');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
router.post('/insert', (req, res) => {
    const cat = req.body.category;
    const items = req.body.itemName;
    console.log(req.body);
    db.query('INSERT INTO category (item, category) VALUES (?, ?)', [items, cat], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error inserting into category');
        }

        db.query('INSERT INTO current (item, category, quantity) VALUES (?, ?, 0)', [items, cat], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error inserting into current');
            }

            res.send('Added successfully');
        });
    });
});

module.exports=router;