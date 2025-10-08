# Production Deployment Guide

## ✅ Critical Fixes Implemented

### 1. **Vite Configuration Enhanced** (`vite.config.ts`)
- ✅ Source maps disabled for production
- ✅ Automatic console.log/debugger removal via esbuild
- ✅ Code splitting optimized (separate chunks for Vue and vendor libraries)
- ✅ Asset optimization configured

### 2. **SEO & Meta Tags** (`index.html`)
- ✅ Description meta tag added
- ✅ Open Graph tags for social sharing
- ✅ Twitter card support
- ✅ Proper viewport configuration

### 3. **Error Handling** (`src/main.ts`)
- ✅ Global error handler configured
- ✅ Warn handler for development
- ✅ Ready for error tracking service integration (Sentry, etc.)

### 4. **TypeScript Errors Fixed**
- ✅ Fixed undefined type issues in `characterImages.ts`
- ✅ Fixed undefined type issues in `petImages.ts`

### 5. **Production Environment**
- ✅ `.env.production` file created
- ✅ `robots.txt` for SEO
- ✅ `404.html` for SPA routing on static hosts

### 6. **Deployment Configurations**
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `netlify.toml` - Netlify deployment configuration
- ✅ Cache headers for static assets

---

## 🚀 Build & Deploy

### Build for Production
```bash
cd sevenbuilder
bun run build
```

This creates an optimized build in the `dist/` folder with:
- Minified code
- Console logs removed
- Code splitting
- Optimized assets

### Test Production Build Locally
```bash
npx vite preview
```

Visit `http://localhost:4173` to test the production build.

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd sevenbuilder
vercel --prod
```

**Or use Vercel Dashboard:**
1. Go to https://vercel.com
2. Import your GitHub repository
3. Set root directory to `sevenbuilder`
4. Deploy!

### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd sevenbuilder
netlify deploy --prod --dir=dist
```

**Or use Netlify Dashboard:**
1. Drag & drop the `dist` folder to https://app.netlify.com/drop
2. Or connect your GitHub repository

### Option 3: GitHub Pages
1. Update `vite.config.ts`:
   ```typescript
   base: '/SevenKnightFormation/'  // Your repo name
   ```
2. Rebuild: `bun run build`
3. Push the `dist` folder to `gh-pages` branch
4. Enable GitHub Pages in repository settings

### Option 4: Any Static Host (AWS S3, CloudFlare Pages, etc.)
1. Build: `bun run build`
2. Upload the `dist/` folder contents
3. Configure:
   - Set all routes to redirect to `index.html` (for SPA routing)
   - Enable HTTPS (required for clipboard API)

---

## ⚙️ Environment Variables

For production-specific settings, edit `.env.production`:
```env
VITE_APP_TITLE=Seven Knights Rebirth Formation Builder
VITE_BASE_URL=/
```

Access in code:
```typescript
const title = import.meta.env.VITE_APP_TITLE
```

---

## 🔒 Security Checklist

- ✅ Console logs removed in production
- ✅ Source maps disabled
- ✅ No sensitive data in environment variables
- ⚠️ **Important**: Deploy with HTTPS (clipboard API requires it)

---

## 📊 Performance Tips

### Current Build Size:
- CSS: ~52 KB (8.4 KB gzipped)
- Vue chunk: ~66 KB (26.4 KB gzipped)
- Main app: ~82 KB (19.5 KB gzipped)
- Vendor: ~206 KB (49.1 KB gzipped)
- **Total**: ~407 KB (~103 KB gzipped) ✅

### Further Optimizations (Optional):
1. **Compress images** - Your character images could be optimized
2. **Lazy load images** - Load character/pet images on demand
3. **Service Worker** - Add PWA support for offline usage
4. **Image format** - Convert PNGs to WebP where possible

---

## 🧪 Testing Checklist

Before deploying to production:
- [ ] Test formation creation and saving
- [ ] Test share URL functionality
- [ ] Test image export (requires HTTPS in production)
- [ ] Test on mobile devices
- [ ] Test drag & drop functionality
- [ ] Verify all character/pet images load
- [ ] Check browser console for errors

---

## 🐛 Monitoring & Debugging

### Add Error Tracking (Optional but Recommended)
1. Install Sentry:
   ```bash
   bun add @sentry/vue
   ```

2. Update `src/main.ts`:
   ```typescript
   import * as Sentry from "@sentry/vue"
   
   if (import.meta.env.PROD) {
     Sentry.init({
       app,
       dsn: "YOUR_SENTRY_DSN",
       environment: "production"
     })
   }
   ```

---

## 📝 Post-Deployment

After deployment:
1. ✅ Test the live site
2. ✅ Verify HTTPS is working
3. ✅ Test sharing functionality
4. ✅ Submit sitemap to Google Search Console (optional)
5. ✅ Set up analytics (Google Analytics, Plausible, etc.) if needed

---

## 🔄 Updates & Maintenance

To update the production site:
```bash
# Make changes
# Test locally: bun run dev

# Build and deploy
bun run build

# Deploy using your chosen method
vercel --prod  # or
netlify deploy --prod --dir=dist
```

---

## 🆘 Troubleshooting

### Issue: Routes return 404
**Solution**: Ensure your hosting platform redirects all routes to `index.html`
- Vercel: Use provided `vercel.json`
- Netlify: Use provided `netlify.toml`

### Issue: Clipboard API not working
**Solution**: Must be deployed with HTTPS. The clipboard API requires a secure context.

### Issue: Images not loading
**Solution**: Check that `base` path in `vite.config.ts` matches your deployment path.

---

## ✨ Your Production Build is Ready!

All critical fixes have been implemented. Your app is now production-ready with:
- Optimized performance
- SEO support
- Error handling
- Multiple deployment options

Choose your hosting platform and deploy! 🚀
