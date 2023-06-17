# App ToDo

Ce projet est un site web qui permet de gérer une liste de tâches.  
Il permet aux utilisateurs de gérer leurs tâches quotidiennes en les organisant, en les priorisant et en suivant leur progression. Elle offre une solution simple et efficace pour rester organisé et productif.

## Architecture du Site

Le site est construit en utilisant Vue.js, un framework JavaScript moderne pour la construction d'interfaces utilisateur. Voici la structure du projet :

- Le dossier `src` contient les fichiers sources du site.
- Le dossier `src\assets` contient le fichier de style et l'icône utilisé.
- Le dossier `src\components` contient les composants réutilisables utilisés dans le site.
- Le fichier `src\App.vue` est le composant racine de l'application.
- Le fichier `src\main.js` gère la configuration de Vue.js.
- Le fichier `index.html` : C'est la page principale de l'application. Elle affiche la vue principale de l'application ToDo et est liée au fichier `main.js` pour l'initialisation de l'application.
- Le fichier `aide.html` : Cette page fournit une aide et des instructions sur l'utilisation de l'application ToDo.
- Les fichiers `package.json` et `package-lock.json` contiennent les dépendances et les scripts de construction.

## Stockage des données
Dans cette application ToDo, les données des tâches sont stockées dans le local storage du navigateur. Cela signifie que même si l'utilisateur ferme le site ou redémarre son navigateur, ses tâches seront toujours présentes et récupérées lors de la prochaine consultation de la page web.

# Utilisation 

## Prérequis

Avant de pouvoir visualiser le site, assurez-vous d'avoir Node.js et npm (Node Package Manager) installés sur votre machine.

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante dans votre terminal :
```
npm install
```


## Exécution

Pour lancer le site et le visualiser dans votre navigateur, exécutez la commande suivante :
```
npm run dev
```


Cela lancera un serveur de développement local et ouvrira automatiquement le site dans votre navigateur par défaut.

## Aide
Pour obtenir de l'aide supplémentaire sur l'utilisation du site, consultez la page d'aide. Cette page fournit des instructions détaillées sur les fonctionnalités de l'application, notamment l'ajout de tâches, l'affichage des détails, la modification et la suppression des tâches.


**Ce projet a été réalisé par des étudiants de l'IUT de Vannes : MEZIRARD Flavien et LE NY Liam**

