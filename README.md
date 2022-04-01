# 💻 "SOS JEUNES POUSSES" - Projet N°3 - Wild Code School

## 📂 Installation :
Ce projet a été créé avec [Create React App](https://github.com/facebook/create-react-app).<br>
<br>
▶ Pour cloner le projet sur votre machine dans votre terminal, utilisez la commande ```Git clone``` suivit du lien ```git@github.com:WildCodeSchool/11-21-noBugNovember-P3-sos-Back.git```

▶ Pour commencer récuperez le fichier .SQL afin d'importer la base de données dans votre Workbench dans le dossier ```BDD``` présent dans le repo. Renseignez vos variables d'environement en créant un fichier ```.env``` à l'aide du sample ```.env.sample```<br>

▶ Ensuite, utilisez la commande ```npm i``` afin d'installer toutes les dépendances (composants externes utilisés).<br>

Une fois l'installation terminée, votre fichier ```package.json``` doit contenir les dépendances suivantes : <br>
<br>
![fddb92e31d83720ec1d9b83ca9933b18](https://user-images.githubusercontent.com/89353029/161009840-2bdcb516-5366-4a42-bfc0-cb24ecd18088.png)

Après avoir vérifier dans votre ```package.json```la présence des dépendances mentionnées, éditez votre ```"scripts"``` avec : ```"start": "nodemon server.js"``` afin de lancer le server avec nodemon.

▶ Enfin utilisez la commande ```npm start``` pour lancer le projet en local.

Veillez à ce que le serveur Frontend tourne également sur votre machine. Si vous ne l'avez pas déjà fait, [cliquez ici pour accéder au repo Frontend.](https://github.com/WildCodeSchool/11-21-noBugNovember-P3-sos-front)

## 📝 Description :
Création d'un site internet proposant un accompagnement à la création de projet professionnel.

L'association SOS JEUNES POUSSES à pour but de délivrer des informations et d'accompagner tout individu désirant créer un projet entrepreunarial.

Avec le site SOS JEUNES POUSSES, chaque utilisateur aura la possibilité de consulter des articles lui permettant de s'informer selon son niveau d'avancé dans la création de projet.

## 🌐 Navigation Utilisateur :
Premier pas sur le site
Lors de sa premiere visite sur le site, l'utilisateur aura la possibilité de découvrir ce qu'est " Le parcours type de l'utilisateur " et ainsi accéder à tous les articles rattachés à chaque étape (catégorie) du parcours de création de projet. Cela lui permettra d'être guidé, étape par étape, dans son parcours entrepreunarial.

Une recherche ciblée
Egalement, si l'utilisateur a déjà utilisé le site, il pourra dès la page d'accueil procéder à une recherche d'article ciblant une étape bien précise du projet de création. Pour se faire, il devra remplir des critères de recherche dans la barre prévue à cet effet. Cela lui permettra d'accéder à des articles en lien avec les critères de recherche saisis.

Accéder à la totalité des articles
Si aucune information n'est remplie dans la barre de recherche, l'utilisateur sera redirigé vers la liste intégrale des articles. Cela lui permettra de naviguer entre les différents articles et de choisir d'acceder à l'article de son choix.

Un accès à l'information
En selectionnant une des cartes de la liste, l'utilisateur sera renvoyé sur la page de l'article en question ce qui lui permettra d'obtenir des informations claires et détaillées au sujet d'un thème bien précis.

Obtenir des informations complémentaires
Lors de la consultation d'article, l'utilisateur aura , selon les articles, l'occasion d'obtenir des informations plus poussées en cliquant sur un bouton le redirigeant vers un site proposant un complément d'informations.

Téléchargement de fichiers
Lors de la consultation d'article, l'utilisateur aura , selon les articles, l'occasion de télécharger des fichiers lui permettant d'avoir en sa possession des documents traitant du thème exploité par l'article. A partir de là, l'information sera rendu possible en tout lieu, tout moment.

## 🔰 Administration :
Une connexion sécurisée
Une interface admin a été mise en place afin de permettre aux gestionnaires du site d'effectuer diverses manoeuvres sur le site. Pour accéder à l'interface admin, l'utilisateur devra avoir en sa possession les informations - login & password - lui permettant de s'authentifier auprès du système de sécurité Auth0 mis en place.

Une interface admin fonctionnelle
Depuis l'interface admin, il sera possible de :

- Créer des articles
Titre, Introduction, Illustration, Contenu principal formatable, Avantage de l'article, Lien(s) de téléchargement(s), Lien de redirection, Choix des catégories/sous-catégories/secteurs d'activités/villes.

- Gérer les articles
Modifier, supprimer ou rendre non visible un article spécifique.

- Agir sur les composants indispensables des articles
Il est possible de créer, modifier voir de supprimer les appelations des différentes catégories, sous-catégories, secteurs et villes par l'intermédiaire de boutons d'appellations prévu à cet effet.


## 📸 ScreenShots :
![1](https://user-images.githubusercontent.com/89353029/161102345-741c94e9-58ed-4d48-a5ee-05c897f671fb.png)
![2](https://user-images.githubusercontent.com/89353029/161102354-c092aa5f-ff6e-4f26-a60a-52d8a9ad285b.png)
![3](https://user-images.githubusercontent.com/89353029/161102358-94031a1a-59f5-499a-9586-0739ce91edce.png)
![4](https://user-images.githubusercontent.com/89353029/161102374-2217f809-0d67-45e5-8fae-abf1527cd7aa.png)
![5](https://user-images.githubusercontent.com/89353029/161102385-2f93725c-8bd6-46c2-9f4c-1b26fb712398.png)
![6](https://user-images.githubusercontent.com/89353029/161102387-a1587101-006a-4f46-9d3b-2cd4340d29d4.png)
![7](https://user-images.githubusercontent.com/89353029/161102391-0782f637-997d-41c8-a330-2b77f485bea7.png)
![8](https://user-images.githubusercontent.com/89353029/161102399-e62b3051-50a7-48df-8978-15f62ef57967.png)
![9](https://user-images.githubusercontent.com/89353029/161102410-c5d7a1f7-ccae-4749-ac5c-a2f2ac4ed2a2.png)


## 👨‍👨‍👦‍👦 Equipe :
[Clara](https://github.com/Liax)&emsp; 
[Déo](https://github.com/Summercoder4)&emsp; 
[Julien](https://github.com/jartacho)&emsp; 
[Léo](https://github.com/leoPinchon)&emsp; 
[Lyndia](https://github.com/DataLyla)&emsp; 
[Romain](https://github.com/MSX-R)&emsp; 
[Milhan](https://github.com/Pimpuss)&emsp; 
