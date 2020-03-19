Daouda FOFANA
# PROJET EXPRESS NODE.JS

Le projet correspondant aux cours du 19 et 20 mars 2020. 
Il fait suite au projet express du 20 et 21 fevrier.

NPM doit être installé sur votre machine, ainsi que Postgres.
Il vous faut cloner le repository, creer une branche à votre nom sous le format `eleves/nom-prenom`.
Commitez à chaque étape que vous réussissez.

## PREREQUIS 
- Savoir utiliser npm
- Comprendre le JS
- Connaissance d'Express, de EJS et de Sequelize 

## PARTIE 0 - VERIFICATION QUE LE PROJET TOURNE
- Cloner le projet
- Installer les dépendances avec `npm install`
- Initialiser le projet avec `npm run db:init`, `npm run db:migrate`, `npm run db:seed` et `npm run db:test:init`
- Lancer les tests avec `npm test` et verifier qu'ils passent tous
- Lancer le server avec `npm start` et verifier qu'il se lance sur le port 3000
- Lancer le server de dev avec `npm run start:dev` et verifier qu'il se lance le port 3000

## PARTIE 1 - CREER UN CHIEN
Partant du projet précédent, la table DOG, la migration, ainsi que le model sont d'ors et déjà créé.

- Créer une page pour afficher un chien, sur `/dogs/:id` 
- Tester que la page `/dogs/:id` affiche bien le nom et l'age du chien  
- Créer un service pour créer un chien
        - vérifiant qu’il a bien un nom et un age > 0
        - tester que si ces deux conditions sont remplies alors `dogRepository.create` est bien appelé avec les bonnes données. 
        (aller voir les [mocks de sinon](https://sinonjs.org/releases/v9.0.1/mocks/))
- Créer un formulaire qui créer un chien sur `/dogs/new`
        - tester que cette page existe bien
        - tester que l'appel du formulaire de cette page appelle bien `dogService.create` avec les bons paramètres
        - tester que cela redirige vers la page « show » du chien (ie `/dogs/:id`)
        
## PARTIE 2 - RAJOUTER DES INFOS AU CHIEN
- Créer une nouvelle migration avec [sequelize-cli](https://github.com/sequelize/cli#usage) pour rajouter la couleur du chien (champs `color`, en string)
- Rajouter cette information au model (`/models/dog.js`)
- Modifier les tests de création et de lecture du repository pour tenir compte de cette nouvelle information 
- Modifier le service et ses tests pour faire en sorte que la couleur soit comprise entre (`blanc`, `noir` ou `marron`) et non nulle. 
- Modifier le formulaire et les tests de la route 
