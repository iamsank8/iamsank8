# Firebase Data Management Guide

## ✅ Setup Complete!

Your Firebase service account authentication is now fully configured and working. Here's what you can do:

## 📊 Current Database Status

- **Projects Collection**: 4 documents
- **Skills Collection**: 7 documents  
- **Contacts Collection**: 0 documents
- **Latest Backup**: `backups/backup-2025-09-27T13-54-02-369Z`

## 🚀 Available Commands

### Quick Commands (npm scripts)
```bash
# Data Management
npm run data:seed      # Upload sample data to Firebase
npm run data:backup    # Create backup of all collections
npm run data:list      # List all collections with document counts
npm run data:count projects  # Count documents in specific collection
npm run data:clear     # ⚠️ Clear all data (use with caution)

# Legacy Shell Scripts (still available)
npm run db:seed        # Same as data:seed but via shell script
npm run db:backup      # Same as data:backup but via shell script
npm run db:clear       # Same as data:clear but via shell script
```

### Direct Script Usage
```bash
# Seed database with sample data
node scripts/data-manager.js seed

# Create timestamped backup
node scripts/data-manager.js backup

# Restore from specific backup
node scripts/data-manager.js restore backups/backup-2025-09-27T13-54-02-369Z

# List all collections
node scripts/data-manager.js list

# Count documents in collection
node scripts/data-manager.js count skills
node scripts/data-manager.js count projects

# Clear all data (⚠️ destructive operation)
node scripts/data-manager.js clear
```

## 📝 How to Update Your Data

### Method 1: Edit JSON Files and Re-seed
1. **Edit the data files:**
   - `data/skills.json` - Update your skills and experience levels
   - `data/projects.json` - Add/modify your projects

2. **Clear existing data and re-seed:**
   ```bash
   npm run data:clear    # Clear existing data
   npm run data:seed     # Upload updated data
   ```

### Method 2: Manual Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to Firestore Database
3. Edit documents directly in the web interface

### Method 3: Create Custom Scripts
You can extend the `scripts/data-manager.js` to add custom operations for specific updates.

## 🔄 Backup and Restore Workflow

### Creating Backups
```bash
# Create backup before making changes
npm run data:backup
```

### Restoring from Backup
```bash
# List available backups
ls -la backups/

# Restore from specific backup
node scripts/data-manager.js restore backups/backup-2025-09-27T13-54-02-369Z
```

## 📁 File Structure

```
├── config/
│   └── firebase/
│       ├── firebase-admin.js          # Firebase Admin SDK setup
│       ├── service-account-key.json   # Your service account key
│       └── README.md                  # Setup instructions
├── scripts/
│   └── data-manager.js               # Main data management script
├── data/
│   ├── skills.json                   # Skills data template
│   └── projects.json                 # Projects data template
├── backups/                          # Auto-generated backups
│   └── backup-2025-09-27T13-54-02-369Z/
├── .env                              # Environment variables
└── .env.example                      # Environment template
```

## 🛡️ Security Features

- ✅ Service account authentication
- ✅ Environment variable configuration  
- ✅ Gitignore protection for sensitive files
- ✅ Batch operations for performance
- ✅ Comprehensive error handling
- ✅ Automatic backup with timestamps

## 🔧 Customizing Your Data

### Adding New Skills
Edit `data/skills.json`:
```json
{
  "category": "New Category",
  "items": [
    { 
      "name": "New Skill", 
      "level": 85, 
      "yearsOfExperience": 3 
    }
  ]
}
```

### Adding New Projects
Edit `data/projects.json`:
```json
{
  "id": "new-project-id",
  "name": "New Project Name",
  "organization": "Company Name",
  "period": "2024 - Present",
  "domains": ["Domain1", "Domain2"],
  "description": "Project description...",
  "technologies": ["Tech1", "Tech2"],
  "status": "Active",
  "featured": true
}
```

## 🚨 Important Notes

1. **Always backup before major changes:**
   ```bash
   npm run data:backup
   ```

2. **Test changes locally first** by reviewing the JSON files

3. **The `data:clear` command is destructive** - it will delete all your data

4. **Backups are stored locally** in the `backups/` directory

5. **Service account key is sensitive** - never commit it to version control

## 🔍 Troubleshooting

### Common Issues

1. **"Service account file not found"**
   - Ensure file is at: `config/firebase/service-account-key.json`

2. **"Firebase project ID is required"**
   - Check your `.env` file has `FIREBASE_PROJECT_ID=portfolio-sanket-c5165`

3. **Permission errors**
   - Verify your service account has Firestore read/write permissions

### Getting Help

1. Check Firebase Console for project status
2. Review error messages in terminal output
3. Verify Firestore security rules allow operations
4. Check the `FIREBASE_SETUP.md` for detailed setup instructions

## 🎯 Next Steps

1. **Customize your data** by editing the JSON files in the `data/` directory
2. **Set up automated backups** for production environments
3. **Create environment-specific configurations** (dev/staging/prod)
4. **Integrate with your Angular application** to fetch this data
5. **Set up CI/CD pipelines** for automated deployments

Your Firebase data management system is now fully operational! 🚀