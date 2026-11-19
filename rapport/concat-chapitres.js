
/**
 * RAPPORT COMPILER
 * Projet : Blog des Lauréats
 *
 * Compile tous les chapitres dans l'ordre exact de skeleton.md,
 * corrige les chemins d'images, vérifie les ressources et génère rapport-blog.md.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CHAPTERS_DIR = path.join(ROOT, 'chapitres');
const ASSETS_DIR = path.join(ROOT, 'assets');
const OUTPUT_FILE = path.join(ROOT, 'rapport-blog.md');
const SKELETON_FILE = path.join(ROOT, 'skeleton.md');

const FALLBACK_ORDER = [
    '00-Remerciement.md',
    '01-introduction.md',
    '02-Contexte du projet.md',
    '03-Cahier des charges.md',
    '04-Méthodologie de travail.md',
    '05-methode_scrum.md',
    '06-design_thinking.md',
    '07-Planification.md',
    '08-Branche fonctionnelle.md',
    "09-Carte d'empathie.md",
    '10-Définition du problème.md',
    '11-Idéation.md',
    "12-Diagramme de cas d'utilisation.md",
    '13-branch_tecnique.md',
    '14-Stack technologique.md',
    '15-architecture_du_system.md',
    '16-Prototype (fonctionnalités, classes).md',
    '17-Conception.md',
    '18-Diagramme de classes.md',
    '19-Maquettes.md',
    '20-Réalisation.md',
    '21-Interfaces.md',
    '22-rapport-methode-agile-template.md',
    '23-02-conclusion.md'
];

const isMarkdown = name => name.toLowerCase().endsWith('.md');
const isConfigFile = name => /^readme\.md$/i.test(name);
const normalizeName = name => name.normalize('NFC').toLocaleLowerCase('fr-FR');
const skeletonNameWithoutNumber = name => {
    const base = path.basename(name, path.extname(name));
    const stripped = base
        .replace(/^(\d+\s*[-_.]\s*)+/g, '')
        .replace(/^(\d+\s*[-_.]\s*)+/g, '');
    return normalizeName(stripped + path.extname(name));
};

function readSkeletonOrder() {
    if (!fs.existsSync(SKELETON_FILE)) {
        return FALLBACK_ORDER.slice();
    }

    const text = fs.readFileSync(SKELETON_FILE, 'utf8');
    const names = [];

    for (const line of text.split(/\r?\n/)) {
        const match = line.match(/(?:^|[\s*`])([^<>\r\n]*?\.md)(?:\)|]|>|`)?\s*$/i);
        if (!match) continue;

        let candidate = match[1].trim();
        candidate = candidate.replace(/^[-*]\s*/, '').replace(/^\d+[.)]\s*/, '');
        candidate = path.basename(candidate);
        if (candidate && isMarkdown(candidate) && !names.includes(candidate)) {
            names.push(candidate);
        }
    }

    return names.length > 0 ? names : FALLBACK_ORDER.slice();
}

function isConclusionFile(name) {
    const base = path.basename(name, path.extname(name)).toLocaleLowerCase('fr-FR');
    return base === '02-conclusion' ||
        base === 'conclusion' ||
        /\bconclusion\b/i.test(base);
}

function titleFromFilename(filename) {
    const base = path.basename(filename, path.extname(filename));
    const withoutNumber = base.replace(/^\d+\s*[-_.]\s*/, '');
    return withoutNumber.replace(/[_-]+/g, ' ').trim();
}

