-- phpMyAdmin SQL Dump
-- version 4.9.7deb1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 02 jan. 2023 à 14:39
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

--
-- Déchargement des données de la table `countdown`
--

INSERT INTO `countdown` (`id`, `customer_id`, `reference`, `credit`, `current_credit`, `status`, `date`) VALUES
(32, 2103, 'ca_20220614_institution_la_doctrine_chrétienne', '20:00', '20:00', '', '2022-06-14 09:12:48');

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

--
-- Déchargement des données de la table `countdown_row`
--

INSERT INTO `countdown_row` (`id`, `countdown_id`, `date`, `task`, `elapsed`) VALUES
(12, 32, '2022-06-01 22:00:00', 'Test date 16/06', '01:20');

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
(2113, 62, 'Juliette', 'Bott', 'juliettebott@gmail.com', 'Ecole de danse Amidanse', '6 rue des Bosquets', '', 54300, 'Lunéville', 'France'),
(2114, 62, 'Fabienne', 'Rovigo', 'f.rovigo@cep-cicat.com', 'CEP CICAT', '2 rue Evariste Galois', '', 67201, 'Eckbolsheim', 'France'),
(2115, 62, 'Anne', 'Thomahsowski', 'anne_thomah@yahoo.fr', 'Thomahsowski Anne', '53 rue du Pont Creon', '', 14000, 'Caen', 'France'),
(2116, 62, 'Olivier', 'Chambe', 'ochambe@landewyck.fr', 'Landewyck France', '6/8 rue du 4 septembre', '', 92130, 'Issy les Moulineaux', 'France'),
(2117, 62, 'Mickaël', 'WINTER', 'mickael@jcplogistics.fr', 'W Logistics System', '31 rue de Bayonne', '', 67100, 'Strasbourg', 'France'),
(2118, 62, 'Non spécifié', 'Deroubaix', 'aderoubaix@tsa-industries.com', 'TSA Industries', '8 rue Jules Py', '03 29 42 50 00', 88210, 'Moussey', 'France'),
(2119, 62, 'Christian', 'Zemké', 'direction@sanspermisalsace.fr', 'Sans Permis Alsace', '21B rue des Tuileries', '', 67460, 'Souffelweyersheim', 'France'),
(2120, 62, 'Françis', 'Hirn', 'fhirn67@gmail.com', 'Les Amis de Marcel Rudloff', ' Maison de la Région Alsace', ' 1. place Adrien Zeller - BP 1006/F', 67070, 'STRASBOURG cedex', ''),
(2121, 62, 'Gilles', 'WILHELM', 'wilhelm.gilles@yahoo.fr', 'Aspi Alsace', '7 rue Saint Eloi', '', 67520, 'Kirchheim', 'France'),
(2122, 62, 'Jean-Jacques', 'MAEGEY', 'info@eds-logistic.com', 'EDS France', '3 , quai Kléber', 'Tour Sebastopol', 67000, 'Strasbourg', 'France'),
(2123, 62, 'Elisabeth', 'NAUX', 'contact@t2tbat.fr', 'T2TBat', '22 avenue Félix Vincent', '', 44700, 'ORVAULT', 'France'),
(2124, 62, 'Espace', 'Couvert', 'jmkolb@gmail.com', 'Espace Couvert', '1 rue Embranchement', 'Zone Industrielle Rammelplatz 2', 67116, 'REICHSTETT', 'France'),
(2125, 62, 'Erik', 'OZGUR', 'entreprise.erik@free.fr', 'Entreprise Erik', '13 rue du Luxembourg', '', 67700, 'Saverne', 'France'),
(2126, 62, 'Mohammed', 'AZAHAF', 'marioazahaf33@gmail.com', 'VTC EVOLUTION', '6 rue Berlioz', '', 33560, ' SAINTE-EULALIE', 'France'),
(2127, 62, 'Violette', 'Botter ', 'contact@corneetcarotte.fr', 'Corne et Carotte', ' 1 sur les prés', '', 68160, 'Sainte-Marie-Aux-Mines', 'France'),
(2128, 62, 'Florence', 'REVOL', 'contact@ao-c.fr', 'Appels d’Offres Conseils', '19 CHEMIN DES CHATAIGNIERS', '', 69210, 'LENTILLY', 'FRANCE');

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
('DoctrineMigrations\\Version20220613144252', '2022-06-13 16:42:57', 106),
('DoctrineMigrations\\Version20220613182522', '2022-06-13 20:25:38', 98),
('DoctrineMigrations\\Version20220613184143', '2022-06-13 20:41:49', 87),
('DoctrineMigrations\\Version20220613185003', '2022-06-13 20:50:08', 63),
('DoctrineMigrations\\Version20220614063902', '2022-06-14 08:39:11', 41),
('DoctrineMigrations\\Version20220614143002', '2022-06-14 16:30:10', 73),
('DoctrineMigrations\\Version20220614162742', '2022-06-14 18:27:46', 61);

-- --------------------------------------------------------

--
-- Structure de la table `estimate`
--

