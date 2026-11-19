
/**
 * BLOG DES LAUREATS
 * Automatic Markdown Report Compiler
 *
 * - Detect all Markdown files
 * - Include empty chapters
 * - Generate headings for empty files
 * - Respect custom chapter order
 * - Add new files automatically
 * - Correct image paths
 *
 * Usage: node concat-chapitres.js
 */

const fs = require('fs');
const path = require('path');

// ======================================
// 1. CONFIGURATION
// ======================================

const ROOT = __dirname;
const CHAPTERS_DIR = path.join(ROOT, 'chapitres');
const OUTPUT_FILE = path.join(ROOT, 'rapport-blog.md');

// Ordre principal selon skeleton.md
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
// 2. CHECK DIRECTORIES
// ======================================

console.log('\n====================================');
console.log(' BLOG DES LAUREATS - COMPILATION');
console.log('====================================\n');

if (!fs.existsSync(CHAPTERS_DIR)) {
    console.error('Erreur : dossier chapitres introuvable.');
    process.exit(1);
}

// ======================================
// 3. DETECT ALL MARKDOWN FILES
// ======================================

const allFiles = fs.readdirSync(CHAPTERS_DIR)
    .filter(file =>
        file.toLowerCase().endsWith('.md') &&
        file.toLowerCase() !== 'readme.md'
    );

// Files already in the custom order
const orderedFiles = ordreChapitres.filter(file =>
    allFiles.includes(file)
);

// Files not present in the custom order
const additionalFiles = allFiles
    .filter(file => !ordreChapitres.includes(file))
    .sort((a, b) =>
        a.localeCompare(b, undefined, {
            numeric: true,
            sensitivity: 'base'
        })
    );

// Final list: custom order + additional files
const files = [...orderedFiles, ...additionalFiles];

console.log(`Total des fichiers détectés : ${files.length}`);
console.log(`Chapitres principaux : ${orderedFiles.length}`);
console.log(`Fichiers supplémentaires : ${additionalFiles.length}`);

// ======================================
// 4. GENERATE CHAPTER TITLE
// ======================================

function generateTitle(filename) {

    return path.basename(filename, '.md')
        .replace(/[-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, letter => letter.toUpperCase());
}

// ======================================
// 5. REPORT HEADER
// ======================================

let content = `---
marp: true
theme: default
size: 16:9
paginate: true
---

# Rapport de Projet : Blog des Lauréats

> Document consolidé généré automatiquement.

> Date de génération : ${new Date().toISOString().split('T')[0]}

---

`;

// ======================================
// 6. COMPILE ALL CHAPTERS
// ======================================

let compteur = 0;
let chapitresVides = 0;
const imagesManquantes = [];

files.forEach((file, index) => {

    const filePath = path.join(CHAPTERS_DIR, file);

    let chapterContent = fs.readFileSync(
        filePath,
        'utf-8'
    ).trim();

    const title = generateTitle(file);

    console.log(`\n[${index + 1}/${files.length}] ${file}`);

    // Empty chapter: generate a title automatically
    if (!chapterContent) {

        chapterContent = `# ${title}\n\n`;

        console.log('  + Chapitre vide : titre généré');
        chapitresVides++;

    } else {

        // Preserve existing content
        console.log('  + Contenu ajouté');
    }

    // Correct image paths
    chapterContent = chapterContent.replaceAll(
        '../assets/',
        'assets/'
    );

    // Check Markdown images
    const images = [
        ...chapterContent.matchAll(
            /!\[[^\]]*\]\((?:<([^>]+)>|([^)\s]+))[^)]*\)/g
        )
    ];

    images.forEach(match => {

        const imagePath = match[1] || match[2];

        if (/^(https?:|data:)/i.test(imagePath)) {
            return;
        }

        const decodedPath = decodeURIComponent(
            imagePath.split(/[?#]/)[0]
        );

        const absolutePath = path.resolve(
            ROOT,
            decodedPath
        );

        if (!fs.existsSync(absolutePath)) {

            console.log(`  ⚠ Image introuvable : ${imagePath}`);

            imagesManquantes.push({
                chapter: file,
                image: imagePath
            });

        } else {

            console.log(`  ✓ Image trouvée : ${imagePath}`);
        }
    });

    // Add chapter to final report
    content += chapterContent + '\n\n---\n\n';

    compteur++;
});

// ======================================
// 7. GENERATE FINAL FILE
// ======================================

fs.writeFileSync(
    OUTPUT_FILE,
    content,
    'utf-8'
);

// ======================================
// 8. FINAL SUMMARY
// ======================================

console.log('\n====================================');
console.log('       COMPILATION TERMINEE');
console.log('====================================');

console.log(`Fichiers ajoutés       : ${compteur}`);
console.log(`Chapitres vides        : ${chapitresVides}`);
console.log(`Images manquantes      : ${imagesManquantes.length}`);

if (imagesManquantes.length > 0) {

    console.log('\n--- IMAGES MANQUANTES ---');

    imagesManquantes.forEach(item => {
        console.log(
            `- ${item.image} (Chapitre : ${item.chapter})`
        );
    });
}

console.log('\n✓ Rapport généré : rapport-blog.md');
console.log('====================================\n');
