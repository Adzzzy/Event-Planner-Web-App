-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: EventManagement
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `EventManagement`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `EventManagement` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `EventManagement`;

--
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availability` (
  `userID` int NOT NULL,
  `eventID` int NOT NULL,
  `availabilityStart` time DEFAULT NULL,
  `availabilityEnd` time DEFAULT NULL,
  PRIMARY KEY (`eventID`,`userID`),
  UNIQUE KEY `userID` (`userID`),
  CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `availability_ibfk_2` FOREIGN KEY (`eventID`) REFERENCES `events` (`eventID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` VALUES (1,1,'19:55:13','20:55:15'),(2,1,'20:56:38','21:56:40');
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eventID` int NOT NULL AUTO_INCREMENT,
  `eventHost` int NOT NULL,
  `eventName` varchar(255) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `AddressStreetNo` int DEFAULT NULL,
  `AddressStreetName` varchar(255) DEFAULT NULL,
  `AddressSuburb` varchar(255) DEFAULT NULL,
  `AddressPostcode` varchar(4) DEFAULT NULL,
  `eventLink` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`eventID`),
  UNIQUE KEY `eventID` (`eventID`),
  KEY `eventHost` (`eventHost`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`eventHost`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,1,'My Birthday','2022-06-11',NULL,'2022-06-11',NULL,1,'Main St','Hindmarsh','5000',NULL),(2,1,'Birthday 1','2022-06-11',NULL,'2022-06-18',NULL,123,'asdfasdf','asdfasdf','1234',NULL);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `givenName` varchar(50) DEFAULT NULL,
  `familyName` varchar(50) DEFAULT NULL,
  `homeStreetNo` int DEFAULT NULL,
  `homeStreetName` varchar(100) DEFAULT NULL,
  `homeSuburb` varchar(100) DEFAULT NULL,
  `homePostcode` varchar(4) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID` (`userID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'arutos','at917021@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$8kfrkvH/zM9d6datVS8CUA$Itz5kMX7iRcPAHrrmUrvShJakFmZnzWjrg64v3dP3hA','Andrew','Thomas',NULL,NULL,NULL,NULL,NULL),(2,'andrew','andrew','$argon2i$v=19$m=4096,t=3,p=1$fgRYY9A+bIpyWbYN8cWg1g$y6jnkAQ4IFoRS67O+gwGQsqRIZCzNnyQ+DXcdLXqA0M','Andrew2','Thomas2',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-10 14:19:13
