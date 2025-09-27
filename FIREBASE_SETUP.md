# Firebase Service Account Setup Guide

This guide will help you set up Firebase service account authentication for local development and data management.

## Prerequisites

- Firebase project created
- Firebase Admin SDK installed (already done)
- Node.js environment

## Step 1: Create Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`portfolio-sanket-c5165`)
3. Navigate to **Project Settings** → **Service Accounts**
4. Click **"Generate new private key"**
5. Download the JSON file

## Step 2: Setup Local Environment

1. **Place the service account key:**
   ```bash
   # Rename the downloaded file and place it here:
   config/firebase/service-account-key.json
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Update .env file with your configuration:**
   ```bash
   # Firebase Configuration
   FIREBASE_PROJECT_ID=portfolio-sanket-c5165
   GOOGLE_APPLICATION_CREDENTIALS=./config/firebase/service-account-key.json
   
   # Environment
   NODE_ENV=development
   ```

## Step 3: Available Commands

### Using Shell Scripts (Legacy)
```bash
npm run db:seed      # Seed database with sample data
npm run db:backup    # Backup database
npm run db:restore   # Restore from backup
npm run db:clear     # Clear all data
```

### Using New Data Manager (Recommended)
```bash
npm run data:seed    # Seed database with sample data
npm run data:backup  # Create backup of all collections
npm run data:restore # Restore from backup directory
npm run data:clear   # Clear all collections
npm run data:list    # List all collections
npm run data:count   # Count documents in a collection
```

### Direct Script Usage
```bash
# Seed database
node scripts/data-manager.js seed

# Create backup
node scripts/data-manager.js backup

# Restore from backup
node scripts/data-manager.js restore backups/backup-2024-01-01T10-00-00-000Z

# Clear database
node scripts/data-manager.js clear

# List collections
node scripts/data-manager.js list

# Count documents in specific collection
node scripts/data-manager.js count projects
```

## Step 4: Test the Setup

1. **Test connection:**
   ```bash
   npm run data:list
   ```

2. **Seed with sample data:**
   ```bash
   npm run data:seed
   ```

3. **Verify data was added:**
   ```bash
   npm run data:count skills
   npm run data:count projects
   ```

## Data Structure

### Skills Collection
- **Document ID**: `skill-1`, `skill-2`, etc.
- **Structure**: Categories with skill items including name, level, and years of experience

### Projects Collection
- **Document ID**: Project ID (e.g., `predictive-portal`)
- **Structure**: Project details including name, organization, period, technologies, etc.

## Security Features

- ✅ Service account authentication
- ✅ Environment variable configuration
- ✅ Gitignore protection for sensitive files
- ✅ Batch operations for performance
- ✅ Error handling and validation
- ✅ Backup and restore capabilities

## Troubleshooting

### Common Issues

1. **"Service account file not found"**
   - Ensure the file is placed at `config/firebase/service-account-key.json`
   - Check file permissions

2. **"Firebase project ID is required"**
   - Verify `.env` file exists and contains `FIREBASE_PROJECT_ID`

3. **"Permission denied"**
   - Check Firebase project permissions
   - Verify service account has Firestore access

4. **Node version warnings**
   - Firebase Admin SDK requires Node.js 20+
   - Current warnings can be ignored for development

### Getting Help

1. Check the Firebase Console for project status
2. Verify Firestore rules allow the operations
3. Check the logs directory for detailed error messages
4. Review the `config/firebase/README.md` for additional setup details

## File Structure

```
├── config/
│   └── firebase/
│       ├── README.md
│       ├── firebase-admin.js
│       └── service-account-key.json (you create this)
├── scripts/
│   └── data-manager.js
├── data/
│   ├── skills.json
│   └── projects.json
├── backups/ (created automatically)
├── .env (you create this)
└── .env.example
```

## Next Steps

After successful setup:
1. Integrate with your Angular application
2. Set up automated backups
3. Configure different environments (dev/staging/prod)
4. Implement data validation and migration scripts