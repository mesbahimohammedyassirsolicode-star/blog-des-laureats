# Note de cadrage — Blog des Lauréats

## 1. Présentation du Projet & Contexte Institutionnel

Le **Blog des Lauréats** est un dispositif numérique composé d'une plateforme
web et d'une application mobile de lecture, développé dans le cadre de la
formation professionnelle de l'EFP, avec l'accompagnement de Solicode Tanger.
Il a pour vocation de présenter les parcours, les expériences et les
réalisations des anciens apprenants de l'établissement.

Le projet répond à une mission de valorisation des lauréats : rendre leurs
parcours visibles, faciliter le partage d'expériences avec les apprenants
actuels et fournir aux visiteurs un accès structuré à des contenus
professionnels. La plateforme web constitue le canal de gestion et de
publication ; l'application mobile constitue un canal nomade de consultation
et de lecture seule pour les apprenants et les visiteurs.

Le projet est réalisé selon une organisation Scrum, avec des livraisons
progressives au fil des sprints.

## 2. Objectifs Stratégiques & SMART

### Objectifs stratégiques

- Centraliser les articles et les profils des lauréats dans une plateforme
  unique et accessible.
- Faciliter la découverte des parcours professionnels par une navigation par
  catégorie et une recherche.
- Permettre la lecture nomade des articles publiés depuis un smartphone.
- Garantir la qualité des contenus grâce à l'authentification et à la gestion
  des statuts de publication.
- Réserver à la plateforme web les outils d'administration et de publication,
  tout en alimentant l'application mobile avec les contenus validés.
- Livrer une première version fonctionnelle de manière itérative, en
  respectant les engagements de chaque sprint.

### Objectifs SMART et indicateurs de réussite

| Objectif | Indicateur mesurable | Échéance |
| --- | --- | --- |
| Mettre à disposition la consultation web | 100 % des articles publiés sont consultables par catégorie et par recherche sur la plateforme web | Fin de la version initiale |
| Assurer l'accès mobile nomade | 100 % des articles publiés exposés par le canal de consultation sont affichés et lisibles sur smartphone | Fin du sprint mobile |
| Garantir la lecture mobile | Un visiteur ou un apprenant peut ouvrir le catalogue puis lire intégralement un article sans fonctionnalité d'édition | Avant la mise en production mobile |
| Valoriser les parcours des lauréats | Au moins 1 profil complet est associé à chaque lauréat présenté | Avant la mise en production |
| Sécuriser la gestion éditoriale | 100 % des fonctionnalités d'administration nécessitent une authentification et une autorisation adaptées sur la plateforme web | Fin du sprint d'implémentation concerné |
| Maîtriser la publication | Chaque article possède un statut identifiable et seuls les contenus publiés sont visibles sur le web et le mobile | Fin de la version initiale |
| Respecter la planification Scrum | Réaliser au moins 90 % des tâches engagées dans chaque sprint, ou documenter les tâches reportées | À la revue de chaque sprint |
| Maintenir une expérience fiable | Obtenir 0 erreur bloquante sur les parcours principaux web et mobile lors de la recette | Avant la livraison de la version initiale |

## 3. Matrice de Périmètre

### In-Scope (Périmètre inclus)

La plateforme web **et l'application mobile de lecture** font partie du
périmètre inclus du projet.

#### Plateforme Web

- Consultation des articles par catégorie.
- Recherche d'articles.
- Consultation du détail d'un article.
- Consultation des profils des lauréats et de leurs parcours.
- Espace d'administration.
- Authentification sécurisée et contrôle des accès.
- Création, modification et gestion des articles par les utilisateurs autorisés.
- Gestion des catégories et des profils lauréats.
- Gestion des statuts de publication des articles.
- Affichage d'une réponse adaptée lorsqu'un contenu demandé n'existe pas.

#### Application Mobile

- Affichage du catalogue des articles publiés.
- Lecture complète des articles.
- Mode consultation / lecture seule pour les apprenants et les visiteurs en
  déplacement.

### Out-of-Scope (Périmètre exclu)

#### Sur l'application mobile

- Rédaction d'articles.
- Modification d'articles.
- Modération des articles.
- Administration des utilisateurs, catégories ou statuts.

Ces opérations sont réservées exclusivement à la plateforme web.

#### Globalement

- Messagerie instantanée en direct.
- Paiement en ligne.
- Fonctionnalités de réseau social complexe avec abonnements, fil d'actualité
  ou interactions avancées.

Toute évolution de ce périmètre devra être évaluée et priorisée dans le
Product Backlog avant d'être planifiée dans un sprint.

## 4. Parties Prenantes

| Partie prenante | Rôle et responsabilités |
| --- | --- |
| **Product Owner (Groupe 1)** | Porte la vision produit, priorise le Product Backlog, clarifie les besoins et valide les fonctionnalités livrées. |
| **Développeurs (Web et Mobile)** | Analysent, conçoivent, développent, testent et documentent les fonctionnalités de la plateforme web, de l'application mobile et de leur canal de consultation partagé. |
| **Formateurs référents** | Apportent leur expertise pédagogique et institutionnelle, accompagnent l'équipe et participent à la validation des livrables. |
| **Visiteurs et apprenants publics** | Consultent les articles et les profils des lauréats sur ordinateur et smartphone ; leurs besoins orientent la lisibilité, la recherche, la lecture nomade et l'accessibilité. |

## 5. Risques Identifiés & Stratégies d'Atténuation

| Risque | Impact potentiel | Stratégie d'atténuation |
| --- | --- | --- |
| Disponibilité insuffisante des contenus (articles, profils ou visuels) | Retard de publication et plateforme peu représentative des parcours | Définir un minimum de contenus attendu, planifier la collecte avec les formateurs référents et utiliser des données de démonstration clairement identifiées lorsque nécessaire. |
| Non-respect des délais de sprint | Fonctionnalités reportées et réduction de la valeur livrée | Découper les fonctionnalités en tâches courtes, prioriser le périmètre essentiel, suivre l'avancement régulièrement et réévaluer les tâches non terminées lors de la revue et de la rétrospective. |
| Incohérence de l'API de consultation entre le web et le mobile | Articles, statuts ou informations de profils différents selon le canal utilisé | Définir un contrat d'API partagé, centraliser les règles de visibilité sur le backend, versionner l'API si nécessaire et tester les mêmes données sur ordinateur et smartphone. |
| Erreur dans la gestion des droits d'accès | Modification ou exposition non autorisée des contenus | Appliquer une authentification sécurisée, vérifier les autorisations côté serveur et tester les parcours de chaque rôle avant validation. |
| Défauts lors de la publication ou de la synchronisation d'un article | Contenu incorrectement visible, indisponible ou différent entre le web et le mobile | Formaliser les statuts de publication, valider les transitions autorisées et prévoir une recette des scénarios de publication, de dépublication et de lecture sur les deux canaux. |