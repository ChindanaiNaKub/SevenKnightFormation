/**
 * Seven Knights Pet Image Downloader
 * Downloads pet images from GameWith website
 * Uses puppeteer to bypass CORS restrictions
 */

const puppeteer = require('puppeteer');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration - Try multiple pages that might have pet images
const TARGET_URLS = [
  'https://gamewith.net/sevenknights-rebirth/70753', // Pet tier list
  'https://gamewith.net/sevenknights-rebirth/70384', // Pet guide
];
const OUTPUT_DIR = path.join(__dirname, 'pet-images');
const DELAY_BETWEEN_DOWNLOADS = 500; // ms to avoid rate limiting

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Created directory: ${OUTPUT_DIR}`);
}

// Helper function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete partial file
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Main function
async function downloadPetImages() {
  console.log('🚀 Starting pet image download...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const allPets = new Map(); // Use Map to avoid duplicates
    
    for (const url of TARGET_URLS) {
      const page = await browser.newPage();
      
      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      console.log(`📄 Loading page: ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      
      // Scroll to load lazy images
      console.log('📜 Scrolling to load all images...');
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 100;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      });
      
      // Wait a bit for images to load after scrolling
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('🔍 Extracting pet data...\n');
      
      // Extract pet data from the page
      const pets = await page.evaluate(() => {
        const results = [];
        
        // Look for pet images in tables and links
        const petLinks = document.querySelectorAll('a[href*="pet"]');
        
        petLinks.forEach((link) => {
          try {
            const imgElement = link.querySelector('img');
            if (!imgElement) return;
            
            let imgSrc = imgElement.currentSrc || imgElement.src;
            
            // Skip if it's still a placeholder or data URL
            if (!imgSrc || imgSrc.includes('data:image') || imgSrc.includes('transparent1px')) {
              return;
            }
            
            // Get pet name from alt or link text
            const name = imgElement.alt || link.textContent.trim();
            
            // Only include if it's a pet image
            if (name && imgSrc && (imgSrc.includes('pet') || imgSrc.includes('article_tools'))) {
              results.push({
                name: name.trim(),
                imageUrl: imgSrc
              });
            }
          } catch (e) {
            // Skip
          }
        });
        
        // Also look for images in table cells
        const tableCells = document.querySelectorAll('td');
        tableCells.forEach((cell) => {
          try {
            const imgElement = cell.querySelector('img');
            if (!imgElement) return;
            
            let imgSrc = imgElement.currentSrc || imgElement.src;
            
            if (!imgSrc || imgSrc.includes('data:image') || imgSrc.includes('transparent1px') || imgSrc.includes('tier_rank')) {
              return;
            }
            
            const name = imgElement.alt || cell.textContent.trim();
            
            if (name && imgSrc && imgSrc.includes('pet')) {
              results.push({
                name: name.trim(),
                imageUrl: imgSrc
              });
            }
          } catch (e) {
            // Skip
          }
        });
        
        return results;
      });
      
      // Add pets to the map (avoid duplicates)
      pets.forEach(pet => {
        if (pet.name && pet.imageUrl && !allPets.has(pet.name)) {
          allPets.set(pet.name, pet.imageUrl);
        }
      });
      
      await page.close();
    }
    
    const petsArray = Array.from(allPets.entries()).map(([name, imageUrl]) => ({ name, imageUrl }));
    
    console.log(`✓ Found ${petsArray.length} unique pets\n`);
    
    if (petsArray.length === 0) {
      console.log('⚠️  No pets found. The page structure might have changed.');
      console.log('💡 Trying alternative method to extract pet images from article_tools...\n');
      
      // Fallback: Try to get pet images directly from known pattern
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      await page.goto(TARGET_URLS[0], { waitUntil: 'networkidle2', timeout: 60000 });
      
      await page.evaluate(async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      });
      
      const allImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
          .map(img => ({
            src: img.currentSrc || img.src,
            alt: img.alt || ''
          }))
          .filter(img => img.src && (img.src.includes('pet') || img.alt.toLowerCase().includes('pet')));
      });
      
      console.log(`Found ${allImages.length} images that might be pets`);
      allImages.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img.alt || 'No alt'} - ${img.src.substring(0, 80)}...`);
      });
      
      await page.close();
      return;
    }
    
    // Download each pet image
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < petsArray.length; i++) {
      const pet = petsArray[i];
      const sanitizedName = pet.name.replace(/[^a-zA-Z0-9]/g, '_');
      const ext = path.extname(new URL(pet.imageUrl).pathname) || '.png';
      const filename = `${sanitizedName}${ext}`;
      const filepath = path.join(OUTPUT_DIR, filename);
      
      try {
        // Check if file already exists
        if (fs.existsSync(filepath)) {
          console.log(`⏭️  [${i + 1}/${petsArray.length}] ${pet.name} - Already exists, skipping`);
          successCount++;
          continue;
        }
        
        // Download the image
        await downloadImage(pet.imageUrl, filepath);
        console.log(`✓ [${i + 1}/${petsArray.length}] ${pet.name} - Downloaded`);
        successCount++;
        
        // Add delay to avoid rate limiting
        if (i < petsArray.length - 1) {
          await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_DOWNLOADS));
        }
      } catch (error) {
        console.log(`✗ [${i + 1}/${petsArray.length}] ${pet.name} - Failed: ${error.message}`);
        failCount++;
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Download Summary:');
    console.log(`   Total: ${petsArray.length}`);
    console.log(`   ✓ Success: ${successCount}`);
    console.log(`   ✗ Failed: ${failCount}`);
    console.log(`   📁 Output: ${OUTPUT_DIR}`);
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the script
downloadPetImages()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
