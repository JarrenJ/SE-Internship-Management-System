const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Create connection to mySQL database
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
})

const app = express()

app.use(cors())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.get('/api/accounts', (req, res) => {
    connection.query(`SELECT * FROM accounts`, (err, rows) => {
        if (err) {
            res.send(err)
        } else {
            res.send(rows)
        }
    });
});

app.get('/api/admins', (req, res) => {
    const role = "admin"
    connection.query(`SELECT * FROM accounts WHERE role = ?`, [role], (err, rows) => {
        if (err) {
            res.send(err)
        } else {
            res.send(rows)
        }
    });
});

app.get('/api/faculty', (req, res) => {
    const role = "faculty"
    connection.query(`SELECT * FROM accounts WHERE role = ?`, [role], (err, rows) => {
        if (err) {
            res.send(err)
        } else {
            res.send(rows)
        }
    });
});

app.get('/api/students', (req, res) => {
    const role = "student"
    connection.query(`SELECT * FROM accounts WHERE role = ?`, [role], (err, rows) => {
        if (err) {
            res.send(err)
        } else {
            res.send(rows)
        }
    });
});

app.post('/api/auth', (request, response) => {
    console.log(request.body)
    const username = request.body.username
    const password = request.body.password
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        console.log('query database...')
        if (results.length > 0) {
            console.log('found user!')
            console.log(results[0].role)
            request.session.loggedin = true
            request.session.username = username

            // MAYBE I CAN USE A JWT TOKEN TO CHECK IF USER IS ADMIN / STUDENT / FACULTY????

            const token = jwt.sign(
                // payload data
                {
                    name: 'name',
                    id: 'id',
                },
                process.env.TOKEN_SECRET
            );

            const role = results[0].role

            response.header("auth-token", token).json({
                error: null,
                data: {
                    token,
                    role,
                },
            });

            // response.header("auth-role", userRole).json({
            //     error: null,
            //     data: {
            //         userRole,
            //     },
            // });
            response.status(200)
        } else {
            console.log('Invalid User!')
            response.status(400)
        }
        console.log('ended')
        response.end();
    });
});

// app.get('/home', function(request, response) {
//     if (request.session.loggedin) {
//         response.send('Welcome back, ' + request.session.username + '!');
//     } else {
//         response.send('Please login to view this page!');
//     }
//     response.end();
// });

app.listen(8000, () => {
    console.log(`App server now listening to port 8000`);
});
