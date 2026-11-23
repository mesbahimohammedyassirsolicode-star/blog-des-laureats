# Dossier technique — Arguments comparatifs des choix technologiques

## Introduction

La stack du **Blog des Lauréats** est choisie en fonction des besoins
identifiés dans la note de cadrage : performance suffisante pour la
consultation publique, modularité de l'administration et des contenus,
sécurité des comptes et des publications, productivité de l'équipe et
maintenabilité sur plusieurs sprints.

Le projet retient une application web monolithique rendue côté serveur. Cette
approche est plus proportionnée au périmètre actuel qu'une architecture SPA
ou distribuée : elle limite la complexité opérationnelle tout en laissant la
possibilité d'ajouter progressivement des fonctionnalités.

## 1. Framework Backend (Laravel)

**Laravel** est retenu pour le backend plutôt qu'un développement PHP sans
framework ou un framework plus minimaliste.

### Arguments comparatifs

| Critère | Laravel | Conséquence pour le projet |
| --- | --- | --- |
| Organisation | Architecture MVC élégante séparant modèles, vues et contrôleurs | Les articles, profils, catégories et règles métier restent modulaires et maintenables. |
| Sécurité | Protections natives contre les requêtes CSRF, l'affichage XSS et l'injection SQL, complétées par la validation et les middleware | L'espace d'administration et les actions de publication peuvent être protégés de manière cohérente. |
| Évolution du schéma | Migrations déclaratives versionnées | Chaque évolution de la base est traçable, reproductible et partageable entre les environnements. |
| Productivité | Artisan, injection de dépendances, validation et conventions intégrées | L'équipe livre plus rapidement dans le cadre des sprints sans réimplémenter les fonctions communes. |

Laravel fournit aussi **Eloquent**, **Blade**, les middleware
d'authentification et l'intégration avec PHPUnit/Pest. Ces composants couvrent
directement les besoins de gestion de contenus et de contrôle des accès.

## 2. Persistance des Données (MySQL)

Le projet utilise **exclusivement MySQL** comme système de gestion de base de
données relationnelle.

### Arguments comparatifs

| Critère | MySQL relationnel | Conséquence pour le projet |
| --- | --- | --- |
| Modélisation | Modélisation relationnelle rigoureuse | Les utilisateurs, articles, catégories, profils et statuts sont représentés par des relations explicites. |
| Cohérence | Intégrité référentielle avec clés étrangères, contraintes et transactions | Les associations entre un article, son auteur et ses catégories restent valides. |
| Fiabilité | Garanties ACID pour les moteurs transactionnels adaptés | Les opérations sensibles de création ou de publication ne laissent pas de données partiellement enregistrées. |
| Intégration PHP | Compatibilité PDO et intégration directe avec Eloquent | Laravel accède à MySQL par une couche standard et exploitable par l'équipe. |
| Écosystème | Solution industrielle largement documentée | Le déploiement, la maintenance et la montée en compétence sont facilités. |

Une base relationnelle unique est préférable ici à une approche NoSQL ou
polyglotte, car les relations et les règles d'intégrité sont centrales dans le
domaine. Les recherches, filtres par catégorie et listes paginées pourront
être optimisés par des requêtes ciblées et des index.

## 3. Couche Présentation & Design (Tailwind CSS / Preline UI)

La présentation combine **Tailwind CSS** et **Preline UI**, intégrés aux vues
Blade.

### Arguments comparatifs

| Critère | Tailwind CSS / Preline UI | Conséquence pour le projet |
| --- | --- | --- |
| Approche de style | Approche utilitaire moderne avec des classes composables | Les pages restent cohérentes et les styles spécifiques sont limités. |
| Responsive design | Variantes Tailwind par breakpoint | Les articles, profils et écrans d'administration s'adaptent aux tailles d'écran. |
| Productivité | Classes prêtes à l'emploi et composants pré-conçus | L'équipe gagne du temps sur la réalisation des interfaces courantes. |
| Accessibilité | Composants Preline UI conçus avec des comportements et structures accessibles | Les menus, formulaires, alertes et modales disposent d'une base ergonomique réutilisable. |
| Intégration | Fonctionnement naturel avec Blade sans imposer une SPA | Le HTML rendu côté serveur reste simple à maintenir et à tester. |

Tailwind CSS prend en charge la composition visuelle et le responsive design.
Preline UI apporte des composants tels que les menus, formulaires, alertes,
modales et éléments de navigation. Les composants sont adaptés aux besoins du
projet plutôt que développés intégralement à chaque écran.

## 4. Réactivité Frontend (Alpine.js)

**Alpine.js** est retenu pour les interactions côté client qui ne justifient
pas l'adoption d'un framework SPA.

