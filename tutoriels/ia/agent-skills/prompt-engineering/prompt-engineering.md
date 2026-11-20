# Prompt Engineering et méthode RIO

> Fiche de synthèse personnelle — Sprint 1  
> Sujet : fonctionnement des LLM, prompts directifs et Context Engineering

## 1. Idée essentielle

Le **Prompt Engineering** consiste à concevoir une consigne qui rend une tâche
réalisable, vérifiable et reproductible par un modèle de langage (LLM). Ce n'est
pas une formule magique : c'est une démarche d'interface entre l'intention
humaine et un système probabiliste.

Pour du développement logiciel, un bon prompt doit donc :

- fournir le contexte réellement nécessaire ;
- décrire une tâche observable avec des critères d'acceptation ;
- expliciter les contraintes et les comportements interdits ;
- imposer un format de sortie exploitable ;
- demander une vérification qui peut être contrôlée par un humain ou un test.

La méthode **RIO** utilisée dans cette fiche est une grille pratique :
**Rôle**, **Instruction**, **Output**. Elle complète, plutôt qu'elle ne
remplace, une analyse du besoin et une validation du code.

## 2. Comment fonctionne un LLM ?

### 2.1 De l'entrée à la sortie

Un LLM transforme le texte en unités appelées **tokens**. Il traite la
séquence de tokens à l'aide d'un réseau de neurones de type Transformer, puis
calcule une distribution de probabilité pour le prochain token. Le token
sélectionné est ajouté à la séquence et le calcul recommence jusqu'à obtenir
une fin de réponse ou une limite.

Cette description explique deux propriétés importantes :

- la réponse est une **génération conditionnée par le contexte**, pas une
  lecture garantie d'une base de vérité ;
- deux sorties peuvent différer lorsque le contexte, le modèle ou les
  paramètres de génération diffèrent.

Pendant l'entraînement, le modèle apprend des régularités statistiques dans de
grandes collections de données. Il ne « comprend » pas un projet comme un
développeur qui l'aurait exécuté : il produit une continuation qui semble
compatible avec les tokens et les exemples disponibles.

### 2.2 Pourquoi le code peut être plausible mais faux

Une **hallucination** est une affirmation ou un fragment de code présenté avec
assurance alors qu'il est faux, non vérifié ou absent des sources fournies.
Elle peut prendre la forme d'une API inventée, d'une version de bibliothèque
incorrecte, d'un fichier imaginaire ou d'une explication incohérente avec le
dépôt.

La complétion probabiliste favorise parfois la plausibilité au détriment de la
vérité. Un prompt très précis réduit l'ambiguïté, mais ne garantit pas
l'exactitude. Pour réduire le risque :

1. fournir les fichiers, versions et erreurs pertinents ;
2. demander au modèle de signaler les informations manquantes ;
3. préférer les modifications ciblées aux réécritures complètes ;
4. faire exécuter les tests, le linter et le type-checker ;
5. vérifier les affirmations externes dans la documentation officielle.

La règle opérationnelle est : **une réponse générée est une proposition, le
build et les tests sont les arbitres**.

## 3. Structurer une consigne avec RIO

### R — Rôle

Le rôle fixe la posture et le niveau d'expertise utiles à la tâche. Il ne donne
pas au modèle une compétence réelle, mais calibre son vocabulaire et ses
priorités.

Exemple :

> Tu es un développeur Laravel senior, attentif à la sécurité, aux conventions
> du projet et à la maintenabilité. Tu expliques brièvement tes hypothèses.

Un rôle utile est spécifique sans être théâtral. « Expert en tout » n'ajoute
pas de contexte vérifiable.

### I — Instruction

L'instruction rassemble la situation, l'objectif, les entrées, les contraintes
et les critères d'acceptation. Les verbes doivent être observables :
inspecter, modifier, tester, comparer, retourner.

Les **contraintes négatives** sont des garde-fous explicites :

- ne pas modifier les fichiers hors du périmètre ;
- ne pas inventer une API si la documentation n'est pas fournie ;
- ne pas supprimer un test existant ;
- ne pas committer ;
- ne pas produire de tableau Markdown si le format l'interdit.

