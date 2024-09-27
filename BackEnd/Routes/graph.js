const express = require('express');
const db = require('../db'); // Ensure your db configuration is correct
const router = express.Router();

// Helper function to get the last 7 days
const getLast7Days = () => {
    const today = new Date();
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        last7Days.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    }
    return last7Days;
};

router.get('/last-7-days', (req, res) => {
    const last7Days = getLast7Days();

    // Create a placeholder for the response
    const resultsMap = last7Days.map(date => ({ date: date.split('-')[2], count: 0 })); // Extracting DD

    // Query to get the purchases grouped by date for the last 7 days
    const query = `
        SELECT date, SUM(amount) AS totalAmount
        FROM purchase
        WHERE date IN (?)
        GROUP BY date
    `;

    db.query(query, [last7Days], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }

        // Map the results to the response format
        results.forEach(row => {
            const dateIndex = resultsMap.findIndex(item => item.date === row.date.split('-')[2]); // Extracting DD
            if (dateIndex !== -1) {
                resultsMap[dateIndex].count = row.totalAmount;
            }
        });

        res.json(resultsMap);
    });
});

module.exports = router;
