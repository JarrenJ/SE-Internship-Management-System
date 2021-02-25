// const express = require('express');
// const mysql = require('mysql');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const path = require('path');
//
// const app = express();
// const port = 8000;
// const authTable ='users';
//
// // const pool = mysql.createPool({
// //     host: process.env.MYSQL_HOST,
// //     user: process.env.MYSQL_USER,
// //     password: process.env.MYSQL_PWD,
// //     database: process.env.MYSQL_DB,
// // });
//
// // const db = mysql.createConnection({
// //     host: process.env.MYSQL_HOST,
// //     user: process.env.MYSQL_USER,
// //     password: process.env.MYSQL_PWD,
// //     database: process.env.MYSQL_DB,
// // });
//
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));
//
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());
//
// // app.get('/', function(request, response) {
// //     response.sendFile(path.join(__dirname + '../pages/Home/home.jsx'));
// // });
//
// const db = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PWD,
//     database: 'auth',
// });
//
// db.connect(err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Connected to the MySQL server');
//     }
// });
//
// app.listen(port, () => {
//     console.log(`App server now listening to port ${port}`);
// });
//
// // for action
// app.post('/login', function(request, response) {
//     const username = request.body.username;
//     const password = request.body.password;
//     if (username && password) {
// // check if user exists
//         db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
//             if (results.length > 0) {
//                 request.session.loggedin = true;
//                 request.session.username = username;
//                 response.redirect('/home');
//             } else {
//                 response.send('Incorrect Username and/or Password!');
//             }
//             response.end();
//         });
//     } else {
//         response.send('Please enter Username and Password!');
//         response.end();
//     }
// });
//
//
// app.get('/api/users', (req, res) => {
//     db.query(`select * from ${authTable}`, (err, rows) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(rows);
//         }
//     });
// });
//
// // app.get('/api/auth', function (req, res) {
// //
// //     // db.query(`select * from ${authTable}`, (err, rows) => {
// //     //     if (err) {
// //     //         res.send(err);
// //     //     } else {
// //     //         res.send(rows);
// //     //     }
// //     // });
// //
// //     // const username = req.body.username
// //     // const password = req.body.password
// //     const username = 'test'
// //     const password = 'test'
// //     if (username && password) {
// //         //check if user is valid
// //         db.query(`select * from ${authTable} WHERE username = ? AND password = ?`, [username, password], function (error, results, fields) {
// //             if (results.length > 0) {
// //                 req.session.loggedIn = true
// //                 req.session.username = username
// //                 res.redirect('/playground')
// //             } else {
// //                 res.send('Beep. Boop. Error.')
// //             }
// //             res.end()
// //         })
// //     } else {
// //         res.send('Enter Username and Password!')
// //         res.end()
// //     }
// // })
