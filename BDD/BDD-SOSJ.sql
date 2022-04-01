-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: jeunespousses
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id_article` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(250) NOT NULL,
  `intro` longtext,
  `para1` longtext,
  `avantage` longtext,
  `lien1` longtext,
  `lien2` longtext,
  `lien3` longtext,
  `image` longtext,
  `visible` tinyint NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id_article`,`user_id`),
  KEY `fk_articles_User1_idx` (`user_id`),
  CONSTRAINT `fk_articles_User10` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Réseautage sur Grenoble ! \n','Pour te donner plus envie encore de te lancer dans un projet de création d’entreprise, consulte l’agenda de OZER et fais-toi inviter à un Apéro’Ozer ! Rencontres, échanges, témoignages, réseau…Fonce ! ','Les actions de Pépite oZer s’articulent autour de plusieurs axes majeurs. Pépite oZer a pour mission à la fois la sensibilisation mais également l’accompagnement des étudiants et des jeunes diplômés dans leurs projets entrepreneuriaux. \nDifférents évènements sont organisés pour sensibiliser les étudiants à l’entrepreneuriat dans une démarche d’apprentissage par l’action. ','En cliquant sur le bouton, tu vas pouvoir mieux démarrer ton parcours de création d’entreprise. Nous estimons que tu peux gagner 3 mois de temps de parcours. Intéressant n’est-ce pas ?','https://www.ozer-entrepreneuriat.fr/pepite-ozer/agenda/ ',NULL,NULL,'https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',1,1),(10,'Une application pour trouver une solution d’avenir sur Grenoble !','Pour t’aider dans ton projet professionnel, tu peux bénéficier d’un parcours d’accompagnement et même obtenir une allocation pouvant aller jusqu’à 500€/mois si tu tiens tes engagements. Découvre vite le détail du contrat engagement jeune ! ','Un parcours entièrement personnalisé qui peut durer de 6 à 12 voire 18 mois en fonction de mon profil, pour m\'aider à définir mon projet professionnel et à trouver un emploi.   ','En cliquant sur le bouton, gagnez du temps sur vos informations à la création de startup  \nNous estimons que ce dispositif peut te faire gagner au moins 2 mois sur le démarrage de ton parcours ! \n','https://www.1jeune1solution.gouv.fr/contrat-engagement-jeune',NULL,NULL,'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',1,1),(11,'Tu n’as pas les moyens de financer ton projet sur Grenoble ?','Sais-tu que tu peux être accompagné pour devenir Lauréat French Tech pour ton projet ? \nAssurément un vrai TREMPLIN ! \nAu programme : préparation et surtout incubation (dans un lieu où tu vas pouvoir être pris en charge, aidé, accompagné, hébergé…)  \n','Ensemble, nous nous mobilisons pour l\'égalité des chances dans la Tech. French Tech Tremplin accompagne les start-ups dont les fondateurs sont issus de populations sous-représentées ou discriminées dans l’écosystème Tech, à travers l’accès à des financements, des formations, du mentorat et un dispositif d’accompagnement d’une durée d’un an.   \n\nFrench Tech Tremplin se compose de deux volets : la Prépa et l’Incubation. Chaque volet a son propre processus de candidature. Il n’est pas obligatoire d’avoir fait la Prépa pour faire l’Incubation, et les participants de la phase Prépa ne sont pas automatiquement acceptés en Incubation.   La Prépa s’adresse aux talents qui veulent créer leur start-up : elle a déjà permis d’accompagner en 2020 145 porteurs de projets à haut potentiel, afin de les aider à créer leurs start-ups.   \n\nL’Incubation s’adresse à des start-ups souhaitant accélérer leur développement. Elle leur apporte une aide financière et un programme d’accompagnement assuré par les meilleurs incubateurs du territoire. En 2021, 200 start-ups ont commencé leur programme d’Incubation dans l’un des 113  incubateurs partenaires.   ','En cliquant sur les deux boutons, gagnez du temps sur le montage du dossier et les recherches de coordonnées des structures.  \nNon seulement le gain de temps est considérable, mais surtout tu vas pouvoir identifier toutes les erreurs à ne pas commettre et trouver les clés de ta réussite\n',NULL,NULL,NULL,'https://images.pexels.com/photos/7876658/pexels-photo-7876658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1),(12,'Un statut étudiant entrepreneur pour tester l’entrepreneuriat sur Grenoble ? \n','Sais-tu que tu peux accéder au statut d’étudiant entrepreneur à Grenoble ? ','Le statut national d\'étudiant-entrepreneur s\'adresse à l\'étudiant ou au jeune diplômé qui cherche à obtenir un accompagnement dans son projet de création d\'entreprise. Il est accordé, sous réserve de remplir certaines conditions, après examen du dossier par un organisme appelé comité d\'engagement PEPITE (Pôle étudiant pour l\'innovation, le transfert et l\'entrepreneuriat).   \n\nPour bénéficier de ce statut, vous devez répondre aux 2 conditions suivantes :   Avoir le bac ou un diplôme équivalent, français ou étranger   Être inscrit dans un établissement d\'enseignement supérieur ou être diplômé d\'un de ces établissements   Vous devez contacter le comité d\'engagement PEPITE avant d\'effectuer votre demande.   ','En cliquant sur les deux boutons, ne passez plus à travers les appels à manifestations. Préparer les pour être prêt.   \nPouvoir travailler sur ton projet de création d’entreprise sans perdre le bénéfice, les avantages de ta formation d’étudiant et le diplôme à la clé ! \n',NULL,NULL,NULL,'https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1),(13,'Finance ton étude de marché sur Grenoble !','Sais-tu que tu peux obtenir une subvention de 11000 € pour financer l’étude de marché indispensable pour valider ton projet de création d’entreprise ?','Avec le 1er volet émergence, Startup & Go Accompagne les porteurs de projets, jeunes entreprises, start-up, etc. dans les moments déterminants pour leur réussite.   11 000€ TTC  \n\nAccompagnement individuel des créateurs : coaching, aide au montage du business plan et à la recherche de financement.   Suivi des jeunes entreprises : diagnostic, préconisations en matière de développement commercial, financement et mise en réseau.   Conception et animation de modules de formation, notamment sur les thèmes de l\'environnement du créateur et le business model   ','En cliquant sur les deux boutons, gagnez du temps sur le montage du dossier et les recherches de coordonnées des structures.  \nRéalisée par un expert, ton étude de marché va forcément te faire gagner plusieurs mois de recherches et surtout t’éviter de commettre des erreurs d’analyse et de décision ! \n',NULL,NULL,NULL,'https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1),(14,'Un accompagnement à entreprendre pour les plus fragiles sur Grenoble ','Sais-tu qu’il existe une association sur Grenoble dont la mission est d’aider et de propulser tous les porteurs de projet innovant qui pensaient être « invisibles » jusqu’à maintenant ? ','Sais-tu que tu peux profiter immédiatement de leur plateforme « Service Assistance ? Sais-tu que SOSJP peut t’aider à créer ta première production, ton premier service très rapidement ? \n  \nSensibilise, prépare et propulse les jeunes startuppers à naviguer dans la Tech | Organisme de Formation~Porteur de projet pour l’égalité des chances dans le Numérique d’avenir   \n','En cliquant sur le bouton, gagnez du temps sur la navigation au sein de l’écosystème tech  \nTu peux espérer gagner près de 2 ans sur le temps de consolidation et de lancement de ton projet ! \n',NULL,NULL,NULL,'https://images.pexels.com/photos/7475042/pexels-photo-7475042.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1),(15,'Une bourse pour la diversité afin de lancer son business innovant sur Grenoble ! \n','Sais-tu que tu peux obtenir une bourse de 30 000€ pour ta future startup auprès de la French Tech Grenoble ?  \n','Cette aide s’adresse aux jeunes entreprises innovantes, disposant d’un réel potentiel de croissance. Deux critères sont à prendre en compte : quel que soit le secteur d’activité, l’entreprise doit être immatriculée en France depuis moins d’un an et employer moins de 50 personnes.\n\nC’est un processus simple et rapide. Après rencontre avec un/e chargé/e d’affaires Bpifrance et présentation du projet d’innovation, vous déposez votre dossier de demande d’aide à la direction régionale dont vous dépendez, via  Mon Bpifrance en ligne. Ensuite, il ne  reste plus qu’à vous laisser guider ! Une fois le dossier complet, il faut compter un délai d’un mois pour que le projet soit notifié. Les équipes Innovation de Bpifrance l’instruiront et en valideront ou non l’éligibilité.   ','En cliquant sur les boutons, gagnez du temps sur la navigation au sein de l’écosystème tech  \nAvec une telle bourse, tu accélères considérablement ton temps de lancement et tu vas prendre de l’avance sur tes concurrents potentiels ! Selon nous, le gain de temps est au moins de 6 mois à un an ! \n',NULL,NULL,NULL,'https://images.pexels.com/photos/315658/pexels-photo-315658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1),(16,'Finance ton projet grâce à l’argent de ton entourage sur Grenoble  ! ','Ok tu peux toujours financer ton projet avec de la « love money » (argent de tes proches amis ou famille) mais tu as aussi l’opportunité fantastique de profiter de l’Equity Crowdfunding (investissement participatif) via (par exemple) KissKissBankBank sur Grenoble ? ','Les créateurs définissent un objectif qui correspond au montant minimum dont ils vont avoir besoin pour réaliser le projet qu\'ils décrivent sur leur page.     Cet objectif peut être budgétaire (€) ou un nombre d\'objets/d\'articles prévendus. S\'il n\'est pas atteint au terme de la durée prévue pour la collecte (entre 1 et 60 jours), les contributeurs sont remboursés de leur don en totalité.    \nGrâce à une énorme équipe technique d’une vingtaine de développeurs, nous élaborons depuis 9 ans un outil performant. Un exemple ? Les pages projet sont agencées pour que la zone de présentation des contreparties soit particulièrement mise en valeur. En effet, c’est aux contreparties qu’attachent le plus d’importance (et ouiii) les potentiels contributeurs : leur regard doit donc se poser directement dessus. L’attention des lecteurs sur le web restant très volatile, il faut aller à l’essentiel : la contribution au projet !  ','En cliquant sur les boutons, gagnez du temps sur l’orientation et la navigation au sein de l’écosystème tech  \nGrâce à ce type de financement tu vas gagner très rapidement en notoriété, accélérer ton temps d’accès au marché, te faire de nouveaux amis grâce à un réseau de soutiens financiers. Selon nous le gain de temps peut dépasser les 6 mois ! \n',NULL,NULL,NULL,'https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1),(17,'Intégrer le cowork solidaire la capsule cap Berriat sur Grenoble ','La Capsule est un projet principalement dédié aux jeunes de 16 à 30 ans, mais ouvert à tous et à toutes : riverain.e.s, membres d’associations, porteuses et porteurs de projets, artistes, travailleuses et travailleurs ou chômeuses et chômeurs, militant.e.s, curieuses et curieux…  \n','En fait, Cap Berriat a toujours été un tiers-lieu. Le projet La Capsule est l’opportunité de renforcer cette dynamique collective en mettant en place de nouveaux dispositifs : des espaces d’expérimentation et de pratiques pour créer, apprendre et transmettre. Ces espaces sont dédiés à la fois au lancement d’associations et à la création d’activité. Ici, tout est possible !  ','En cliquant sur les boutons, gagnez du temps sur l’orientation et la navigation au sein de l’écosystème tech  \nEn moyenne vous venez de gagner 3 mois sur la préparation et la consolidation de votre parcours \n',NULL,NULL,NULL,'https://images.pexels.com/photos/7794077/pexels-photo-7794077.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',1,1),(18,'Ouvrir avec simplicité sa société avec un kbis et statut en moins de 2 semaines sur Grenoble\n','L\'équipe de Captain Contrat est rassemblée autour d\'un même objectif : permettre à chaque entrepreneur, créateur et dirigeant d\'entreprise, d\'utiliser le juridique comme un atout pour la réussite de son entreprise.','Nous facilitons leur vie en les libérant des contraintes administratives grâce à une association unique de produits et services accessibles, intelligents et personnalisés pour les accompagner au quotidien. Nous proposons également les meilleurs outils aux avocats pour leur permettre de rendre le juridique compréhensible et accessible.   Choisissez un besoin juridique pour voir toutes les prestations que nous proposons pour vous accompagner sur ce sujet','En cliquant sur les boutons, gagnez du temps sur l’orientation et la navigation au sein de l’écosystème tech  \nEn moyenne vous venez de gagner 1 moi sur la création de votre société et ainsi sur votre parcours \n',NULL,NULL,NULL,'https://images.pexels.com/photos/3756678/pexels-photo-3756678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1),(19,'Recruter des stagiaires alternant sur Grenoble\n','le site Welcome to the Jungle réunit des jeunes diplômés venant de différents horizons et sensibles du secteur de l\'innovation.   \n','« Le monde du travail est une jungle ? Nous en sommes convaincus nous aussi ! C\'est pourquoi nous avons créé Welcome to the Jungle, le média de référence dédié à l\'emploi ».  \n','En moyenne vous venez de gagner 3 mois sur le recrutement pour votre société et ainsi sur votre parcours  \n',NULL,NULL,NULL,'https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',1,1),(20,' Trouver grâce aux échos Start les concours pour Grenoble\n','Pour gagner en visibilité, des sous ou être accompagné, candidatez à un concours ou appel à projet. Ils donnent accès à des incubateurs, accélérateurs ou permettent de remporter aides et subventions. Les Echos Entrepreneurs dressent la liste des opportunités en cours. Tentez votre chance   \n','Être sélectionné peut également se révéler un gage de crédibilité supplémentaire pour de futurs investisseurs. Les Echos Entrepreneurs vous proposent une liste régulièrement remise à jour des concours s\'adressant aux porteurs de projet ou aux entrepreneurs déjà installés. A vos marques, prêts... Candidatez !  \n','En moyenne vous venez de gagner 3 mois sur la préparation des dossier de concours mais aussi sur la recherches de concours pour votre société  \n',NULL,NULL,NULL,'https://images.pexels.com/photos/6532370/pexels-photo-6532370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1),(21,'Obtenir un crédit d’impôt recherche pour votre startup à Grenoble ?','Le crédit d\'impôt recherche (CIR) est une mesure de soutien aux activités de recherche et développement (R&D) des entreprises, quels que soient leur secteur ou leur taille. ','Les entreprises qui engagent des dépenses de recherche fondamentale et de développement expérimental peuvent bénéficier du CIR en les déduisant de leur impôt sous certaines conditions. Le taux du CIR varie selon  le montant des investissements.   Les activités concernées par le CIR sont les activités de recherche et de développement (recherche fondamentale, recherche appliquée ou développement expérimental par exemple).   Pour être éligibles au CIR, les dépenses doivent correspondre à des opérations de recherche localisées au sein de l\'Espace économique européen (EEE): Allemagne, Autriche, Belgique, Bulgarie, Chypre, Croatie, Danemark, Espagne, Estonie, Finlande, France, Grèce, Hongrie, Irlande, Islande, Italie, Lettonie, Liechtenstein, Lituanie, Luxembourg, Malte, Norvège, Pays-Bas, Pologne, Portugal, République tchèque, Roumanie, Slovaquie, Slovénie, Suède, sauf pour les dépenses de veille technologique et de défense des brevets. Elles doivent aussi avoir été retenues pour déterminer le résultat imposable à l\'impôt sur le revenu ou sur les sociétés. ','En cliquant sur le bouton, gagnez du temps sur l’ensemble de vos démarche et de vos droit et crédibiliser votre startup au sein de l’écosystème tech  \nEn moyenne vous venez de gagner 3 mois sur la préparation de vos démarches mais aussi sur la recherches de concours pour votre société ','',NULL,NULL,'https://images.pexels.com/photos/7821545/pexels-photo-7821545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1),(22,'Présentez sa Startup pour lever des fonds à Grenoble\n','Kima Ventures, co-fondé en 2010 par Xavier Niel, investit dans une à deux start-up par semaine en early stage. Kima a récemment créé un programme baptisé \"Kima15\" qui permet à des start-up innovantes de recevoir 150 000 euros contre 15% de leur capital en moins de 15 jours.  \nTicket moyen : 150K€  \n','Kima Ventures est l’un des fonds d’investissement en amorçage les plus actifs au monde. Installée au sein de Station F, la maison des startups Parisiennes, il a depuis sa création investit dans près de 700 startups','En cliquant sur le bouton, gagnez du temps sur l’ensemble de vos levés de fond et crédibiliser votre startup au sein de l’écosystème tech  \nEn moyenne vous venez de gagner 6 mois sur la préparation de vos levés de fond pour votre société  \n',NULL,NULL,NULL,'https://images.pexels.com/photos/8349230/pexels-photo-8349230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',1,1);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles_has_sous_categories`
