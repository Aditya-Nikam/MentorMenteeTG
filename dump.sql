CREATE DATABASE  IF NOT EXISTS `mentor` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mentor`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: mentor
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `uid` varchar(16) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'student1@gmail.com','$2b$10$mwlSOKMs8orNgRLdYnDSheilnItvUaa5RTKBpn9KlQ7oULwncVB/m','1','1'),(2,'student2@gmail.com','$2b$10$yEyaN6aQ9B.ZbpEV9HKhSuJmUlOuq.IZheI5aMa/62UCNZjgqLm.C','1','1'),(3,'student3@gmail.com','$2b$10$WbREIgGp0DMhFXp08p4vCuevgThrbdbQrFEfV6Zweh3NHKDDg1iJe','1','1'),(4,'student4@gmail.com','$2b$10$3mClf00k8/KSSmq/vX3ciuSiULqCXdCS7BbKlDNiC7qhyWLh/Iz6u','1','1'),(5,'student7@gmail.com','$2b$10$PoO84KNKSlAHK2b0CbbJLO542cRxVhZpsVpkwNf9nIxTW2ykrWZ.S','1','1'),(6,'student5@gmail.com','$2b$10$Bt09yU4NVWDDJiGa32/aFO5IB69Eps/RSjrnGXUkiTU76bi/za8u2','1','1'),(7,'student6@gmail.com','$2b$10$JgHd/.NnMmoVajEDpD4UHeGm/19NTmPTXH2W3ffJ4P8EcWmAGdwJ2','1','1');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_details`
--

DROP TABLE IF EXISTS `parent_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_details` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int DEFAULT NULL,
  `father_name` varchar(45) DEFAULT NULL,
  `father_contact` varchar(45) DEFAULT NULL,
  `father_email` varchar(45) DEFAULT NULL,
  `mother_name` varchar(45) DEFAULT NULL,
  `mother_contact` varchar(45) DEFAULT NULL,
  `mother_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`p_id`),
  KEY `s_id_idx` (`s_id`),
  CONSTRAINT `fk_parent_details_s_id` FOREIGN KEY (`s_id`) REFERENCES `login` (`s_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_details`
--

LOCK TABLES `parent_details` WRITE;
/*!40000 ALTER TABLE `parent_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `parent_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_carrier_option`
--

