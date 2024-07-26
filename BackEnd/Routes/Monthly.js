const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/report', async (req, res) => {
  try {
    const { fdate, tdate } = req.query;

    const query = `
      SELECT 
        p_sub.item, 
        p_sub.quantity AS purchaseQuantity,
        p_sub.amount AS purchaseAmount,
        COALESCE(cs.closingStock, 0) AS closingStock,
        COALESCE(d_sub.RMK, 0) AS RMK,
        COALESCE(d_sub.RMD, 0) AS RMD,
        COALESCE(d_sub.RMKCET, 0) AS RMKCET,
        COALESCE(d_sub.RMKSCHOOL, 0) AS RMKSCHOOL
      FROM 
        (SELECT item, SUM(quantity) AS quantity, SUM(amount) AS amount 
         FROM purchase 
         WHERE date BETWEEN ? AND ? 
         GROUP BY item) p_sub
      LEFT JOIN 
        (SELECT item, 
                SUM(CASE WHEN place = 'RMK' THEN quantity ELSE 0 END) AS RMK,
                SUM(CASE WHEN place = 'RMD' THEN quantity ELSE 0 END) AS RMD,
                SUM(CASE WHEN place = 'RMKCET' THEN quantity ELSE 0 END) AS RMKCET,
                SUM(CASE WHEN place = 'SCHOOL' THEN quantity ELSE 0 END) AS RMKSCHOOL
         FROM dispatch1 
         WHERE date BETWEEN ? AND ? 
         GROUP BY item) d_sub 
      ON p_sub.item = d_sub.item
      LEFT JOIN 
        (SELECT item, 
                COALESCE(SUM(quantity), 0) AS closingStock 
         FROM closingstock 
         WHERE date <= ? 
         GROUP BY item) cs 
      ON p_sub.item = cs.item;
    `;

    const [results] = await db.promise().query(query, [fdate, tdate, fdate, tdate, fdate]);

    res.status(200).send(results);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
