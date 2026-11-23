# Note de cadrage — Blog des Lauréats

## 1. Présentation du Projet & Contexte Institutionnel

Le **Blog des Lauréats** est une plateforme web développée dans le cadre de la
formation professionnelle de l'EFP, avec l'accompagnement de Solicode Tanger.
Elle a pour vocation de présenter les parcours, les expériences et les
réalisations des anciens apprenants de l'établissement.

Le projet répond à une mission de valorisation des lauréats : rendre leurs
parcours visibles, faciliter le partage d'expériences avec les apprenants
actuels et fournir aux visiteurs un accès structuré à des contenus
professionnels. La plateforme doit rester simple à consulter pour le public,
tout en offrant aux utilisateurs autorisés un espace sécurisé de gestion des
contenus.

Le projet est réalisé selon une organisation Scrum, avec des livraisons
progressives au fil des sprints.

## 2. Objectifs Stratégiques & SMART

### Objectifs stratégiques

- Centraliser les articles et les profils des lauréats dans une plateforme
  unique et accessible.
- Faciliter la découverte des parcours professionnels par une navigation par
  catégorie et une recherche.
- Garantir la qualité des contenus grâce à l'authentification et à la gestion
  des statuts de publication.
- Fournir à l'administration les outils nécessaires pour gérer les articles,
  les catégories, les utilisateurs et les profils.
- Livrer une première version fonctionnelle de manière itérative, en
  respectant les engagements de chaque sprint.

### Objectifs SMART et indicateurs de réussite

| Objectif | Indicateur mesurable | Échéance |
| --- | --- | --- |
| Mettre à disposition la consultation des contenus | 100 % des articles publiés sont consultables par catégorie et par recherche | Fin de la version initiale |
| Valoriser les parcours des lauréats | Au moins 1 profil complet est associé à chaque lauréat présenté | Avant la mise en production |
| Sécuriser la gestion éditoriale | 100 % des fonctionnalités d'administration nécessitent une authentification et une autorisation adaptées | Fin du sprint d'implémentation concerné |
| Maîtriser la publication | Chaque article possède un statut identifiable et seuls les contenus publiés sont visibles du public | Fin de la version initiale |
| Respecter la planification Scrum | Réaliser au moins 90 % des tâches engagées dans chaque sprint, ou documenter les tâches reportées | À la revue de chaque sprint |
| Maintenir une expérience fiable | Obtenir 0 erreur bloquante sur les parcours principaux lors de la recette | Avant la livraison de la version initiale |

## 3. Matrice de Périmètre

### In-Scope

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

### Out-of-Scope

Les éléments suivants ne sont pas inclus dans le périmètre de la version
actuelle :

- Messagerie instantanée en direct.
- Paiement en ligne.
- Application mobile native.
- Réseau social complexe avec abonnements, fil d'actualité ou interactions
  avancées.

Toute évolution de ce périmètre devra être évaluée et priorisée dans le
Product Backlog avant d'être planifiée dans un sprint.

## 4. Parties Prenantes

| Partie prenante | Rôle et responsabilités |
| --- | --- |
| **Product Owner (Groupe 1)** | Porte la vision produit, priorise le Product Backlog, clarifie les besoins et valide les fonctionnalités livrées. |
| **Développeurs** | Analysent, conçoivent, développent, testent et documentent les fonctionnalités dans le respect des choix techniques du projet. |
| **Formateurs référents** | Apportent leur expertise pédagogique et institutionnelle, accompagnent l'équipe et participent à la validation des livrables. |
| **Visiteurs publics** | Consultent les articles et les profils des lauréats ; leurs besoins orientent la lisibilité, la recherche et l'accessibilité du site. |

## 5. Risques Identifiés & Stratégies d'Atténuation

| Risque | Impact potentiel | Stratégie d'atténuation |
| --- | --- | --- |
| Disponibilité insuffisante des contenus (articles, profils ou visuels) | Retard de publication et plateforme peu représentative des parcours | Définir un minimum de contenus attendu, planifier la collecte avec les formateurs référents et utiliser des données de démonstration clairement identifiées lorsque nécessaire. |
| Non-respect des délais de sprint | Fonctionnalités reportées et réduction de la valeur livrée | Découper les fonctionnalités en tâches courtes, prioriser le périmètre essentiel, suivre l'avancement régulièrement et réévaluer les tâches non terminées lors de la revue et de la rétrospective. |
| Erreur dans la gestion des droits d'accès | Modification ou exposition non autorisée des contenus | Appliquer une authentification sécurisée, vérifier les autorisations côté serveur et tester les parcours de chaque rôle avant validation. |
| Défauts lors de la publication d'un article | Contenu incorrectement visible ou indisponible pour le public | Formaliser les statuts de publication, valider les transitions autorisées et prévoir une recette des scénarios de publication et de dépublication. |