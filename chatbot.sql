-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2025 at 11:15 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sandip_chatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `chatbot`
--

CREATE TABLE `chatbot` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chatbot`
--

INSERT INTO `chatbot` (`id`, `question`, `answer`) VALUES
(1, 'hello', 'Hi! Welcome to Sandip Foundation. How can I help you?'),
(3, 'courses', 'Sandip Foundation offers Engineering, MBA, Pharmacy, Law, and more courses.'),
(4, 'contact', 'You can reach us at +91-88888 99999 or email info@sandipfoundation.org'),
(5, 'Fees', '45000'),
(6, 'How to reach Sandip Foundation?', 'You can take a bus from Takkers Bazar (New CBS) for Trimbakeshwar. There are many buses from the Takkar Bazar for Sandip Foundation which will take you directly to our college which is about 15 kms from the city of Nashik'),
(7, 'How to apply?', 'You have to pass the CET as per Pune University’s rules. Written tests and GDPI will be conducted by the university. You have to fill the online form & have to give your choices of college. After that the college will be allotted.'),
(8, 'How is the College Campus?', 'The campus provides an ambiance that stimulates intellectual thinking and academic interaction. The facilities on the campus include classrooms with multimedia equipment/overhead projectors, faculty and administrative blocks, a state-of-the-art library, modern computer labs, and an upcoming ultra-modern hostel facility on campus.'),
(9, 'What about Transportation facility?', 'The institute has a fleet of buses which travels across the city to provide transportation to students & staff from locations in Nashik and nearby areas every day. Also the institute has tied up with the Maharashtra State Transport to enhance the bus facility. The State transport buses travel across the city to provide transportation.'),
(10, 'What are the eligibility criteria?', 'The candidate must process a Bachelor’s Degree in any discipline from a recognised university or equivalent there to. He/ She must secure a minimum of 50% marks for open and 45% for other categories in the graduation. The students who have appeared for their final examination of degree and awaiting results are also eligible to apply. However, their admission will be subject to their passing the qualification examination on the date of commencement of the curricular programme.'),
(11, 'How is the infrastructure?', 'The institute provides excellent infrastructural facilities with well-equipped laboratories, computer centre, furnished classrooms, seminar halls, workshops, library & hostels. T.E.C. With an intention to provide quality technical education with global standards, in a span of 6 years TEC has created excellent infrastructure & attracted talented professionals to achieve objectives to improve the communication skills of the students, and an English language lab is also established.'),
(12, 'What are the placement activities?', 'There is a separate department with all desired resources. Almost 30 companies have carried out the recruitment process & around 15 companies are about to visit. Similarly our Training & Placement team has various meansand has approached almost 250 companies.'),
(13, 'What is the ranking of the Institute?', 'As per The Week Survey our college stands at 92 ranks. Within three years span we have reached that level with our excellent and world class faculty and world class facility. Our institute is ISO 9001: 2008 certified college.'),
(14, 'Is attendance necessary?', 'Attendance for all lectures, group activities, case studies, seminars held in each semester is compulsory. Non-attendance except in exceptional cases (to be determined by the Institute) will result in the student being detained in the semester. If the candidate secures less than 80% attendance he/she will not be allowed to proceed to next semester.'),
(15, 'What about Student cell? Which activities are conducted?', 'We have Entrepreneurship Development Cell, Training & Placement Cell, Industry Institute Cell, Sports activities. CSR activities are running, alumina forum.'),
(16, 'Can I take my decision over the web, email, telephone, or fax?', 'You can see our information on our website but for admission you have come personally.'),
(17, 'Do you have hostel facility for girls and boys?', 'Yes we do have hostel facilities for boys and girls. On our web site you can search for photographs of the same.'),
(18, 'Is it a Pune University affiliated college?', 'Yes it is Pune University Affiliated College. Recognized by DTE and and AICTE.'),
(19, 'Is it a Wi-Fi enabled campus?', 'Yes the campus supports Wi-Fi.'),
(20, 'Does Institute have seats for Foreign Nationals/persons from Indian origin?', 'We don’t have that provision as such.');

-- --------------------------------------------------------

--
-- Table structure for table `chat_history`
--

CREATE TABLE `chat_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `response` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `username`, `email`, `password`) VALUES
(1, 'aaa', 'aaa@gmail.com', '$2y$10$McqLN5PsyVSrfodwXgDroueJUlVRGwIWXhJCmP8Gw88u.d207M1.K'),
(2, 'mmm', 'mm@gmail.com', '$2y$10$QRfEX2YpmEYXvg.T02KAqOJWk.qqQyIq1YBvT7qEo2OmvfvSLJoTa'),
(3, 'test', 'test@gmail.com', '$2y$10$EL61PzAtuCrK4Jp6IvhW/OJsSbErV9uzTxxl0dc2aNbsTf772yVXG'),
(4, 'll', 'll@gmail.com', '$2y$10$0nKJyGW9mu4fcNwlSOxmA.5nDW/biqHHXNMoAHl6NyNU6/JdfDH82'),
(5, 'swati', 'swatikhilari1985@gmail.com', '$2y$10$7AZeQ/pkQLd8GymQeGlt2.QhtluOQ32jnLbX8vQWTvEnapNEVeZ8y'),
(6, 'nitin', 'nitin@gmail.com', '$2y$10$yLYPCplVemmay/57Q8/L0exaLEvGrPwF3.P39p/SZ.qFgYBjUjLXm'),
(7, 'ajit', 'ajit@gmail.com', '$2y$10$DyTuNZl59BC4ZUgKd7GJqOgY/XqCfPgbgcueWIeFMSl0scZyIgWxK');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `message`, `created_at`) VALUES
(1, 6, 'dfg', '2025-09-08 06:20:07'),
(2, 6, 'dfgdf', '2025-09-08 06:20:11'),
(3, 6, 'dfgfd', '2025-09-08 06:20:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chatbot`
--
ALTER TABLE `chatbot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_history`
--
ALTER TABLE `chat_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chatbot`
--
ALTER TABLE `chatbot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `chat_history`
--
ALTER TABLE `chat_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
