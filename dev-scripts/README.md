# Development Scripts

This directory contains scripts to help with development, deployment, and database operations for the portfolio project.

## Important: Make Scripts Executable

Before using any of these scripts, make sure they are executable:

```bash
# Using npm script
npm run make-scripts-executable

# Or manually
chmod +x dev-scripts/*.sh
chmod +x upgrade-angular.sh
```

## Prerequisites

- Node.js v18 or higher
- npm
- Angular CLI
- Firebase CLI

You can run the `setup.sh` script to check and install these prerequisites.

## Available Scripts

### Setup Script

```bash
./dev-scripts/setup.sh
```

This script sets up the development environment by:
- Checking for required tools (Node.js, npm, Angular CLI, Firebase CLI)
- Installing missing tools
- Installing project dependencies
- Making all scripts executable
- Creating theme directory and file
- Checking Firebase login status

### Start All Services

```bash
./dev-scripts/start-all.sh
```

This script starts all the necessary services for local development:
- Firebase emulators (Functions, Firestore, Hosting)
- API server
- Angular development server

The script creates log files in the `logs` directory for each service.

### Deployment Script

```bash
./dev-scripts/deploy.sh [env]
```

This script builds and deploys the application to Firebase.

Parameters:
- `env`: The environment to deploy to (default: `prod`)
  - `prod`: Deploy to production
  - `staging`: Deploy to a preview channel

Examples:
```bash
# Deploy to production
./dev-scripts/deploy.sh prod

# Deploy to staging
./dev-scripts/deploy.sh staging
```

### Database Operations

```bash
./dev-scripts/db-operations.sh <command> [options]
```

This script provides utilities for database operations.

Commands:
- `seed`: Seed the Firestore database with initial data
- `backup`: Backup the Firestore database
- `restore <backup-file>`: Restore the Firestore database from backup
- `clear`: Clear all data from the Firestore database

Examples:
```bash
# Seed the database
./dev-scripts/db-operations.sh seed

# Backup the database
./dev-scripts/db-operations.sh backup

# Restore the database from backup
./dev-scripts/db-operations.sh restore ./backups/firestore_backup_20250927_123456.json

# Clear the database
./dev-scripts/db-operations.sh clear
```

### Theme Setup Script

```bash
./dev-scripts/setup-theme.sh
```

This script sets up the theme for the application:
- Creates the theme directory if it doesn't exist
- Backs up any existing theme file
- Creates a new theme file with both light and dark theme configurations

You can also run this script using the npm command:

```bash
npm run setup:theme
```

## Logs

All logs are stored in the `logs` directory. You can check these logs for debugging purposes.

## Troubleshooting

### Permission Denied

If you get a "Permission denied" error when trying to run a script, make sure the script is executable:

```bash
chmod +x dev-scripts/*.sh
```

### Firebase Emulators Not Starting

If the Firebase emulators fail to start, check if the ports are already in use. You can kill the processes using those ports and try again.

### API Server Not Starting

If the API server fails to start, check if port 3000 is already in use. You can kill the process using that port and try again.