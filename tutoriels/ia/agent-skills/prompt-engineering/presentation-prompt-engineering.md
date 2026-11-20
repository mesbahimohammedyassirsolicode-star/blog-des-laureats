---
marp: true
theme: default
size: 16:9
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap');
  :root { --ink: #10243e; --blue: #0866c6; --aqua: #00a9b7; --lime: #c8e93a; --paper: #f6f9fc; --muted: #64748b; }
  section { font-family: 'DM Sans', Arial, sans-serif; color: var(--ink); background: var(--paper); padding: 54px 70px 50px; font-size: 24px; line-height: 1.35; }
  h1, h2, h3 { font-family: 'Space Grotesk', Arial, sans-serif; color: var(--ink); }
  h1 { font-size: 54px; letter-spacing: -1.8px; margin: 0 0 12px; }
  h2 { font-size: 36px; letter-spacing: -1px; margin: 0 0 25px; }
  h3 { font-size: 23px; margin: 0 0 9px; color: var(--blue); }
  h2::after { content: ''; display: block; width: 56px; height: 5px; margin-top: 11px; background: var(--lime); border-radius: 4px; }
  p, li { font-size: 23px; }
  ul { padding-left: 1.15em; }
  li { margin: 9px 0; }
  strong { color: var(--blue); }
  table { width: 100%; border-collapse: separate; border-spacing: 0; overflow: hidden; border-radius: 12px; font-size: 20px; }
  th { background: var(--blue); color: white; padding: 12px 16px; text-align: left; }
  td { padding: 13px 16px; background: white; border-bottom: 2px solid var(--paper); }
  tr:last-child td { border-bottom: 0; }
  code { font-size: 17px; }
  a { color: var(--blue); }
  section::after { color: var(--blue); font-weight: 700; }
  section.title { color: white; background: linear-gradient(125deg, #06264a 0%, #0866c6 62%, #00a9b7 100%); }
  section.title h1, section.title h2, section.title strong { color: white; }
  section.title h2::after { background: var(--lime); }
  section.title::before { content: ''; position: absolute; width: 520px; height: 520px; border: 70px solid rgba(200,233,58,.22); border-radius: 50%; right: -210px; top: -260px; }
  section.dark { color: #eef7ff; background: #10243e; }
  section.dark h1, section.dark h2, section.dark h3, section.dark strong { color: white; }
  section.dark h2::after { background: var(--lime); }
  section.dark td { color: var(--ink); }
  section.split { display: grid; grid-template-columns: 1fr 1fr; column-gap: 55px; align-content: center; }
  section.split h2 { grid-column: 1 / -1; }
  .logos { position: absolute; top: 44px; right: 65px; display: flex; gap: 18px; align-items: center; }
  .logos img { height: 46px; max-width: 130px; object-fit: contain; }
---

<!-- _class: title -->
<div class="logos"><img src="../../../../presentations/images/ofppt-logo.png" alt="OFPPT"><img src="../../../../presentations/images/solicode-logo.png" alt="Solicode"></div>

# Prompt Engineering

### Comprendre, structurer, vérifier

- **Apprenant** : Mohammed Yassir Mesbahi
- **Encadrant** : ES-SARRAJ Fouad

---

<!-- _class: plan -->

# Plan

1. Comprendre les LLM et les hallucinations
2. Structurer une consigne avec RIO
3. Découvrir les patterns de prompt
4. Comparer Zero-Shot et Few-Shot
5. Appliquer le Context Engineering
6. Expérimenter les contraintes négatives
7. Retenir les bonnes pratiques

---

## Objectifs

- Expliquer ce qu'un LLM produit réellement.
- Structurer une consigne avec **Rôle, Instruction, Output**.
- Choisir entre zero-shot et few-shot.
- Réduire les hallucinations par le contexte et la validation.
- Appliquer ces principes à un développement web.

---

## Un LLM en une image

1. Le texte est découpé en **tokens**.
2. Le Transformer analyse le contexte.
3. Il estime une distribution pour le prochain token.
4. Un token est choisi, puis le cycle recommence.

> Une réponse est une génération conditionnée par le contexte, pas une preuve
> que chaque affirmation est vraie.

---

## Pourquoi les hallucinations ?

- Le modèle optimise une continuation plausible.
- Une API, une version ou un fichier absent peut être complété « au style ».
- L'assurance du ton ne mesure pas la fiabilité.

### Garde-fous

- fournir les fichiers et versions utiles ;
- demander de signaler les informations manquantes ;
- exécuter tests, linter et type-checker ;
- vérifier les sources officielles.

---

## RIO : une consigne en trois blocs

### R — Rôle

Expertise et posture attendues.

### I — Instruction

Contexte, tâche, périmètre, critères et interdictions.

### O — Output

Langue, structure, format et preuve de validation.

---

## R — Rôle

> Tu es un développeur Laravel senior, attentif à la sécurité et aux
> conventions du dépôt. Tu explicites brièvement tes hypothèses.

- calibre le vocabulaire et le niveau d'analyse ;
- rend les priorités explicites ;
- ne remplace pas une documentation ni un test.

---

## I — Instruction

Une instruction robuste répond à quatre questions :

- **Quelle tâche ?** Ajouter un endpoint de détail.
- **Quel contexte ?** Routes, contrôleur, version, modèle existants.
- **Quel périmètre ?** Fichiers inclus et exclus.
- **Quel succès ?** Réponse 200/404 et test feature passant.

Les contraintes négatives bloquent les dérives coûteuses :
« ne pas ajouter de dépendance », « ne pas supprimer de test ».

---

## O — Output

Exemple de contrat de sortie :

1. hypothèses et informations manquantes ;
2. fichiers modifiés ;
3. patch ciblé ;
4. commande et résultat du test ;
5. limites connues.

Le format est utile lorsqu'il est vérifiable et directement réutilisable.

---

## Les patterns essentiels

- **Persona** : cadrer l'expertise.
- **Template / Format** : imposer un squelette.
- **Constraint** : borner les actions.
- **Step-by-step** : inspecter, modifier, tester, résumer.
- **Few-shot** : montrer des exemples conformes.
- **Reflective** : auditer les critères et les hypothèses.

La preuve finale reste le résultat du test, pas la longueur de l'explication.

---

## Zero-shot ou few-shot ?

### Zero-shot

Une demande sans exemple. Rapide pour une tâche standard et bien spécifiée.

### Few-shot

La demande est accompagnée d'exemples entrée-sortie. Utile pour reproduire le
style local, les noms et le format d'une API.

**Attention :** un exemple incorrect est également appris et reproduit.

---

## Exemple web

### Zero-shot

> Ajoute `GET /articles/{article}`, retourne l'article ou 404, respecte les
> conventions du dépôt et ajoute un test feature.

### Few-shot

> Voici deux contrôleurs et leurs tests. Reproduis leur injection, leur
> ressource JSON et leur convention de nommage pour l'endpoint de détail.

Dans les deux cas, on inspecte le dépôt avant de modifier.

---

## Context Engineering

Le contexte est un assemblage contrôlé de :

- règles de contribution ;
- état Git et branche ;
- fichiers et symboles pertinents ;
- versions et erreurs réelles ;
- exemples et critères d'acceptation ;
- résultats des outils précédents.

**Minimal mais suffisant** : trop peu laisse place à l'invention, trop de
contexte noie les contraintes importantes.

---

## Boucle fiable de développement

1. Inventorier l'objectif et le périmètre.
2. Sélectionner les fichiers nécessaires.
3. Donner les critères et les garde-fous.
4. Modifier de façon ciblée.
5. Exécuter les validations.
6. Injecter l'erreur réelle et corriger.

Le contexte se met à jour avec des preuves, pas avec des suppositions.

---

## Expérience : les contraintes négatives

Même tâche, mêmes paramètres, deux variantes :

- **A** : « Ajoute un endpoint de liste d'articles. »
- **B** : « Modifie seulement `routes/` et `tests/`, n'ajoute aucune
  dépendance, ne supprime aucun test, respecte le JSON existant et indique le
  test exécuté. »

Mesures : fichiers hors périmètre, critères respectés, tests passants,
hypothèses inventées.

---

## Ce que l'expérience permet de conclure

- Les contraintes améliorent la **conformité observable**.
- Elles facilitent la revue et la reproductibilité du protocole.
- Elles ne garantissent pas la vérité du code.
- Des contraintes contradictoires peuvent dégrader la réponse.

Pour comparer honnêtement : même modèle, version, température, dépôt et nombre
d'essais ; une seule variable change.

---

## Synthèse

Un prompt efficace est un contrat :

- **RIO** organise l'intention ;
- les patterns stabilisent le format et la posture ;
- le Context Engineering fournit les bonnes preuves ;
- les tests décident si le code est acceptable.

> Générer plus précisément ne signifie pas générer vrai.  
> Il faut toujours vérifier.

---

## Pour aller plus loin

- [Google — Language models](https://developers.google.com/machine-learning/crash-course/llm)
- [NIST — Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1)
- [OpenAI — Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic — Building effective agents](https://www.anthropic.com/research/building-effective-agents)
- [Wei et al. — Chain-of-Thought](https://arxiv.org/abs/2201.11903)
