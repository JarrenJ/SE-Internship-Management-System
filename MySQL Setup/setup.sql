CREATE DATABASE IF NOT EXISTS ims;
USE ims;

-- Abstraction of bearcast login for testing purposes. Default accounts below
CREATE TABLE IF NOT EXISTS `accounts` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `role` varchar(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Users (
    UserID VARCHAR(25) UNIQUE,
    UserRole VARCHAR(25),
    LastName varchar(25),
    FirstName VARCHAR(25),
    PersonalEmail VARCHAR(25),
    StudentAddress VARCHAR(255),
    Phone VARCHAR(25),
    Major VARCHAR(25),
    PRIMARY KEY (UserID)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Internship (
    InternshipID int NOT NULL AUTO_INCREMENT,
    EmployerName VARCHAR(25),
    PointOfContact VARCHAR(25),
    EmployerEmail VARCHAR(25),
    EmployerPhone VARCHAR(25),
    EmployerAddress VARCHAR(255),
    StartDate DATE,
    EndDate DATE,
    PRIMARY KEY (InternshipID)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Applications (
    ApplicationID int NOT NULL AUTO_INCREMENT,
    ApplicationStatus VARCHAR(25),
    ApplicationDate VARCHAR(25),
    InternID int,
    StuID VARCHAR(20),
    FacID VARCHAR(20),
    `Signature` VARCHAR(20),
    AgreementDate VARCHAR(20),
    Comments VARCHAR(255),
    PRIMARY KEY (ApplicationID),
    CONSTRAINT intern_fk FOREIGN KEY (InternID) REFERENCES Internship(InternshipID),
    CONSTRAINT student_fk FOREIGN KEY (StuID) REFERENCES Users(UserID),
    CONSTRAINT faculty_fk FOREIGN KEY (FacID) REFERENCES Users(UserID)
)ENGINE = InnoDB;

-- Default Data For Accounts Table --
INSERT INTO accounts (id, username, password, role) VALUES (1, 'admin', 'admin', 'Admin');
INSERT INTO accounts (id, username, password, role) VALUES (2, 'faculty', 'faculty', 'Faculty');
INSERT INTO accounts (id, username, password, role) VALUES (3, 'neloe', 'password', 'Faculty');
INSERT INTO accounts (id, username, password, role) VALUES (4, 'student', 'student', 'Student');
INSERT INTO accounts (id, username, password, role) VALUES (5, 'S528544', 'password', 'Student');
-- Default Data For Accounts Table --

-- Default Data For Users Table --
INSERT INTO Users VALUES ('S528544', 'Student', 'Jackson', 'Jarren', 'xJarrenJ@icloud.com', '6341 N Whitetail Way, , Parkville, Missouri, 64152', '5173669247', 'Computer Science');
INSERT INTO Users(UserID, UserRole, Lastname, FirstName, PersonalEmail) VALUES ('neloe', 'Faculty', 'Eloe', 'Nathan', 'neloe@nwmissouri.edu');
INSERT INTO Users(UserID, UserRole, Lastname, FirstName, PersonalEmail) VALUES ('sbell', 'Faculty', 'Bell', 'Scott', 'sbell@nwmissouri.edu');
INSERT INTO Users(UserID, UserRole, Lastname, FirstName, PersonalEmail) VALUES ('afellah', 'Faculty', 'Fellah', 'Aziz', 'afellah@nwmissouri.edu');
INSERT INTO Users(UserID, UserRole, Lastname, FirstName, PersonalEmail) VALUES ('choot', 'Faculty', 'Hoot', 'Charles', 'choot@nwmissouri.edu')
-- Default Data For Users Table --

-- Default Data For Internship Table --
INSERT INTO Internship VALUES (null, 'Cerner', 'Sean', 'Sean.Guy@cerner.com', '8165552552', '1 Cerner Lane, , Kansas City, KS, 49265', '2021-05-13', '2021-05-14');
INSERT INTO Internship VALUES (null, 'Cerner 2', 'Nicole', 'Nicole.Girl@cerner.com', '8165555252', '11 Cerner Lane, , Kansas City, MO, 46259', '2021-05-14', '2021-05-28');
INSERT INTO Internship VALUES (null, 'Cerner 3', 'Sean', 'Sean.Guy@cerner.com', '8165552552', '1 Cerner Lane, , Kansas City, MO, 64152', '2021-06-10', '2021-07-29');
INSERT INTO Internship VALUES (null, 'UGA Finance', 'Jason', 'Jason.Guy@uga.com', '9135556524', '31 UGA Drive, , Kansas City, KS, 49265', '2021-05-18', '2021-07-21');
INSERT INTO Internship VALUES (null, 'UGA Finance 2', 'Matt', 'Matt.Guy@uga.com', '8165235412', '12 UGA Drive, , Kansas City, KS, 49265', '2021-04-21', '2021-05-18');
INSERT INTO Internship VALUES (null, 'Target', 'Dave', 'Dave.Guy@target.com', '8165552552', '1 Target Lane, , Kansas City, KS, 49265', '2021-07-15', '2021-09-18');
INSERT INTO Internship VALUES (null, 'Target 2', 'Sam', 'Sam.Girl@target.com', '8165552552', '1 Target Lane, , Kansas City, KS, 49265', '2021-07-20', '2021-09-25');
INSERT INTO Internship VALUES (null, 'Best Buy', 'Jack', 'Jack.Guy@bestbuy.com', '9135552356', '1 BestBuy TRFY, , Kansas City, KS, 46528', '2021-06-13', '2021-07-14');
INSERT INTO Internship VALUES (null, 'Best Buy 2', 'Jill', 'Jill.Girl@bestbuy.com', '2351568745', '1 GME Rocket Drive, , Kansas City, KS, 84575', '2021-05-28', '2021-09-22');
INSERT INTO Internship VALUES (null, 'GameStop', 'Draco', 'Draco.Dragon@gamestop.com', '8165552552', '2 GME Rocket Drive, , Kansas City, KS, 49265', '2021-06-22', '2021-10-14');
INSERT INTO Internship VALUES (null, 'Doritos', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 2', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 3', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 4', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 5', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 6', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 7', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 8', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 9', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 10', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
INSERT INTO Internship VALUES (null, 'Doritos 20', 'Nacho', 'Nacho.Guy@cerner.com', '8165552552', '1 Cerner Lane, 2 Cerner Lane, Kansas City, KS, 49265', '2021-06-13', '2021-12-10');
-- Default Data For Internship Table --

-- Default Data For Applications Table --
INSERT INTO Applications VALUES (1, 'Pending', '2021-4-10', 1, 'S528544', 'neloe', 'Jarren Jackson', '2021-4-10', 'Nice');
INSERT INTO Applications VALUES (2, 'Pending', '2021-4-10', 2, 'S528544', 'choot', 'Jarren Jackson', '2021-4-10', 'HAHA!');
INSERT INTO Applications VALUES (3, 'Pending', '2021-4-10', 3, 'S528544', 'sbell', 'Jarren Jackson', '2021-4-10', '');
INSERT INTO Applications VALUES (4, 'Pending', '2021-4-11', 4, 'S528544', 'choot', 'Jarren Jackson', '2021-4-11', '');
INSERT INTO Applications VALUES (5, 'Pending', '2021-4-12', 5, 'S528544', 'choot', 'Jarren Jackson', '2021-4-12', '');
INSERT INTO Applications VALUES (6, 'Pending', '2021-4-12', 6, 'S528544', 'afellah', 'Jarren Jackson', '2021-4-12', '');
INSERT INTO Applications VALUES (7, 'Pending', '2021-4-12', 7, 'S528544', 'afellah', 'Jarren Jackson', '2021-4-12', '');
INSERT INTO Applications VALUES (8, 'Pending', '2021-4-12', 8, 'S528544', 'sbell', 'Jarren Jackson', '2021-4-12', '');
INSERT INTO Applications VALUES (9, 'Pending', '2021-4-12', 9, 'S528544', 'neloe', 'Jarren Jackson', '2021-4-12', 'Wow!');
INSERT INTO Applications VALUES (10, 'Pending', '2021-4-13', 10, 'S528544', 'neloe', 'Jarren Jackson', '2021-4-13', 'YAY!');
INSERT INTO Applications VALUES (11, 'Pending', '2021-4-14', 11, 'S528544', 'sbell', 'Jarren Jackson', '2021-4-14', '');
INSERT INTO Applications VALUES (12, 'Pending', '2021-4-14', 12, 'S528544', 'afellah', 'Jarren Jackson', '2021-4-14', '');
INSERT INTO Applications VALUES (13, 'Pending', '2021-4-15', 13, 'S528544', 'choot', 'Jarren Jackson', '2021-4-15', '');
INSERT INTO Applications VALUES (14, 'Pending', '2021-4-15', 14, 'S528544', 'choot', 'Jarren Jackson', '2021-4-15', 'COOL!');
INSERT INTO Applications VALUES (15, 'Pending', '2021-4-16', 15, 'S528544', 'choot', 'Jarren Jackson', '2021-4-16', '');
INSERT INTO Applications VALUES (16, 'Pending', '2021-4-16', 16, 'S528544', 'neloe', 'Jarren Jackson', '2021-4-16', '');
INSERT INTO Applications VALUES (17, 'Pending', '2021-4-17', 17, 'S528544', 'sbell', 'Jarren Jackson', '2021-4-17', 'I did not like...');
INSERT INTO Applications VALUES (18, 'Pending', '2021-4-17', 18, 'S528544', 'neloe', 'Jarren Jackson', '2021-4-17', '');
INSERT INTO Applications VALUES (19, 'Pending', '2021-4-18', 19, 'S528544', 'afellah', 'Jarren Jackson', '2021-4-18', '');
INSERT INTO Applications VALUES (20, 'Pending', '2021-4-18', 20, 'S528544', 'neloe', 'Jarren Jackson', '2021-4-18', '');
INSERT INTO Applications VALUES (21, 'Pending', '2021-4-19', 21, 'S528544', 'neloe', 'Jarren Jackson', '2021-4-19', 'OK!');
-- Default Data For Applications Table --