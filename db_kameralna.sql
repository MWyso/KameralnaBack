-- --------------------------------------------------------
-- Host:                         localhost
-- Wersja serwera:               10.4.24-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Zrzut struktury tabela restaurant_kameralna.info
CREATE TABLE IF NOT EXISTS `info` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `street` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipCode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `monday` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tuesday` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wednesday` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thursday` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `friday` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `saturday` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sunday` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderNumber` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli restaurant_kameralna.info: ~1 rows (około)
INSERT INTO `info` (`id`, `street`, `number`, `zipCode`, `city`, `phone`, `email`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`, `orderNumber`) VALUES
	('4b11d1c5-9bbf-11ed-be00-646e69d81ef8', 'Witczaka', '5', '44-335', 'Jastrzębie-Zdrój', '+48512658133', 'biuro@kameralnajastrzebie.pl', 'Zamknięte', '12:00-22:00', '12:00-22:00', '12:00-22:00', '12:00-24:00', '12:00-24:00', '12:00-22:00', 0);

-- Zrzut struktury tabela restaurant_kameralna.map
CREATE TABLE IF NOT EXISTS `map` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `monday` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tuesThurs` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `friSat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sun` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lat` decimal(10,7) NOT NULL,
  `lon` decimal(10,7) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli restaurant_kameralna.map: ~0 rows (około)
INSERT INTO `map` (`id`, `name`, `address`, `city`, `phone`, `monday`, `tuesThurs`, `friSat`, `sun`, `lat`, `lon`) VALUES
	('51eb0b14-bb4d-11ed-b5a3-646e69d81ef8', 'Restauracja Kameralna', 'ul. Witczaka 5', '44-335 Jastrzębie-Zdrój', '+48 512 658 133', 'Zamknięte', '12:00 - 22:00', '12:00 - 00:00', '12:00 - 22:00', 49.9512067, 18.5723876);

-- Zrzut struktury tabela restaurant_kameralna.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(6,2) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli restaurant_kameralna.menu: ~4 rows (około)
INSERT INTO `menu` (`id`, `name`, `description`, `price`) VALUES
	('d321619d-d7e3-4563-93a4-13fe0066e58d', 'MARYNOWANE BURAKI', 'Marynowane buraki podawane z musem z sera długodojrzewającego z orzeszkami pini i oliwą pietruszkową', 28.00),
	('7e37ff9b-ec4f-410a-96a3-0d4fcf5e4e25', 'TATAR', 'Tatar wołowy wg własnego przepisu z opiekanym chlebem na zakwasie lub chipsem z papieru ryżowego. Nie zjecie drugiego takiego w okolicy. Sprawdziliśmy.', 47.00),
	('ee97ebc0-8fd1-4af3-b5ac-43148bba6b05', 'TATAR WYKWINTNY', 'Tatar z mięsa wołowego z parmezanem, anchois, kaparami i oliwą truflową podawany z tostami.', 47.00),
	('52d8c3fb-a8e1-4fa8-a6ff-0258e3adf134', 'AKWARIUM', 'Intensywny wywar z drobiu, kaczki, wołowiny podawany z warzywami korzeniowymi i krokietem mięsnym w panierce.', 14.00),
	('bc3802f9-ab4c-4b1f-bb9c-96fdde85bcab', 'xxxx', 'xxx', 1212.00);

-- Zrzut struktury tabela restaurant_kameralna.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli restaurant_kameralna.users: ~2 rows (około)
INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
	('2ed273d7-55ba-44eb-8ae0-a11a441fc1de', 'Administrator', 'test@test.com', 'Test123');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
