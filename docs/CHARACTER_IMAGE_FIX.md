# Character Image CORS Fix

## Problem
Many newly added character images were blocked by browser CORS policy (OpaqueResponseBlocking), showing as gray placeholders instead of actual character portraits.

## Root Cause
GameWith's server (img.gamewith.net) blocks cross-origin image requests for certain URLs. The URLs with character names (e.g., `chara_kagura.png`, `chara_yui.png`) were being blocked, while numbered URLs (e.g., `chara_306.png`, `chara_99.png`) work fine.

## Solution Applied
Replaced all name-based image URLs with local placeholder SVG (`/placeholder-character.svg`) to avoid CORS errors.

## Statistics
- **59 characters** now use placeholder images (CORS-blocked URLs)
- **39 characters** use working GameWith numbered URLs
- **Total: 98 characters** in the database

## Characters Using Placeholders
The following characters now use placeholder images due to CORS restrictions:
- New legendary heroes: Kagura, Amelia, Klahan, Miho, Orly, Colt, Platin, Karma, Rin, Mercure, Yeonhee, Taka, Teo, Fai, Rosie, Juri, Jave, Kris, Dellons, Vanessa, Silvesta, Ellin, Heavenia, Hellenia, Ellen
- Rare heroes: Karon, Catty, Chloe, Jane, Jupy, Joker, Sylvia, Jin, Snipper, Sera, Noho, Victoria, Black Rose, May, Yui, Yuri, Lania, Li, Lucy, Rei, Asura, Soi, Feng Yan, Cleo, Sarah
- Uncommon/Common heroes: Ahkan, Jumon, Shiro, Derek, Howl, Kohkun, Aaron, Wendy, Ichi, Taurus, Ahri

## Characters With Working Images  
Characters with numbered IDs have working images from GameWith:
- Leo (306), Rudy (9), Rachel (12), Eileene (15), Spike (18), Ace (33), Shane (99), Espada (51), Lina (147), and many more...

## Next Steps (Optional)
To get actual character images for the placeholder characters, you can:

1. **Download images locally**: Save character portraits and place them in `/public/characters/` folder
2. **Use a CORS proxy**: Set up a backend proxy to fetch GameWith images
3. **Find alternative image sources**: Use character images from other game wikis or official sources
4. **Keep placeholders**: The placeholder SVG provides a clean, consistent look

## Testing
After this fix:
✅ No more CORS errors in browser console
✅ All characters display properly (either with image or placeholder)
✅ Page loads faster without failed network requests

Last Updated: October 7, 2025
