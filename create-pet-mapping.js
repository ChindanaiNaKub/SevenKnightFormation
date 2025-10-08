/**
 * Create pet image mapping
 * Maps pet names to their image files
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, 'sevenbuilder/public/pets');
const OUTPUT_JSON = path.join(__dirname, 'sevenbuilder/src/data/petImages.json');

console.log('🗺️  Creating pet image mapping...\n');

// Get all image files
const files = fs.readdirSync(IMAGE_DIR);

// Create mapping object
const mapping = {};

files.forEach((filename) => {
  const filePath = path.join(IMAGE_DIR, filename);
  
  // Skip if not a file
  if (!fs.statSync(filePath).isFile()) {
    return;
  }
  
  // Get pet name (without extension)
  const name = path.basename(filename, path.extname(filename));
  
  // Create mapping entry
  mapping[name] = `/pets/${filename}`;
  
  console.log(`✓ ${name} → /pets/${filename}`);
});

// Sort the mapping alphabetically
const sortedMapping = Object.keys(mapping)
  .sort()
  .reduce((acc, key) => {
    acc[key] = mapping[key];
    return acc;
  }, {});

// Write JSON file
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(sortedMapping, null, 2), 'utf-8');

console.log('\n' + '='.repeat(50));
console.log('📊 Mapping Summary:');
console.log(`   Total pets: ${Object.keys(mapping).length}`);
console.log(`   Output file: ${OUTPUT_JSON}`);
console.log('='.repeat(50));
console.log('\n✅ Mapping created successfully!');

// Also create a TypeScript version
const TS_OUTPUT = path.join(__dirname, 'sevenbuilder/src/data/petImages.ts');
const tsContent = `/**
 * Pet Image Mapping
 * Auto-generated from downloaded pet images
 * Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
 */

export const petImages: Record<string, string> = ${JSON.stringify(sortedMapping, null, 2)};

/**
 * Get pet image path by name
 * Falls back to placeholder if not found
 */
export function getPetImage(name: string): string {
  // Try exact match first
  if (petImages[name]) {
    return petImages[name];
  }
  
  // Try with underscores replaced by spaces
  const nameWithSpaces = name.replace(/_/g, ' ');
  const foundKey = Object.keys(petImages).find(
    key => key.replace(/_/g, ' ').toLowerCase() === nameWithSpaces.toLowerCase()
  );
  
  if (foundKey) {
    return petImages[foundKey];
  }
  
  // Try with spaces replaced by underscores
  const nameWithUnderscores = name.replace(/\s/g, '_');
  if (petImages[nameWithUnderscores]) {
    return petImages[nameWithUnderscores];
  }
  
  // Fallback to placeholder
  return '/placeholder-pet.svg';
}
`;

fs.writeFileSync(TS_OUTPUT, tsContent, 'utf-8');
console.log(`📝 TypeScript mapping created: ${TS_OUTPUT}\n`);