Elles sont utiles lorsqu'une sortie interdite serait coûteuse, mais une longue
liste de « ne pas » ne remplace pas une instruction positive et testable.

### O — Output

L'output décrit exactement la restitution attendue : langue, sections, format
de patch, liste de fichiers, niveau de détail et preuve de validation.

Exemple :

> Réponds en français avec : (1) hypothèses, (2) fichiers modifiés, (3) patch,
> (4) commande de test et résultat. Si une information manque, écris
> « information manquante » au lieu de l'inventer.

### Gabarit RIO réutilisable

```text
RÔLE
Tu es [rôle technique] dans [contexte]. Priorités : [qualité 1], [qualité 2].

INSTRUCTION
Contexte vérifié : [versions, fichiers, erreur, règles].
Tâche : [verbe + résultat observable].
Périmètre : [fichiers inclus] ; hors périmètre : [fichiers exclus].
Critères d'acceptation : [tests ou conditions mesurables].
Contraintes : [règles positives et garde-fous négatifs].

OUTPUT
Langue : [langue].
Format : [structure exacte].
Preuve attendue : [tests, commandes, limites connues].
```

## 4. Patterns fondamentaux

### Persona Pattern

Attribuer un rôle technique adapte la réponse au domaine et fait apparaître les
risques attendus. Il ne faut toutefois pas confondre persona et autorité :
une persona ne valide ni une dépendance ni un résultat de test.

### Template / Format Pattern

Un squelette réduit les sorties ambiguës. Pour une revue de code, il peut
imposer : `Constat`, `Preuve`, `Impact`, `Correction proposée`, `Test manquant`.
Pour un fichier, il peut imposer les titres et l'ordre des sections.

### Constraint Pattern

Les contraintes bornent le comportement : fichiers modifiables, taille,
langue, licences, commandes autorisées et critères de non-régression. Elles
sont d'autant plus efficaces qu'elles sont vérifiables.

### Step-by-Step et raisonnement

Décomposer une tâche en étapes visibles améliore le contrôle :
inspecter, formuler les hypothèses, modifier, tester, résumer. Il vaut mieux
demander un **plan court et des preuves** qu'exiger la divulgation d'un
raisonnement interne détaillé. La qualité se vérifie par les artefacts et les
tests, pas par la longueur de l'explication.

### Few-Shot Pattern

Fournir un ou plusieurs exemples d'entrée et de sortie montre le niveau de
détail, le vocabulaire et le format attendus. L'exemple doit être représentatif
et ne doit pas introduire de règle contradictoire.

### Reflective Pattern

Demander une auto-vérification structurée avant la livraison :

- chaque critère d'acceptation est-il couvert ?
- quelles hypothèses restent non vérifiées ?
- quelles commandes ont réellement été exécutées ?

Cette réflexion est un contrôle auxiliaire, pas une preuve indépendante. Un
test automatisé reste préférable lorsqu'il est possible.

## 5. Zero-Shot et Few-Shot en développement web

### Comparaison

| Approche | Principe | Cas adapté | Risque |
| --- | --- | --- | --- |
| Zero-Shot | Décrire la tâche sans exemple | Générer une route Laravel standard à partir de conventions déjà connues | Format ou conventions locaux mal devinés |
| Few-Shot | Ajouter des exemples entrée-sortie | Reproduire le style des contrôleurs et réponses JSON du projet | Copier une erreur ou suradapter l'exemple |

**Exemple zero-shot :**

> Dans ce dépôt Laravel, ajoute une route `GET /articles/{article}` qui
> retourne l'article ou une 404. Respecte les conventions existantes et ajoute
> un test feature. Commence par inspecter les routes et contrôleurs concernés.

**Exemple few-shot :**

> Voici deux contrôleurs du projet et leurs tests (extraits). Ils utilisent
> l'injection de dépendances, retournent des ressources JSON et nomment les
> tests avec `it(...)`. Ajoute la route de détail d'article en reproduisant
> exactement ces conventions, puis indique les fichiers modifiés et le test.

