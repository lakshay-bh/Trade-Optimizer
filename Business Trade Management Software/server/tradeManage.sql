-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 14, 2022 at 10:01 PM
-- Server version: 8.0.29-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tradeManage`
--

-- --------------------------------------------------------

--
-- Table structure for table `companyEmail`
--

CREATE TABLE `companyEmail` (
  `id` int NOT NULL,
  `companyGST` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) NOT NULL
) ;

--
-- Dumping data for table `companyEmail`
--

INSERT INTO `companyEmail` (`id`, `companyGST`, `email`) VALUES
(4, 'sam', 'sam1@sam.com'),
(5, 'sam', 'sam2@sam.com');

-- --------------------------------------------------------

--
-- Table structure for table `companyPhone`
--

CREATE TABLE `companyPhone` (
  `id` int NOT NULL,
  `companyGST` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phoneNo` varchar(15) NOT NULL
) ;

--
-- Dumping data for table `companyPhone`
--

INSERT INTO `companyPhone` (`id`, `companyGST`, `phoneNo`) VALUES
(2, 'sam', '999999999'),
(4, 'sam', '9592812463');

-- --------------------------------------------------------

--
-- Table structure for table `companyUser`
--

CREATE TABLE `companyUser` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `gstNo` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companyUser`
--

INSERT INTO `companyUser` (`id`, `name`, `gstNo`, `password`) VALUES
(1, 'Sam Corp', 'sam', '$2b$10$kntfPO7tZpQA3kr8KAvtje50obZb1DJeDuECf/zqamOR55ExLaagS'),
(2, 'user', 'user', '$2b$10$omqvtUHQOCjpKvasZC9YAObX5PpfHGp4KkY38ZuAyhN6QijmLshh6'),
(4, 'admin', 'admin', '$2b$10$Qq7OfQyONtYc4vESthfvJOQZYOYOpGZJusI8.OrKONX9UsFucG6IW'),
(5, 'admin2', 'admin2', '$2b$10$mM1vfR24vBz6xi.oNv.H8uyuMsshMRx.jsDkYTFBbyl0tU8.c5vAK'),
(6, 'geshna', 'geshna', '$2b$10$W2dJIemwus/d3IVtWoQMOeT9F/.5vhaa.ScL72vHu5P8Yaa2g/XDG'),
(7, 'samarth', 'samarth', '$2b$10$HZUVFX.g6hmeWcR.2/PgjOh/RNrfERNVK9bqLYi83z2k5TYiS0y2G');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int NOT NULL,
  `companyGST` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `itemName` varchar(255) NOT NULL,
  `itemQty` int NOT NULL DEFAULT '0',
  `pricePerQty` float NOT NULL,
  `description` text NOT NULL,
  `enabled` int NOT NULL DEFAULT '1'
) ;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `companyGST`, `itemName`, `itemQty`, `pricePerQty`, `description`, `enabled`) VALUES
(1, 'sam', 'item1', 0, 39.99, 'item 1 red colour', 1),
(3, 'sam', 'item3', 420, 37.99, 'item 2 red colour', 1),
(4, 'sam', 'shirt', 0, 500, 'red shirt', 1),
(5, 'sam', 'shirt', 10, 500, 'red shirt', 1),
(6, 'sam', 'jeans', 0, 900, 'blue jeans', 1),
(7, 'sam', 'coat', 0, 1500, 'winter coat', 1),
(8, 'sam', 'BLAZER', 75, 1500, 'WINTER BLAZER', 1),
(9, 'sam', 'ITEM 6', 100, 1000, 'ITEM DESCRIPTION', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orderItems`
--

CREATE TABLE `orderItems` (
  `id` int NOT NULL,
  `orderID` int DEFAULT NULL,
  `itemID` int DEFAULT NULL,
  `itemQty` int NOT NULL,
  `costPricePerQty` float NOT NULL,
  `sellPricePerQty` float NOT NULL
) ;

--
-- Dumping data for table `orderItems`
--

INSERT INTO `orderItems` (`id`, `orderID`, `itemID`, `itemQty`, `costPricePerQty`, `sellPricePerQty`) VALUES
(14, 6, 6, 20, 900, 1000),
(15, 5, 6, 30, 900, 0),
(16, 6, 7, 50, 1500, 2500),
(17, 5, 1, 15, 39.99, 0),
(18, 7, 1, 515, 39.99, 45),
(19, 8, 4, 10, 500, 600),
(20, 8, 6, 30, 900, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `companyGST` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `traderID` int DEFAULT NULL,
  `buy_sell` int NOT NULL DEFAULT '2',
  `totalSellingPrice` float NOT NULL,
  `totalCostPrice` float NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `companyGST`, `traderID`, `buy_sell`, `totalSellingPrice`, `totalCostPrice`, `status`, `date`) VALUES
(5, 'sam', 2, 1, 0, 27599.8, 3, '2022-05-14 18:32:48'),
(6, 'sam', 2, 2, 145000, 93000, 3, '2022-05-14 18:33:07'),
(7, 'sam', 12, 2, 23175, 20594.8, 3, '2022-05-14 19:18:36'),
(8, 'sam', 2, 2, 36000, 32000, 3, '2022-05-14 19:47:26');

-- --------------------------------------------------------

--
-- Table structure for table `traderItems`
--

CREATE TABLE `traderItems` (
  `id` int NOT NULL,
  `traderID` int DEFAULT NULL,
  `itemID` int DEFAULT NULL
) ;

--
-- Dumping data for table `traderItems`
--

