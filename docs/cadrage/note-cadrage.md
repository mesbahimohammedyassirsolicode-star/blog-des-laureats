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

Les objectifs de réalisation du produit sont formulés selon les critères SMART :

- **Spécifique (S) :** Concevoir, développer et déployer une plateforme web
  autonome permettant la rédaction, la relecture éditoriale, la publication et
  la consultation d'articles professionnels classés par catégories, ainsi
  qu'une application mobile dédiée à la consultation et à la lecture.
- **Mesurable (M) :**
  - **Capacité d'accueil initiale :** héberger au minimum 50 articles publiés
    lors du premier trimestre.
  - **Temps d'accès :** obtenir un temps de chargement d'un article inférieur
    à 300 millisecondes en conditions normales.
  - **Disponibilité et portabilité :** proposer une interface 100 % accessible
    et responsive sur terminaux mobiles, tablettes et ordinateurs de bureau.
  - **Accès mobile nomade :** rendre 100 % des articles publiés disponibles en
    lecture seule sur l'application mobile.
- **Atteignable (A) :** Réalisation incrémentale structurée en sprints Scrum
  courts, avec des itérations de 80 heures et la livraison de tranches
  verticales de fonctionnalités testées de bout en bout.
- **Réaliste (R) :** Utilisation d'une stack technologique robuste et
  standardisée (Laravel 13, MySQL, Tailwind CSS, Preline UI, Alpine.js)
  évitant la surcomplexité technique et la dette architecturale.
- **Temporellement défini (T) :**
  - **Sprint 0 :** finalisation du cadrage, de l'infrastructure et des
    prototypes validés.
  - **Sprint 1 :** socle technique, persistance et première tranche
    fonctionnelle opérationnelle.
  - **Sprint mobile :** mise à disposition du catalogue et de la lecture des
    articles sur smartphone.
  - **Clôture :** déploiement et mise en production à la fin du cycle agile.

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