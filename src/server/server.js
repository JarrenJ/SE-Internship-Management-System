const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const e = require('express');

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

app.post('/api/updateStatus', (req, res) => {
    const {status, appID, comment} = req.body
    console.log(appID)
    console.log(status)
    console.log(comment)
    connection.query(`UPDATE Applications SET ApplicationStatus = ? WHERE ApplicationID = ?`, [status, appID], (err, data) => {
        if (err) {
            res.send(err)
        }
        console.log(`Status has been updated for AppID: ${appID}`)
    })
    connection.query(`UPDATE Applications SET Comments = ? WHERE ApplicationID = ?`, [comment, appID], (err, data) => {
        if (err) {
            res.send(err)
        }
        console.log(`Comment has been updated for AppID: ${appID}`)
    })
    res.sendStatus(200)
})


app.post('/api/submit', (req, res) => {

    const {
        studentId,
        studentLastName,
        studentFirstName,
        studentEmail,
        stuAddress,
        studentPhoneNum,
        instructorLastName,
        instructorFirstName,
        instructorEmail,
        employerName,
        primaryContactName,
        employerEmail,
        employerPhone,
        empAddress,
        startDate,
        endDate,
        submitDate
    } = req.body

    let userInsert = `
        INSERT INTO Users VALUES ? ON DUPLICATE KEY UPDATE LastName = VALUES(LastName), FirstName = VALUES(FirstName), PersonalEmail = VALUES(PersonalEmail), StudentAddress = VALUES(StudentAddress), Phone = VALUES(Phone)`;

    let facultyInsert = `INSERT INTO Users(UserID, UserRole, Lastname, FirstName, PersonalEmail) VALUES ? ON DUPLICATE KEY UPDATE LastName = VALUES(Lastname), FirstName = VALUES(FirstName), PersonalEmail = VALUES(PersonalEmail)`;
    let employerInsert = `INSERT INTO Internship VALUES ?`;
    let applicationInsert = `INSERT INTO Applications VALUES ?`;
    let getInternId = `SELECT * FROM Internship ORDER BY InternshipID DESC LIMIT 0,1`

    const studentRole = 'Student'
    const facultyRole = 'Faculty'
    const facultyID = instructorEmail.substr(0, instructorEmail.indexOf('@'));
    const studentValues = [
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
    const facultyValues = [
        [
            facultyID,
            facultyRole,
            instructorFirstName,
            instructorLastName,
            instructorEmail,
        ]
    ]
    const employerValues = [
        [
            null, //InternshipID - set to null because the field on DB is AUTO_INCREMENT
            employerName, //using as ID for now
            primaryContactName, //Point of contact on database
            employerEmail,
            employerPhone,
            empAddress,
            startDate,
            endDate
        ]
    ]
    connection.query(userInsert, [studentValues], function (err, data) {
        if (err) throw err;
        console.log("Student user data inserted successfully...");
        // res.status(200)
    });
    connection.query(facultyInsert, [facultyValues], function (err, data) {
        if (err) throw err;
        console.log("Faculty user data inserted successfully...");
        // res.status(200)
    });
    connection.query(employerInsert, [employerValues], function (err, data) {
        if (err) throw err;
        console.log("Employer data inserted successfully...");
        // res.status(200)
    });

    connection.query(getInternId, function (err, data) {
        if (err) throw err;
        console.log("Getting Latest Internship ID...");
        console.log(data[0].InternshipID)
        const ID = data[0].InternshipID

        const applicationValues = [
            [
                null, //ApplicationID
                'Submitted', //applicationStatus - using string for now until we determine a proper method for this
                submitDate, //Date application was submitted
                ID, //Get latest InternshipID
                studentId,
                facultyID, //FacultyID for now
            ]
        ]

        connection.query(applicationInsert, [applicationValues], function (err, data) {
            if (err) throw err;
            console.log("Application data inserted successfully...");
            res.status(201)
        });

    });
    res.end();

});

// app.get('/api/getApplications/:user', (req, res) => {
//     const user = req.params.user
//     console.log(user)
//     connection.query(`SELECT * FROM Applications WHERE StuID = ?`, [user], (err, data) => {
//         if (err) { res.send(err) }

//         if (data.length > 0) {

//             connection.query(`SELECT * FROM Internship WHERE InternshipID IN (SELECT InternID FROM Applications WHERE StuID = ?)`, [user], (err, data2) => {
//                 if (data2.length > 0) {
//                     res.send({ "applications": data, "internships": data2 })
//                 }
//             })

//         } else {
//             res.statusMessage = "User / Application Not Found"
//             res.status(404)
//             res.send({ "applications": data })
//         }


//     })

//     }
// )

app.get('/api/getFullApplication/:applicationID', (req, res) => {
        const applicationID = req.params.applicationID
        const applications = []
        console.log(applicationID)
        connection.query(`SELECT * FROM Applications WHERE ApplicationID = ?`, [applicationID], (err, application) => {
            if (err) { res.send(err) }

            if (application.length > 0) {

                // console.log(application[0].InternID)
                connection.query(`SELECT * FROM Internship WHERE InternshipID = ?`, [application[0].InternID], (err, internship) => {
                    if (err) throw err;
                    
                    

                    connection.query(`SELECT * FROM Users WHERE UserID = ?`, [application[0].StuID], (err, student) => {
                        if (err) throw err;
                        // console.log(student)
                        connection.query(`SELECT * FROM Users WHERE UserID = ?`, [application[0].FacID], (err, faculty) => {
                            if (err) throw err;
                            // console.log(faculty)
                            console.log("reached bottom")
                            application.map(app => {
                                internship.map(intern =>{
                                    return({
                                        
                                    })
                                })
                            })

                            
                            res.send({"applications": application, "internship": internship, "student": student, "faculty": faculty})
                        
                        })
                    })
                })

                // res.send(response)
            } else {
                res.statusMessage = "User / Application Not Found"
                res.status(404)
                res.send({ "applications": application })
            }


        })

    }
)
app.get('/api/getFullApplications/:userRole/:userID', (req, res) => {
    const userID = req.params.userID
    if (req.params.userRole === 'Admin'){
        applicationSQL = `SELECT * FROM Applications`
        userSQL = `SELECT * FROM Users`
        internSQL = `SELECT * FROM Internship`
    } else if (req.params.userRole === 'Faculty'){
        applicationSQL = `SELECT * FROM Applications WHERE FacID = ?`
        userSQL = `SELECT * FROM Users WHERE UserID = ?`
        internSQL = `SELECT * FROM Internship WHERE InternshipID IN (SELECT InternID FROM Applications WHERE FacID = ?)`
    } else if (req.params.userRole === 'Student'){
        applicationSQL = `SELECT * FROM Applications WHERE StuID = ?`
        userSQL = `SELECT * FROM Users WHERE UserID = ?`
        internSQL = `SELECT * FROM Internship WHERE InternshipID IN (SELECT InternID FROM Applications WHERE StuID = ?)`
    }
    console.log(applicationSQL)
    connection.query(applicationSQL, [userID], (err, application) => {
        if (err) { res.send(err) }
        console.log(application)

        if (application.length > 0) {

            connection.query(internSQL, [userID], (err, internship) => {
                if (err) throw err;
                // console.log(internship)

                connection.query(userSQL, [userID], (err, users) => {
                    if (err) throw err;
                    // console.log(student)
                    
                            let allInternships = Object.assign({}, ...internship.map((x) => ({[x.InternshipID]: x})))
                            let allUsers = Object.assign({}, ...users.map((x) => ({[x.UserID]: x})))  

                        res.send({"applications": application, "internships": allInternships, "users": allUsers})
                    
                    })
                })
            

            // res.send(response)
        } else {
            res.statusMessage = "User / Application Not Found"
            res.status(404)
            res.send({ "applications": application })
        }


    })

}
)


app.get('/api/getTotalInterns', (req, res) => {
    connection.query(`SELECT COUNT(ApplicationStatus) as 'TotalInterns' FROM Applications WHERE ApplicationStatus = 'Approved'`, (err, data) => {
        if (err) { res.send(err) }
        console.log(data[0].TotalInterns)
        const totalInterns = data[0].TotalInterns
        res.send({ totalInterns } )
    })
})

app.get('/api/getPendingApprovals', (req, res) => {
    connection.query(`SELECT COUNT(ApplicationStatus) as 'PendingApprovals' FROM Applications WHERE ApplicationStatus != 'Approved'`, (err, data) => {
        if (err) { res.send(err) }
        console.log(data[0].PendingApprovals)
        const pendingApprovals = data[0].PendingApprovals
        res.send({ pendingApprovals } )
    })
})

app.get('/api/getActiveInterns', (req, res) => {
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT COUNT(EndDate) as 'ActiveInterns' FROM Internship WHERE EndDate >= ?`, [date], (err, data) => {
        if (err) { res.send(err) }
        console.log(data[0].ActiveInterns)
        const activeInterns = data[0].ActiveInterns
        res.send({ activeInterns } )
    })
})

app.get('/api/getOutOfStateInterns', (req, res) => {
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT Count(EndDate) as 'OutOfStateInterns' FROM Internship WHERE EndDate >= ? AND EmployerAddress NOT LIKE '%MO%' OR EmployerAddress NOT LIKE '%Missouri%'`, [date], (err, data) => {
        if (err) { res.send(err) }
        console.log(data[0].OutOfStateInterns)
        const outOfStateInterns = data[0].OutOfStateInterns
        res.send({ outOfStateInterns } )
    })
})

app.get('/api/getUser/:username', (req, res) => {
    const username = req.params.username
    console.log(username)
    connection.query(`SELECT * FROM accounts WHERE username = ?`, [username], (err, data) => {
        if (err) { res.send(err) }

        if (data.length > 0) {
            // res.status(200)
            // console.log(data[0].username)
            res.send({
                "username": data[0].username,
                "role": data[0].role
            })
        } else {
                res.statusMessage = "User Not Found"
                res.status(404)
                res.send(err)
        }
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
            const userID = results[0].username

            response.header("auth-token", token).json({
                error: null,
                data: {
                    token,
                    role,
                    userID
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
