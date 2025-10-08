/**
 * Rename character images to cleaner filenames
 * Extracts character names from the messy filenames
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, 'character-images');

console.log('🔧 Renaming character images to cleaner filenames...\n');

// Get all files in the directory
const files = fs.readdirSync(IMAGE_DIR);

let renamedCount = 0;
let skippedCount = 0;

files.forEach((filename) => {
  const oldPath = path.join(IMAGE_DIR, filename);
  
  // Skip if not a file
  if (!fs.statSync(oldPath).isFile()) {
    return;
  }
  
  // Extract character name from the filename
  // Format: _img_src__https___img_gamewith_net_...__alt__CharacterName____CharacterName.png
  const altMatch = filename.match(/__alt__([^_]+)__/);
  
  if (altMatch && altMatch[1]) {
    let characterName = altMatch[1];
    
    // Clean up the name
    characterName = characterName
      .replace(/%20/g, ' ')  // Replace URL encoded spaces
      .replace(/\s+/g, '_')  // Replace spaces with underscores
      .trim();
    
    // Get file extension
    const ext = path.extname(filename);
    
    // Create new filename
    const newFilename = `${characterName}${ext}`;
    const newPath = path.join(IMAGE_DIR, newFilename);
    
    // Check if new filename already exists
    if (fs.existsSync(newPath) && newPath !== oldPath) {
      console.log(`⏭️  Skipped: ${characterName} (file already exists)`);
      skippedCount++;
      return;
    }
    
    // Rename the file
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`✓ Renamed: ${characterName}`);
      renamedCount++;
    } catch (error) {
      console.log(`✗ Failed to rename: ${filename} - ${error.message}`);
    }
  } else {
    console.log(`⚠️  Could not parse: ${filename}`);
    skippedCount++;
  }
});

console.log('\n' + '='.repeat(50));
console.log('📊 Rename Summary:');
console.log(`   ✓ Renamed: ${renamedCount}`);
console.log(`   ⏭️  Skipped: ${skippedCount}`);
console.log(`   📁 Directory: ${IMAGE_DIR}`);
console.log('='.repeat(50));
console.log('\n✅ Renaming completed!');
