# Blog des Lauréats de l’EFP

Projet pédagogique de Solicode Tanger destiné à présenter les parcours professionnels et les articles des lauréats de l'établissement.

Le **Blog des Lauréats** permet aux lauréats de partager leurs expériences professionnelles et aux apprenants actuels de consulter ces publications.

## Contexte

- **Établissement** : Solicode Tanger.
- **Promotion** : 2026/2027 DevCave.
- **Formateur référent** : ES-SARRAJ Fouad.
- **Sprint actif** : Sprint 1.

## Équipe projet

- **Mohammed Yassir Mesbahi** : Scrum Master et membre de l'équipe de développement.
- **ES-SARRAJ Fouad** : Product Owner et formateur référent.

## Feuille d'engagement

- [Feuille d'engagement active : Sprint 0](./sprints/sprint-0.md)

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

- **Backend** : Laravel.
- **Base de données** : MySQL.
- **Frontend** : Tailwind CSS, Preline UI et Alpine.js.
- **Architecture** : contrôleur mince délégant la logique à une classe Service.
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
