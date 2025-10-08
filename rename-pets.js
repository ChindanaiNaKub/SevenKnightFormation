/**
 * Rename pet images to cleaner filenames
 * Extracts pet names from the messy filenames
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, 'pet-images');

console.log('🔧 Renaming pet images to cleaner filenames...\n');

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
  
  // Clean up the name - already mostly clean from download
  let petName = path.basename(filename, path.extname(filename));
  
  // Remove any remaining underscores or clean up
  petName = petName.replace(/_+/g, '_').trim();
  
  // Get file extension
  const ext = path.extname(filename);
  
  // Create new filename (might be same as old)
  const newFilename = `${petName}${ext}`;
  const newPath = path.join(IMAGE_DIR, newFilename);
  
  if (oldPath === newPath) {
    console.log(`✓ ${petName} (already clean)`);
    skippedCount++;
    return;
  }
  
  // Check if new filename already exists
  if (fs.existsSync(newPath) && newPath !== oldPath) {
    console.log(`⏭️  Skipped: ${petName} (file already exists)`);
    skippedCount++;
    return;
  }
  
  // Rename the file
  try {
    fs.renameSync(oldPath, newPath);
    console.log(`✓ Renamed: ${petName}`);
    renamedCount++;
  } catch (error) {
    console.log(`✗ Failed to rename: ${filename} - ${error.message}`);
  }
});

console.log('\n' + '='.repeat(50));
console.log('📊 Rename Summary:');
console.log(`   ✓ Renamed: ${renamedCount}`);
console.log(`   ⏭️  Already clean: ${skippedCount}`);
console.log(`   📁 Directory: ${IMAGE_DIR}`);
console.log('='.repeat(50));
console.log('\n✅ Renaming completed!');
