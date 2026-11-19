
/**
 * RAPPORT COMPILER
 * Projet : Blog des Lauréats
 *
 * - Respecte l'ordre du skeleton
 * - Concatène les chapitres Markdown
 * - Corrige les chemins des images
 * - Vérifie les images et les chapitres
 * - Génère rapport-blog.md
 *
 * Usage : node concat-chapitres.js
 */

const fs = require('fs');
const path = require('path');

// ======================================
// 1. CONFIGURATION
// ======================================

const ROOT = __dirname;
const CHAPTERS_DIR = path.join(ROOT, 'chapitres');
const ASSETS_DIR = path.join(ROOT, 'assets');
const OUTPUT_FILE = path.join(ROOT, 'rapport-blog.md');

const ordreChapitres = [
    'Remerciement.md',
    '01-introduction.md',
    'Contexte du projet.md',
    'Cahier des charges.md',

    'Méthodologie de travail.md',
    'methode_scrum.md',
    'processus_2tup.md',
    'design_thinking.md',

    'Planification.md',

    'Branche fonctionnelle.md',
    "Carte d'empathie.md",
    'Définition du problème.md',
    'Idéation.md',
    "Diagramme de cas d'utilisation.md",

    'branch_technique.md',
    'Stack technologique.md',
    'architecture_du_system.md',
    'Prototype (fonctionnalités, classes).md',

    'Conception.md',
    'Diagramme de classes.md',
    'Maquettes.md',

    'Réalisation.md',
    'Interfaces.md',

    '02-conclusion.md'
];

// ======================================
// 2. INITIALISATION
// ======================================

console.log('\n======================================');
console.log('   BLOG DES LAUREATS - RAPPORT');
console.log('======================================\n');

if (!fs.existsSync(CHAPTERS_DIR)) {
    console.error('ERREUR : dossier chapitres introuvable.');
    process.exit(1);
}

if (!fs.existsSync(ASSETS_DIR)) {
    console.error('ERREUR : dossier assets introuvable.');
    process.exit(1);
}

let rapport = `---
marp: true
theme: default
size: 16:9
paginate: true
---

# Rapport de Projet : Blog des Lauréats

> Document consolidé à partir des chapitres modulaires.

> Date de génération : ${new Date().toISOString().split('T')[0]}

---

`;

const fichiersManquants = [];
const fichiersVides = [];
const imagesManquantes = [];

let compteur = 0;

// ======================================
// 3. TRAITEMENT DES CHAPITRES
// ======================================

ordreChapitres.forEach((nomFichier, index) => {

    const cheminFichier = path.join(CHAPTERS_DIR, nomFichier);

    console.log(`\n[${index + 1}/${ordreChapitres.length}] ${nomFichier}`);

    // Vérifier l'existence
    if (!fs.existsSync(cheminFichier)) {
        console.log('  ⚠ Chapitre introuvable');
        fichiersManquants.push(nomFichier);
        return;
    }

    // Lire le chapitre
    let contenu = fs.readFileSync(cheminFichier, 'utf8').trim();

    // Vérifier si le fichier est vide
    if (!contenu) {
        console.log('  ⚠ Chapitre vide');
        fichiersVides.push(nomFichier);
        return;
    }

    // ==================================
    // 4. CORRECTION DES IMAGES
    // ==================================

    contenu = contenu.replace(
        /\]\((?:<([^>]+)>|([^)\s]+(?:%20[^)\s]*)*))(?:\s+"[^"]*")?\)/g,
        (match, anglePath, normalPath) => {

            const imagePath = anglePath || normalPath;

            // Ne pas modifier les URL externes
            if (/^(https?:|data:|#)/i.test(imagePath)) {
                return match;
            }

            // Corriger le chemin relatif
            let nouveauChemin = imagePath.replace(
                /^\.\.\/assets\//,
                'assets/'
            );

            const cheminDecode = decodeURIComponent(
                nouveauChemin.split(/[?#]/)[0]
            );

            const cheminAbsolu = path.resolve(
                ROOT,
                cheminDecode
            );

            // Vérifier l'image
            if (!fs.existsSync(cheminAbsolu)) {
                console.log(`  ⚠ Image introuvable : ${nouveauChemin}`);
                imagesManquantes.push({
                    chapitre: nomFichier,
                    image: nouveauChemin
                });
            } else {
                console.log(`  ✓ Image vérifiée : ${nouveauChemin}`);
            }

            return match.replace(imagePath, nouveauChemin);
        }
    );

    // Ajouter le chapitre
    rapport += contenu + '\n\n---\n\n';

    console.log('  ✓ Chapitre ajouté');
    compteur++;
});

// ======================================
// 5. GENERATION DU RAPPORT
// ======================================

fs.writeFileSync(OUTPUT_FILE, rapport, 'utf8');

// ======================================
// 6. RAPPORT DE VERIFICATION
// ======================================

console.log('\n======================================');
console.log('         BILAN DE COMPILATION');
console.log('======================================');

console.log(`Chapitres ajoutés     : ${compteur}`);
console.log(`Chapitres manquants   : ${fichiersManquants.length}`);
console.log(`Chapitres vides       : ${fichiersVides.length}`);
console.log(`Images manquantes     : ${imagesManquantes.length}`);

if (fichiersManquants.length > 0) {
    console.log('\n--- CHAPITRES MANQUANTS ---');
    fichiersManquants.forEach(f => console.log(`- ${f}`));
}

if (fichiersVides.length > 0) {
    console.log('\n--- CHAPITRES VIDES ---');
    fichiersVides.forEach(f => console.log(`- ${f}`));
}

if (imagesManquantes.length > 0) {
    console.log('\n--- IMAGES MANQUANTES ---');
    imagesManquantes.forEach(img => {
        console.log(`- ${img.image} (${img.chapitre})`);
    });
}

// ======================================
// 7. RESULTAT FINAL
// ======================================

console.log('\n======================================');
console.log('✓ RAPPORT MARKDOWN GENERE');
console.log(`Fichier : ${OUTPUT_FILE}`);

if (
    fichiersManquants.length === 0 &&
    fichiersVides.length === 0 &&
    imagesManquantes.length === 0
) {
    console.log('✓ Vérification technique réussie.');
} else {
    console.log('⚠ Des éléments nécessitent une vérification.');
}

console.log('======================================\n');