CREATE TABLE `estimate` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `amount` double DEFAULT NULL,
  `sent_at` datetime NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chrono` int NOT NULL,
  `year` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `validate_at` datetime DEFAULT NULL,
  `object` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `definition` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `estimate`
--

INSERT INTO `estimate` (`id`, `customer_id`, `amount`, `sent_at`, `status`, `chrono`, `year`, `validate_at`, `object`, `definition`) VALUES
(1, 2105, 400, '2022-06-14 15:08:26', 'SENT', 1, '2022', NULL, '', NULL),
(2, 2105, 1500, '2022-05-11 15:29:47', 'SENT', 19, '2022', '2022-06-24 22:00:00', 'Conception d\'un site Internet vitrine', 'Conception d\'un site Internet vitrine pour le restaurant La Bruchoise\nLe présent devis tient compte de l\'intégration des contenus (textes et images) qui seront en rédigés et fournis par le\nclient.\nLe présent devis est établi selon l\'arborescence suivante :\n- Accueil\n- Présentation du restaurant\n- Contact et accès\n- Téléchargement de la carte (PDF)\n- Présentation et possibilité de modifier le menu / plat du jour.\nLe site sera développé avec la dernière version du CMS Wordpress, sera responsive (adapté aux écrans de type\nsmartphone et ordinateurs) et optimisé pour le SEO (référencement naturel) dans les normes standards actuelles.'),
(3, 2104, 1050, '2022-06-14 18:51:02', 'SENT', 20, '2022', '2022-06-13 22:00:00', 'Refonte site Menuiseries Bichot (Hilzinger)', 'Refonte du site \"menuiseries-bichot.com\" d\'après maquette d\'origine.\nSite sur une seule page comprenant les sections :\n- Slider\n- Nous connaitre\n- Nos produits\n- Nos matériaux\n- Formulaire de contact\nTechnologie employée : Wordpress'),
(4, 2117, 440, '2022-06-15 19:14:19', 'VALIDATE', 21, '2022', '2022-06-13 22:00:00', 'OPTION 1 - Création d\'un site Internet statique \"wlogisticsystem.fr\"', 'Création d\'un site Internet statique (sans interface d\'administration, ni base de données).\nArborescence du site : 1page.\nPhoto du dépôt, présentation des prestations, présentation de la société, coordonnées de contact (adresse postale, mail, plan d\'accès...).\n\nLe logo de la société, les contenus textuels, visuels et les accès à la configuration du nom de domaine (DNS) sont fournis par le client.\nDans l\'éventualité où le client souhaite héberger le site par ses propres moyens, les accès au serveur de l\'hébergement sont requis (accès au panel, au ftp, connexion SSH si possible, serveur Apache ou NGINX , php5).'),
(5, 2117, 2090, '2022-06-15 19:32:46', 'CANCELLED', 22, '2022', '2022-06-13 22:00:00', 'OPTION 2 : Création d\'un site Internet dynamique \"wlogisticsystem.fr\"', 'Création d\'un site Internet dynamique Wordpress (avec interface d\'administration pour gérer les contenus dans une base de données).\nLe logo de la société, les contenus textuels, visuels et les accès à la configuration du nom de domaine (DNS) sont fournis par le client.\nArborescence du site : multipages.\n- Page d\'accueil (présentation de la société et des prestations).\n- Page de présentation de la société (services, historique...)\n- Page(s) des prestations (1 page, ou plusieurs en fonction du volume de contenus).\n- Page de contact (coordonnées complètes, plan d\'accès google maps, formulaire de contact).\n- Page mentions légales.\n\nDans l\'éventualité où le client souhaite héberger le site par ses propres moyens, les accès au serveur de l\'hébergement sont requis (accès au panel, au ftp, connexion SSH si possible, serveur Apache ou NGINX , php5, accès à phpmyadmin, mysql 5).'),
(6, 2118, 5600, '2022-06-24 21:08:24', 'SENT', 23, '2022', '2022-06-14 22:00:00', 'Refonte du site Internet : https://www.tsa-inox.com/', 'Création d\'un site Internet dynamique Wordpress (avec interface d\'administration pour gérer les contenus et base données).\nLe logo de la société, les contenus textuels, visuels et les accès à la configuration du nom de domaine (DNS) sont fournis par le client.\nArborescence du site : multipages.\n- Page d\'accueil (présentation de la société et des prestations).\n- Page de présentation de la société (services, historique...)\n- Pages des prestations (segmentation en fonction des domaines d\'activités : Agroalimentaire, Claie Off Store, Industrie).\n- Page de contact (coordonnées complètes, plan d\'accès google maps, formulaire de contact).\n- Page mentions légales.\n\nInternationalisation du site (Français, Allemand, Anglais, Italien). Les textes traduits sont fournis par le client pour l\'intégration initiale.'),
(7, 2104, 8300, '2022-06-21 13:43:59', 'SENT', 24, '2022', '2022-06-21 22:00:00', 'Refonte du site \"http://www.hilzinger.fr\"', 'Refonte d\'un site Internet dynamique Wordpress (avec interface d\'administration pour gérer les contenus et base données).\nLe logo de la société, les contenus textuels, visuels et les accès à la configuration du nom de domaine (DNS) sont fournis par le client.\nIMPORTANT : il faut avoir accès au nom de domaine pour pouvoir installer un certificat SSL et optimiser la sécurité du site (https://www.hilzinger.fr).\nArborescence du site : multipages.\n- Page d\'accueil (présentation de la société et des prestations).\n- Page de présentation de la société (3 pages : groupe, usines, offres d\'emplois)\n- Pages des produits (plusieurs pages, segmentation en fonction des types de produits).\n- Pages Nos conseils (3 pages : FAQ, Lexique, Notice d\'entretien).\n- Pages Nos réalisations (plusieurs pages, segmentation par type de réalisations).\n- Pages Nos catalogues (téléchargement et consultation en ligne de documents PDF, formulaire de demande d\'exemplaire papier).\n- Nous trouver (liens vers https://www.agences-hilzinger.fr, section non prise en compte dans ce devis).\n- Pages Actualités (système d\'actualité : liste d\'actus et pages de détails)\n- Page de contact (coordonnées complètes, plan d\'accès google maps, formulaire de contact et de demande de devis).\n- Page mentions légales.\n- Espace Pro. (Plusieurs pages, liste de documents PDF à télécharger. Les documents sont en accès privés, obligation de se connecter via login / mot de passe).\n\nInternationalisation du site (Français, Allemand, Anglais, Italien). Les textes traduits sont fournis par le client pour l\'intégration initiale.\n\nLe coût de de l\'hébergement et du nom de domaine sont à la charge du client.'),
(8, 2113, 200, '2022-07-08 11:14:43', 'VALIDATE', 25, '2022', '2022-07-07 22:00:00', 'Modification du site : Ecole de Danse AMIDANSE ', 'Mise à jour des contenus du site Internet (2022)'),
(9, 2120, 600, '2022-07-11 14:31:19', 'VALIDATE', 26, '2022', '2022-07-10 22:00:00', 'Reprise du site Internet de l\'Association \"Les Amis de Marcel Rudloff\"', 'Migration, hébergement et maintenance du site Internet.'),
(10, 2121, 650, '2022-07-20 17:44:27', 'VALIDATE', 27, '2022', '2022-07-19 22:00:00', 'Création du site Internet Aspi Alsace', 'Création d\'un site vitrine Wordpress.\nArborescence :\n- Accueil\n- Présentation de la société\n- Présentation des prestations\n- Page contact (dont formulaire de contact / demande de devis)\n\nLes contenus (textes et visuels sont fournis par le client).'),
(11, 2122, 3900, '2022-07-28 14:53:35', 'SENT', 28, '2022', '2022-07-27 22:00:00', 'Refonte site Internet \"eds-logistic.com\"', 'Refonte du site Internet WordPress :  \"eds-logistic.com\"\nLe logo de la société, les contenus textuels, et les accès à la configuration du nom de domaine  sont fournis par le client.\nArborescence du site : multipages.\n- Page d\'accueil (présentation de la société, historique, équipe).\n- Page de présentation de la société (services, historique...)\n- Pages des services (\"Express\", \"Messagerie\", \"Affrètement\").\n- Page \"Notre couverture\" (service en France et à l\'internaltional).\n- Page contact (carte interactive des implantations, Adresses des sièges (FR et CA), carte de visite du dirigeatns et des responsables, formulaire de contact).\n- Page mentions légales.\n- Gestion des cookies (conformité RGPD)\nInternationalisation du site (Français, Allemand, Anglais. Les textes sont traduits automatiquement par le plugin WPML (le prestataire ne garantie pas l\'exactitude des traductions).'),
(12, 2122, 500, '2022-07-28 16:37:48', 'SENT', 29, '2022', '2022-07-27 22:00:00', 'Contrat de maintenance', 'Contrat de maintenance site '),
(13, 2123, 200, '2022-08-25 08:46:34', 'VALIDATE', 30, '2022', '2022-08-24 22:00:00', 'Contrat de maintenance 4h', 'Contrat de maintenance assistance mail et site Internet. Validité 1 an à compter de la date de la première intervention. Décompte du temps à la minute'),
(14, 2119, 400, '2022-09-01 08:36:53', 'VALIDATE', 31, '2022', '2022-08-31 22:00:00', 'Internationalisation site web', ''),
(15, 2124, 2370, '2022-09-07 07:45:40', 'SENT', 32, '2022', '2022-09-21 22:00:00', 'Application d’export & formatage de données', 'Développement d\'une application PHP permettant le traitement, formatage et export de données depuis une API tierce (rentman.net).\nAccès à l\'appli via une authentification par login / mot de passe (avec possibilité de réinitialiser le mot de passe).\nPossibilité de filtrer les données selon une plage de dates (départ et arrivée) définies par l\'utilisateur.\nFormatage des données et export dans un fichier .xls(x).\nHistorique des exports (sauvegarde du fichier et de la date de création).\nPossibilité d\'ajouter/modifier/supprimer un compte utilisateur.\n\nLe design de l\'application est inspiré de la charte graphique utilisée sur le site https://espace-couvert.com/.\nL\'accès à l\'application se fait via un sous-domaine du ndd : \"espace-couvert.com\". \nLes accès à l\'API de rentman.net sont fournis par le client.'),
(16, 2109, 300, '2022-09-07 15:44:12', 'SENT', 33, '2022', '2022-09-06 22:00:00', 'Conformité RGPD', 'Mise en conformité RGPD du site Internet.'),
(17, 2125, 1900, '2022-09-12 14:31:02', 'SENT', 34, '2022', '2022-09-05 22:00:00', 'Refonte site Internet', 'Conception d\'un site Internet vitrine pour la société : Entreprise Erik\nLe présent devis tient compte de l\'hébergement et des coûts liés aux plugins premium (frais renouvelables annuellement).\nLe nom de domaine est existant et est géré directement par le client.\nLe présent devis tient compte de l\'intégration des contenus (textes et images) récupéré en partie ou en totalité sur le site Internet existant (ou à défaut fournis par le client).\nLe présent devis est établi selon l\'arborescence suivante :\n- Accueil\n- Présentation des services : Isolation intérieure (1 page de contenu textuel) - Isolation extérieure (1 page de contenu textuel), Travaux de rénovation en plâtrerie (1 page de contenu textuel), Travaux de rénovation en en aménagement intérieur (1 page de contenu textuel), Travaux de rénovation en ravallement de façade (1 page de contenu textuel)\n- Nos réalisations. Portfolio de projets (pour chaque projet, photo et descriptif court du chantier).\n- Contact (dont formulaire de contact et carte interactive type google maps).\nLe site sera développé avec la dernière version du CMS Wordpress, sera responsive (adapté aux écrans de type smartphone et ordinateurs) et optimisé pour le SEO (référencement naturel) dans les normes standards actuelles.'),
(18, 2104, 3200, '2022-09-15 13:16:52', 'VALIDATE', 35, '2022', '2022-09-15 22:00:00', 'Refonte site Archipart', 'Refonte du site Internet Archipart'),
(19, 2104, 3400, '2022-09-15 13:22:06', 'VALIDATE', 36, '2022', '2022-09-15 22:00:00', 'Refonte site internet Difac', 'Refonte Prestashop 1.7'),
(20, 2120, 200, '2022-09-16 11:19:35', 'VALIDATE', 37, '2022', '2022-09-15 22:00:00', 'Contrat de maintenance (4h)', 'Contrat de maintenance (4h)'),
(21, 2111, 100, '2022-10-13 14:16:47', 'CANCELLED', 38, '2022', '2022-10-12 22:00:00', 'Contrat d\'assistance', 'Contrat de 2h'),
(22, 2106, 200, '2022-11-15 13:20:39', 'CANCELLED', 39, '2022', '2022-11-14 23:00:00', 'Mise à jour et débogage du site WickelFischFrance', ''),
(23, 2128, 300, '2022-12-09 07:58:57', 'SENT', 40, '2022', '2022-12-08 23:00:00', 'Modification du site : appelsoffres-conseils.fr', 'Modification de la structure du site en vue d\'une optimisation technique SEO.\nREQUIS : un accès à l\'interface d\'administration du site avec des droits suffisants pour permettre la modification des pages et l\'installation de plugins.\nPour la mise en place de Google Search Console, un accès FTP est requis. Idéalement, un accès aux enregistrements DNS.');

-- --------------------------------------------------------

--
-- Structure de la table `estimate_row`
--

CREATE TABLE `estimate_row` (
  `id` int NOT NULL,
  `estimate_id` int NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `quantity` int NOT NULL,
  `amount` double NOT NULL,
  `unit_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `estimate_row`
