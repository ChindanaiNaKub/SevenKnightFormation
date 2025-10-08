/**
 * Update pet data with local image paths
 * Replaces external URLs and placeholders with local images
 */

const fs = require('fs');
const path = require('path');

const PETS_FILE = path.join(__dirname, 'sevenbuilder/src/data/pets.ts');
const IMAGES_MAP_FILE = path.join(__dirname, 'sevenbuilder/src/data/petImages.json');

console.log('🔄 Updating pet data with local images...\n');

// Read the pet images mapping
const imageMapping = JSON.parse(fs.readFileSync(IMAGES_MAP_FILE, 'utf-8'));

// Read the pets.ts file
let petsContent = fs.readFileSync(PETS_FILE, 'utf-8');

// Create backup
const backupFile = PETS_FILE + '.backup';
fs.writeFileSync(backupFile, petsContent, 'utf-8');
console.log(`💾 Backup created: ${backupFile}\n`);

let updatedCount = 0;
let notFoundCount = 0;
const notFoundPets = [];

// Function to normalize name for matching
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/[_\s-]/g, '')
    .trim();
}

// Function to find image for pet name
function findImage(petName) {
  // Try exact match first
  if (imageMapping[petName]) {
    return imageMapping[petName];
  }
  
  // Try with spaces replaced by underscores
  const nameWithUnderscores = petName.replace(/\s/g, '_');
  if (imageMapping[nameWithUnderscores]) {
    return imageMapping[nameWithUnderscores];
  }
  
  // Try normalized matching
  const normalizedTarget = normalizeName(petName);
  for (const [key, value] of Object.entries(imageMapping)) {
    if (normalizeName(key) === normalizedTarget) {
      return value;
    }
  }
  
  return null;
}

// Replace images in the file
// Pattern: name: 'PetName', followed by image: '...'
const petPattern = /name:\s*'([^']+)',\s*\n\s*image:\s*'([^']+)'/g;

petsContent = petsContent.replace(petPattern, (match, name, oldImage) => {
  const newImage = findImage(name);
  
  if (newImage) {
    console.log(`✓ ${name}: ${oldImage.substring(0, 50)}... → ${newImage}`);
    updatedCount++;
    return `name: '${name}',\n    image: '${newImage}'`;
  } else {
    console.log(`⚠️  ${name}: No image found, keeping current`);
    notFoundCount++;
    notFoundPets.push(name);
    return match;
  }
});

// Write the updated file
fs.writeFileSync(PETS_FILE, petsContent, 'utf-8');

console.log('\n' + '='.repeat(50));
console.log('📊 Update Summary:');
console.log(`   ✓ Updated: ${updatedCount}`);
console.log(`   ⚠️  Not found: ${notFoundCount}`);
if (notFoundPets.length > 0) {
  console.log(`   Missing: ${notFoundPets.join(', ')}`);
}
console.log(`   📁 File: ${PETS_FILE}`);
console.log('='.repeat(50));
console.log('\n✅ Pet data updated successfully!');
console.log(`💡 Backup saved at: ${backupFile}`);
