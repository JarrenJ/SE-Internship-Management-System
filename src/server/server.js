// import { ROLES } from 'utils'; //couldn't figure out how to get this to work
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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* Sets application in database
 * Expects object of  {"status": String, "appID": Integer, "comment": String} 
 */
app.post('/api/updateStatus', (req, res) => {
    const { status, appID, comment } = req.body
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

/* Submits new application to database and updates if application is being edited
 * expects object including all information data 
 * 
 * If given Internship ID and Application ID it will update those given records
 * If UserID already exists for student or faculty that information will be updated
 * There is no record of past information
 * 
 * This means if one student changes Faculty information in their application it is changed 
 * for all users
 */
app.post('/api/submit', (req, res) => {

    const {
        studentId, 
        major, 
        studentLastName,
        studentFirstName,
        studentEmail,
        stuAddress,
        studentPhoneNum,
        instructorLastName,
        instructorFirstName,
        instructorEmail, // Email with @
        employerName,
        primaryContactName,
        employerEmail,
        employerPhone,
        empAddress,
        startDate,
        endDate,
        submitDate,
        applicationID, // null if new, integer if edit
        internshipID, // null if new, integer if edit
        applicationStatus,
        signature,
        agreementDate,
        comments // Empty string if new, existing comments if edit
    } = req.body

    const userInsert = `INSERT INTO Users VALUES ? ON DUPLICATE KEY UPDATE LastName = VALUES(LastName), FirstName = VALUES(FirstName), PersonalEmail = VALUES(PersonalEmail), StudentAddress = VALUES(StudentAddress), Phone = VALUES(Phone), Major = VALUES(Major)`;

    const internshipInsert = `INSERT INTO Internship VALUES ? ON DUPLICATE KEY UPDATE EmployerName = VALUES(EmployerName), PointOfContact = VALUES(PointOfContact), EmployerEmail = VALUES(EmployerEmail), EmployerPhone= VALUES(EmployerPhone), EmployerAddress= VALUES(EmployerAddress), StartDate= VALUES(StartDate), EndDate= VALUES(EndDate)`;

    const applicationInsert = `INSERT INTO Applications VALUES ? ON DUPLICATE KEY UPDATE ApplicationStatus = VALUES(ApplicationStatus), ApplicationDate = VALUES(ApplicationDate), InternID = VALUES(InternID), StuID = VALUES(StuID), FacID = VALUES(FacID), Signature = VALUES(Signature), AgreementDate = VALUES(AgreementDate), Comments = VALUES(Comments)`;

    const facultyID = instructorEmail.substr(0, instructorEmail.indexOf('@'));
    const ROLES = { //couldn't figure out how to get import to work @line 1
        STUDENT: 'Student',
        FACULTY: 'Faculty',
        ADMIN: 'Admin'
    }

    const studentValues = [
        [
            studentId,
            ROLES.STUDENT,
            studentLastName,
            studentFirstName,
            studentEmail,
            stuAddress,
            studentPhoneNum,
            major
        ]
    ]
    connection.query(userInsert, [studentValues], function (err, data) {
        if (err) throw err;
        console.log("Student user data inserted successfully...");
        res.status(200)
    });
    const facultyValues = [
        [
            facultyID,
            ROLES.FACULTY,
            instructorLastName,
            instructorFirstName,
            instructorEmail,
            null, // These values are not stored or accessed for Faculty users
            null,
            null
        ]
    ]
    connection.query(userInsert, [facultyValues], function (err, data) {
        if (err) throw err;
        console.log("Faculty user data inserted successfully...");
        res.status(200)
    });
    const internshipValues = [
        [
            internshipID, // Comes in as integer for editing applications and null for new applications
            employerName, 
            primaryContactName, 
            employerEmail,
            employerPhone,
            empAddress,
            startDate,
            endDate
        ]
    ]
    connection.query(internshipInsert, [internshipValues], function (err, data) {
        if (err) throw err;
        console.log("Employer data inserted successfully...");
        res.status(200)
    });
    let applicationValues = [[]]
    if (applicationID === null) {
        connection.query(`SELECT * FROM Internship ORDER BY InternshipID DESC LIMIT 0,1`, function (err, data) {
            if (err) throw err;
            console.log("Getting Latest Internship ID...");

            let applicationValues = [
                [
                    applicationID,
                    applicationStatus, 
                    submitDate, 
                    data[0].InternshipID, //Gets most recent Internship ID
                    studentId,
                    facultyID,
                    signature,
                    agreementDate,
                    comments 
                ]
            ]
            connection.query(applicationInsert, [applicationValues], function (err, data) {
                if (err) throw err;
                console.log("Application data inserted successfully...");
                res.status(201)
            });
        });
    } else {
        let applicationValues = [
            [
                applicationID,
                applicationStatus,
                submitDate, 
                internshipID, // InternshipID from given application
                studentId,
                facultyID,
                signature,
                agreementDate,
                comments
            ]
        ]
        connection.query(applicationInsert, [applicationValues], function (err, data) {
            if (err) throw err;
            console.log("Application data inserted successfully...");
            res.status(201)
        });
    }
    res.end();

});

/* End Point to return applications based off of role and ID
 *
 * Returns an object with objects "applications", "users", and "internships" keys
 *      objects hold information indexed off their given Primary Key in the database
 */
app.get('/api/getFullApplications/:userRole/:userID', (req, res) => {
    const userID = req.params.userID
    if (req.params.userRole === 'Admin') {
        applicationSQL = `SELECT * FROM Applications`
        userSQL = `SELECT * FROM Users`
        internSQL = `SELECT * FROM Internship`
    } else if (req.params.userRole === 'Faculty') {
        applicationSQL = `SELECT * FROM Applications WHERE FacID = ?`
        userSQL = `SELECT * FROM Users WHERE UserID IN (SELECT StuID FROM Applications WHERE FacID = ?) OR UserID = '${userID}'`
        internSQL = `SELECT * FROM Internship WHERE InternshipID IN (SELECT InternID FROM Applications WHERE FacID = ?)`
    } else if (req.params.userRole === 'Student') {
        applicationSQL = `SELECT * FROM Applications WHERE StuID = ?`
        userSQL = `SELECT * FROM Users WHERE UserID IN (SELECT FacID FROM Applications WHERE StuID = ?) OR UserID = '${userID}'`
        internSQL = `SELECT * FROM Internship WHERE InternshipID IN (SELECT InternID FROM Applications WHERE StuID = ?)`
    }
    connection.query(applicationSQL, [userID], (err, application) => {
        if (err) { res.send(err) }

        if (application.length > 0) {

            connection.query(internSQL, [userID], (err, internship) => {
                if (err) throw err;

                connection.query(userSQL, [userID], (err, users) => {
                    if (err) throw err;

                    let allApplications = Object.assign({}, ...application.map((x) => ({ [x.ApplicationID]: x })))
                    let allInternships = Object.assign({}, ...internship.map((x) => ({ [x.InternshipID]: x })))
                    let allUsers = Object.assign({}, ...users.map((x) => ({ [x.UserID]: x })))
                    res.send({ "applications": allApplications, "internships": allInternships, "users": allUsers })

                })
            })
        } else {
            res.statusMessage = "User / Application Not Found"
            res.status(404)
            res.send({ "applications": application })
        }


    })

}
)

app.get('/api/getTotalFacultyInterns/:facID', (req, res) => {
    const facID = req.params.facID
    connection.query(`SELECT COUNT(ApplicationStatus) as 'TotalInterns' FROM Applications WHERE ApplicationStatus = 'Approved' AND FacID = ?`, [facID], (err, data) => {
        if (err) { res.send(err) }
        const totalInterns = data[0].TotalInterns
        res.send({ totalInterns })
    })
})

app.get('/api/getTotalFacultyInternsActive/:facID', (req, res) => {
    const facID = req.params.facID
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT Applications.InternID, Internship.InternshipID, Internship.StartDate, Internship.EndDate FROM Applications INNER JOIN Internship ON Applications.InternID=Internship.InternshipID AND Applications.FacID = ? AND ApplicationStatus = 'Approved' AND Internship.StartDate <= ? AND Internship.EndDate >= ?`, [facID, date, date], (err, data) => {
        if (err) { res.send(err) }
        // const totalInterns = data[0].TotalInterns
        res.send({ "ActiveInterns": data.length })
    })
})

app.get('/api/getPendingFacultyApprovals/:facID', (req, res) => {
    const facID = req.params.facID
    connection.query(`SELECT COUNT(ApplicationStatus) as 'PendingApprovals' FROM Applications WHERE ApplicationStatus != 'Approved' AND FacID = ?`, [facID], (err, data) => {
        if (err) { res.send(err) }
        const pendingApprovals = data[0].PendingApprovals
        res.send({ pendingApprovals })
    })
})

app.get('/api/getOutOfStateInternsFaculty/:facID', (req, res) => {
    const facID = req.params.facID
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT Count(*) AS 'OutOfStateInterns' FROM Applications INNER JOIN Internship ON Applications.InternID=InternshipID AND FacID = ? AND (EmployerAddress NOT LIKE '%MO%' AND EmployerAddress NOT LIKE '%missouri%') AND StartDate <= ? AND EndDate >= ?`, [facID, date, date], (err, data) => {
        if (err) { res.send(err) }
        if (data) { res.send(data) }
    })
})

app.get('/api/getInStateInternsFaculty/:facID', (req, res) => {
    const facID = req.params.facID
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT Count(Internship.EmployerAddress) AS 'InStateInterns' FROM Applications INNER JOIN Internship ON Applications.InternID=Internship.InternshipID AND Applications.FacID = ? AND Internship.StartDate <= ? AND Internship.EndDate >= ? AND EmployerAddress LIKE '%MO%' OR EmployerAddress LIKE '%Missouri%'`, [facID, date, date], (err, data) => {
        if (err) { res.send(err) }
        if (data) { res.send(data) }
    })
})

app.get('/api/getTotalInterns', (req, res) => {
    connection.query(`SELECT COUNT(ApplicationStatus) as 'TotalInterns' FROM Applications WHERE ApplicationStatus = 'Approved'`, (err, data) => {
        if (err) { res.send(err) }
        const totalInterns = data[0].TotalInterns
        res.send({ totalInterns })
    })
})

app.get('/api/getPendingApprovals', (req, res) => {
    connection.query(`SELECT COUNT(ApplicationStatus) as 'PendingApprovals' FROM Applications WHERE ApplicationStatus != 'Approved'`, (err, data) => {
        if (err) { res.send(err) }
        const pendingApprovals = data[0].PendingApprovals
        res.send({ pendingApprovals })
    })
})

app.get('/api/getActiveInterns', (req, res) => {
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT COUNT(EndDate) as 'ActiveInterns' FROM Internship WHERE EndDate >= ?`, [date], (err, data) => {
        if (err) { res.send(err) }
        const activeInterns = data[0].ActiveInterns
        res.send({ activeInterns })
    })
})

app.get('/api/getOutOfStateInterns', (req, res) => {
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT Count(EndDate) as 'OutOfStateInterns' FROM Internship WHERE EndDate >= ? AND EmployerAddress NOT LIKE '%MO%' OR EmployerAddress NOT LIKE '%Missouri%'`, [date], (err, data) => {
        if (err) { res.send(err) }
        const outOfStateInterns = data[0].OutOfStateInterns
        res.send({ outOfStateInterns })
    })
})

/* Endpoint to get UserID and UserRole from Users table. 
 * returns object with "username" and "role" keys
 */
app.get('/api/getUser/:username', (req, res) => {
    const username = req.params.username
    console.log(username)
    connection.query(`SELECT * FROM accounts WHERE username = ?`, [username], (err, data) => {
        if (err) { res.send(err) }

        if (data.length > 0) {
            res.status(200)
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
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
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
