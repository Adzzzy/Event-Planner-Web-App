CREATE DATABASE IF NOT EXISTS `EventManagement`;
USE `EventManagement`;

CREATE TABLE `users` (
  `userID` int NOT NULL UNIQUE AUTO_INCREMENT,
  `username` varchar(255) NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255),
  `givenName` varchar(50),
  `familyName` varchar(50),
  `homeStreetNo` int,
  `homeStreetName` varchar(100),
  `homeSuburb` varchar(100),
  `homePostcode` varchar(4),
  `isAdmin` boolean,
  PRIMARY KEY (userID)
);

CREATE TABLE `events` (
  `eventID` int NOT NULL UNIQUE AUTO_INCREMENT,
  `eventHost` int NOT NULL,
  `eventName` varchar(255),
  `startDate` date,
  `startTime` time,
  `endDate` date,
  `endTime` time,
  `AddressStreetNo` int,
  `AddressStreetName` varchar(255),
  `AddressSuburb` varchar(255),
  `AddressPostcode` varchar(4),
  `eventLink` varchar(8),
  PRIMARY KEY (eventID),
  FOREIGN KEY (`eventHost`) REFERENCES `users` (`userID`)
);

CREATE TABLE `availability` (
  `userID` int NOT NULL,
  `eventID` int NOT NULL,
  `availabilityStart` time,
  `availabilityEnd` time,
  PRIMARY KEY (`eventID`, `userID`),
  FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  FOREIGN KEY (`eventID`) REFERENCES `events` (`eventID`)
);

