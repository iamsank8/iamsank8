#!/bin/bash

# Database Operations Script
# This script provides utilities for database operations like seeding and backup

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display usage information
show_usage() {
  echo -e "${YELLOW}Usage:${NC}"
  echo -e "  $0 ${GREEN}seed${NC} - Seed the Firestore database with initial data"
  echo -e "  $0 ${GREEN}backup${NC} - Backup the Firestore database"
  echo -e "  $0 ${GREEN}restore${NC} ${BLUE}<backup-file>${NC} - Restore the Firestore database from backup"
  echo -e "  $0 ${GREEN}clear${NC} - Clear all data from the Firestore database"
}

# Check if command is provided
if [ $# -eq 0 ]; then
  echo -e "${RED}No command specified.${NC}"
  show_usage
  exit 1
fi

COMMAND=$1

# Seed the database
seed_database() {
  echo -e "${YELLOW}Seeding Firestore database...${NC}"
  
  # Create data directory if it doesn't exist
  mkdir -p ./data
  
  # Create skills data
  echo -e "${BLUE}Creating skills data...${NC}"
  cat > ./data/skills.json << EOF
[
  {
    "category": "Frontend",
    "items": [
      { "name": "Angular", "level": 95 },
      { "name": "TypeScript", "level": 90 },
      { "name": "JavaScript", "level": 85 },
      { "name": "HTML5", "level": 90 },
      { "name": "CSS3/SCSS", "level": 85 },
      { "name": "RxJS", "level": 85 },
      { "name": "Angular Material", "level": 90 },
      { "name": "Responsive Design", "level": 85 },
      { "name": "PWA", "level": 75 }
    ]
  },
  {
    "category": "Backend",
    "items": [
      { "name": "C#", "level": 85 },
      { "name": "ASP.NET Core", "level": 80 },
      { "name": "MVC", "level": 75 },
      { "name": "Entity Framework", "level": 70 },
      { "name": "RESTful APIs", "level": 85 },
      { "name": "Node.js", "level": 75 },
      { "name": "Express", "level": 70 },
      { "name": "Firebase Functions", "level": 80 }
    ]
  },
  {
    "category": "Database",
    "items": [
      { "name": "SQL Server", "level": 80 },
      { "name": "PostgreSQL", "level": 75 },
      { "name": "MongoDB", "level": 65 },
      { "name": "Firestore", "level": 80 },
      { "name": "Redis", "level": 60 }
    ]
  },
  {
    "category": "DevOps & Cloud",
    "items": [
      { "name": "Git", "level": 85 },
      { "name": "GitHub Actions", "level": 80 },
      { "name": "Docker", "level": 75 },
      { "name": "Azure", "level": 70 },
      { "name": "Firebase", "level": 85 },
      { "name": "SonarQube", "level": 75 },
      { "name": "CI/CD", "level": 80 }
    ]
  },
  {
    "category": "AI & ML",
    "items": [
      { "name": "Prompt Engineering", "level": 85 },
      { "name": "LLM Integration", "level": 80 },
      { "name": "AI-powered UX", "level": 75 },
      { "name": "ChatGPT API", "level": 80 }
    ]
  },
  {
    "category": "UI/UX",
    "items": [
      { "name": "Figma", "level": 75 },
      { "name": "Responsive Design", "level": 85 },
      { "name": "Accessibility", "level": 80 },
      { "name": "User Testing", "level": 70 }
    ]
  },
  {
    "category": "Security",
    "items": [
      { "name": "OWASP", "level": 75 },
      { "name": "Authentication", "level": 80 },
      { "name": "Authorization", "level": 80 },
      { "name": "Content Security Policy", "level": 85 }
    ]
  }
]
EOF

  # Create projects data
  echo -e "${BLUE}Creating projects data...${NC}"
  cat > ./data/projects.json << EOF
[
  {
    "id": "1",
    "name": "Predictive Portal",
    "organization": "Nitor Infotech, An Ascendion company",
    "period": "March 2020 - Present",
    "domains": "Manufacturing",
    "responsibilities": [
      "Worked as individual contributor for Angular technology",
      "Gained domain knowledge and was able to co-relate the features and value additions",
      "Analyzed figma designs and converted into Angular code",
      "Used the organizational theme to style the components",
      "Contributed to repository look and feel",
      "Written unit tests based on Jasmine and Karma stack",
      "Using SonarQube for tracking code quality and security vulnerabilities"
    ],
    "tasks": [
      "Requirement understanding",
      "Code quality discussion",
      "Peer code reviews",
      "Cross team communication",
      "Client-side discussions and deliveries"
    ],
    "technologies": ["Angular 9-14", "TypeScript", "Docker", "SonarQube", "Figma"]
  },
  {
    "id": "2",
    "name": "Health and Safety for Petroleum Company",
    "organization": "Nitor Infotech Pvt Ltd",
    "period": "Jan 2019 - Feb 2020",
    "domains": "Oil & Gas",
    "responsibilities": [
      "Worked as full stack developer",
      "Got first-hand experience in interacting with customer interaction and requirement gathering",
      "Understood the business need and customer's expectations from the project very early",
      "Helped design new modules from the scratch",
      "Focused on the scalability of the application with strong backend for storing large data",
      "Used .NET framework 4.5 for backend APIs with Azure services"
    ],
    "tasks": [
      "Requirement gathering",
      "Code structuring",
      "Database design",
      "Peer code review",
      "Client-side discussions and deliveries"
    ],
    "technologies": ["Angular 5-9", "TypeScript", ".NET Framework", "Azure", "SQL server"]
  }
]
EOF

  # Import data to Firestore
  echo -e "${BLUE}Importing data to Firestore...${NC}"
  
  # Check if we're using emulator or production
  if [ -z "$FIRESTORE_EMULATOR_HOST" ]; then
    # Production mode
    echo -e "${YELLOW}Using production Firestore...${NC}"
    
    # Import skills
    node -e "
      const admin = require('firebase-admin');
      const fs = require('fs');
      
      // Initialize Firebase Admin
      admin.initializeApp();
      
      const db = admin.firestore();
      const skills = JSON.parse(fs.readFileSync('./data/skills.json', 'utf8'));
      
      // Import skills
      const batch = db.batch();
      skills.forEach((skill, index) => {
        const ref = db.collection('skills').doc('skill-' + (index + 1));
        batch.set(ref, skill);
      });
      
      // Import projects
      const projects = JSON.parse(fs.readFileSync('./data/projects.json', 'utf8'));
      projects.forEach(project => {
        const ref = db.collection('projects').doc(project.id);
        batch.set(ref, project);
      });
      
      batch.commit()
        .then(() => console.log('Data imported successfully'))
        .catch(err => console.error('Error importing data:', err))
        .finally(() => process.exit());
    "
  else
    # Emulator mode
    echo -e "${YELLOW}Using Firestore emulator...${NC}"
    firebase emulators:exec --only firestore "node -e \"
      const admin = require('firebase-admin');
      const fs = require('fs');
      
      // Initialize Firebase Admin
      admin.initializeApp();
      
      const db = admin.firestore();
      const skills = JSON.parse(fs.readFileSync('./data/skills.json', 'utf8'));
      
      // Import skills
      const batch = db.batch();
      skills.forEach((skill, index) => {
        const ref = db.collection('skills').doc('skill-' + (index + 1));
        batch.set(ref, skill);
      });
      
      // Import projects
      const projects = JSON.parse(fs.readFileSync('./data/projects.json', 'utf8'));
      projects.forEach(project => {
        const ref = db.collection('projects').doc(project.id);
        batch.set(ref, project);
      });
      
      batch.commit()
        .then(() => console.log('Data imported successfully'))
        .catch(err => console.error('Error importing data:', err));
    \""
  fi
  
  echo -e "${GREEN}Database seeding completed.${NC}"
}

# Backup the database
backup_database() {
  echo -e "${YELLOW}Backing up Firestore database...${NC}"
  
  # Create backups directory if it doesn't exist
  mkdir -p ./backups
  
  # Generate timestamp for backup filename
  TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
  BACKUP_FILE="./backups/firestore_backup_$TIMESTAMP.json"
  
  # Check if we're using emulator or production
  if [ -z "$FIRESTORE_EMULATOR_HOST" ]; then
    # Production mode
    echo -e "${YELLOW}Backing up production Firestore...${NC}"
    firebase firestore:export $BACKUP_FILE
  else
    # Emulator mode
    echo -e "${YELLOW}Backing up Firestore emulator...${NC}"
    echo -e "${RED}Firestore emulator backup not supported. Please use production for backups.${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}Database backup completed: $BACKUP_FILE${NC}"
}

# Restore the database
restore_database() {
  if [ -z "$2" ]; then
    echo -e "${RED}No backup file specified.${NC}"
    show_usage
    exit 1
  fi
  
  BACKUP_FILE=$2
  
  if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}Backup file not found: $BACKUP_FILE${NC}"
    exit 1
  fi
  
  echo -e "${YELLOW}Restoring Firestore database from $BACKUP_FILE...${NC}"
  
  # Check if we're using emulator or production
  if [ -z "$FIRESTORE_EMULATOR_HOST" ]; then
    # Production mode
    echo -e "${YELLOW}Restoring to production Firestore...${NC}"
    firebase firestore:import $BACKUP_FILE
  else
    # Emulator mode
    echo -e "${YELLOW}Restoring to Firestore emulator...${NC}"
    echo -e "${RED}Firestore emulator restore not supported. Please use production for restores.${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}Database restore completed.${NC}"
}