INSERT INTO `traderItems` (`id`, `traderID`, `itemID`) VALUES
(16, 2, 6),
(18, 2, 8),
(19, 2, 7),
(20, 9, 4),
(22, 9, 7),
(23, 9, 1),
(24, 2, 1),
(25, 12, 7),
(26, 12, 1),
(27, 12, 6),
(28, 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `traders`
--

CREATE TABLE `traders` (
  `id` int NOT NULL,
  `companyGST` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `gstNo` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNo` varchar(15) NOT NULL,
  `addressStreet` varchar(255) NOT NULL,
  `addressCity` varchar(255) NOT NULL,
  `addressState` varchar(255) NOT NULL,
  `pinCode` varchar(10) NOT NULL,
  `relationScore` int NOT NULL DEFAULT '0',
  `enabled` int NOT NULL DEFAULT '1'
) ;

--
-- Dumping data for table `traders`
--

INSERT INTO `traders` (`id`, `companyGST`, `name`, `gstNo`, `email`, `phoneNo`, `addressStreet`, `addressCity`, `addressState`, `pinCode`, `relationScore`, `enabled`) VALUES
(2, 'sam', 'Trader1', 'gst1', 'trader1@sam.com', '88888888', 'street 1', 'ludhiana', 'punjab', '141111', 38, 1),
(9, 'sam', 'Trader2', 'gst2', 'trader2@sam.com', '885558888', 'street 2', 'ludhiana', 'punjab', '141111', 0, 1),
(12, 'sam', 'Trader3', 'trader3', 'TRADER3@sam.com', '99895445', 'address3', 'ludhiana', 'punjab', '141002', 21, 1),
(13, 'sam', 'Trader4', 'trader4', 'TRADER4@sam.com', '99895445', 'address4', 'ludhiana', 'punjab', '141002', 0, 1),
(14, 'admin', 'trader', '', 'trader@admin.com', '', '', '', '', '', 0, 1),
(15, 'samarth', 'trader1', 'tra1', 'trader1@gmail.com', '9595959595', 'add1', 'Ludhiana', 'punjab', '141002', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companyEmail`
--
ALTER TABLE `companyEmail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyGST` (`companyGST`);

--
-- Indexes for table `companyPhone`
--
ALTER TABLE `companyPhone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyGST` (`companyGST`);

--
-- Indexes for table `companyUser`
--
ALTER TABLE `companyUser`
  ADD PRIMARY KEY (`id`,`gstNo`),
  ADD UNIQUE KEY `gstNo` (`gstNo`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyGST` (`companyGST`);

--
-- Indexes for table `orderItems`
--
ALTER TABLE `orderItems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderID` (`orderID`),
  ADD KEY `itemID` (`itemID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyGST` (`companyGST`),
  ADD KEY `traderID` (`traderID`);

--
-- Indexes for table `traderItems`
--
ALTER TABLE `traderItems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itemID` (`itemID`),
  ADD KEY `traderID` (`traderID`);

--
-- Indexes for table `traders`
--
ALTER TABLE `traders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyGST` (`companyGST`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companyEmail`
--
ALTER TABLE `companyEmail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companyPhone`
--
ALTER TABLE `companyPhone`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companyUser`
--
ALTER TABLE `companyUser`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderItems`
--
ALTER TABLE `orderItems`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `traderItems`
--
ALTER TABLE `traderItems`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `traders`
--
ALTER TABLE `traders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `companyEmail`
--
ALTER TABLE `companyEmail`
  ADD CONSTRAINT `companyEmail_ibfk_1` FOREIGN KEY (`companyGST`) REFERENCES `companyUser` (`gstNo`),
  ADD CONSTRAINT `companyEmail_ibfk_2` FOREIGN KEY (`companyGST`) REFERENCES `companyUser` (`gstNo`) ON DELETE SET;

--
-- Constraints for table `companyPhone`
--
ALTER TABLE `companyPhone`
  ADD CONSTRAINT `companyPhone_ibfk_1` FOREIGN KEY (`companyGST`) REFERENCES `companyUser` (`gstNo`),
  ADD CONSTRAINT `companyPhone_ibfk_2` FOREIGN KEY (`companyGST`) REFERENCES `companyUser` (`gstNo`) ON DELETE SET;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`companyGST`) REFERENCES `companyUser` (`gstNo`),
  ADD CONSTRAINT `items_ibfk_2` FOREIGN KEY (`companyGST`) REFERENCES `companyUser` (`gstNo`) ON DELETE SET;

--
-- Constraints for table `orderItems`
--
ALTER TABLE `orderItems`
  ADD CONSTRAINT `orderItems_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`id`) ON DELETE SET;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`companyGST`) REFERENCES `companyUser` (`gstNo`) ON DELETE SET;

--
-- Constraints for table `traderItems`
--
ALTER TABLE `traderItems`
  ADD CONSTRAINT `traderItems_ibfk_1` FOREIGN KEY (`traderID`) REFERENCES `traders` (`id`),
  ADD CONSTRAINT `traderItems_ibfk_2` FOREIGN KEY (`itemID`) REFERENCES `items` (`id`),
  ADD CONSTRAINT `traderItems_ibfk_3` FOREIGN KEY (`itemID`) REFERENCES `items` (`id`) ON DELETE SET;

--
-- Constraints for table `traders`
--
ALTER TABLE `traders`
  ADD CONSTRAINT `traders_ibfk_1` FOREIGN KEY (`companyGST`) REFERENCES `companyUser` (`gstNo`),
  ADD CONSTRAINT `traders_ibfk_2` FOREIGN KEY (`companyGST`) REFERENCES `companyUser` (`gstNo`) ON DELETE SET;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