Le few-shot est préférable lorsque le style local ou le format est plus
important que la connaissance générale. Il ne dispense pas de fournir les
fichiers à jour.

## 6. Context Engineering

Le **Context Engineering** consiste à construire, à chaque tâche, le contexte
utile que le modèle recevra : instructions, état du dépôt, extraits de code,
résultats d'outils, règles de contribution et critères de validation.

Un LLM ne dispose pas d'une mémoire implicite fiable entre deux sessions. La
fenêtre de contexte est finie : trop d'informations noie les contraintes
importantes, tandis qu'un contexte insuffisant pousse le modèle à compléter
les blancs.

### Méthode appliquée au développement

1. **Inventorier** : objectif, branche, état Git, fichiers touchés, versions.
2. **Sélectionner** : fournir les symboles et appels pertinents plutôt que tout
   le dépôt.
3. **Hiérarchiser** : règles système, conventions du projet, tâche, exemples,
   critères d'acceptation.
4. **Ancrer** : citer les chemins et lignes utiles, préciser ce qui est
   vérifié ou hypothétique.
5. **Boucler** : modifier peu, exécuter une validation, injecter l'erreur
   réelle, corriger puis revalider.

Le contexte doit être **minimal mais suffisant**. Un résumé ne doit pas
remplacer un fichier nécessaire à la compréhension d'un contrat ou d'une
régression.

## 7. Expérimentation : contraintes négatives et reproductibilité

### Protocole reproductible

Pour comparer les effets d'une consigne, conserver le même modèle, la même
version de dépôt, la même température, les mêmes fichiers et le même nombre
d'essais. Ne changer qu'une variable : l'ajout de contraintes négatives.

- **A — baseline** : « Ajoute un endpoint de liste d'articles. »
- **B — contraintes** : même demande, avec « ne modifie que `routes/` et
  `tests/`, n'ajoute aucune dépendance, ne supprime aucun test, retourne le
  format JSON existant et indique le test exécuté ».
- **Mesures** : nombre de fichiers hors périmètre, critères respectés,
  tests passants, format respecté et hypothèses inventées.

Une observation qualitative attendue est que B réduit les sorties hors
périmètre et facilite la revue. Elle peut aussi rendre la réponse trop rigide
si les contraintes sont contradictoires ou impossibles. Il faut donc publier
les paramètres et les sorties, et ne pas présenter cette hypothèse comme une
mesure universelle.

### Résultat pratique

Les contraintes négatives améliorent surtout la **conformité observable**,
pas la vérité du code. Elles rendent une erreur plus facile à détecter ; elles
ne remplacent ni la documentation ni l'exécution des tests.

## 8. Checklist avant envoi

- [ ] Le rôle est-il utile à la tâche ?
- [ ] Le contexte est-il daté, localisé et limité au nécessaire ?
- [ ] La tâche possède-t-elle un résultat observable ?
- [ ] Les critères d'acceptation sont-ils mesurables ?
- [ ] Les fichiers hors périmètre et interdictions sont-ils explicites ?
- [ ] Le format de sortie est-il directement exploitable ?
- [ ] Les informations manquantes doivent-elles être signalées ?
- [ ] Une commande de test ou une vérification est-elle demandée ?

## 9. Sources consultées

- [Google — Language models](https://developers.google.com/machine-learning/crash-course/llm)
  : tokens, prédiction du token suivant et génération.
- [NIST AI 600-1, Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1)
  : risques de confabulation/hallucination et nécessité de l'évaluation.
- [OpenAI — Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering)
  : instructions claires, séparation du contexte et exemples.
- [Anthropic — Building effective agents](https://www.anthropic.com/research/building-effective-agents)
  : outils, boucles d'agent et distinction entre orchestration et autonomie.
- [Wei et al. — Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903)
  : étude de la décomposition en étapes intermédiaires.

La méthode RIO et le protocole A/B sont une synthèse personnelle adaptée à ce
travail ; ils ne sont pas présentés comme une norme officielle issue de ces
sources.
