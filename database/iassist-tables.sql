DROP DATABASE IF EXISTS `iassist`;
CREATE DATABASE `iassist`;
USE `iassist`;

SET NAMES UTF8MB4;

/* Users Table */
CREATE TABLE `users` (
	`sfsu_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` CHAR(25) NOT NULL,
    `last_name` CHAR(25),
     `email` CHAR(40) NOT NULL,
    `password` CHAR(20) NOT NULL,
    `zoom` CHAR(25),	      /* Student = null */
    `type` CHAR(20) NOT NULL, /*  F = Faculty; S = Student*/
    PRIMARY KEY (`sfsu_id`)
);

/* Appointments Table */
CREATE TABLE `appointments` (
  `appointment_id` INT NOT NULL AUTO_INCREMENT,
  `type` CHAR(4) NOT NULL,
  `start` CHAR(15) NOT NULL,
  `end` CHAR(15) NOT NULL,
  `student_id` INT NOT NULL,
  `faculty_id` INT NOT NULL,
  `student_notes` CHAR(80),
  `faculty_notes` CHAR(80),
  `absent` BOOL NOT NULL DEFAULT 0,
  `late` BOOL NOT NULL DEFAULT 0,
  `completed` BOOL NOT NULL DEFAULT 0,
  PRIMARY KEY (`appointment_id`)
);

/* Schedules Table */
CREATE TABLE `schedules` (
  `schedule_id` INT NOT NULL AUTO_INCREMENT,
  `sfsu_id` INT NOT NULL, /* Always a faculty */
  `type` CHAR(4) NOT NULL,
  `day` INT NOT NULL,     /* Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5 */
  `start` CHAR(4) NOT NULL,
  `end` CHAR(4) NOT NULL,
  PRIMARY KEY (`schedule_id`),
  FOREIGN KEY (`sfsu_id`) REFERENCES `users` (`sfsu_id`)
);

CREATE TABLE `sessions` (
	`sess_key` INT NOT NULL AUTO_INCREMENT,
    `sfsu_id` CHAR(20) NOT NULL,
    PRIMARY KEY (`sess_key`)
);

/* Optional, probably not needed */
CREATE VIEW logins AS
SELECT first_name, last_name, email, password, type
FROM iassist.users;
