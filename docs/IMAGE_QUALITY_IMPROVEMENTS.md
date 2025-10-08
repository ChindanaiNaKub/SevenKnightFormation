# Image Quality Improvements

## Date: October 8, 2025

## Issue
Images displayed on the site appeared to have poor quality, with visible pixelation or blurriness.

## Root Causes Identified

1. **No image rendering optimization**: CSS didn't specify high-quality rendering hints
2. **object-fit: cover**: This property was cropping images, which could distort character portraits
3. **Missing browser-specific optimizations**: No hardware acceleration or anti-aliasing hints

## Changes Made

### 1. Global Image Quality Settings (`style.css`)
Added global CSS rules to improve image rendering across all images:

```css
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: high-quality;
  -ms-interpolation-mode: nearest-neighbor;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
```

**Benefits:**
- `image-rendering: high-quality` - Forces browser to use best quality algorithm
- `backface-visibility: hidden` - Enables GPU acceleration
- `transform: translateZ(0)` - Forces hardware acceleration layer

### 2. Component-Specific Updates

#### Changed from `object-fit: cover` to `object-fit: contain`
- **CharacterSlot.vue** - Formation character cards
- **CharacterCard.vue** - Character roster cards
- **CharacterSelectionModal.vue** - Character selection portraits
- **PetSlot.vue** - Pet formation slots
- **PetCard.vue** - Pet roster cards
- **PetSelectionModal.vue** - Pet selection portraits

**Why this matters:**
- `contain`: Preserves full image without cropping, maintaining aspect ratio
- `cover`: Crops image to fill container, potentially cutting off important details
- Added `object-position: center` for proper centering

#### Added image-rendering properties to all components:
```css
image-rendering: -webkit-optimize-contrast;
image-rendering: high-quality;
```

### 3. Export Quality (Already Optimized)
The screenshot export was already using optimal settings:
- Scale factor: 3x (for high DPI displays)
- PNG format with 1.0 quality (maximum)
- CORS enabled for cross-origin images

## Expected Results

After these changes, you should see:

1. **Sharper character portraits** - Full images visible without cropping
2. **Better edge quality** - Reduced pixelation on character borders
3. **Improved clarity** - Especially noticeable on smaller character cards
4. **Better scaling** - Images maintain quality when resized
5. **Hardware acceleration** - Smoother rendering and scrolling

## Testing

To verify improvements:
1. Open the application at http://localhost:5173/
2. Add characters to formation
3. Compare image quality in:
   - Formation grid (main view)
   - Character roster (side panel)
   - Character selection modal
4. Export formation as PNG and check quality

## Technical Notes

### Browser Compatibility
- `image-rendering: high-quality` - Works in most modern browsers
- `image-rendering: crisp-edges` - Fallback for Firefox
- `-webkit-optimize-contrast` - Safari/Chrome optimization
- Hardware acceleration works in all modern browsers

### Trade-offs
- `contain` vs `cover`: Some empty space may appear if image aspect ratio doesn't match container
- Performance: Hardware acceleration may use more GPU memory (negligible for modern devices)

## Future Enhancements

If further quality improvements are needed:
1. Consider serving WebP format images (smaller size, same quality)
2. Implement srcset for responsive images
3. Add loading="lazy" for better performance
4. Consider image CDN for optimization
5. Use higher resolution source images if available
