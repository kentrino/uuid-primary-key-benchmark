CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `family_name` varchar(255) NOT NULL,
  `given_name` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `gender` int(11) NOT NULL,
  `birth_date` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `neo_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `family_name` varchar(255) NOT NULL,
  `given_name` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `gender` int(11) NOT NULL,
  `birth_date` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
