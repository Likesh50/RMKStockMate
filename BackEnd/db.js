const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',     
  user: 'root',        
<<<<<<< HEAD
  password: 'pass123',  
=======
  password: '1207',  
>>>>>>> 048f76ce6e9d41e99a1aa59db5ddc353d257d6b9
  database: 'food'  
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db;
