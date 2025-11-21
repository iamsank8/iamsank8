# Portfolio Website

A personal portfolio website built with Angular, showcasing professional experience, skills, education, and projects. Now supports both Firebase and GitHub Pages hosting!

## Project Overview

This portfolio website is built with:
- **Frontend**: Angular with PrimeNG
- **Backend**: Firebase Cloud Functions and Express (or static JSON files)
- **Database**: Firestore (or static JSON files)
- **Deployment**: Firebase Hosting or GitHub Pages

## Hosting Options

### 🚀 GitHub Pages (New!)
- ✅ **Free hosting** with automatic HTTPS
- ✅ **No server maintenance** required
- ✅ **Fast global CDN** delivery
- ✅ **Custom domain** support
- ✅ **Automatic deployment** via GitHub Actions

### 🔥 Firebase Hosting (Original)
- ✅ **Full backend capabilities** with Cloud Functions
- ✅ **Real-time database** with Firestore
- ✅ **Contact form processing** server-side
- ✅ **Advanced security** features

## Features

- Responsive design for all screen sizes
- Dark/light theme toggle
- Project showcase with filtering
- Skills visualization
- Contact form
- SEO optimization
- Google Analytics integration
- API caching for improved performance
- Comprehensive security measures

## Getting Started

### Prerequisites

- Node.js v20 or higher (required for Firebase CLI v14+)
- npm
- Angular CLI
- Firebase CLI

### Setup

First, make the development scripts executable:

```bash
npm run make-scripts-executable
```

Or manually:

```bash
chmod +x dev-scripts/*.sh
chmod +x upgrade-angular.sh
```

Then run the setup script to install all dependencies and prepare the development environment:

```bash
npm run setup
```

Or directly:

```bash
./dev-scripts/setup.sh
```

You can also set up manually:

```bash
# Install dependencies
npm install

# Install API dependencies
cd api && npm install && cd ..

# Install Firebase Functions dependencies
cd functions && npm install && cd ..

# Set up theme
npm run setup:theme
```

### Theme Setup

The application supports both light and dark themes. To set up the theme:

```bash
npm run setup:theme
```

This will create the necessary theme files in the `src/theme` directory. The theme toggle is available in the header of the application and automatically respects the user's system preference by default.

The theme implementation uses Angular Material's theming system with CSS variables for custom styling. Theme preferences are saved in the browser's local storage.

### Development

Start all services (Angular, API server, Firebase emulators) with:

```bash
npm run start:all
```

Or start individual services:

```bash
# Start Angular development server
ng serve

# Start API server
cd api && node server.js

# Start Firebase emulators
firebase emulators:start
```

### Database Operations

Seed the database with initial data:

```bash
npm run db:seed
```

Other database operations:

```bash
# Backup the database
npm run db:backup

# Restore the database from backup
npm run db:restore ./backups/firestore_backup_YYYYMMDD_HHMMSS.json

# Clear the database
npm run db:clear
```

### Deployment

Choose your preferred hosting option:

#### 🚀 GitHub Pages (Recommended for Static Sites)

**Automatic Deployment:**
1. Enable GitHub Pages in your repository settings:
   - Go to **Settings** → **Pages**
   - Select **GitHub Actions** as the source
2. Push to `main` branch - automatic deployment via GitHub Actions!
3. Your site will be available at: `https://yourusername.github.io/iamsank8/`

**Manual Build:**
```bash
# Build for GitHub Pages
npm run build:github

# Test locally
npm run deploy:github
```

**Features:**
- ✅ Free hosting with HTTPS
- ✅ Custom domain support
- ✅ Fast global CDN
- ✅ No server maintenance
- ✅ Static JSON data serving

#### 🔥 Firebase Hosting (Full Backend Features)

**Manual Deployment:**
```bash
# Deploy to production
npm run deploy

# Deploy to staging
npm run deploy:staging
```

**Automated Deployment (GitHub Actions):**
The project includes Firebase deployment via GitHub Actions:
- Automatically deploys when code is pushed to main branch
- Creates preview deployments for pull requests
- Deploys Firebase Functions for production builds

**Setup:**
1. Run the setup script: `./scripts/setup-github-secrets.sh`
2. Add service account secret to GitHub repository
3. Push to main branch to trigger deployment

For detailed Firebase setup, see [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md).

#### 📋 Migration Guide

To migrate from Firebase to GitHub Pages or vice versa, see [GITHUB_PAGES_MIGRATION.md](./GITHUB_PAGES_MIGRATION.md) for detailed instructions.

#### 🔄 Development Workflow

For detailed development workflows, deployment strategies, and best practices, see [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md).

## Angular Upgrade

To upgrade Angular from v13 to the latest version:

```bash
npm run upgrade
```

This will run the upgrade script that incrementally upgrades Angular through each major version (v13 → v14 → v15 → v16 → v17).

The upgrade process follows Angular's recommended upgrade path and includes:
- Upgrading Angular core and CLI
- Updating Angular Material
- Updating other dependencies
- Converting to standalone components (optional)
- Implementing new features like signals and control flow (optional)

## Project Structure

- **src/app/core**: Core components, services, and modules
- **src/app/features**: Feature components organized by functionality
- **src/theme**: Theme configuration and styles
- **api**: Local API server for development
- **functions**: Firebase Cloud Functions for production
- **dev-scripts**: Development and deployment scripts

## Development Scripts

See the [dev-scripts README](./dev-scripts/README.md) for detailed information about the available development scripts.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
