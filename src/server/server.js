const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8000;
const table ='users';

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PWD,
//     database: process.env.MYSQL_DB,
// });

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
});

db.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
    }
});

app.listen(port, () => {
    console.log(`App server now listening to port ${port}`);
});

app.get('/api/users', (req, res) => {
    db.query(`select * from ${table}`, (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});