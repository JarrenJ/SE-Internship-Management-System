CREATE DATABASE IF NOT EXISTS ims;
USE ims;

CREATE TABLE IF NOT EXISTS `accounts` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `role` varchar(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `accounts` (`id`, `username`, `password`, `role`) VALUES (1, 'admin', 'admin', 'Admin');
INSERT INTO `accounts` (`id`, `username`, `password`, `role`) VALUES (2, 'faculty', 'faculty', 'Faculty');
INSERT INTO `accounts` (`id`, `username`, `password`, `role`) VALUES (3, 'student', 'student', 'Student');

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
    Comments VARCHAR(20),
    PRIMARY KEY (ApplicationID),
    CONSTRAINT intern_fk FOREIGN KEY (InternID) REFERENCES Internship(InternshipID),
    CONSTRAINT student_fk FOREIGN KEY (StuID) REFERENCES Users(UserID),
    CONSTRAINT faculty_fk FOREIGN KEY (FacID) REFERENCES Users(UserID)
)ENGINE = InnoDB;

