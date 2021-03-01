CREATE DATABASE IF NOT EXISTS ims DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE ims;

CREATE TABLE IF NOT EXISTS Student (
    StudentID VARCHAR(25) NOT NULL,
    LastName varchar(25) NOT NULL,
    FirstName VARCHAR(25),
    StudentEmail VARCHAR(25),
    StudentAddress VARCHAR(25),
    Phone VARCHAR(25),
    PRIMARY KEY (StudentID)
);


CREATE TABLE IF NOT EXISTS Faculty (
    FacultyID VARCHAR(25) NOT NULL,
    LastName VARCHAR(25),
    FirstName VARCHAR(25),
    PRIMARY KEY (FacultyID)
);


CREATE TABLE IF NOT EXISTS Administrator (
    AdminID VARCHAR(25) NOT NULL,
    LastName VARCHAR(25) NOT NULL,
    FirstName VARCHAR(25),
    PRIMARY KEY (AdminID)
);

CREATE TABLE IF NOT EXISTS Internship (
    InternshipID int NOT NULL AUTO_INCREMENT,
    EmployerName VARCHAR(25),
    PointOfContact VARCHAR(25),
    EmployerEmail VARCHAR(25),
    EmployerPhone VARCHAR(25),
    EmployerAddress VARCHAR(25),
    StartDate DATETIME,
    EndDate DATETIME,
    PRIMARY KEY (InternshipID)
);

CREATE TABLE IF NOT EXISTS Applications (
    ApplicationID int NOT NULL AUTO_INCREMENT, 
    ApplicationStatus VARCHAR(25),
    ApplicationDate VARCHAR(25),
    InternshipID int,
    StudentID VARCHAR(20),
    FacultyID VARCHAR(20),
    PRIMARY KEY (ApplicationID),
    FOREIGN KEY (InternshipID) REFERENCES Internship(InternshipID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (FacultyID) REFERENCES Faculty(FacultyID)
);  

