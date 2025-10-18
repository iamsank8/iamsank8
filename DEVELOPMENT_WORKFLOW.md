# Development Workflow Guide

This guide explains the recommended development workflow for both GitHub Pages and Firebase hosting options.

## 🔄 Development Workflow Overview

### For GitHub Pages (Static Hosting)

Since GitHub Pages serves static files, you have two main approaches:

#### Option 1: Automated Workflow (Recommended)
**When to use:** For production deployments and collaborative development

```bash
# 1. Make changes to Angular app or data files
# 2. Test locally
npm start

# 3. Commit and push to main branch
git add .
git commit -m "Update portfolio content"
git push origin main

# 4. GitHub Actions automatically:
#    - Builds the Angular app
#    - Copies JSON data to assets
#    - Deploys to GitHub Pages
```

#### Option 2: Local Build + Manual Deploy
**When to use:** For testing builds locally before pushing

```bash
# 1. Make changes to Angular app or data files
# 2. Test the GitHub Pages build locally
npm run deploy:github

# 3. Verify the build in dist/iamsank8/
# 4. If satisfied, commit and push
git add .
git commit -m "Update portfolio content"
git push origin main
```

### For Firebase Hosting (Full Backend)

#### Option 1: Automated Workflow (Recommended for Production)
```bash
# 1. Make changes to Angular app, API, or data
# 2. Test locally
npm run start:all  # Starts both Angular and API

# 3. Commit and push to main branch
git add .
git commit -m "Update portfolio and API"
git push origin main

# 4. GitHub Actions automatically:
#    - Builds Angular app
#    - Deploys Firebase Functions
#    - Deploys to Firebase Hosting
```

#### Option 2: Local Deployment
```bash
# 1. Make changes and test locally
npm run start:all

# 2. Deploy manually
npm run deploy        # Production
npm run deploy:staging # Staging
```

## 📝 Specific Scenarios

### Scenario 1: Updating Portfolio Content (JSON Data)

**For GitHub Pages:**
```bash
# Edit files in /data/ folder (projects.json, skills.json, etc.)
# Option A: Let workflow handle it
git add data/
git commit -m "Update projects and skills"
git push origin main
# ✅ GitHub Actions will rebuild and deploy automatically

# Option B: Test locally first
npm run deploy:github  # Test the build
git add data/
git commit -m "Update projects and skills"
git push origin main
```

**For Firebase:**
```bash
# Edit JSON files OR update Firestore database
# If using JSON files:
git add data/
git commit -m "Update portfolio data"
git push origin main

# If using Firestore:
npm run data:seed     # Upload to Firestore
git add .
git commit -m "Update data management scripts"
git push origin main
```

### Scenario 2: Angular App Changes (Components, Services, Styles)

**For Both Hosting Options:**
```bash
# 1. Make Angular changes
# 2. Test locally
npm start

# 3. For GitHub Pages - test the static build
npm run build:github
# OR
npm run deploy:github

# 4. For Firebase - test with API
npm run start:all

# 5. Commit and push (let workflows handle deployment)
git add .
git commit -m "Update Angular components"
git push origin main
```

### Scenario 3: API Changes (Firebase Functions)

**Only applies to Firebase hosting:**
```bash
# 1. Make changes to functions/index.js or api/server.js
# 2. Test locally
npm run start:all

# 3. Deploy
# Option A: Automated
git add .
git commit -m "Update API endpoints"
git push origin main

# Option B: Manual
npm run deploy
```

### Scenario 4: Configuration Changes

**Environment or build configuration changes:**
```bash
# 1. Update angular.json, package.json, or environment files
# 2. Test locally
npm run build:github  # For GitHub Pages
npm run build         # For Firebase

# 3. Commit and push
git add .
git commit -m "Update build configuration"
git push origin main
```

## 🎯 Recommended Workflow by Use Case

### Daily Development
```bash
# 1. Start development server
npm start  # Angular only
# OR
npm run start:all  # Angular + API (for Firebase)

# 2. Make changes and test
# 3. When ready, commit and push (let workflows deploy)
```

### Content Updates
```bash
# 1. Edit JSON files in /data/
# 2. Commit and push (workflows handle the rest)
git add data/
git commit -m "Update portfolio content"
git push origin main
```

### Pre-deployment Testing
```bash
# For GitHub Pages
npm run deploy:github
# Check dist/iamsank8/ folder

# For Firebase
npm run build
npm run start:all  # Test with local API
```

### Emergency Fixes
```bash
# Quick local deployment (Firebase only)
npm run deploy

# For GitHub Pages, push to main for fastest deployment
git add .
git commit -m "Emergency fix"
git push origin main
```

## 🔧 Available Scripts Summary

### Development Scripts
```bash
npm start              # Angular dev server only
npm run start:all      # Angular + local API server
npm run build          # Production build (Firebase)
npm run build:github   # GitHub Pages build
```

### Deployment Scripts
```bash
npm run deploy:github  # Local GitHub Pages build + data copy
npm run deploy         # Firebase production deployment
npm run deploy:staging # Firebase staging deployment
```

### Data Management Scripts
```bash
npm run data:seed      # Upload JSON to Firestore
npm run data:backup    # Backup Firestore to JSON
npm run data:restore   # Restore Firestore from JSON
npm run data:list      # List Firestore collections
```

## 🚀 Best Practices

### 1. Use Automated Workflows for Production
- **GitHub Pages**: Always push to main branch for deployment
- **Firebase**: Use GitHub Actions for consistent deployments

### 2. Test Locally Before Pushing
```bash
# For GitHub Pages
npm run deploy:github

# For Firebase
npm run start:all
```

### 3. Separate Development and Production
- Use feature branches for development
- Merge to main only when ready for production
- Workflows only trigger on main branch pushes

### 4. Monitor Deployments
- Check GitHub Actions logs for deployment status
- Verify your site after deployment
- Use staging environment for Firebase testing

### 5. Data Management
- **GitHub Pages**: Edit JSON files directly, commit and push
- **Firebase**: Use data management scripts or Firestore console

## 🔍 Troubleshooting

### Build Failures
```bash
# Check local build first
npm run build:github  # For GitHub Pages
npm run build         # For Firebase

# Check GitHub Actions logs in repository
```

### Data Not Updating
```bash
# For GitHub Pages: Ensure JSON files are committed
git status
git add data/
git commit -m "Update data"
git push origin main

# For Firebase: Check Firestore or re-seed data
npm run data:seed
```

### Environment Issues
```bash
# Verify environment configuration
cat src/environments/environment.github.ts  # GitHub Pages
cat src/environments/environment.prod.ts    # Firebase
```

## 📋 Quick Reference

| Task | GitHub Pages | Firebase |
|------|-------------|----------|
| Content Update | Edit JSON → Push | Edit JSON/Firestore → Push |
| App Changes | Code → Test → Push | Code → Test → Push |
| API Changes | N/A | Code → Test → Push |
| Local Testing | `npm run deploy:github` | `npm run start:all` |
| Production Deploy | Push to main | Push to main OR `npm run deploy` |
| Emergency Deploy | Push to main | `npm run deploy` |

**Remember**: GitHub Actions handle most deployments automatically when you push to the main branch. Use local scripts primarily for testing and development!