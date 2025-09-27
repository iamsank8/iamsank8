# Portfolio Website

A personal portfolio website built with Angular and Firebase, showcasing professional experience, skills, education, and projects.

## Project Overview

This portfolio website is built with:
- **Frontend**: Angular with Angular Material
- **Backend**: Firebase Cloud Functions and Express
- **Database**: Firestore
- **Deployment**: Firebase Hosting

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

- Node.js v18 or higher
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

Deploy to production:

```bash
npm run deploy
```

Deploy to staging:

```bash
npm run deploy:staging
```

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

For detailed information about the upgrade process, potential issues, and troubleshooting, see the [Angular Upgrade Guide](./angular-upgrade-guide.md).

## Project Structure

- **src/app/core**: Core components, services, and modules
- **src/app/features**: Feature components organized by functionality
- **src/theme**: Theme configuration and styles
- **api**: Local API server for development
- **functions**: Firebase Cloud Functions for production
- **dev-scripts**: Development and deployment scripts

## Development Scripts

See the [dev-scripts README](./dev-scripts/README.md) for detailed information about the available development scripts.

## Upgrade Plans

### Portfolio Upgrade Plan
See the [Portfolio Upgrade Plan](./portfolio-upgrade-plan.md) for detailed information about the overall planned upgrades and improvements.

### Angular Upgrade
See the [Angular Upgrade Guide](./angular-upgrade-guide.md) for detailed information about upgrading from Angular 13 to Angular 17.

### UI Modernization
See the [UI Modernization Plan](./ui-modernization-plan.md) for detailed information about modernizing the UI with the latest Angular Material components.

### Blog Implementation
See the [Blog Implementation Plan](./blog-implementation-plan.md) for detailed information about adding a blog section to the portfolio website.

### Project Filtering
See the [Project Filtering Plan](./project-filtering-plan.md) for detailed information about implementing filtering functionality for the projects section.

### Mobile Responsiveness
See the [Mobile Responsiveness Plan](./mobile-responsiveness-plan.md) for detailed information about enhancing the mobile experience of the portfolio website.

### Admin Authentication
See the [Admin Authentication Plan](./admin-authentication-plan.md) for detailed information about implementing secure authentication for admin access.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
