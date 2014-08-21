-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jul 16, 2014 at 06:37 PM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `fusche`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
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

CREATE TABLE `signup` (
  `signid` int(16) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `pswd` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`signid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`signid`, `name`, `email`, `pswd`, `timestamp`) VALUES
(11, 'anoop', 'anoop', '$2y$10$MXDe2f64.lN8h7di7qwVXOAoATM0fAXIv3rQk40u6GpRXlDUErJx6\n', '2014-07-10 13:33:05'),
(12, 'anoop1', 'anoop1', '$2y$10$OWS3.Vz734uJNHvxt3sPw.dsTuCofAwrmhmRQtcS9LedHfqsm6X6u\n', '2014-07-10 13:36:12'),
(13, 'anoop3', 'anoop3', '$2y$10$uFi9qkqHMWiC90TRY7NvBOOYWV3cx9bcGhcYoCHApRv0g7yC719Ne\n', '2014-07-10 13:39:32'),
(14, 'anoop4', 'anoop4', '$2y$10$XluXPaQi59vq9BpE4xjXEeTdiTrin9b.hWR.Dop/OuCi1AhK/bxUa\n', '2014-07-10 13:49:03'),
(15, 'anoop5', 'anoop5', '$2y$10$N5QIwdYxpklMtVmVgUaj4eWqj8T8t/5PGJlF17t41GxmpCpmeyhlu\n', '2014-07-10 13:51:56'),
(16, 'anoop6', 'anoop6', '$2y$10$nILUBaFAFqv0KPpVFRzDXu1pyWywhyuJtE9eR63u0fXaLoN7WC7iy\n', '2014-07-10 17:47:00'),
(18, 'anoop7', 'anoop7', '$2y$10$flndxiZX6zGA2JS3mca70eJ2YQjD3.EI/4rs.80ixmwBI8HVK86am\n', '2014-07-10 18:10:40'),
(19, 'anoop8', 'anoop8', '$2y$10$tsAcUnYzawEUWWQ1vGGnq.cNwu4cIL7IXBnhcwvhAeQfQPoK40Kim\n', '2014-07-10 18:25:38'),
(20, 'anoop9', 'anoop9', '$2y$10$n6gpvc9QRjPbx9Mc9fPr6evrurFtWqdVswCe4YrwqGtwBViLwStVC\n', '2014-07-10 18:29:19'),
(21, 'anoop0', 'anoop0', '$2y$10$J7m53Pph./RnOpglw53ik.BVgkFhC9Igo/C.Nw9csCyLSPGo5e6Wy\n', '2014-07-10 18:33:22'),
(22, 'anoop2', 'anoop2', '$2y$10$BBfMUQvtR4g0/nlH1KH6Z.Lg/bnikMtdCBsCwFIW2BXf8cavyz4sO\n', '2014-07-10 18:51:48'),
(23, 'anoop10', 'anoop10', '$2y$10$zhOGvOHgzrz71RbT7lKNjOokREU79MTDW63QBe45sz7eek5DwxRf2\n', '2014-07-10 18:52:14'),
(24, 'anoop01', 'anoop01', '$2y$10$sBzhNFhwpxh6fqxSW5Cuq.BudjIQZmwO9WjmKgjaaUTdQTBRnrgt6\n', '2014-07-10 19:01:55'),
(25, '', '', '$2y$10$UHvwNFSYe874GcS5QrKqA.OPxfDW1TJBogwK.rn1k3cwrBcUltrHC\n', '2014-07-10 20:29:07'),
(26, 'anoop11', 'anoop11', '$2y$10$5YfXK3JTQbI2XHI/xNmnJOc5dm5vVXPThQUVt4ZJdQaDkF4quhkJe\n', '2014-07-10 20:42:16');

-- --------------------------------------------------------

--
-- Table structure for table `synclogin`
--

CREATE TABLE `synclogin` (
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
