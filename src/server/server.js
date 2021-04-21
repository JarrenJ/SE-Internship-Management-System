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
        major,
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
        submitDate,
        applicationID,
        internshipID,
        applicationStatus,
        signature,
        agreementDate,
        comments
    } = req.body

    let userInsert = `INSERT INTO Users VALUES ? ON DUPLICATE KEY UPDATE LastName = VALUES(LastName), FirstName = VALUES(FirstName), PersonalEmail = VALUES(PersonalEmail), StudentAddress = VALUES(StudentAddress), Phone = VALUES(Phone), Major = VALUES(Major)`;

    // let facultyInsert = `INSERT INTO Users(UserID, UserRole, Lastname, FirstName, PersonalEmail) VALUES ? ON DUPLICATE KEY UPDATE LastName = VALUES(Lastname), FirstName = VALUES(FirstName), PersonalEmail = VALUES(PersonalEmail)`;
    //(InternshipID, EmployerName, PointOfContact, EmployerEmail, EmployerPhone, EmployerAddress, StartDate, EndDate)
    let internshipInsert = `INSERT INTO Internship VALUES ? ON DUPLICATE KEY UPDATE EmployerName = VALUES(EmployerName), PointOfContact = VALUES(PointOfContact), EmployerEmail = VALUES(EmployerEmail), EmployerPhone= VALUES(EmployerPhone), EmployerAddress= VALUES(EmployerAddress), StartDate= VALUES(StartDate), EndDate= VALUES(EndDate)`; 
    //(ApplicationID, ApplicationStatus, ApplicationDate, InternID, StuID, FacID)
    let applicationInsert = `INSERT INTO Applications VALUES ? ON DUPLICATE KEY UPDATE ApplicationStatus = VALUES(ApplicationStatus), ApplicationDate = VALUES(ApplicationDate), InternID = VALUES(InternID), StuID = VALUES(StuID), FacID = VALUES(FacID), Signature = VALUES(Signature), AgreementDate = VALUES(AgreementDate), Comments = VALUES(Comments)`;
    // let userInsert = `REPLACE INTO Users VALUES ?`
    // let internshipInsert = `REPLACE INTO Internship VALUES ?`
    // let applicationInsert = `REPLACE INTO Applications VALUES ?`
    // let getInternId = `SELECT * FROM Internship ORDER BY InternshipID DESC LIMIT 0,1`
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
            studentPhoneNum,
            major
        ]
    ]
    connection.query(userInsert, [studentValues], function (err, data) {
        if (err) throw err;
        console.log("Student user data inserted successfully...");
        // res.status(200)
    });
    const facultyValues = [
        [
            facultyID,
            facultyRole,
            instructorLastName,
            instructorFirstName,
            instructorEmail,
            null,
            null,
            null
        ]
    ]
    connection.query(userInsert, [facultyValues], function (err, data) {
        if (err) throw err;
        console.log("Faculty user data inserted successfully...");
        // res.status(200)
    });
    const internshipValues = [
        [
            internshipID, //InternshipID - set to null because the field on DB is AUTO_INCREMENT
            employerName, //using as ID for now
            primaryContactName, //Point of contact on database
            employerEmail,
            employerPhone,
            empAddress,
            startDate,
            endDate
        ]
    ]
    console.log("TEST")
    console.log(internshipValues)
    connection.query(internshipInsert, [internshipValues], function (err, data) {
        if (err) throw err;
        console.log("Employer data inserted successfully...");
        // res.status(200)
    });
    let applicationValues = [[]]
    if (applicationID === null){
        connection.query(`SELECT * FROM Internship ORDER BY InternshipID DESC LIMIT 0,1`, function (err, data) {
            if (err) throw err;
            console.log("Getting Latest Internship ID...");
            console.log(data[0].InternshipID)
            
            let applicationValues = [
                [
                    applicationID,
                    applicationStatus, //applicationStatus - using string for now until we determine a proper method for this
                    submitDate, //Date application was submitted
                    data[0].InternshipID, //Get latest InternshipID
                    studentId,
                    facultyID,
                    signature,
                    agreementDate,
                    comments //FacultyID for now
                ]
            ]
            connection.query(applicationInsert, [applicationValues], function (err, data) {
                if (err) throw err;
                console.log("Application data inserted successfully...");
                res.status(201)
            });
        });
        console.log(applicationValues)
    } else {
        let applicationValues = [
            [
                applicationID,
                applicationStatus, //applicationStatus - using string for now until we determine a proper method for this
                submitDate, //Date application was submitted
                internshipID, //Get latest InternshipID
                studentId,
                facultyID,
                signature,
                agreementDate,
                comments 
            ]
        ]
        console.log(applicationValues)
        connection.query(applicationInsert, [applicationValues], function (err, data) {
            if (err) throw err;
            console.log("Application data inserted successfully...");
            res.status(201)
        });
    }
    res.end();

});