--

INSERT INTO `estimate_row` (`id`, `estimate_id`, `description`, `quantity`, `amount`, `unit_price`) VALUES
(2, 2, 'Installation et configuration des environnements de développement et de production: - Installation et configuration de Wordpress. - Migration sur le seveur de production. - Tests et débogages', 1, 100, 100),
(3, 2, 'Développement (dont cout themes et plugins premium) - Installation et paramétrage des plugins - Conception d\'un thème enfant en correspondance avec la charte graphique (polices, logo, couleurs) - Création de l\'arborescence (pages et menus) - Mises en place des en-têtes et pieds de pages communs à l\'ensemble des gabarits - Déclinaisons des gabarits de page. - Intégration des contenus', 28, 1400, 50),
(4, 3, 'Configuration du serveur, du nom de domaine, création de la base de données, installation et configuration du CMS Wordpress', 2, 100, 50),
(5, 3, 'Création d\'un thème responsive (php, html, css, js) d\'après la maquette fournie par le client', 14, 700, 50),
(6, 3, 'Contrat de maintenance, mise à jour et restauration de sauvegarde (5h, décompte à la minute). Validité 1 an, renouvelable sur devis.', 5, 250, 50),
(7, 4, 'Configuration du serveur et déploiement des fichiers.', 2, 100, 50),
(8, 4, 'Adaptation d\'un thème responsive (le site s\'adapte aux écrans : ordinateurs, smartphones), d\'après les éléments fournis (logo, photos, contenus).', 6, 300, 50),
(9, 4, '(option) hébergement du site (validité 1an, renouvelable sur devis)', 1, 40, 40),
(10, 5, 'Configuration du serveur, installation et paramétrage de Wordpress. Accompagnement en visio à la prise en main du site (ajout, modification et suppression de contenus).', 5, 250, 50),
(11, 5, 'Adaptation d\'un thème premium wordpress responsive (le site s\'adapte aux écrans d\'ordinateur et smartphones), d\'après les contenus fournis (logo, visuels...). Le tarif indiqué tient compte du coût d\'achat du thème et du plugin premium  WpRocket (mise en cache et optimisation des performances).', 24, 1200, 50),
(12, 5, 'Développements spécifiques : gestion des collections (automatisation de la partie \"prestations\"), formulaire de contact et enregistrement des messages dans la base de données. Protection antispam.', 8, 400, 50),
(13, 5, '(option) hébergement du site (validité 1 an, renouvelable sur devis).', 1, 40, 40),
(14, 5, '(option) Contrat de maintenance (4h, décompte à la minute. Validité 1 an. Renouvelable sur devis lorsque le temps total est consommé). Ce contrat prend en compte les mises à jours , la sauvegarde et la restauration en cas de panne, le débugage. Non pris en charge: l\'ajout de nouveaux contenus et / ou de nouvelles fonctionnalités. Cette option n\'est possible que si l\'option d\'hébergement (voir ligne précédente) est validée.', 4, 200, 50),
(15, 6, 'Configuration du serveur, installation et paramétrage de Wordpress. Accompagnement en visio à la prise en main du site (ajout, modification et suppression de contenus).', 8, 400, 50),
(16, 6, 'Adaptation d\'un thème premium wordpress responsive (le site s\'adapte aux écrans d\'ordinateur et smartphones), d\'après les contenus fournis (logo, visuels...). Le tarif indiqué tient compte du coût d\'achat du thème et des plugins premium WpRocket (mise en cache et optimisation des performances) et WPML (gestion des contenus multilingues)..', 50, 2500, 50),
(17, 6, 'Développements spécifiques : gestion des collections (automatisation de la partie \"prestations\"), formulaire de contact et enregistrement des messages dans la base de données, protection antispam.', 10, 500, 50),
(18, 6, 'OPTION - Gestion et intégration des contenus multilingues (fr, de, en , it) fournis par le client.', 20, 1000, 50),
(19, 6, 'OPTION - Version malvoyants : possibilité de basculer le design du site vers une version graphique optimisée en contrastes et en taille police', 12, 600, 50),
(20, 6, 'OPTION - Contrat de maintenance (10h, décompte à la minute. Validité 1 an. Renouvelable sur devis lorsque le temps total est consommé). Ce contrat prend en compte les mises à jours , la sauvegarde et la restauration en cas de panne, le débugage. Non pris en charge: l\'ajout de nouveaux contenus et / ou de nouvelles fonctionnalités. ', 10, 500, 50),
(21, 6, 'Hébergement - Validité 1 an, renouvelable sur devis.', 1, 100, 100),
(22, 7, 'Migration des et intégration des contenus  (dont produits et comptes clients du site actuel)', 24, 1200, 50),
(23, 7, 'Configuration du serveur, installation et paramétrage d\'un environnement de développement, recette et production.', 6, 300, 50),
(24, 7, 'Développement d\'un thème responsive (le site s\'adapte aux écrans d\'ordinateur et smartphones), d\'après les maquettes fournies par le client. ', 60, 3000, 50),
(25, 7, 'Refonte de l\'espace pro. Développement d\'un système d\'accès restreint, détection des mises à jour et envoie de mails automatiques hebdomadaires aux membres.', 40, 2000, 50),
(26, 7, 'Autres développements : formulaire (dont sécurisation via reCaptcha) : contact, devis, demande de documentation. Moteur de recherche plein texte sur les contenus du site', 16, 800, 50),
(27, 7, 'Gestion de projet : accompagnement et suivi (dont réunions en visio).', 20, 1000, 50),
(28, 8, 'Forfait - mise à jour des contenus 2022 du site https://www.dansefrancoisemartin.com/', 1, 200, 200),
(29, 9, 'Migration du site Internet et des adresses email. Sauvegarde des données, migration du nom de domaine et des fichiers. Recréation des adresses emails (contact@marcel-rudloff-tolerance.com, info@marcel-rudloff-tolerance.com).', 1, 200, 200),
(30, 9, 'Hébergement du site et du nom de domaine. Validité 1an, reconductible sur devis.', 1, 100, 100),
(31, 9, 'Contrat de maintenance annuel (3h). Ajout / modification de contenus. Correction de bugs, restauration de sauvegarde du site en cas de panne.  Le temps est décompté à la minute (un décompte du temps est envoyé par mail après chaque intervention). Ne sont pas pris en compte par le contrat : le développement de nouvelles fonctionnalités (modules, développements spécifiques), la migration vers une nouvelle version majeure du CMS qui entrenairait une refonte du site et une possible incompatibilité du thème et / ou des modules. Le contrat est valable 1 an, reconductible sur devis.', 3, 150, 50),
(32, 9, 'Mise en conformité RGPD :  bandeau d\'acceptation des cookies, case à cocher de gestion des données personnelle sur le formulaire de contact et installation d\'un certificat SSL (adresse du site en https://, plutôt que http://)', 1, 150, 150),
(33, 10, 'Hébergement, nom de domaine (aspi-alsace.fr, sous réserve de disponibilité) et abonnement plugin \"WP-Rocket\" (gestion des performances du site). Validité 1 an, renouvelable sur devis.', 1, 150, 150),
(34, 10, '[Forfait] Développementd\'un site Internet vitrine.', 1, 500, 500),
(35, 11, 'Installation et configurations des environnements de développement, recette et production. Installation et configuration de Wordpress. Migration sur le serveur de production. Tests et débogages. Accompagnement visio à la prise en main du site.', 1, 400, 400),
(36, 11, 'Conception d\'un thème Wordpress sur mesure : création de l\'arborescence (pages et menu), déclinaisons de gabarits de pages en fonction des contenus (accueil, pages internes, contact). Intégration des contenus. Installation, paramétrage et personnalisation des plugins tiers (formulaire de contact, acceptation des cookies, performances, seo). Le coût de l\'abonnement  (durée : 1 an) des plugins premium, des ressources photographiques d\'image et conception multimédia est inclus.', 7, 2800, 400),
(37, 11, 'Internationalisation du site (Anglais et Allemand). Mise en place technique et intégration des contenus. Coût de l\'abonnement du plugin premium inclus (durée: 1an). ', 1, 600, 600),
(41, 12, 'OPTION - Contrat de maintenance (10h, décompte à la minute. Validité 1 an. Renouvelable sur devis lorsque le temps total est consommé). Ce contrat prend en compte les mises à jour , la sauvegarde et la restauration en cas de panne, le débugage. Non pris en charge: l\'ajout de nouveaux contenus et / ou de nouvelles fonctionnalités.', 10, 500, 50),
(42, 11, 'Hébergement du site - Validité 1 an, renouvelable sur devis.', 1, 100, 100),
(43, 13, 'Contrat de maintenance 4h', 4, 200, 50),
(44, 14, 'Modification de la structure du site, installation et configuration du plugin WPML, intégration des contenus en allemand (textes fournis par le client). Le coût du plugin est inclus dans le prix.', 1, 400, 400),
(45, 15, 'Développement, tests et feedback', 1, 2300, 2300),
(46, 15, 'Hébergement de l\'application (1 an, renouvelable).', 1, 70, 70),
(47, 16, 'Ajout d\'un bandeau d\'acceptation des cookies sur le site. Mise en conformité du formulaire de contact. Mise en place d\'un certificat SSL Let\'s Encrypt (https).', 1, 300, 300),
(48, 17, 'Installation et configuration des environnements de développement et de production: - Configuration du serveur (ftp, sous-domaine, base de données) - Installation et configuration de Wordpress. - Migration sur le seveur de production. - Tests et débogages', 1, 400, 400),
(49, 17, 'Développement - Installation et paramétrage des plugins - Conception d\'un thème enfant en correspondance avec la charte graphique (polices, logo, couleurs) - Création de l\'arborescence (pages et menus) - Mises en place des en-têtes et pieds de pages communs à l\'ensemble des gabarits - Déclinaisons des gabarits en fonction des contenus : pages de contenus éditoriaux (textes et images), liste d\'actualités, détails d\'actualités, page contact - Intégration des contenus', 3, 1200, 400),
(50, 17, 'Hébergement (site, et plugin premium : WpRocket). Validité 1 an, renouvelable.', 1, 100, 100),
(51, 17, 'Contrat de maintenance et assistance  site Internet. Validité 1 an à compter de la date de la première intervention. Décompte du temps à la minute.', 4, 200, 50),
(52, 18, 'Migration des données, dont + 100 références.', 2, 800, 400),
(53, 18, 'Installation et configuration d\'un thème wordpress customisé. Plugins : Yoast, ACF Pro, WP Rocket', 6, 2400, 400),
(54, 19, 'Migration PS 1.6 vers 1.7, Développement d\'un nouveau thème, Fiche PDF', 1, 3400, 3400),
(55, 20, 'Contrat de maintenance annuel (4h). Ajout / modification de contenus. Correction de bugs, restauration de sauvegarde du site en cas de panne. Le temps est décompté à la minute (un décompte du temps est envoyé par mail après chaque intervention). Ne sont pas pris en compte par le contrat : le développement de nouvelles fonctionnalités (modules, développements spécifiques), la migration vers une nouvelle version majeure du CMS qui entrenairait une refonte du site et une possible incompatibilité du thème et / ou des modules. Le contrat est valable 1 an, reconductible sur devis.', 4, 200, 50),
(56, 21, 'Contrat de maintenance annuel (2h). Ajout / modification de contenus. Correction de bugs, assistance à la prise en main. Le temps est décompté à la minute (un décompte du temps est envoyé par mail après chaque intervention). Ne sont pas pris en compte par le contrat : le développement de nouvelles fonctionnalités (modules, développements spécifiques), la migration vers une nouvelle version majeure du CMS qui entrenairait une refonte du site et une possible incompatibilité du thème et / ou des modules. Le contrat est valable 1 an, reconductible sur devis.', 2, 100, 50),
(57, 22, 'Mise à jour du site et des plugins, recherche d\'erreurs et débogage', 4, 200, 50),
(58, 23, 'Modification de la structure sémantique de l\'ensemble des pages du site (hors articles de la rubrique \"Actualités\"). Installation et paramétrage du plugin YOAST SEO. Installation de Google Search Console.', 1, 300, 300);

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
  `year` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paid_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `invoice`