--

DROP TABLE IF EXISTS `articles_has_sous_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles_has_sous_categories` (
  `article_id` int NOT NULL,
  `sous_categorie_id` int NOT NULL,
  PRIMARY KEY (`article_id`,`sous_categorie_id`),
  KEY `fk_articles_has_sous_categories_sous_categories1_idx` (`sous_categorie_id`),
  KEY `fk_articles_has_sous_categories_articles1_idx` (`article_id`),
  CONSTRAINT `fk_articles_has_sous_categories_articles1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_articles_has_sous_categories_sous_categories1` FOREIGN KEY (`sous_categorie_id`) REFERENCES `sous_categories` (`id_sous_categorie`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles_has_sous_categories`
--

LOCK TABLES `articles_has_sous_categories` WRITE;
/*!40000 ALTER TABLE `articles_has_sous_categories` DISABLE KEYS */;
INSERT INTO `articles_has_sous_categories` VALUES (1,1),(10,1),(10,2),(10,3),(12,4),(11,5),(12,5),(11,6),(13,7),(16,10),(17,12),(14,15),(15,16),(19,29),(20,31),(21,34),(22,35),(1,37),(10,37);
/*!40000 ALTER TABLE `articles_has_sous_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(100) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Jeunesse et numérique'),(2,'Pré-incubation'),(3,'Ante création'),(4,'Monétisation'),(5,'Incubation'),(6,'Création'),(7,'Outils de gestion'),(8,'Concours '),(9,'R&D'),(10,'Levée de fonds');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id_region` int NOT NULL AUTO_INCREMENT,
  `nom_region` varchar(100) NOT NULL,
  PRIMARY KEY (`id_region`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'Auvergne-Rhône-Alpes'),(2,'Bourgogne-Franche-Comté'),(3,'Bretagne'),(4,'Centre-Val de Loire'),(5,'Corse'),(6,'Grand Est'),(7,'Hauts-de-France'),(8,'Île-de-France'),(9,'Normandie'),(10,'Nouvelle-Aquitaine'),(11,'Occitanie'),(12,'Pays de la Loire'),(13,'Provence-Alpes-Côte d\'Azur'),(14,'Guadeloupe'),(15,'Guyane'),(16,'Martinique'),(17,'La Réunion'),(18,'Mayotte');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secteurs`
--

DROP TABLE IF EXISTS `secteurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secteurs` (
  `id_secteur` int NOT NULL AUTO_INCREMENT,
  `nom_secteur` varchar(255) NOT NULL,
  PRIMARY KEY (`id_secteur`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secteurs`
--

LOCK TABLES `secteurs` WRITE;
/*!40000 ALTER TABLE `secteurs` DISABLE KEYS */;
INSERT INTO `secteurs` VALUES (1,' Fintech'),(2,'FoodTEch'),(3,'LegalTech'),(4,'CleanTech'),(5,'Biotech'),(6,'MedTech'),(7,'HealthTeach'),(8,'ArtTech'),(9,'AgriTech'),(10,'FoodTech'),(11,'FashionTech'),(12,'RetrailTech'),(13,'Silver Economy'),(14,'Big Data'),(15,'Smart City'),(16,'Tourisme'),(17,'Economie'),(18,'Jeux en Ligne'),(19,'Play to Earn'),(20,'RealTech'),(21,'PropTech'),(22,'MobiliTech'),(23,'SportTech'),(24,'MusicTech');
/*!40000 ALTER TABLE `secteurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secteurs_has_articles`
--

DROP TABLE IF EXISTS `secteurs_has_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secteurs_has_articles` (
  `secteur_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`secteur_id`,`article_id`),
  KEY `fk_secteur_has_articles_articles1_idx` (`article_id`),
  KEY `fk_secteur_has_articles_secteur1_idx` (`secteur_id`),
  CONSTRAINT `fk_secteur_has_articles_articles1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_secteur_has_articles_secteur1` FOREIGN KEY (`secteur_id`) REFERENCES `secteurs` (`id_secteur`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secteurs_has_articles`
--

LOCK TABLES `secteurs_has_articles` WRITE;
/*!40000 ALTER TABLE `secteurs_has_articles` DISABLE KEYS */;
INSERT INTO `secteurs_has_articles` VALUES (3,1);
/*!40000 ALTER TABLE `secteurs_has_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sous_categories`
--

DROP TABLE IF EXISTS `sous_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sous_categories` (
  `id_sous_categorie` int NOT NULL AUTO_INCREMENT,
  `nom_sous_categorie` varchar(100) NOT NULL,
  `categorie_id` int NOT NULL,
  PRIMARY KEY (`id_sous_categorie`,`categorie_id`),
  KEY `fk_etape_phase1_idx` (`categorie_id`),
  CONSTRAINT `fk_etape_phase1` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id_categorie`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sous_categories`
--

LOCK TABLES `sous_categories` WRITE;
/*!40000 ALTER TABLE `sous_categories` DISABLE KEYS */;
INSERT INTO `sous_categories` VALUES (1,'Sensibilisation',1),(2,'Mentorat',1),(3,'Orientation',1),(4,'Pré-idéation',2),(5,'Idéation business modèle',2),(6,'Pré-solution poc',2),(7,'Subvention - étude de marché',2),(8,'Prestataire',4),(9,'Emprunt',4),(10,'Crowdfunding',4),(11,'Incubateur',5),(12,'co-working',5),(13,'Pepinière d\'entreprise',5),(14,'Portage Salarial',5),(15,'Creation MVP',3),(16,'Subvention - La tech Solution',4),(26,'Banque',6),(27,'Comptabilité',6),(28,'Assurance',6),(29,'Stage / Alternant',7),(30,'Relation Client',7),(31,'Concours',8),(32,'Business Angel',8),(33,'JEI',9),(34,'CIR',9),(35,'VC',10),(36,'Qvema',10),(37,'Networking',1);
/*!40000 ALTER TABLE `sous_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telechargements`
--

DROP TABLE IF EXISTS `telechargements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telechargements` (
  `id_telechargement` int NOT NULL AUTO_INCREMENT,
  `prenom_telechargement` varchar(255) NOT NULL,
  `nom_telechargement` varchar(255) NOT NULL,
  `mail_telechargement` varchar(255) NOT NULL,
  `ville_telechargement` varchar(255) NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`id_telechargement`,`article_id`),
  KEY `fk_telechargement_articles1_idx` (`article_id`),
  CONSTRAINT `fk_telechargement_articles1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telechargements`
--

LOCK TABLES `telechargements` WRITE;
/*!40000 ALTER TABLE `telechargements` DISABLE KEYS */;
INSERT INTO `telechargements` VALUES (1,'Milhan','Verschelle','milhan.verschelle@gmail.com','Grenoble',1);
/*!40000 ALTER TABLE `telechargements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `admin` tinyint NOT NULL COMMENT 'Admin ou user',
  `forget_password` text,
  `password` varchar(255) DEFAULT NULL,
  `ville_id` int NOT NULL,
  PRIMARY KEY (`id_user`,`ville_id`),
  UNIQUE KEY `mail_UNIQUE` (`mail`),
  KEY `fk_user_villes1_idx` (`ville_id`),
  CONSTRAINT `fk_user_villes1` FOREIGN KEY (`ville_id`) REFERENCES `villes` (`id_ville`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Rachid','rachid@gmail.com',1,NULL,'',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `villes`
--

DROP TABLE IF EXISTS `villes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `villes` (
  `id_ville` int NOT NULL AUTO_INCREMENT,
  `nom_ville` varchar(100) NOT NULL,
  `region_id` int NOT NULL,
  PRIMARY KEY (`id_ville`,`region_id`),
  KEY `fk_villes_regions_idx` (`region_id`),
  CONSTRAINT `fk_villes_regions` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id_region`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `villes`
--

LOCK TABLES `villes` WRITE;
/*!40000 ALTER TABLE `villes` DISABLE KEYS */;
INSERT INTO `villes` VALUES (1,'Grenoble',1),(2,'Lyon',1),(24,'Lille',7);
/*!40000 ALTER TABLE `villes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `villes_has_articles`
--

DROP TABLE IF EXISTS `villes_has_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `villes_has_articles` (
  `ville_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`ville_id`,`article_id`),
  KEY `fk_villes_has_articles_articles1_idx` (`article_id`),
  KEY `fk_villes_has_articles_villes1_idx` (`ville_id`),
  CONSTRAINT `fk_villes_has_articles_articles1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_villes_has_articles_villes1` FOREIGN KEY (`ville_id`) REFERENCES `villes` (`id_ville`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `villes_has_articles`
--

LOCK TABLES `villes_has_articles` WRITE;
/*!40000 ALTER TABLE `villes_has_articles` DISABLE KEYS */;
INSERT INTO `villes_has_articles` VALUES (1,1);
/*!40000 ALTER TABLE `villes_has_articles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-31 10:49:51
