-- phpMyAdmin SQL Dump
-- version 4.9.7deb1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 13 juin 2022 à 20:16
-- Version du serveur :  8.0.25-0ubuntu0.20.10.1
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `crm`
--

-- --------------------------------------------------------

--
-- Structure de la table `countdown`
--

CREATE TABLE `countdown` (
  `id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `credit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_credit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `countdown_row`
--

CREATE TABLE `countdown_row` (
  `id` int NOT NULL,
  `countdown_id` int NOT NULL,
  `date` datetime NOT NULL,
  `task` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `elapsed` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `customer`
--

CREATE TABLE `customer` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postcode` int DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `customer`
--

INSERT INTO `customer` (`id`, `user_id`, `first_name`, `last_name`, `email`, `company`, `address1`, `address2`, `postcode`, `city`, `country`) VALUES
(2103, 62, 'Thierry', 'Hackenschmidt', 't.hackenschmidt@ladoc-strasbourg.fr', 'Institution La Doctrine Chrétienne', '14 rue Brûlée', '', 67000, 'Strasbourg', 'France'),
(2104, 62, 'Olivier', 'Grossmann', 'olivier@lescreatonautes.fr', 'Les Créatonautes', '16 rue du travail', '', 67000, 'Strasbourg', 'France'),
(2105, 62, 'Aurélien', 'Kwiatkowski', 'a.kwiatkowski@infosolus.fr', 'Infosolus', '2 rue de la Durance', '', 67100, 'Strasbourg', 'France'),
(2106, 62, 'Philippe', 'RODE', 'info@littorladistribution.fr', 'Littoral Distribution SAS', '18 rue Pasteur', '', 68130, 'Zaessingue', 'France'),
(2107, 62, 'Nicolas', 'Lang', 'nicolas.lang@nlconception.fr', 'NL Conception', '4 rue de la Fontaine', '', 57565, 'Brouderdorff', 'France'),
(2108, 62, 'Julien', 'LIEBER', 'Julien.Lieber@meditorsa.com', 'Meditor SA', '7 rue Gutenberg', '', 67610, 'La Wantzenau', 'France'),
(2109, 62, 'Jean', 'Barizy', 'societe@barizyalupvc.com', 'Barizy ALU-PVC', '9 rue du Luxembourg', '', 57370, 'Phalsbourg', 'France'),
(2110, 62, 'mairie', 'Wingen', 'mairie@wingen.fr', 'Mairie de Wingen', '1 rue du Nord', '', 67510, 'Wingen', 'France'),
(2111, 62, 'Hervé', 'Tomaschewski', 'h.tomaschewski@lexhominisavocats.com', 'LEX HOMINIS AVOCATS', '1, rue de Sarre', '', 57070, 'METZ', 'France'),
(2112, 62, 'Caroline', 'Voga', 'caroline@gb-connection.fr', 'GB Connection', '16 rue de Buhl', '', 68700, 'Cernay', 'France'),
(2113, 62, 'Juliette', 'Bott', 'juliettebott@gmail.com', 'Ecolde de danse Amidanse', '6 rue des Bosquets', '', 54300, 'Lunéville', 'France'),
(2114, 62, 'Fabienne', 'Rovigo', 'f.rovigo@cep-cicat.com', 'CEP CICAT', '2 rue Evariste Galois', '', 67201, 'Eckbolsheim', 'France'),
(2115, 62, 'Anne', 'Thomahsowski', 'anne_thomah@yahoo.fr', 'Thomahsowski Anne', '53 rue du Pont Creon', '', 14000, 'Caen', 'France'),
(2116, 62, 'Olivier', 'Chambe', 'ochambe@landewyck.fr', 'Landewyck France', '6/8 rue du 4 septembre', '', 92130, 'Issy les Moulineaux', 'France');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20210921143310', '2021-10-15 08:32:16', 148),
('DoctrineMigrations\\Version20211015075156', '2021-10-15 09:52:11', 29),
('DoctrineMigrations\\Version20211015075634', '2021-10-15 09:56:39', 71),
('DoctrineMigrations\\Version20211019115513', '2021-10-19 13:55:32', 29),
('DoctrineMigrations\\Version20211026092814', '2021-10-26 11:34:10', 38),
('DoctrineMigrations\\Version20211026093346', '2021-10-26 11:36:10', 35),
('DoctrineMigrations\\Version20211026111640', '2021-10-26 13:16:58', 69),
('DoctrineMigrations\\Version20211026112003', '2021-10-26 13:20:07', 81),
('DoctrineMigrations\\Version20211027135728', '2021-10-27 15:57:43', 70),
('DoctrineMigrations\\Version20211027135958', '2021-10-27 16:00:02', 68),
('DoctrineMigrations\\Version20211029082212', '2021-10-29 10:24:43', 84),
('DoctrineMigrations\\Version20211029082344', '2021-10-29 10:25:43', 13),
('DoctrineMigrations\\Version20211029082440', '2021-10-29 10:26:38', 13),
('DoctrineMigrations\\Version20220613130154', '2022-06-13 15:02:05', 103),
('DoctrineMigrations\\Version20220613130525', '2022-06-13 15:05:38', 117),
('DoctrineMigrations\\Version20220613133358', '2022-06-13 15:34:05', 74),
('DoctrineMigrations\\Version20220613143238', '2022-06-13 16:32:45', 46),
('DoctrineMigrations\\Version20220613144252', '2022-06-13 16:42:57', 106);

-- --------------------------------------------------------

--
-- Structure de la table `invoice`
--

CREATE TABLE `invoice` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `amount` double NOT NULL,
  `sent_at` datetime NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chrono` int NOT NULL,
  `year` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `invoice`
--

INSERT INTO `invoice` (`id`, `customer_id`, `amount`, `sent_at`, `status`, `chrono`, `year`) VALUES
(10943, 2103, 1000, '2022-01-07 17:58:44', 'PAID', 1, '2022'),
(10944, 2104, 250, '2022-01-07 18:01:01', 'PAID', 2, '2022'),
(10945, 2105, 500, '2022-01-07 18:01:57', 'PAID', 3, '2022'),
(10946, 2104, 2400, '2022-01-07 18:03:19', 'PAID', 4, '2022'),
(10947, 2105, 550, '2022-01-11 18:04:22', 'PAID', 5, '2022'),
(10948, 2105, 500, '2022-01-31 18:05:51', 'PAID', 6, '2022'),
(10949, 2105, 500, '2022-01-31 18:07:00', 'PAID', 7, '2022'),
(10950, 2105, 500, '2022-01-31 18:07:33', 'PAID', 8, '2022'),
(10951, 2105, 550, '2022-01-31 18:08:49', 'PAID', 9, '2022'),
(10952, 2105, 550, '2022-01-31 18:10:06', 'PAID', 10, '2022'),
(10953, 2105, 500, '2022-02-28 18:11:20', 'PAID', 11, '2022'),
(10954, 2105, 550, '2022-02-28 18:12:09', 'PAID', 12, '2022'),
(10955, 2106, 960, '2022-02-28 18:13:33', 'PAID', 13, '2022'),
(10956, 2105, 550, '2022-03-04 18:14:25', 'SENT', 14, '2022'),
(10957, 2105, 500, '2022-03-04 18:15:32', 'SENT', 15, '2022'),
(10958, 2105, 500, '2022-03-29 18:16:10', 'SENT', 16, '2022'),
(10959, 2105, 550, '2022-03-29 18:16:54', 'SENT', 17, '2022'),
(10960, 2107, 555, '2022-04-29 18:18:28', 'PAID', 18, '2022'),
(10961, 2104, 250, '2022-05-04 18:19:27', 'SENT', 19, '2022'),
(10962, 2116, 100, '2022-05-05 18:21:51', 'PAID', 20, '2022'),
(10963, 2108, 100, '2022-05-05 18:22:49', 'PAID', 21, '2022'),
(10964, 2109, 80, '2022-05-05 18:23:33', 'SENT', 22, '2022'),
(10965, 2110, 130, '2022-05-05 18:24:24', 'SENT', 23, '2022'),
(10966, 2111, 80, '2022-05-05 18:25:18', 'PAID', 24, '2022'),
(10967, 2105, 550, '2022-05-11 18:26:55', 'SENT', 25, '2022'),
(10968, 2112, 50, '2022-05-16 18:28:31', 'PAID', 26, '2022'),
(10969, 2113, 200, '2022-06-01 18:31:35', 'PAID', 27, '2022'),
(10970, 2114, 500, '2022-06-02 18:32:13', 'SENT', 28, '2022'),
(10971, 2103, 1000, '2022-06-07 18:32:54', 'PAID', 29, '2022'),
(10972, 2115, 250, '2022-06-08 18:33:27', 'SENT', 30, '2022');

-- --------------------------------------------------------

--
-- Structure de la table `invoice_row`
--

CREATE TABLE `invoice_row` (
  `id` int NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `amount` double NOT NULL,
  `invoice_id` int NOT NULL,
  `unit_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `invoice_row`
--

INSERT INTO `invoice_row` (`id`, `description`, `quantity`, `amount`, `invoice_id`, `unit_price`) VALUES
(11833, 'Contrat de maintenance / assistance site Internet LA DOC - 20h', 20, 1000, 10943, 50),
(11834, 'Intégration de la newsletter de l\'EREGE \"Echos Ethiques\" n°2, janvier 2022', 5, 250, 10944, 50),
(11835, 'Site Internet www.strissel.fr', 1, 500, 10945, 500),
(11836, 'Acompte de 30% sur devis \"devis_20210728_cnerer\" du 28/07/2021', 1, 2400, 10946, 2400),
(11837, 'Développement du site www.restaurantlarotonde.fr/', 1, 500, 10947, 500),
(11838, 'Photo page d\'accueil \"AdobeStock_378342289.jpeg\"', 1, 50, 10947, 50),
(11839, 'Développement du site https://www.auwacken.fr/', 1, 500, 10948, 500),
(11840, 'Développement du site https://www.taverneduquai.com/', 1, 500, 10949, 500),
(11841, 'Développement du site https://www.lejardindupourtales.com/', 1, 500, 10950, 500),
(11842, 'Développement du site https://www.faubourgdepierre.com/', 1, 500, 10951, 500),
(11843, 'Photo AdobeStock_428164383.jpeg', 1, 50, 10951, 50),
(11844, 'Développement du site https://www.les2gourmandes.com/', 1, 500, 10952, 500),
(11845, 'Photo AdobeStock_21881886.jpeg', 1, 50, 10952, 50),
(11846, 'Développement du site https://www.lemonceau.fr/', 1, 500, 10953, 500),
(11847, 'Développement du site https://www.pizzeria-la-piazza.fr/', 1, 500, 10954, 500),
(11848, 'Photo AdobeStock_169756741.jpeg', 1, 50, 10954, 50),
(11849, 'Acompte de 30% sur devis \"devis_202206_woo_wickefischfrance\" du 07/02/2022', 1, 960, 10955, 960),
(11850, 'Développement du site https://www.restaurant-marcopolo.fr/', 1, 500, 10956, 500),
(11851, 'Photo AdobeStock_296416916.jpeg', 1, 50, 10956, 50),
(11852, 'Développement du site https://www.europcafe.fr/', 1, 500, 10957, 500),
(11853, 'Développement du site https://www.ami-schutz.com/', 1, 500, 10958, 500),
(11854, 'Développement du site https://www.tavernedesaintmalo.fr/', 1, 500, 10959, 500),
(11855, 'Photo : AdobeStock_85722993-scaled-e1647424835367.jpeg', 1, 50, 10959, 50),
(11856, 'Acompte de 30% sur devis \"2022_site_nlconception - Devis\" du 21/04/2022', 1, 555, 10960, 555),
(11857, 'Intégration de la newsletter de l\'EREGE \"Echos Ethiques\" n°3', 5, 250, 10961, 50),
(11858, 'Hébergement site Dean&Simmons Période du 24/02/2022 au 24/02/2023', 1, 100, 10962, 100),
(11859, 'Hébergement site www.meditorsa.com Période février 2022 à février 2023', 1, 100, 10963, 100),
(11860, 'Hébergement site www.barizyalupvc.com Période avril 2022 à avril 2023', 1, 80, 10964, 80),
(11861, 'Renouvellement nom de domaine et hébergement du site http://www. wingen.fr Période du 05/04/22 au 05/04/23', 1, 130, 10965, 130),
(11862, 'Hébergement du site internet et du nom de domaine : lexhominisavocats.com (Période : 05/2022 à 05/2023)', 1, 80, 10966, 80),
(11863, 'Développement du site https://www.trattoria-ilforno.fr', 1, 500, 10967, 500),
(11864, 'Photo AdobeStock_252124067.jpeg', 1, 50, 10967, 50),
(11865, 'Problème de spam envoyés depuis le site cadeaux.pub Diagnostic et suppression du module \"Envoyer à un ami\"', 1, 50, 10968, 50),
(11866, 'Modifications site web (2021)', 4, 200, 10969, 50),
(11867, 'Contrat d\'assistance sites Internet CEP CICAT : 10h Validité : 02/06/22 - 02/06/23', 10, 500, 10970, 50),
(11868, 'Contrat de maintenance / assistance site Internet LA DOC - 20h', 20, 1000, 10971, 50),
(11869, 'Mise en place d\'un environnement de développement : https://staging.enquetedestyle.com', 1, 50, 10972, 50),
(11870, 'Configuration Stripe / Amelia -> Mode test -> Passage en production', 1, 100, 10972, 100),
(11871, 'Divers - Configuration d\'affichage des articles en page d\'accueil (limite et/ou catégorie spécifique) - Amélioration du contraste du texte sur le slide de la page d\'accueil - Configuration antiSpam', 2, 100, 10972, 50);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postcode` int DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `siret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rib` bigint NOT NULL,
  `bic` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `first_name`, `last_name`, `address1`, `address2`, `postcode`, `city`, `country`, `website`, `siret`, `rib`, `bic`) VALUES
(62, 'contact@nicolasmahler.fr', '[]', '$2y$13$rn5kBmLt22aBVPZvQitFWeBMblgjy64cMnsnFV98n/7cwgt2f4dt2', 'Nicolas', 'Mahler', '9 rue Saint Eloi', '', 67520, 'Kirchheim', 'France', 'https://www.nicolasmahler.fr', '514 327 063 00046', 76914, 'CMCIFR2A');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `countdown`
--
ALTER TABLE `countdown`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_376B83569395C3F3` (`customer_id`);

--
-- Index pour la table `countdown_row`
--
ALTER TABLE `countdown_row`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_FAFA0DE5C4BEE45D` (`countdown_id`);

--
-- Index pour la table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_81398E09A76ED395` (`user_id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_906517449395C3F3` (`customer_id`);

--
-- Index pour la table `invoice_row`
--
ALTER TABLE `invoice_row`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_2CC199182989F1FD` (`invoice_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `countdown`
--
ALTER TABLE `countdown`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `countdown_row`
--
ALTER TABLE `countdown_row`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2117;

--
-- AUTO_INCREMENT pour la table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10973;

--
-- AUTO_INCREMENT pour la table `invoice_row`
--
ALTER TABLE `invoice_row`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11872;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `countdown`
--
ALTER TABLE `countdown`
  ADD CONSTRAINT `FK_376B83569395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Contraintes pour la table `countdown_row`
--
ALTER TABLE `countdown_row`
  ADD CONSTRAINT `FK_FAFA0DE5C4BEE45D` FOREIGN KEY (`countdown_id`) REFERENCES `countdown` (`id`);

--
-- Contraintes pour la table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `FK_81398E09A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `FK_906517449395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Contraintes pour la table `invoice_row`
--
ALTER TABLE `invoice_row`
  ADD CONSTRAINT `FK_2CC199182989F1FD` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
