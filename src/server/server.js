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

// If connection fails, log error to console
connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
    }
});

const app = express()

app.use(cors())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.post('/api/submit', (req, res) => {

    /* OBJECT STRUCTURE IS A BIT MESSY AND WILL BE CLEANED UP LATER
     * To access values...
     * req.body[0] == values object from form
     * req.body[1] == comments field from Student Info Form
     * req.body[2] == student address info
     * req.body[3] == employer address info
     * req.body[4] == internship start date
     * req.body[5] == internship end date
     */

    // Link for multiple insert statements
    // https://stackoverflow.com/questions/35007263/insert-into-two-dependent-tables-in-mysql-with-node-js

    const {studentId, studentLastName, studentFirstName, studentEmail, stuAddress, studentPhoneNum} = req.body[0]
    console.log(`${studentId}`)
    console.log('----------')
    console.log(req.body[1])
    console.log(req.body[2])
    console.log(req.body[3])
    console.log(req.body[4])
    console.log(req.body[5])

    let sql = `INSERT INTO Users VALUES ?`;
    const studentRole = 'Student'
    const values = [
        [
            studentId,
            studentRole,
            studentLastName,
            studentFirstName,
            studentEmail,
            stuAddress,
            studentPhoneNum
        ]
    ]
    console.log(sql);
    connection.query(sql, [values], function (err, data) {
        if (err) throw err;
        console.log("User dat is inserted successfully ");
        res.status(200)
    });
});

/* Endpoint to grab user specified role
 * Example: /api/admin
 * Returns: all admin accounts
 */
app.get('/api/:accountType', (req, res) => {
    const role = req.params.accountType
    console.log(role)
    connection.query(`SELECT * FROM accounts WHERE role = ?`, [role], (err, rows) => {
        if (err) {
            res.send(err)
        } else {
            res.send(rows)
        }
    });
});

// Endpoint to get all accounts
app.get('/api/accounts', (req, res) => {
    connection.query(`SELECT * FROM accounts`, (err, rows) => {
        if (err) {
            res.send(err)
        } else {
            res.send(rows)
        }
    });
});

/* Endpoint to authenticate user
 * Expects a JSON object with following shape
 *
 * { "username": "", "password": "" }
 *
 */
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

            const token = jwt.sign(
                // payload data
                {
                    username: request.body.username,
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
            response.status(200)

        } else {
            response.statusMessage = "Invalid User"
            response.status(400)
            // response.sendStatus(400)
        }
        console.log('ended')
        response.end();
    });
});

app.listen(8000, () => {
    console.log(`App server now listening to port 8000`);
});
