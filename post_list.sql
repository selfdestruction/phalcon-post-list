-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2016 at 11:13 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `post_list`
--

-- --------------------------------------------------------

--
-- Table structure for table `post_list`
--

CREATE TABLE IF NOT EXISTS `post_list` (
  `id` int(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_list`
--

INSERT INTO `post_list` (`id`, `name`, `phone`, `email`, `message`, `date`) VALUES
(2, 'Test 2', '+38(111)111-11-11', 'test1@test.com', 'Test 2 test 2 test 2 test 2 test 2 test 2.', '2016-08-02 09:39:58'),
(3, 'Test 3', '+38(222)222-22-22', 'test2@test.com', 'Test 3 test 3 test 3 test 3 test 3 test 3.', '2016-08-02 09:41:36'),
(4, 'Test 4', '+38(333)333-33-33', 'test3@test.com', 'Test 4 test 4 test 4 test 4 test 4 test 4.', '2016-08-02 09:43:27'),
(5, 'Test 5', '+38(444)444-44-44', 'test4@test.com', 'Test 5 test 5 test 5 test 5 test 51111.', '2016-08-02 09:45:12'),
(7, 'Test 6', '+38(555)555-55-55', 'test5@test.com', 'Test 6 test 6.', '2016-08-02 10:43:07'),
(8, 'Test 7', '+38(666)666-66-66', 'test6@test.com', 'Test 7', '2016-08-02 10:43:24'),
(9, 'Test 8', '+38(777)777-77-77', 'test7@test.com', 'Test 7.', '2016-08-02 10:43:38'),
(10, 'Test 9', '+38(888)888-88-88', 'test8@test.com', 'Test 9', '2016-08-02 10:43:56'),
(12, 'Test 1', '+38(121)212-12-12', 'test1@test.com', 'Test 1', '2016-08-02 10:45:07'),
(20, 'TEST 33', '+38(334)343-43-43', 'test@test.com', 'dwedwe', '2016-08-02 11:01:41'),
(21, 'test 22', '+38(222)222-22-22', 'test@test.com', '2e2 c2edq', '2016-08-02 11:01:57'),
(22, '200 symbols', '+38(333)333-33-33', 'test@test.com', 'qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer qwer', '2016-08-02 11:04:11'),
(23, 'eeee', '+38(233)333-33-33', 'test@test.com', '232', '2016-08-02 11:05:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post_list`
--
ALTER TABLE `post_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post_list`
--
ALTER TABLE `post_list`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