app.get('/api/getFullApplications/:userRole/:userID', (req, res) => {
    const userID = req.params.userID
    if (req.params.userRole === 'Admin'){
        applicationSQL = `SELECT * FROM Applications`
        userSQL = `SELECT * FROM Users`
        internSQL = `SELECT * FROM Internship`
    } else if (req.params.userRole === 'Faculty'){
        applicationSQL = `SELECT * FROM Applications WHERE FacID = ?`
        userSQL = `SELECT * FROM Users WHERE UserID IN (SELECT StuID FROM Applications WHERE FacID = ?) OR UserID = '${userID}'`
        internSQL = `SELECT * FROM Internship WHERE InternshipID IN (SELECT InternID FROM Applications WHERE FacID = ?)`
    } else if (req.params.userRole === 'Student'){
        applicationSQL = `SELECT * FROM Applications WHERE StuID = ?`
        userSQL = `SELECT * FROM Users WHERE UserID IN (SELECT FacID FROM Applications WHERE StuID = ?) OR UserID = '${userID}'`
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

                            let allApplications = Object.assign({}, ...application.map((x) => ({[x.ApplicationID]: x}))) 
                            let allInternships = Object.assign({}, ...internship.map((x) => ({[x.InternshipID]: x})))
                            let allUsers = Object.assign({}, ...users.map((x) => ({[x.UserID]: x})))  
                        console.log(allApplications)
                        res.send({"applications": allApplications, "internships": allInternships, "users": allUsers})
                    
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

app.get('/api/getTotalFacultyInterns/:facID', (req, res) => {
    const facID = req.params.facID
    connection.query(`SELECT COUNT(ApplicationStatus) as 'TotalInterns' FROM Applications WHERE ApplicationStatus = 'Approved' AND FacID = ?`, [facID], (err, data) => {
        if (err) { res.send(err) }
        console.log("=======")
        console.log(data[0].TotalInterns)
        const totalInterns = data[0].TotalInterns
        res.send({ totalInterns } )
    })
})

app.get('/api/getTotalFacultyInternsActive/:facID', (req, res) => {
    const facID = req.params.facID
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT Applications.InternID, Internship.InternshipID, Internship.StartDate, Internship.EndDate FROM Applications INNER JOIN Internship ON Applications.InternID=Internship.InternshipID AND Applications.FacID = ? AND ApplicationStatus = 'Approved' AND Internship.StartDate <= ? AND Internship.EndDate >= ?`, [facID, date, date], (err, data) => {
        if (err) { res.send(err) }
        console.log(data)
        // const totalInterns = data[0].TotalInterns
        res.send({ "ActiveInterns": data.length } )
    })
})

app.get('/api/getPendingFacultyApprovals/:facID', (req, res) => {
    const facID = req.params.facID
    connection.query(`SELECT COUNT(ApplicationStatus) as 'PendingApprovals' FROM Applications WHERE ApplicationStatus != 'Approved' AND FacID = ?`, [facID], (err, data) => {
        if (err) { res.send(err) }
        console.log(data[0].PendingApprovals)
        const pendingApprovals = data[0].PendingApprovals
        res.send({ pendingApprovals } )
    })
})

app.get('/api/getOutOfStateInternsFaculty/:facID', (req, res) => {
    const facID = req.params.facID
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT Count(*) AS 'OutOfStateInterns' FROM Applications INNER JOIN Internship ON Applications.InternID=InternshipID AND FacID = ? AND (EmployerAddress NOT LIKE '%MO%' AND EmployerAddress NOT LIKE '%missouri%') AND StartDate <= ? AND EndDate >= ?`, [facID, date, date], (err, data) => {
        if (err) { res.send(err) }
        console.log(data[0].length)
        if (data) { res.send({"outofstateinterns": data}) }
    })
})

app.get('/api/getInStateInternsFaculty/:facID', (req, res) => {
    const facID = req.params.facID
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT Count(Internship.EmployerAddress) AS 'InStateInterns' FROM Applications INNER JOIN Internship ON Applications.InternID=Internship.InternshipID AND Applications.FacID = ? AND Internship.StartDate <= ? AND Internship.EndDate >= ? AND EmployerAddress LIKE '%MO%' OR EmployerAddress LIKE '%Missouri%'`, [facID, date, date], (err, data) => {
        if (err) { res.send(err) }
        console.log(data)
        if (data) { res.send(data) }
    })
})

app.get('/api/getFacultyInOfStateInterns/:facID', (req, res) => {
    const facID = req.params.facID
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    connection.query(`SELECT Count(EndDate) as 'InOfStateInterns' FROM Internship WHERE EndDate >= ? AND EmployerAddress LIKE '%MO%' OR EmployerAddress NOT LIKE '%Missouri%'`, [date], (err, data) => {
        if (err) { res.send(err) }
        console.log(data[0].InOfStateInterns)
        const outOfStateInterns = data[0].OfStateInterns
        res.send({ outOfStateInterns } )
    })
})

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
