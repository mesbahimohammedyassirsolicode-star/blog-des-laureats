# Rapport de Projet : Blog des Lauréats

> Document consolidé généré automatiquement.

> Date de génération : 2026-11-20

# Remerciements
Je tiens à exprimer ma profonde et sincère gratitude envers toutes les personnes qui ont contribué, de près ou de loin, à l'aboutissement de ce projet de fin d'études. Ce travail n'aurait pu voir le jour sans leur précieux concours, leur engagement et leur bienveillance.

En premier lieu, j'adresse mes remerciements les plus chaleureux à M. ES-SARRAJ Fouad., mon encadrante pédagogique, dont les conseils avisés, la rigueur scientifique et la disponibilité permanente ont été des guides indispensables tout au long de la conduite de ce projet. Ses orientations méthodologiques et ses retours critiques ont considérablement enrichi la qualité de ce travail.

Je remercie également l'ensemble du corps professoral et administratif de Solicode pour la qualité de la formation dispensée, qui m'a fourni les outils conceptuels et techniques nécessaires à la réalisation de ce projet. Chaque cours, chaque atelier pratique et chaque projet académique ont contribué à forger les compétences mobilisées dans ce mémoire.

Ma reconnaissance va également à mes camarades de promotion pour les échanges intellectuels fructueux, l'entraide permanente et le partage de connaissances qui ont caractérisé notre cohabitation académique. Ces interactions ont nourri ma réflexion et stimulé ma créativité tout au long du processus de développement.

Enfin, je ne saurais clore ces remerciements sans exprimer ma profonde gratitude envers ma famille, dont le soutien moral et matériel m'a permis de mener mes études dans les meilleures conditions possibles. Leur foi en mes capacités a été le moteur de ma persévérance.

Merci à tous.

# Table des matières