### Arguments comparatifs

| Critère | Alpine.js | Conséquence pour le projet |
| --- | --- | --- |
| Syntaxe | Interactions déclaratives directement dans le HTML | Les comportements sont lisibles dans les vues et proches des éléments concernés. |
| Légèreté | Bibliothèque ciblée pour les interactions courantes | Le navigateur ne reçoit pas la complexité d'un état global ou d'une SPA. |
| Intégration | Fonctionnement harmonieux avec Blade et Preline UI | Les menus, modales, filtres et confirmations complètent le rendu serveur. |
| Outillage | Compilation et configuration limitées | Le démarrage et la maintenance sont plus simples pour l'équipe. |

Alpine.js peut gérer l'ouverture d'un menu, l'affichage d'une modale, un
filtre d'interface ou la confirmation d'une action. Laravel reste responsable
des données, des règles métier, de la sécurité et de la persistance.

## 5. Qualité & Tests Automatisés (TDD)

Le projet applique une démarche **TDD (Test-Driven Development)** afin de
sécuriser chaque incrément de sprint.

### Arguments comparatifs

| Critère | TDD et tests Laravel | Conséquence pour le projet |
| --- | --- | --- |
| Détection | Le test précède l'implémentation | Les erreurs sont détectées tôt, avant l'intégration d'une fonctionnalité. |
| Couverture | Tests unitaires et fonctionnels | Les règles isolées et les parcours HTTP complets sont vérifiés. |
| Régression | Suite automatisée relancée à chaque évolution | Les changements de publication, d'autorisation ou de recherche sont sécurisés. |
| Livraison | Validation répétable à chaque sprint | L'équipe dispose d'un signal objectif avant la revue ou la livraison. |

Le cycle appliqué est :

1. **Red** : écrire un test décrivant le comportement attendu et constater son
   échec.
2. **Green** : implémenter la solution minimale qui fait réussir le test.
3. **Refactor** : améliorer le code sans modifier le comportement, puis
   relancer la suite.

Les scénarios prioritaires sont l'accès aux seuls articles publiés, la
recherche, le filtrage par catégorie, l'authentification, les autorisations
d'administration, les transitions de statut et la validation des données.
Les tests peuvent être écrits avec **PHPUnit** ou **Pest**, tous deux pris en
charge par l'écosystème Laravel.

Depuis le terminal PowerShell, la suite se lance avec :

```powershell
php artisan test
```

Un sous-ensemble peut être exécuté avec un filtre :

```powershell
php artisan test --filter Publication
```

Les tests automatisés sont complétés par une recette manuelle des parcours
principaux et une revue du code.

## 6. Environnement de Développement

L'environnement cible est **Windows** avec un terminal **PowerShell**. Il
réunit les outils nécessaires au développement, à l'exécution, aux tests et au
versionnement du projet.

| Outil | Rôle | Justification |
| --- | --- | --- |
| Windows | Système d'exploitation de l'équipe | Fournit l'environnement de travail retenu pour le projet et ses outils. |
| PowerShell | Terminal et automatisation | Permet d'exécuter les commandes Laravel, PHP, Node.js, Git et les scripts de projet dans un environnement reproductible. |
| Composer | Gestionnaire de dépendances PHP | Installe Laravel et les bibliothèques backend en respectant les versions déclarées. |
| Node.js et npm | Gestion des dépendances et ressources frontend | Permet de compiler ou préparer Tailwind CSS, Preline UI et les ressources frontend. |
| Git | Versionnement distribué | Trace les changements, facilite le travail par branches et permet de revenir sur une version validée. |
| GitHub CLI (`gh`) | Interaction avec le dépôt distant | Facilite la publication, la gestion des issues et le suivi du travail depuis le terminal. |

Les commandes principales sont exécutées depuis la racine du projet ou depuis
le dossier Laravel concerné :

```powershell
composer install
npm install
php artisan test
git status
```

L'Agent IA copilote peut être utilisé dans cet environnement pour proposer une
structure, rédiger des tests, expliquer une erreur ou relire un changement.
Il reste un outil d'assistance : chaque proposition est relue, adaptée aux
conventions du dépôt et validée par l'exécution des tests. Aucun secret,
identifiant ou contenu sensible ne doit lui être transmis.

## Synthèse

Le choix Laravel, MySQL, Tailwind CSS, Preline UI et Alpine.js forme une stack
cohérente : Laravel et MySQL assurent la structure, la sécurité et la
cohérence des données ; Tailwind CSS et Preline UI accélèrent la création
d'interfaces responsive et accessibles ; Alpine.js ajoute uniquement les
interactions nécessaires ; enfin, TDD et l'outillage Windows/PowerShell
sécurisent la livraison incrémentale.
