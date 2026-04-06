-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2026 at 05:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spare_parts`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `pro_id` int(22) NOT NULL,
  `category` varchar(215) NOT NULL,
  `cost_price` decimal(65,0) NOT NULL,
  `salling_price` decimal(65,0) NOT NULL,
  `quantity` int(111) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `total_stock_in` int(11) DEFAULT 0,
  `avg_cost` decimal(10,2) DEFAULT 0.00,
  `last_stockin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`pro_id`, `category`, `cost_price`, `salling_price`, `quantity`, `created_at`, `total_stock_in`, `avg_cost`, `last_stockin`) VALUES
(1, 'brakes', 100000, 200000, 21, '2026-04-06 14:35:03.317618', 0, 0.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stock_in`
--

CREATE TABLE `stock_in` (
  `id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `batch_number` varchar(50) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `supplier` varchar(255) NOT NULL,
  `unit_cost` decimal(10,2) NOT NULL,
  `total_cost` decimal(12,2) NOT NULL,
  `received_date` date NOT NULL,
  `received_by` varchar(100) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `location` varchar(100) DEFAULT 'Main Warehouse',
  `status` enum('received','stored','used') DEFAULT 'received',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(222) NOT NULL,
  `name` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `role` varchar(222) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'nathan', 'nathankandwanaho3@gmail.com', 'nathan2007', 'admin', '2026-04-01 14:35:24.234847'),
(2, 'bayingana', 'geo@123gmail.com', '1234', 'customer', '2026-04-01 15:29:02.316991'),
(3, 'navi', 'navi@gmail.com', '123', 'customer', '2026-04-01 15:32:47.596699'),
(4, 'ganza', 'ganzashaloom@gmail.com', '123', 'customer', '2026-04-02 10:53:53.777667'),
(5, 'ganza', 'ganzashaloom@gmail.com', '123', 'customer', '2026-04-02 13:45:30.461061'),
(6, 'ganza', 'ganzashaloom@gmail.com', '123', 'customer', '2026-04-02 13:46:13.438233'),
(7, '', 'ganzashaloom@gmail.com', '123', 'customer', '2026-04-02 13:50:11.439207'),
(8, 'nathan ', 'nathan@13gmail.com', '1234', 'customer', '2026-04-02 13:50:53.140796'),
(9, '', 'ganzashaloom@gmail.com', '123', 'customer', '2026-04-02 13:55:52.435549'),
(10, '', 'ganzashaloom@gmail.com', '123', 'customer', '2026-04-02 14:01:40.028454'),
(11, 'faizo', 'ganzashaloom@gmail.com', '123', 'customer', '2026-04-02 14:04:32.776612'),
(12, 'hanah', 'hanah@2gmail.com', '1234', 'customer', '2026-04-03 10:21:47.219007'),
(13, 'putin', 'putin@gmail.com', '1234', 'customer', '2026-04-03 15:22:44.065272'),
(14, '', 'ganzashaloom@gmail.com', '123', 'customer', '2026-04-03 15:35:48.516627'),
(15, 'vegas', 'vegasshaloom@gmail.com', '123', 'customer', '2026-04-06 09:58:10.170389');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pro_id`);

--
-- Indexes for table `stock_in`
--
ALTER TABLE `stock_in`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `batch_number` (`batch_number`),
  ADD KEY `idx_pro_id` (`pro_id`),
  ADD KEY `idx_batch` (`batch_number`),
  ADD KEY `idx_date` (`received_date`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `pro_id` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stock_in`
--
ALTER TABLE `stock_in`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `stock_in`
--
ALTER TABLE `stock_in`
  ADD CONSTRAINT `stock_in_ibfk_1` FOREIGN KEY (`pro_id`) REFERENCES `products` (`pro_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
