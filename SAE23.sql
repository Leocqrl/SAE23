-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 20, 2025 at 03:47 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SAE23`
--

-- --------------------------------------------------------

--
-- Table structure for table `Absences`
--

CREATE TABLE `Absences` (
  `idAbsences` int NOT NULL,
  `idEnseignant` int DEFAULT NULL,
  `Module` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_Cours` date DEFAULT NULL,
  `horaire` time DEFAULT NULL,
  `idEtudiant` int DEFAULT NULL,
  `Absence` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Enseignant`
--

CREATE TABLE `Enseignant` (
  `idEnseignant` int NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mot_de_passe` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Modules` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Etudiant`
--

CREATE TABLE `Etudiant` (
  `idEtudiant` int NOT NULL,
  `nom` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prenom` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Absences`
--
ALTER TABLE `Absences`
  ADD PRIMARY KEY (`idAbsences`);

--
-- Indexes for table `Enseignant`
--
ALTER TABLE `Enseignant`
  ADD PRIMARY KEY (`idEnseignant`);

--
-- Indexes for table `Etudiant`
--
ALTER TABLE `Etudiant`
  ADD PRIMARY KEY (`idEtudiant`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Absences`
--
ALTER TABLE `Absences`
  MODIFY `idAbsences` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Enseignant`
--
ALTER TABLE `Enseignant`
  MODIFY `idEnseignant` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Etudiant`
--
ALTER TABLE `Etudiant`
  MODIFY `idEtudiant` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
