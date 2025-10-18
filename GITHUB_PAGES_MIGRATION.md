# GitHub Pages Migration Guide

This document outlines how to migrate your Angular portfolio website from Firebase to GitHub Pages hosting.

## Overview

Your portfolio website has been successfully configured to work with GitHub Pages as an alternative to Firebase hosting. The migration includes:

- **Static JSON Data**: Converting Firebase API calls to static JSON file serving
- **GitHub Actions**: Automated deployment pipeline
- **Environment Configuration**: Separate configuration for GitHub Pages
- **Service Updates**: Modified services to work with both API and static modes

## What's Changed

### 1. New Files Created

- `.github/workflows/github-pages.yml` - GitHub Actions deployment workflow
- `src/environments/environment.github.ts` - GitHub Pages environment configuration
- `GITHUB_PAGES_MIGRATION.md` - This documentation

### 2. Modified Files

- `angular.json` - Added `github-pages` build configuration
- `package.json` - Added GitHub Pages build scripts
- All service files - Updated to work with static JSON files

### 3. Service Updates

All services (`projects.service.ts`, `skills.service.ts`, `experience.service.ts`, `education.service.ts`, `about.service.ts`) now automatically detect whether they're running in:
- **API mode** (Firebase/local server): Uses traditional API endpoints
- **Static mode** (GitHub Pages): Uses static JSON files from `/assets/data/`

## Deployment Options

### Option 1: GitHub Pages (Recommended)

**Advantages:**
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ No server maintenance
- ✅ Fast global CDN
- ✅ Integrated with GitHub workflow

**Limitations:**
- ❌ Static files only (no server-side processing)
- ❌ No contact form backend (requires external service)
- ❌ Limited to 1GB storage
- ❌ 100GB bandwidth per month

### Option 2: Keep Firebase

**Advantages:**
- ✅ Full backend capabilities
- ✅ Real-time database
- ✅ Authentication
- ✅ Cloud Functions
- ✅ Contact form processing

**Limitations:**
- ❌ Costs money after free tier
- ❌ More complex setup
- ❌ Requires Firebase configuration

## Setup Instructions for GitHub Pages

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on push to `main` branch

### Step 2: Update Repository Settings

1. Ensure your repository name matches the base href in the workflow
2. If your repository name is different from `iamsank8`, update:
   - `.github/workflows/github-pages.yml` (line 29): `--base-href="/your-repo-name/"`
   - `src/environments/environment.github.ts` (line 3): `apiUrl: '/your-repo-name/assets'`

### Step 3: Deploy

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be available at: `https://yourusername.github.io/iamsank8/`

## Local Development

### Build for GitHub Pages
```bash
npm run build:github
```

### Test GitHub Pages build locally
```bash
npm run deploy:github
# Serves the built files with data copied to assets
```

### Development with API (existing)
```bash
npm run start:all
# Starts both Angular dev server and local API
```

## Contact Form Considerations

Since GitHub Pages only serves static files, you'll need an alternative for the contact form:

### Option 1: Formspree (Recommended)
```html
<form action="https://formspree.io/f/your-form-id" method="POST">
  <!-- Your form fields -->
</form>
```

### Option 2: Netlify Forms
If you switch to Netlify hosting instead of GitHub Pages:
```html
<form netlify>
  <!-- Your form fields -->
</form>
```

### Option 3: EmailJS
Client-side email service:
```typescript
// Install: npm install emailjs-com
import emailjs from 'emailjs-com';

emailjs.send('service_id', 'template_id', formData, 'user_id');
```

## Environment Configuration

The application now supports three environments:

1. **Development** (`environment.ts`): Local API server
2. **Production** (`environment.prod.ts`): Firebase hosting
3. **GitHub Pages** (`environment.github.ts`): Static JSON files

## Data Management

Your existing JSON data files in the `/data` folder are automatically copied to `/assets/` during the GitHub Pages build process. The services automatically detect this and load data accordingly.

## Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## Monitoring and Analytics

Your existing Google Analytics configuration will work with GitHub Pages. Make sure to:

1. Update the `analyticsId` in `environment.github.ts`
2. Verify the domain in Google Analytics
3. Update any Firebase-specific tracking if present

## Rollback Plan

If you need to rollback to Firebase:

1. The Firebase configuration is preserved
2. Simply push to trigger Firebase deployment
3. Update DNS if using custom domain
4. All Firebase services remain functional

## Performance Comparison

| Feature | Firebase | GitHub Pages |
|---------|----------|--------------|
| Build Time | ~2-3 min | ~1-2 min |
| Deploy Time | ~1-2 min | ~30 sec |
| Global CDN | ✅ | ✅ |
| HTTPS | ✅ | ✅ |
| Custom Domain | ✅ | ✅ |
| Server-side | ✅ | ❌ |
| Cost | Paid after free tier | Free |

## Troubleshooting

### Common Issues

1. **404 on refresh**: GitHub Pages serves `404.html` for SPA routing (automatically handled)
2. **Base href issues**: Ensure repository name matches base href configuration
3. **Data not loading**: Check browser console for CORS or path issues
4. **Build failures**: Check GitHub Actions logs for detailed error messages

### Debug Steps

1. Check GitHub Actions workflow logs
2. Verify file paths in browser developer tools
3. Test locally with `npm run build:github`
4. Ensure all JSON files are valid

## Next Steps

1. **Test the deployment** by pushing to main branch
2. **Update contact form** to use external service
3. **Configure custom domain** if desired
4. **Update documentation** and README
5. **Monitor performance** and user experience

## Support

For issues with:
- **GitHub Pages**: Check GitHub documentation
- **Angular build**: Check Angular CLI documentation  
- **Custom domain**: Check GitHub Pages custom domain guide
- **Analytics**: Verify Google Analytics configuration

Your portfolio is now ready for GitHub Pages hosting! 🚀