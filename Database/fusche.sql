-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2014 at 07:27 PM
-- Server version: 5.6.11
-- PHP Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `fusche`
--
CREATE DATABASE IF NOT EXISTS `fusche` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `fusche`;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `loginid` int(16) NOT NULL AUTO_INCREMENT,
  `googleid` varchar(100) DEFAULT NULL COMMENT 'can be null if other id is used',
  `fbid` varchar(100) DEFAULT NULL COMMENT 'can be null if other id is used',
  `appid1` varchar(100) DEFAULT NULL COMMENT 'can be null if other id is used',
  `appid2` varchar(100) DEFAULT NULL COMMENT 'can be null if other id is used',
  `appid3` varchar(100) DEFAULT NULL COMMENT 'can be null if other id is used',
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`loginid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE IF NOT EXISTS `signup` (
  `signid` int(16) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `pswd` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`signid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `synclogin`
--

CREATE TABLE IF NOT EXISTS `synclogin` (
  `syncid` int(16) NOT NULL,
  `signid` int(16) NOT NULL DEFAULT '0' COMMENT 'can be null if loginid is not null',
  `loginid` int(16) NOT NULL DEFAULT '0' COMMENT 'can be null if signid is not null',
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`syncid`,`signid`,`loginid`),
  KEY `fk_sync_signid` (`signid`),
  KEY `fk_sync_loginid` (`loginid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `synclogin`
--
ALTER TABLE `synclogin`
  ADD CONSTRAINT `fk_sync_loginid` FOREIGN KEY (`loginid`) REFERENCES `login` (`loginid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sync_signid` FOREIGN KEY (`signid`) REFERENCES `signup` (`signid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