# Clear the database
clear_database() {
  echo -e "${RED}WARNING: This will delete all data from the Firestore database.${NC}"
  read -p "Are you sure you want to continue? (y/n) " -n 1 -r
  echo
  
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Operation cancelled.${NC}"
    exit 0
  fi
  
  echo -e "${YELLOW}Clearing Firestore database...${NC}"
  
  # Check if we're using emulator or production
  if [ -z "$FIRESTORE_EMULATOR_HOST" ]; then
    # Production mode
    echo -e "${YELLOW}Clearing production Firestore...${NC}"
    firebase firestore:delete --all-collections --yes
  else
    # Emulator mode
    echo -e "${YELLOW}Clearing Firestore emulator...${NC}"
    firebase emulators:exec --only firestore "node -e \"
      const admin = require('firebase-admin');
      
      // Initialize Firebase Admin
      admin.initializeApp();
      
      const db = admin.firestore();
      
      async function deleteCollection(collectionPath) {
        const collectionRef = db.collection(collectionPath);
        const query = collectionRef.limit(500);
        
        return new Promise((resolve, reject) => {
          deleteQueryBatch(query, resolve).catch(reject);
        });
      }
      
      async function deleteQueryBatch(query, resolve) {
        const snapshot = await query.get();
        
        const batchSize = snapshot.size;
        if (batchSize === 0) {
          // When there are no documents left, we are done
          resolve();
          return;
        }
        
        // Delete documents in a batch
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
          deleteQueryBatch(query, resolve);
        });
      }
      
      // Delete collections
      Promise.all([
        deleteCollection('skills'),
        deleteCollection('projects')
      ])
        .then(() => console.log('All collections deleted'))
        .catch(err => console.error('Error deleting collections:', err));
    \""
  fi
  
  echo -e "${GREEN}Database clearing completed.${NC}"
}

# Execute the specified command
case $COMMAND in
  "seed")
    seed_database
    ;;
  "backup")
    backup_database
    ;;
  "restore")
    restore_database $@
    ;;
  "clear")
    clear_database
    ;;
  *)
    echo -e "${RED}Unknown command: $COMMAND${NC}"
    show_usage
    exit 1
    ;;
esac