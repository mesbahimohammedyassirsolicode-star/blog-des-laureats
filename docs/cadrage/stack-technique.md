# Dossier technique — Choix de la stack

## 1. Analyse des exigences techniques

Les exigences sont déduites de la note de cadrage et du périmètre fonctionnel
du Blog des Lauréats.

| Besoin | Exigence technique | Réponse attendue |
| --- | --- | --- |
| Performance | Les visiteurs doivent consulter rapidement les articles, les catégories et les profils. | Rendu serveur léger, requêtes relationnelles maîtrisées, indexation des champs recherchés et limitation des traitements côté client. |
| Modularité | L'espace public, l'administration, les profils et les articles doivent évoluer indépendamment. | Architecture MVC, séparation des responsabilités, services réutilisables et modèles de données relationnels. |
| Sécurité | L'administration et la publication doivent être réservées aux utilisateurs autorisés. | Authentification, middleware, validation des données, contrôle des autorisations côté serveur et protection CSRF. |
| Productivité | L'équipe doit livrer progressivement dans des sprints courts. | Framework conventionnel, outils de génération, composants réutilisables, tests automatisés et documentation versionnée. |
| Maintenabilité | Les règles de publication et les rôles doivent rester compréhensibles et testables. | Code structuré, migrations versionnées, tests ciblés et responsabilités explicites entre contrôleurs, services et modèles. |
| Accessibilité et responsive | Le contenu doit rester utilisable sur les différentes tailles d'écran par les visiteurs publics. | Classes utilitaires responsive, composants accessibles et interactions progressives sans dépendance à une SPA. |

Ces priorités conduisent à retenir une application web monolithique moderne,
rendue côté serveur, plutôt qu'une architecture SPA plus complexe pour le
périmètre actuel.

## 2. Justification du framework backend : Laravel

**Laravel** est retenu comme framework backend PHP. Il fournit une structure
conventionnelle adaptée à une application de gestion de contenus et permet à
l'équipe de se concentrer sur les besoins métier plutôt que sur la plomberie
technique.

### Raisons principales

- **ORM Eloquent** : permet de représenter les utilisateurs, articles,
  catégories et profils par des modèles clairs, avec des relations
  (`belongsTo`, `hasMany` et relations similaires). Les migrations rendent
  l'évolution du schéma reproductible.
- **Moteur de templates Blade** : favorise le rendu serveur, la réutilisation
  de layouts et de composants, ainsi que l'échappement automatique des
  sorties affichées dans les vues.
- **Tests automatisés** : Laravel s'intègre à PHPUnit et peut également être
  utilisé avec Pest. Les tests unitaires et fonctionnels vérifient les règles
  de publication, les autorisations et les parcours principaux.
- **Middleware d'authentification** : permet de protéger les routes
  d'administration et de contrôler l'accès avant l'exécution des contrôleurs.
  Les validations et les autorisations complètent cette protection.
- **Productivité et modularité** : Artisan, les migrations, les seeders, la
  validation et l'injection de dépendances accélèrent le développement tout en
  conservant une organisation claire.

Laravel répond donc simultanément aux besoins de sécurité, de productivité,
de modularité et de maintenabilité identifiés à l'étape précédente.

## 3. Justification du système de gestion de base de données : MySQL

Le projet utilise **exclusivement MySQL** comme système de gestion de base de
données relationnelle.

Ce choix est adapté à la structure fortement relationnelle du domaine :
un article est associé à un auteur, à un profil de lauréat et éventuellement à
une ou plusieurs catégories, tandis que les utilisateurs et les statuts de
publication doivent rester cohérents.

### Justification

- **Conformité aux standards industriels** : MySQL est largement utilisé dans
  les applications web PHP et s'intègre directement avec Laravel et Eloquent.
- **Robustesse relationnelle** : clés étrangères, contraintes, index et
  transactions permettent de préserver l'intégrité des données.
- **Garanties ACID** : atomicité, cohérence, isolation et durabilité sécurisent
  les opérations sensibles, notamment la création ou la modification d'un
  article et de ses relations.
- **Évolutivité** : le schéma peut évoluer par migrations versionnées sans
  perdre la traçabilité des changements.
- **Requêtes adaptées au besoin** : les filtres par catégorie, les recherches
  et les listes paginées peuvent être optimisés avec des index et des requêtes
  ciblées.