--

INSERT INTO `invoice` (`id`, `customer_id`, `amount`, `sent_at`, `status`, `chrono`, `year`, `paid_at`) VALUES
(10943, 2103, 1000, '2022-01-07 17:58:44', 'PAID', 1, '2022', '2022-01-10 23:00:00'),
(10944, 2104, 250, '2022-01-07 18:01:01', 'PAID', 2, '2022', '2022-01-20 23:00:00'),
(10945, 2105, 500, '2022-01-07 18:01:57', 'PAID', 3, '2022', '2022-04-26 22:00:00'),
(10946, 2104, 2400, '2022-01-07 18:03:19', 'PAID', 4, '2022', '2022-01-20 23:00:00'),
(10947, 2105, 550, '2022-01-11 18:04:22', 'PAID', 5, '2022', '2022-01-26 23:00:00'),
(10948, 2105, 500, '2022-01-31 18:05:51', 'PAID', 6, '2022', '2022-02-09 23:00:00'),
(10949, 2105, 500, '2022-01-31 18:07:00', 'PAID', 7, '2022', '2022-02-09 23:00:00'),
(10950, 2105, 500, '2022-01-31 18:07:33', 'PAID', 8, '2022', '2022-03-09 23:00:00'),
(10951, 2105, 550, '2022-01-31 18:08:49', 'PAID', 9, '2022', '2022-02-09 23:00:00'),
(10952, 2105, 550, '2022-01-31 18:10:06', 'PAID', 10, '2022', '2022-03-09 23:00:00'),
(10953, 2105, 500, '2022-02-28 18:11:20', 'PAID', 11, '2022', '2022-03-09 23:00:00'),
(10954, 2105, 550, '2022-02-28 18:12:09', 'PAID', 12, '2022', '2022-03-09 23:00:00'),
(10955, 2106, 960, '2022-02-28 18:13:33', 'PAID', 13, '2022', '2022-03-01 23:00:00'),
(10956, 2105, 550, '2022-03-04 18:14:25', 'PAID', 14, '2022', '2022-07-01 22:00:00'),
(10957, 2105, 500, '2022-03-04 18:15:32', 'PAID', 15, '2022', '2022-07-01 22:00:00'),
(10958, 2105, 500, '2022-03-29 18:16:10', 'PAID', 16, '2022', '2022-07-01 22:00:00'),
(10959, 2105, 550, '2022-03-29 18:16:54', 'PAID', 17, '2022', '2022-07-01 22:00:00'),
(10960, 2107, 555, '2022-04-29 18:18:28', 'PAID', 18, '2022', '2022-05-12 22:00:00'),
(10961, 2104, 250, '2022-05-04 18:19:27', 'PAID', 19, '2022', '2022-09-12 22:00:00'),
(10962, 2116, 100, '2022-05-05 18:21:51', 'PAID', 20, '2022', '2022-05-18 22:00:00'),
(10963, 2108, 100, '2022-05-05 18:22:49', 'PAID', 21, '2022', '2022-05-12 22:00:00'),
(10964, 2109, 80, '2022-05-05 18:23:33', 'SENT', 22, '2022', NULL),
(10965, 2110, 130, '2022-05-05 18:24:24', 'PAID', 23, '2022', '2022-07-27 22:00:00'),
(10966, 2111, 80, '2022-05-05 18:25:18', 'PAID', 24, '2022', '2022-05-09 22:00:00'),
(10967, 2105, 550, '2022-05-11 18:26:55', 'PAID', 25, '2022', '2022-07-01 22:00:00'),
(10968, 2112, 50, '2022-05-16 18:28:31', 'PAID', 26, '2022', '2022-05-17 22:00:00'),
(10969, 2113, 200, '2022-06-01 18:31:35', 'PAID', 27, '2022', '2022-06-03 22:00:00'),
(10970, 2114, 500, '2022-06-02 18:32:13', 'PAID', 28, '2022', '2022-06-13 22:00:00'),
(10971, 2103, 1000, '2022-06-07 18:32:54', 'PAID', 29, '2022', '2022-06-08 22:00:00'),
(10972, 2115, 250, '2022-06-08 18:33:27', 'PAID', 30, '2022', '2022-06-16 22:00:00'),
(10973, 2106, 2170, '2022-06-15 21:48:26', 'PAID', 31, '2022', '2022-06-16 22:00:00'),
(10974, 2119, 960, '2022-06-15 21:58:39', 'PAID', 32, '2022', '2022-06-19 22:00:00'),
(10975, 2104, 250, '2022-06-29 10:28:53', 'PAID', 33, '2022', '2022-09-12 22:00:00'),
(10976, 2104, 200, '2022-06-29 10:30:23', 'PAID', 34, '2022', '2022-09-12 22:00:00'),
(10977, 2103, 3000, '2022-07-04 14:26:17', 'PAID', 35, '2022', '2022-09-05 22:00:00'),
(10978, 2123, 110, '2022-08-25 08:40:37', 'PAID', 36, '2022', '2022-08-26 22:00:00'),
(10979, 2123, 200, '2022-08-25 10:29:31', 'PAID', 37, '2022', '2022-08-26 22:00:00'),
(10980, 2113, 200, '2022-08-25 13:45:51', 'PAID', 38, '2022', '2022-08-30 22:00:00'),
(10981, 2114, 500, '2022-09-01 17:36:10', 'PAID', 39, '2022', '2022-09-05 22:00:00'),
(10982, 2115, 150, '2022-09-06 16:26:47', 'PAID', 40, '2022', '2022-09-05 22:00:00'),
(10983, 2120, 600, '2022-09-12 09:33:38', 'PAID', 41, '2022', '2022-09-15 22:00:00'),
(10984, 2117, 440, '2022-09-12 11:13:46', 'PAID', 42, '2022', '2022-09-14 22:00:00'),
(10985, 2120, 200, '2022-09-27 11:18:14', 'PAID', 43, '2022', '2022-09-30 22:00:00'),
(10986, 2116, 350, '2022-11-02 09:31:25', 'PAID', 44, '2022', '2022-11-01 23:00:00'),
(10987, 2126, 100, '2022-11-02 10:04:40', 'PAID', 45, '2022', '2022-11-09 23:00:00'),
(10988, 2127, 110, '2022-11-02 10:18:07', 'SENT', 46, '2022', '2022-11-01 23:00:00'),
(10989, 2121, 650, '2022-11-02 11:11:47', 'PAID', 47, '2022', '2022-11-01 23:00:00'),
(10990, 2105, 1500, '2022-11-02 18:00:49', 'PAID', 48, '2022', '2022-11-01 23:00:00'),
(10991, 2119, 2240, '2022-11-10 18:01:01', 'PAID', 49, '2022', '2022-11-09 23:00:00'),
(10992, 2119, 700, '2022-11-10 11:18:46', 'PAID', 50, '2022', '2022-11-09 23:00:00'),
(10993, 2119, 400, '2022-11-10 11:23:46', 'PAID', 51, '2022', '2022-11-09 23:00:00'),
(10994, 2105, 1100, '2022-11-10 15:13:11', 'PAID', 52, '2022', '2022-11-09 23:00:00'),
(10995, 2103, 1000, '2022-12-20 08:25:50', 'SENT', 53, '2022', '2022-12-20 23:00:00'),
(10996, 2104, 250, '2022-12-20 08:30:16', 'SENT', 54, '2022', '2022-12-19 23:00:00');

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
(11871, 'Divers - Configuration d\'affichage des articles en page d\'accueil (limite et/ou catégorie spécifique) - Amélioration du contraste du texte sur le slide de la page d\'accueil - Configuration antiSpam', 2, 100, 10972, 50),
(11872, 'Accompte, payé le 01/03/2022', 1, -930, 10973, -930),
(11873, 'Développement du site Internet : https://www.wickelfischfrance.com (solde)', 1, 3100, 10973, 3100),
(11874, 'Acompte de 30% sur devis \"2022_site_sanspermisalsace - Devis.pdf\" du 26/04/2022', 1, 960, 10974, 960),
(11875, 'Conception de la lettre d\'information Echos Ethiques #04 - juin 2022', 1, 250, 10975, 250),
(11876, 'Réparation de l\'envoi de mails via le site hilzinger.fr', 1, 200, 10976, 200),
(11877, 'Refonte du site Internet \"https://ladoc-strasbourg.fr\"', 1, 3000, 10977, 3000),
(11878, 'Renouvellement hébergement site web https://www.t2tbat.fr et noms de domaines période : 18/09/2022 au 18/09/2023', 1, 110, 10978, 110),
(11879, 'Contrat de maintenance web 4h', 4, 200, 10979, 50),
(11880, 'Forfait - mise à jour des contenus 2022 du site https://www.dansefrancoisemartin.com/', 1, 200, 10980, 200),
(11881, 'Contrat d\'assistance sites Internet CEP CICAT : 10h Validité : 01/09/22 - 01/09/23', 10, 500, 10981, 50),
(11882, 'Contrat de maintenance - 3h (validité du 06/09/2022 au 06/09/2023)', 3, 150, 10982, 50),
(11883, 'Migration du site Internet et des adresses email. Sauvegarde des données, migration du nom de domaine et des fichiers. Recréation des adresses emails (contact@marcel-rudloff-tolerance.com, info@marcel-rudloff-tolerance.com).', 1, 200, 10983, 200),
(11884, 'Hébergement du site et du nom de domaine. Validité 1an, reconductible sur devis.', 1, 100, 10983, 100),
(11885, 'Contrat de maintenance annuel (3h). Ajout / modification de contenus. Correction de bugs, restauration de sauvegarde du site en cas de panne. Le temps est décompté à la minute (un décompte du temps est envoyé par mail après chaque intervention). Ne sont pas pris en compte par le contrat : le développement de nouvelles fonctionnalités (modules, développements spécifiques), la migration vers une nouvelle version majeure du CMS qui entrenairait une refonte du site et une possible incompatibilité du thème et / ou des modules. Le contrat est valable 1 an, reconductible sur devis.', 3, 150, 10983, 50),
(11886, 'Mise en conformité RGPD : bandeau d\'acceptation des cookies, case à cocher de gestion des données personnelle sur le formulaire de contact et installation d\'un certificat SSL (adresse du site en https://, plutôt que http://)', 1, 150, 10983, 150),
(11887, 'Conception site Internet https://www.w-logistics-system.fr', 1, 400, 10984, 400),
(11888, 'Hébergement du site (validité 1 an : septembre 2022 à septembre 2023)', 1, 40, 10984, 40),
(11889, 'Contrat de maintenance annuel (4h). Ajout / modification de contenus. Correction de bugs, restauration de sauvegarde du site en cas de panne. Le temps est décompté à la minute (un décompte du temps est envoyé par mail après chaque intervention). Ne sont pas pris en compte par le contrat : le développement de nouvelles fonctionnalités (modules, développements spécifiques), la migration vers une nouvelle version majeure du CMS qui entrenairait une refonte du site et une possible incompatibilité du thème et / ou des modules. Le contrat est valable 1 an, reconductible sur devis.', 4, 200, 10985, 50),
(11890, 'Hébergement du site et du nom de domaine Landewyckstore.com Période du 19/09/2022 au 19/09/2023', 1, 350, 10986, 350),
(11891, 'Hébergement site et nom de domaine vtcevolution.com (période du : 25/11/22 au 25/11/24)', 1, 100, 10987, 100),
(11892, 'Hébergement nom de domaine corneetcarotte.fr, période du 25/03/2019 au 25/03/2023', 4, 80, 10988, 20),
(11893, 'Hébergement du site web, période du 25/03/2022 au 25/03/2023', 1, 30, 10988, 30),
(11894, 'Hébergement, nom de domaine aspi-alsace.fr et abonnement plugin \"WP-Rocket\" - période 30/08/2022 au 30/08/2023', 1, 150, 10989, 150),
(11895, 'Développement du site Internet aspialsace.fr', 1, 500, 10989, 500),
(11897, 'Conception site La Bruchoise', 1, 1500, 10990, 1500),
(11898, 'Accompte, payé le 19/06/2022 (facture 202232)', 1, -960, 10991, -960),
(11899, 'Développement du site Internet https://www.sanspermisalsace.fr', 1, 3200, 10991, 3200),
(11900, 'Hébergement du site et plugins premium (période : septembre 2022 à septembre 2023)', 1, 200, 10992, 200),
(11901, 'Contrat de maintenance et mise à jour 10h ', 10, 500, 10992, 50),
(11902, 'Internationalisation du site Sans Permis Alsace en langue Allemande', 1, 400, 10993, 400),
(11903, 'Conception site SIDELEC', 1, 1100, 10994, 1100),
(11904, 'Contrat de maintenance / assistance site Internet LA DOC - 20h', 20, 1000, 10995, 50),
(11905, 'Echos ethiques N°5', 1, 250, 10996, 250);

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
-- Index pour la table `estimate`
--
ALTER TABLE `estimate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D2EA46079395C3F3` (`customer_id`);

--
-- Index pour la table `estimate_row`
--
ALTER TABLE `estimate_row`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_ECD78E7485F23082` (`estimate_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `countdown_row`
--
ALTER TABLE `countdown_row`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2129;

--
-- AUTO_INCREMENT pour la table `estimate`
--
ALTER TABLE `estimate`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `estimate_row`
--
ALTER TABLE `estimate_row`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT pour la table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10997;

--
-- AUTO_INCREMENT pour la table `invoice_row`
--
ALTER TABLE `invoice_row`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11906;

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
-- Contraintes pour la table `estimate`
--
ALTER TABLE `estimate`
  ADD CONSTRAINT `FK_D2EA46079395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Contraintes pour la table `estimate_row`
--
ALTER TABLE `estimate_row`
  ADD CONSTRAINT `FK_ECD78E7485F23082` FOREIGN KEY (`estimate_id`) REFERENCES `estimate` (`id`);

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