- [Remerciements](#remerciements)
- [Introduction](#introduction)
- [Contexte du projet](#contexte-du-projet)
- [Cahier des charges](#cahier-des-charges)
- [Méthodologie de travail](#methodologie-de-travail)
- [Méthode de travail](#methode-de-travail)
- [Design thinking](#design-thinking)
- [Planification](#planification)
- [Branche fonctionnelle](#branche-fonctionnelle)
- [Carte d'empathie](#carte-dempathie)
- [Définition du problème](#definition-du-probleme)
- [Idéation](#ideation)
- [Diagramme de cas d'utilisation](#diagramme-de-cas-dutilisation)
- [Branche technique](#branche-technique)
- [Stack technologique](#stack-technologique)
- [Architecture du système](#architecture-du-systeme)
- [Prototype (fonctionnalités, classes)](#prototype-fonctionnalites-classes)
- [Conception](#conception)
- [Diagramme de classes](#diagramme-de-classes)
- [Maquettes](#maquettes)
- [Réalisation](#realisation)
- [Interfaces](#interfaces)
- [Méthode agile 2TUP](#23-2tup)
- [Conclusion](#conclusion)

# Introduction

Le **Blog des Lauréats** est un projet pédagogique réalisé dans le cadre de la formation développeur web à Solicode Tanger. Il vise à mettre en valeur les parcours professionnels des lauréats et à partager leurs expériences avec les apprenants actuels.

L'application permettra principalement de consulter les articles publiés, d'afficher le profil des auteurs et d'administrer les contenus selon les rôles attribués.

Les principaux acteurs sont le lauréat, qui partage son expérience, l'apprenant, qui découvre les parcours professionnels, le formateur, qui accompagne et encadre les apprenants, le recruteur, qui consulte les profils pour évaluer les compétences, et l'administrateur, qui gère la plateforme.

Le projet est conduit progressivement avec les méthodes Scrum et 2TUP : l'analyse fonctionnelle décrit les besoins des utilisateurs, tandis que l'analyse technique définit les choix d'architecture et les technologies.

# Contexte du projet

Solicode Tanger forme des apprenants aux métiers du développement numérique. À la fin de leur parcours, les lauréats possèdent des retours d'expérience utiles pour les promotions suivantes. Le Blog des Lauréats répond au besoin de rendre ces témoignages accessibles, structurés et durables.

Les utilisateurs concernés sont les lauréats, les apprenants, les formateurs, les recruteurs et les administrateurs du blog. Le projet doit faciliter la consultation des articles, la publication de contenus professionnels, l'accompagnement pédagogique et la gestion administrative de la plateforme.

# Cahier des charges

## Objectifs fonctionnels

- Permettre à chaque acteur d'accéder aux fonctionnalités correspondant à son rôle.
- Consulter la liste des articles publiés.
- Consulter le détail d'un article.
- Présenter les lauréats auteurs, leurs parcours et leurs expériences professionnelles.
- Permettre aux lauréats autorisés de rédiger et publier des articles.
- Permettre aux apprenants de consulter les articles et les profils des lauréats.
- Permettre aux formateurs de suivre les contenus destinés aux apprenants.
- Permettre aux recruteurs de consulter les profils pour évaluer les parcours professionnels.
- Permettre aux administrateurs de gérer les utilisateurs, les articles et les catégories.
- Afficher une page d'erreur adaptée lorsqu'un article n'existe pas.

## Contraintes techniques

- Utiliser PHP, Laravel et une architecture MVC.
- Utiliser Blade pour les vues.
- Utiliser MySQL pour la persistance des données dans la version complète.
- Produire une interface responsive.
- Respecter les règles d'authentification et d'autorisation définies pour les rôles.
- Documenter les travaux avec Markdown, Mermaid et les outils de présentation du dépôt.

# Méthodologie de travail

# Méthode de travail

## La méthode SCRUM

La méthodologie Scrum permet de gérer le développement du Blog des Lauréats de manière flexible et progressive. Le projet est découpé en sprints, puis les fonctionnalités sont priorisées, réalisées, vérifiées et intégrées selon les résultats obtenus.

![Méthodologie Scrum](assets/scrum.png)

*Figure 3 : La méthode SCRUM*

**Principe Scrum :**

- **Transparence** : visibilité complète sur les tâches, les objectifs et l'avancement du projet pour toute l'équipe.
- **Inspection** : évaluation régulière à la fin de chaque sprint afin d'identifier les erreurs, les blocages et les axes d'amélioration.
- **Adaptation** : ajustement du plan de travail en fonction des retours et des résultats obtenus lors des sprints.

**Organisation du projet en sprints :**

### Sprint 1 : initialisation et première fonctionnalité

Le Sprint 1 comprend l'initialisation du dépôt, la configuration de l'environnement, le cadrage du projet, la modélisation fonctionnelle, la gestion du backlog et l'implémentation de la consultation détaillée d'un article.

L'architecture retenue pour cette première fonctionnalité sépare un contrôleur Laravel mince d'une classe Service contenant la logique de récupération de l'article. Une vue Blade présente les informations et une réponse HTTP adaptée est affichée lorsque l'article n'existe pas.

# Design thinking

Ainsi, l'adoption de Scrum permet d'assurer une organisation progressive du travail autour du Blog des Lauréats. La collaboration, les revues de sprint et les ajustements réguliers servent à maintenir l'application alignée avec les besoins de ses utilisateurs.

## Design thinking

Le Design Thinking est une approche de résolution de problèmes centrée sur l’humain. Elle vise à comprendre en profondeur les besoins réels des utilisateurs afin de concevoir des solutions innovantes, utiles et adaptées. Cette méthode est largement utilisée dans les domaines du design, de la technologie, de l’éducation et de l’innovation pour répondre à des problématiques complexes.

![Design Thinking](assets/design_thinking.jpg)

*Figure : Méthodologie Design Thinking*

Le Design Thinking est particulièrement utilisé pour :

- Encourager la créativité et l’innovation dans la conception de solutions ;
- Proposer des réponses réellement adaptées aux besoins des utilisateurs ;
- Favoriser la collaboration entre différentes équipes de travail ;
- Résoudre des problèmes complexes ou mal définis de manière structurée.

## Les étapes du Design Thinking

Le processus du Design Thinking se compose de plusieurs étapes essentielles :

- **Empathie (Empathize)** : cette étape consiste à comprendre l’utilisateur en l’observant, en l’interrogeant et en analysant son comportement. L’objectif est d’identifier ses besoins, ses attentes et ses difficultés réelles.
- **Définition du problème (Define)** : elle permet de regrouper les informations collectées afin de formuler un problème clair et centré sur l’utilisateur, souvent exprimé sous forme de question comme : « Comment pourrions-nous améliorer… ? »
- **Idéation (Ideate)** : cette phase consiste à générer un maximum d’idées possibles sans jugement, en utilisant des techniques comme le brainstorming ou le mind mapping afin de stimuler la créativité.
- **Prototype** : elle consiste à créer une version simplifiée de la solution proposée (maquette, interface ou modèle) afin de tester rapidement les idées.
- **Test** : cette dernière étape permet de tester le prototype auprès des utilisateurs, de recueillir leurs retours et d’améliorer la solution en fonction des résultats obtenus.

Le Design Thinking est donc une méthode structurée et flexible qui permet de transformer une idée en solution concrète en mettant toujours l’utilisateur au centre du processus.

# Planification

# Carte d'empathie
## Persona

## Apprenant

- **Voit** : des articles techniques, des témoignages et les parcours des lauréats.
- **Entend** : les conseils des formateurs et les expériences de professionnels ayant terminé la formation.
- **Pense** : aux compétences nécessaires pour réussir sa formation et son insertion professionnelle.
- **Ressent** : le besoin d'exemples concrets, clairs et inspirants.

## Lauréat

- **Voit** : une plateforme permettant de présenter ses réalisations.
- **Entend** : l'intérêt des apprenants et des recruteurs pour son parcours.
- **Pense** : à transmettre une expérience professionnelle utile.
- **Ressent** : le besoin d'une interface simple pour publier ses articles.

## Formateur

- **Voit** : les ressources utilisées pour accompagner les apprenants.
- **Pense** : à la qualité pédagogique et à la pertinence des contenus.
- **Ressent** : le besoin de pouvoir orienter les apprenants vers des témoignages adaptés.

## Recruteur

- **Voit** : les parcours, compétences et expériences des lauréats.
- **Pense** : à l'adéquation du profil avec ses besoins professionnels.
- **Ressent** : le besoin d'informations fiables et faciles à consulter.

# Définition du problème

Les expériences des lauréats ne sont pas suffisamment centralisées et faciles à consulter. Les apprenants doivent pouvoir s'inspirer de parcours réels, les formateurs doivent disposer de références professionnelles pertinentes, et les recruteurs doivent pouvoir évaluer rapidement les profils publiés.

Le Blog des Lauréats vise à résoudre ce problème en proposant une plateforme de publication et de consultation structurée autour de cinq acteurs : le lauréat, l'apprenant, le formateur, le recruteur et l'administrateur.

# Idéation

# Diagramme de cas d'utilisation

```mermaid
flowchart LR
    Laureat[Lauréat]
    Apprenant[Apprenant]
    Formateur[Formateur]
    Recruteur[Recruteur]
    Admin[Administrateur]

    UC1[Consulter les articles]
    UC2[Consulter le profil d'un lauréat]
    UC3[Rédiger et publier un article]
    UC4[Suivre les ressources pédagogiques]
    UC5[Évaluer les parcours professionnels]
    UC6[Gérer les utilisateurs]
    UC7[Gérer les articles]
    UC8[Gérer les catégories]

    Apprenant --> UC1
    Apprenant --> UC2
    Laureat --> UC1
    Laureat --> UC2
    Laureat --> UC3
    Formateur --> UC1
    Formateur --> UC2
    Formateur --> UC4
    Recruteur --> UC1
    Recruteur --> UC2
    Recruteur --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
```

# Conception

# Diagramme de classes

# Maquettes

# Réalisation

# Interfaces

# Conclusion

