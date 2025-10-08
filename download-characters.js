/**
 * Seven Knights Character Image Downloader
 * Downloads character images from GameWith website
 * Uses puppeteer to bypass CORS restrictions
 */

const puppeteer = require('puppeteer');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const TARGET_URL = 'https://gamewith.net/sevenknights-rebirth/70396';
const OUTPUT_DIR = path.join(__dirname, 'character-images');
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
async function downloadCharacterImages() {
  console.log('🚀 Starting character image download...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    console.log('📄 Loading character list page...');
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Scroll to load lazy images
    console.log('� Scrolling to load all images...');
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
    
    console.log('�🔍 Extracting character data...\n');
    
    // Extract character data from the page
    const characters = await page.evaluate(() => {
      const results = [];
      
      // Find all character rows in the table
      const rows = document.querySelectorAll('table tbody tr');
      
      rows.forEach((row) => {
        try {
          // Get character image - look for the character portrait specifically
          const imgElement = row.querySelector('td:first-child img');
          if (!imgElement) return;
          
          // Get the actual loaded src (not data-src)
          let imgSrc = imgElement.currentSrc || imgElement.src;
          
          // Skip if it's still a placeholder or data URL
          if (!imgSrc || imgSrc.includes('data:image') || imgSrc.includes('transparent1px')) {
            return;
          }
          
          // Get character name from the link text
          const nameElement = row.querySelector('td:first-child a');
          const name = nameElement ? nameElement.textContent.trim() : '';
          
          // Only include if it's a character image (has chara_ in URL)
          if (name && imgSrc && imgSrc.includes('chara_')) {
            results.push({
              name: name,
              imageUrl: imgSrc
            });
          }
        } catch (e) {
          // Skip rows that don't match expected structure
        }
      });
      
      return results;
    });
    
    console.log(`✓ Found ${characters.length} characters\n`);
    
    if (characters.length === 0) {
      console.log('⚠️  No characters found. The page structure might have changed.');
      return;
    }
    
    // Download each character image
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const sanitizedName = char.name.replace(/[^a-zA-Z0-9]/g, '_');
      const ext = path.extname(new URL(char.imageUrl).pathname) || '.png';
      const filename = `${sanitizedName}${ext}`;
      const filepath = path.join(OUTPUT_DIR, filename);
      
      try {
        // Check if file already exists
        if (fs.existsSync(filepath)) {
          console.log(`⏭️  [${i + 1}/${characters.length}] ${char.name} - Already exists, skipping`);
          successCount++;
          continue;
        }
        
        // Download the image
        await downloadImage(char.imageUrl, filepath);
        console.log(`✓ [${i + 1}/${characters.length}] ${char.name} - Downloaded`);
        successCount++;
        
        // Add delay to avoid rate limiting
        if (i < characters.length - 1) {
          await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_DOWNLOADS));
        }
      } catch (error) {
        console.log(`✗ [${i + 1}/${characters.length}] ${char.name} - Failed: ${error.message}`);
        failCount++;
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Download Summary:');
    console.log(`   Total: ${characters.length}`);
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
downloadCharacterImages()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