Le recours à une base relationnelle unique évite d'ajouter une complexité
polyglotte qui n'est pas nécessaire pour le périmètre défini.

## 4. Justification de la stack frontend

La couche frontend combine **Tailwind CSS**, **Preline UI** et **Alpine.js**.
Cette combinaison conserve la simplicité du rendu Blade tout en fournissant
une interface responsive et des interactions ciblées.

### Tailwind CSS

Tailwind CSS fournit des classes utilitaires pour construire rapidement une
interface cohérente et responsive. Les variantes par breakpoint permettent
d'adapter les pages d'articles, de recherche et d'administration aux
différentes tailles d'écran. La configuration centralisée facilite la
cohérence visuelle et limite le CSS spécifique.

### Preline UI

Preline UI complète Tailwind CSS avec des composants prêts à intégrer, tels
que les menus, formulaires, alertes, modales et éléments de navigation. Ces
composants accélèrent la réalisation tout en fournissant une base cohérente
pour l'ergonomie et l'accessibilité. Ils restent intégrés aux vues Blade et ne
forcent pas l'adoption d'un framework frontend lourd.

### Alpine.js

Alpine.js est utilisé pour les interactions dynamiques légères côté client :
ouverture d'un menu, affichage d'une modale, filtres d'interface ou
confirmation d'une action. Il complète le HTML rendu par Blade sans imposer
une architecture SPA, un état global ou une chaîne de compilation complexe.

Cette stack est proportionnée au projet : le serveur reste responsable des
données, de la sécurité et des règles métier, tandis que le navigateur ne
prend en charge que les interactions nécessaires à l'expérience utilisateur.

## 5. Outillage de test et Agent IA

### Protocole TDD

Le développement suit un protocole **TDD (Test-Driven Development)** adapté
aux fonctionnalités du projet :

1. **Red** : écrire un test qui décrit le comportement attendu et constater
   son échec.
2. **Green** : implémenter la solution minimale permettant au test de réussir.
3. **Refactor** : améliorer la structure du code sans modifier le comportement,
   puis relancer les tests.

Les tests doivent couvrir en priorité les règles métier et les risques du
projet :

- accès public aux seuls articles publiés ;
- recherche et filtrage par catégorie ;
- authentification et autorisations d'administration ;
- transitions de statut d'un article ;
- validation des données et réponses d'erreur attendues.

Sous Windows PowerShell, les commandes de vérification sont exécutées depuis
la racine de l'application Laravel, par exemple :

```powershell
php artisan test
```

Un test ciblé peut être exécuté avec le filtre fourni par le framework :

```powershell
php artisan test --filter Publication
```

Les tests automatisés sont complétés par une vérification manuelle des
parcours principaux lors de la recette et par une revue du code.

### Utilisation de l'Agent IA copilote

L'Agent IA copilote est utilisé comme un outil d'assistance sous Windows
PowerShell pour :

- proposer une structure de fichiers ou un squelette de fonctionnalité ;
- aider à rédiger des tests et identifier des cas limites ;
- expliquer une erreur de commande, de test ou de typage ;
- relire un changement et signaler des risques potentiels ;
- accélérer la recherche dans la documentation technique.

L'Agent IA ne remplace ni la décision de l'équipe ni la validation humaine.
Tout code proposé est relu, adapté aux conventions du dépôt, exécuté dans
l'environnement local et vérifié par les tests avant intégration. Aucun secret,
identifiant ou contenu sensible ne doit lui être transmis.

## 6. Synthèse de la stack retenue

| Couche | Technologie | Rôle |
| --- | --- | --- |
| Backend | Laravel | Routage, logique applicative, sécurité et services |
| Modèles et accès aux données | Eloquent ORM | Modèles, relations et requêtes |
| Vues | Blade | Rendu serveur et composants de présentation |
| Base de données | MySQL | Persistance relationnelle et transactions ACID |
| Style et responsive | Tailwind CSS | Classes utilitaires et adaptation aux écrans |
| Composants UI | Preline UI | Composants d'interface réutilisables |
| Interactions client | Alpine.js | Comportements dynamiques légers |
| Tests | PHPUnit / Pest | Tests unitaires et fonctionnels |
| Outillage | Git, GitHub CLI, Windows PowerShell et Agent IA copilote | Versionnement, automatisation et assistance au développement |

Cette stack reste cohérente avec le périmètre du Blog des Lauréats, limite la
complexité inutile et laisse une capacité d'évolution pour les futurs sprints.
