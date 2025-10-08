/**
 * Update character data with local image paths
 * Replaces external URLs and placeholders with local images
 */

const fs = require('fs');
const path = require('path');

const CHARACTERS_FILE = path.join(__dirname, 'sevenbuilder/src/data/characters.ts');
const IMAGES_MAP_FILE = path.join(__dirname, 'sevenbuilder/src/data/characterImages.json');

console.log('🔄 Updating character data with local images...\n');

// Read the character images mapping
const imageMapping = JSON.parse(fs.readFileSync(IMAGES_MAP_FILE, 'utf-8'));

// Read the characters.ts file
let charactersContent = fs.readFileSync(CHARACTERS_FILE, 'utf-8');

// Create backup
const backupFile = CHARACTERS_FILE + '.backup';
fs.writeFileSync(backupFile, charactersContent, 'utf-8');
console.log(`💾 Backup created: ${backupFile}\n`);

let updatedCount = 0;
let notFoundCount = 0;
const notFoundCharacters = [];

// Function to normalize name for matching
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/[_\s-]/g, '')
    .trim();
}

// Function to find image for character name
function findImage(characterName) {
  // Try exact match first
  if (imageMapping[characterName]) {
    return imageMapping[characterName];
  }
  
  // Try normalized matching
  const normalizedTarget = normalizeName(characterName);
  for (const [key, value] of Object.entries(imageMapping)) {
    if (normalizeName(key) === normalizedTarget) {
      return value;
    }
  }
  
  return null;
}

// Replace images in the file
// Pattern: name: 'CharacterName', followed by image: '...'
const characterPattern = /name:\s*'([^']+)',\s*\n\s*image:\s*'([^']+)'/g;

charactersContent = charactersContent.replace(characterPattern, (match, name, oldImage) => {
  const newImage = findImage(name);
  
  if (newImage) {
    console.log(`✓ ${name}: ${oldImage.substring(0, 50)}... → ${newImage}`);
    updatedCount++;
    return `name: '${name}',\n    image: '${newImage}'`;
  } else {
    console.log(`⚠️  ${name}: No image found, keeping current`);
    notFoundCount++;
    notFoundCharacters.push(name);
    return match;
  }
});

// Write the updated file
fs.writeFileSync(CHARACTERS_FILE, charactersContent, 'utf-8');

console.log('\n' + '='.repeat(50));
console.log('📊 Update Summary:');
console.log(`   ✓ Updated: ${updatedCount}`);
console.log(`   ⚠️  Not found: ${notFoundCount}`);
if (notFoundCharacters.length > 0) {
  console.log(`   Missing: ${notFoundCharacters.join(', ')}`);
}
console.log(`   📁 File: ${CHARACTERS_FILE}`);
console.log('='.repeat(50));
console.log('\n✅ Character data updated successfully!');
console.log(`💡 Backup saved at: ${backupFile}`);