function prepareTitle(filename, content) {
    if (isConclusionFile(filename)) {
        if (!/^#\s+/m.test(content)) {
            return `# Conclusion\n\n${content}`.trim();
        }
        return content.replace(/^#\s+[^\r\n]*(?:\r?\n)?/, '# Conclusion\n');
    }

    const h1Match = content.match(/^#\s+([^\r\n]+)/m);
    if (h1Match) {
        const normalized = h1Match[1].replace(/^Chapitre\s+\d+\s*:\s*/i, '').trim();
        if (normalized && normalized !== h1Match[1]) {
            return content.replace(/^#\s+[^\r\n]+/, `# ${normalized}`);
        }
        return content;
    }

    if (!content.trim()) {
        return `# ${titleFromFilename(filename)}`;
    }

    return `# ${titleFromFilename(filename)}\n\n${content.trim()}`;
}

function normalizeImagePath(rawPath) {
    let imagePath = rawPath.trim();
    if (imagePath.startsWith('<') && imagePath.endsWith('>')) {
        imagePath = imagePath.slice(1, -1);
    }

    imagePath = decodeURIPath(imagePath);
    imagePath = imagePath.split(/[?#]/)[0];

    if (/^(?:https?:|data:|#)/i.test(imagePath)) return null;

    let relativePath = imagePath
        .replace(/\\/g, '/')
        .replace(/^\.\/assets\//i, 'assets/')
        .replace(/^\.{1,2}\/assets\//i, 'assets/')
        .replace(/^\/assets\//i, 'assets/');

    if (!/^assets\//i.test(relativePath)) {
        const assetsMatch = relativePath.match(/(?:^|\/)assets\/(.+)$/i);
        if (assetsMatch) relativePath = `assets/${assetsMatch[1]}`;
    }

    return relativePath;
}

function decodeURIPath(imagePath) {
    try {
        return decodeURIComponent(imagePath);
    } catch {
        return imagePath;
    }
}

function prepareImages(filename, content) {
    const checkedImages = new Map();
    const missingImages = [];

    const processReference = (rawPath, original) => {
        const relativePath = normalizeImagePath(rawPath);
        if (!relativePath) return original;

        const absolutePath = path.resolve(ROOT, relativePath);
        const extension = path.extname(relativePath).toLowerCase();
        const allowed = ['.png', '.jpg', '.jpeg', '.webp'];

        if (!allowed.includes(extension) || !fs.existsSync(absolutePath)) {
            missingImages.push({
                chapitre: filename,
                image: relativePath
            });
            console.log(`  ! Image manquante : ${relativePath}`);
        } else {
            checkedImages.set(relativePath, true);
            console.log(`  ✓ Image vérifiée : ${relativePath}`);
        }

        return original.replace(rawPath, relativePath);
    };

    content = content.replace(
        /!\[([^\]]*)\]\(\s*(?:<([^>\r\n]+)>|([^)\r\n]+))(?:\s+"[^"]*")?\s*\)/g,
        (match, _alt, anglePath, normalPath) => {
            const rawPath = (anglePath || normalPath || '').trim();
            return processReference(rawPath, match);
        }
    );

    content = content.replace(
        /(<img\b[^>]*\bsrc\s*=\s*)(["'])([^"']+)\2/gi,
        (match, prefix, quote, rawPath) => {
            const relativePath = normalizeImagePath(rawPath);
            if (!relativePath) return match;

            const absolutePath = path.resolve(ROOT, relativePath);
            const extension = path.extname(relativePath).toLowerCase();
            const allowed = ['.png', '.jpg', '.jpeg', '.webp'];

            if (!allowed.includes(extension) || !fs.existsSync(absolutePath)) {
                missingImages.push({ chapitre: filename, image: relativePath });
                console.log(`  ! Image manquante : ${relativePath}`);
            } else {
                if (!checkedImages.has(relativePath)) checkedImages.set(relativePath, true);
                console.log(`  ✓ Image vérifiée : ${relativePath}`);
            }

            return `${prefix}${quote}${relativePath}${quote}`;
        }
    );

    return { content, checkedImages, missingImages };
}

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

const allFiles = fs.readdirSync(CHAPTERS_DIR, { withFileTypes: true })
    .filter(entry => entry.isFile() && isMarkdown(entry.name))
    .map(entry => entry.name);

const chapterFiles = allFiles.filter(name => !isConfigFile(name));
const skeletonOrder = readSkeletonOrder();
const conclusionNames = chapterFiles.filter(isConclusionFile);
const conclusionName = conclusionNames[0] || '02-conclusion.md';

const ordered = [];
const used = new Set();
const missingFromSkeleton = [];

for (const name of skeletonOrder) {
    const actual = chapterFiles.find(file =>
        normalizeName(file) === normalizeName(name) ||
        skeletonNameWithoutNumber(file) === skeletonNameWithoutNumber(name)
    );
    if (actual) {
        if (isConclusionFile(actual)) continue;
        ordered.push(actual);
        used.add(normalizeName(actual));
    } else {
        missingFromSkeleton.push(name);
    }
}

const extras = chapterFiles.filter(name =>
    !used.has(normalizeName(name)) &&
    !isConclusionFile(name)
);

ordered.push(...extras);

if (conclusionName && chapterFiles.some(name => normalizeName(name) === normalizeName(conclusionName))) {
    ordered.push(conclusionName);
}

const emptyChapterNames = [];
const missingImages = [];
let verifiedImageCount = 0;
let reportContent = `# Rapport de Projet : Blog des Lauréats

> Document consolidé à partir des chapitres modulaires.

> Date de génération : ${new Date().toISOString().split('T')[0]}

---

`;

let compiledCount = 0;

for (let index = 0; index < ordered.length; index++) {
    const filename = ordered[index];
    const sourceFile = path.join(CHAPTERS_DIR, filename);

    console.log(`\n[${index + 1}/${ordered.length}] ${filename}`);

    let content = fs.readFileSync(sourceFile, 'utf8');
    if (!content.trim()) {
        emptyChapterNames.push(filename);
        console.log('  ! Chapitre vide : titre généré automatiquement');
    }

    content = prepareTitle(filename, content);

    const imageResult = prepareImages(filename, content);
    content = imageResult.content;
    verifiedImageCount += imageResult.checkedImages.size;
    missingImages.push(...imageResult.missingImages);

    reportContent += `${content.trim()}\n\n---\n\n`;
    compiledCount++;
    console.log('  ✓ Chapitre ajouté');
}

fs.writeFileSync(OUTPUT_FILE, reportContent, 'utf8');

console.log('\n======================================');
console.log('         BILAN DE COMPILATION');
console.log('======================================');
console.log(`Nombre total de fichiers Markdown détectés : ${allFiles.length}`);
console.log(`Nombre de chapitres compilés              : ${compiledCount}`);
console.log(`Nombre de chapitres vides                 : ${emptyChapterNames.length}`);
console.log(`Nombre de fichiers supplémentaires         : ${extras.length}`);
console.log(`Nombre d'images vérifiées                  : ${verifiedImageCount}`);

if (missingImages.length > 0) {
    console.log('\nListe des images manquantes :');
    missingImages.forEach(img => console.log(`- ${img.image} (${img.chapitre})`));
} else {
    console.log('\nListe des images manquantes : aucune');
}

if (missingFromSkeleton.length > 0) {
    console.log('\nListe des fichiers manquants prévus dans le skeleton :');
    missingFromSkeleton.forEach(name => console.log(`- ${name}`));
} else {
    console.log('\nListe des fichiers manquants prévus dans le skeleton : aucun');
}

if (emptyChapterNames.length > 0) {
    console.log('\nListe des chapitres vides :');
    emptyChapterNames.forEach(name => console.log(`- ${name}`));
}
if (extras.length > 0) {
    console.log('\nListe des fichiers supplémentaires :');
    extras.forEach(name => console.log(`- ${name}`));
}

console.log('\n======================================');
console.log('✓ RAPPORT MARKDOWN GENERE');
console.log(`Fichier : ${OUTPUT_FILE}`);
console.log('Commande PDF : npx marp rapport-blog.md --pdf --allow-local-files -o rapport-blog.pdf');
console.log('======================================\n');