DROP TABLE IF EXISTS `student_carrier_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_carrier_option` (
  `carr_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int DEFAULT NULL,
  `careerOption` varchar(45) DEFAULT NULL,
  `university_name` varchar(45) DEFAULT NULL,
  `course` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `admission_status` varchar(45) DEFAULT NULL,
  `exam` varchar(45) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `job_profile` varchar(45) DEFAULT NULL,
  `offer_letter_status` varchar(45) DEFAULT NULL,
  `package` varchar(45) DEFAULT NULL,
  `isEntrepreneur` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `registratio_status` varchar(45) DEFAULT NULL,
  `sector` varchar(45) DEFAULT NULL,
  `certificationStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`carr_id`),
  KEY `s_id_idx` (`s_id`),
  CONSTRAINT `fk_student_carrier_option_s_id` FOREIGN KEY (`s_id`) REFERENCES `login` (`s_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_carrier_option`
--

LOCK TABLES `student_carrier_option` WRITE;
/*!40000 ALTER TABLE `student_carrier_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_carrier_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_cocurricula_activity`
--

DROP TABLE IF EXISTS `student_cocurricula_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_cocurricula_activity` (
  `co_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `semester` varchar(45) DEFAULT NULL,
  `activity` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `activity_certificate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`co_id`),
  KEY `s_id_idx` (`s_id`),
  CONSTRAINT `fk_student_cocurricula_activity_s_id` FOREIGN KEY (`s_id`) REFERENCES `login` (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_cocurricula_activity`
--

LOCK TABLES `student_cocurricula_activity` WRITE;
/*!40000 ALTER TABLE `student_cocurricula_activity` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_cocurricula_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_currentdetails`
--

DROP TABLE IF EXISTS `student_currentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_currentdetails` (
  `c_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int DEFAULT NULL,
  `subject` varchar(45) DEFAULT NULL,
  `oral_marks` int DEFAULT NULL,
  `ia_1marks` int DEFAULT NULL,
  `ia_2_marks` int DEFAULT NULL,
  `university_marks` int DEFAULT NULL,
  `term_work_marks` int DEFAULT NULL,
  `pass_fail` varchar(45) DEFAULT NULL,
  `marksheet` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  KEY `s_id_idx` (`s_id`),
  CONSTRAINT `fk_student_currentdetails_s_id` FOREIGN KEY (`s_id`) REFERENCES `login` (`s_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_currentdetails`
--

LOCK TABLES `student_currentdetails` WRITE;
/*!40000 ALTER TABLE `student_currentdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_currentdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_details`
--

DROP TABLE IF EXISTS `student_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_details` (
  `st_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `admission_year` date DEFAULT NULL,
  `program` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mentor` varchar(45) DEFAULT NULL,
  `current_address` varchar(255) DEFAULT NULL,
  `permanent_address` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`st_id`),
  KEY `s_id_idx` (`s_id`),
  CONSTRAINT `fk_student_details_s_id` FOREIGN KEY (`s_id`) REFERENCES `login` (`s_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_details`
--

LOCK TABLES `student_details` WRITE;
/*!40000 ALTER TABLE `student_details` DISABLE KEYS */;
INSERT INTO `student_details` VALUES (1,1,'Aditya','2024-09-05','2024-09-21','TE','Artificial Intelligence & Data Science','student1@gmail.com','Prof. Anagha','bhandup','bhandup','9833674725','Male');
/*!40000 ALTER TABLE `student_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_etc_activity`
--

DROP TABLE IF EXISTS `student_etc_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_etc_activity` (
  `etc_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `semester` varchar(45) DEFAULT NULL,
  `activity` varchar(45) DEFAULT NULL,
  `event_name` varchar(45) DEFAULT NULL,
  `event_certificate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`etc_id`),
  KEY `s_id_idx` (`s_id`),
  CONSTRAINT `fk_student_etc_activity_s_id` FOREIGN KEY (`s_id`) REFERENCES `login` (`s_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_etc_activity`
--

LOCK TABLES `student_etc_activity` WRITE;
/*!40000 ALTER TABLE `student_etc_activity` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_etc_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_pydetails`
--

DROP TABLE IF EXISTS `student_pydetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_pydetails` (
  `prev_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int DEFAULT NULL,
  `tenth_marks` int DEFAULT NULL,
  `tenth_percent` int DEFAULT NULL,
  `tenth_passing_year` int DEFAULT NULL,
  `tenth_marksheet` varchar(255) DEFAULT NULL,
  `twelth_marks` int DEFAULT NULL,
  `twelth_percent` int DEFAULT NULL,
  `twelth_passing_year` int DEFAULT NULL,
  `twelth_marksheet` varchar(255) DEFAULT NULL,
  `diploma_marks` int DEFAULT NULL,
  `diploma_percent` int DEFAULT NULL,
  `diploma_passing_year` int DEFAULT NULL,
  `diploma_marksheet` varchar(255) DEFAULT NULL,
  `has_gap` tinyint DEFAULT NULL,
  `gap_certificate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`prev_id`),
  KEY `s_id_idx` (`s_id`),
  CONSTRAINT `fk_student_pydetails_s_id` FOREIGN KEY (`s_id`) REFERENCES `login` (`s_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_pydetails`
--

LOCK TABLES `student_pydetails` WRITE;
/*!40000 ALTER TABLE `student_pydetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_pydetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_internships`
--

DROP TABLE IF EXISTS `students_internships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_internships` (
  `int_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `job_profile` varchar(45) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `stipent_status` varchar(45) DEFAULT NULL,
  `stipent` int DEFAULT NULL,
  `internship_cerificate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`int_id`),
  KEY `s_id_idx` (`s_id`),
  CONSTRAINT `fk_students_internships_s_id` FOREIGN KEY (`s_id`) REFERENCES `login` (`s_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_internships`
--

LOCK TABLES `students_internships` WRITE;
/*!40000 ALTER TABLE `students_internships` DISABLE KEYS */;
/*!40000 ALTER TABLE `students_internships` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-29  1:36:57
