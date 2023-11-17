# sandrine-coupart-App

<h2>Pourquoi ?</h2> 

Cette application web est le résultat d'un projet d'évualuation dans le cadre du titre professionel, que j'ambitionne d'obtenir .
L'objectif ici était de créer une application web fictive présentant le travail de Sandrine Coupart, une diététicienne désirant faire profiter de ses recettes au plus grand nombre.
Le cahier des charges indiquait notament les possibilités d'accéder à des recettes "gratuites" ou de se connecter via les identifiants obtenus lors d'une consultation ou d'un suivi par Sandrine Coupart.
L'accés via connexion ouvrant bien évidemment plus de droit, et l'accés à des recettes correspondant au régime alimentaire du patient. 

<h2>Comment ?</h2>

Le back-end du projet est construit grâce à symphony, tandis que le front a été conçu par React via webpack-encore.

<h2>Deploiement en local:</h2>

<h3>Assurez-vous d'avoir Node.js et Composer installés avant de continuer.</h3>

<h4>1. Installer les dépendances du back-end en tapant la commande :</h4>

`$ composer install`

<h4>2. Installez les dépendances du front-end :</h4>

`$ npm install`

<h4>3. Créez la base de données :</h4>

`$ php bin/console doctrine:database:create`

<h4>4. Effectuez une migration :</h4>

`$ php bin/console doctrine:migrations:migrate`

<h4>5. Lancement du serveur symfony :</h4>

 `$ php bin/console server:run` ou `$ symfony server:start` si la commande `symfony`est déjà installée.

 <h4>6. Générer les clés jwt :</h4>

 `$ php bin/console lexik:jwt:generate-keypair`

<h4>7. Lancement de la construction du front :</h4>

 `$ npm run dev-server`

 <h3>Une ligne de commande a été créée pour configurer un administrateur :</h3>

 `$ php bin/console app:create-admin <firstname> <lastname> <email> <password>`



Les utilisateurs seront crées par l'administrateur et un mot de passe sera généré aléatoirement lors de la création.









  
  


