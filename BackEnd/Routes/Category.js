const express = require('express');
const db = require('../db');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/report', async (req, res) => {
    const { fdate, tdate } = req.query;

    try {
        const [result] = await db.promise().query(`
                    SELECT 
            c.category AS category,
            SUM(p.amount) AS purchase_amount,
            COALESCE(SUM(d.RMK * p.rate), 0) AS RMK_amount,
            COALESCE(SUM(d.RMD * p.rate), 0) AS RMD_amount,
            COALESCE(SUM(d.RMKSCHOOL * p.rate), 0) AS RMKSCHOOL_amount,
            COALESCE(SUM(d.RMKCET * p.rate), 0) AS RMKCET_amount,
            (COALESCE(SUM(d.RMK * p.rate), 0) + COALESCE(SUM(d.RMD * p.rate), 0) + COALESCE(SUM(d.RMKSCHOOL * p.rate), 0) + COALESCE(SUM(d.RMKCET * p.rate), 0)) AS total_amount
        FROM (
            SELECT 
                item, 
                SUM(quantity) AS quantity, 
                SUM(amount) AS amount,
                SUM(amount) / SUM(quantity) AS rate
            FROM purchase
            WHERE date BETWEEN ? AND ?
            GROUP BY item
        ) AS p
        LEFT JOIN (
            SELECT 
                item,
                SUM(RMK) AS RMK,
                SUM(RMD) AS RMD,
                SUM(RMKSCHOOL) AS RMKSCHOOL,
                SUM(RMKCET) AS RMKCET,
                (SELECT amount / quantity FROM purchase WHERE purchase.item = dispatch1.item AND purchase.date BETWEEN ? AND ? LIMIT 1) AS rate
            FROM dispatch1
            WHERE date BETWEEN ? AND ?
            GROUP BY item
        ) AS d ON p.item = d.item
        JOIN category c ON p.item = c.item
        GROUP BY c.category
        `, [fdate, tdate, fdate, tdate, fdate, tdate]);

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while retrieving the result.", error });
    }
});

module.exports = router;
