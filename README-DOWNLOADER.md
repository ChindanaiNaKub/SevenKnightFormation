# Seven Knights Character Image Downloader

This script downloads all character images from the GameWith Seven Knights Rebirth character list page.

## Why This Script?

The character images are blocked by CORS when trying to download them directly. This script uses Puppeteer (a headless browser) to bypass CORS restrictions.

## Installation

1. Install dependencies:
```bash
npm install
# or
bun install
```

## Usage

Run the download script:
```bash
npm run download
# or
node download-characters.js
# or with bun
bun run download-characters.js
```

## What It Does

- Loads the character list page: https://gamewith.net/sevenknights-rebirth/70396
- Extracts all character names and image URLs
- Downloads each image to `character-images/` folder
- Skips already downloaded images
- Shows progress and summary

## Output

All images will be saved to: `character-images/`

File naming format: `CharacterName.png` (or `.jpg` depending on source)

## Features

- ✅ Bypasses CORS restrictions
- ✅ Rate limiting to avoid server overload
- ✅ Skip already downloaded images
- ✅ Progress tracking
- ✅ Error handling
- ✅ Download summary report

## Troubleshooting

If the script fails:
1. Make sure you have Node.js installed (v16 or higher recommended)
2. Check your internet connection
3. The website structure might have changed - check the URL
4. Try running with `--no-sandbox` flag (already included)
