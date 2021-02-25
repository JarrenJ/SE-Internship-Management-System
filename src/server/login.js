const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodelogin'
});

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// app.get('/', function(request, response) {
//     response.sendFile(path.join(__dirname + '/login.html'));
// });

app.post('/auth', function(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    if (username && password) {
        console.log('username and password entered.')
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            console.log('query database...')
            if (results.length > 0) {
                console.log('found user!')
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/playground');
            } else {
                console.log('Invalid User!')
                response.send('Incorrect Username and/or Password!');
            }
            console.log('ended')
            response.end();
        });
    } else {
        console.log('credentials not entered.')
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/api/users', (req, res) => {
    connection.query(`SELECT * FROM accounts`, (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(8000, () => {
    console.log(`App server now listening to port 8000`);
});
