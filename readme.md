# Blog des Lauréats

Projet pédagogique de Solicode Tanger destiné à présenter les parcours professionnels et les articles des lauréats de l'établissement.

## Description

Le **Blog des Lauréats** permet aux lauréats de partager leurs expériences professionnelles et aux apprenants actuels de consulter ces publications.

Le dépôt contient actuellement les éléments de cadrage, de planification, de documentation et de présentation du projet. Il ne contient pas encore l'application Laravel complète.

## Contexte

- **Établissement** : Solicode Tanger.
- **Promotion** : 2026/2027 DevCave.
- **Formateur référent** : ES-SARRAJ Fouad.
- **Sprint actif** : Sprint 1.

## Fonctionnalités prévues

- Consulter la liste des articles publiés.
- Consulter le détail d'un article.
- Présenter les lauréats auteurs.
- Permettre aux lauréats autorisés de rédiger et publier des articles.
- Permettre aux administrateurs de gérer les utilisateurs, les articles et les catégories.
- Afficher une page d'erreur lorsque l'article demandé n'existe pas.

## Acteurs

- **Lauréat** : rédige et publie ses articles professionnels.
- **Apprenant** : consulte les articles et découvre les parcours des lauréats.
- **Formateur** : accompagne les apprenants et peut consulter ou contrôler les contenus.
- **Recruteur** : consulte les profils et les articles afin d'évaluer les parcours professionnels.
- **Administrateur** : gère les utilisateurs, les articles et les catégories.

## Stack technique prévue

- **Backend** : PHP 8.2+ et Laravel.
- **Architecture du Sprint 1** : contrôleur mince délégant la logique à une classe Service.
- **Frontend** : Blade, HTML5, CSS3, JavaScript, Tailwind CSS, Alpine.js et éventuellement Preline.
- **Base de données** : MySQL pour la version complète.
- **Modélisation** : Mermaid pour les diagrammes UML.
- **Gestion de versions** : Git et GitHub CLI (`gh`).
- **Documentation** : Markdown et Marp.
- **Sécurité** : authentification Laravel et contrôle des autorisations.

## Organisation du dépôt

- [docs/](./docs/) : documentation et recherches.
- [flux-travail/](./flux-travail/) : organisation du processus de réalisation.
- [issues/](./issues/) : suivi des tâches et des user stories.
- [presentations/](./presentations/) : présentations Marp.
- [rapport/](./rapport/) : rapport modulaire du projet.
- [sprints/](./sprints/) : planification Scrum.
- [tutoriels/](./tutoriels/) : tutoriels et ateliers.

## Rapport

Le rapport est découpé en chapitres indépendants dans [rapport/chapitres/](./rapport/chapitres/). Pour le régénérer après une modification :

```bash
cd rapport
npm run build
```

Le fichier consolidé est enregistré dans [rapport/rapport-blog.md](./rapport/rapport-blog.md).
