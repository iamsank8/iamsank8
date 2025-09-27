#!/usr/bin/env node

/**
 * Firebase Data Management Script
 * Provides utilities for managing Firestore data with service account authentication
 */

const { initializeFirebaseAdmin, getFirestore, closeFirebaseAdmin } = require('../config/firebase/firebase-admin');
const fs = require('fs');
const path = require('path');

// Command line argument parsing
const args = process.argv.slice(2);
const command = args[0];
const subCommand = args[1];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function showUsage() {
  log('\nFirebase Data Manager', 'cyan');
  log('====================', 'cyan');
  log('\nUsage:', 'yellow');
  log('  node scripts/data-manager.js <command> [options]', 'bright');
  log('\nCommands:', 'yellow');
  log('  seed                    - Seed database with sample data');
  log('  backup                  - Backup all collections to JSON files');
  log('  restore <backup-dir>    - Restore data from backup directory');
  log('  clear                   - Clear all data from database');
  log('  export <collection>     - Export specific collection');
  log('  import <collection>     - Import specific collection');
  log('  list                    - List all collections');
  log('  count <collection>      - Count documents in collection');
  log('\nExamples:', 'yellow');
  log('  node scripts/data-manager.js seed');
  log('  node scripts/data-manager.js backup');
  log('  node scripts/data-manager.js export projects');
  log('  node scripts/data-manager.js count skills');
}

/**
 * Seed database with sample data
 */
async function seedDatabase() {
  try {
    log('🌱 Seeding database with sample data...', 'green');
    
    const db = getFirestore();
    
    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Load sample data
    const skillsData = require('../data/skills.json');
    const projectsData = require('../data/projects.json');

    // Use batch operations for better performance
    const batch = db.batch();

    // Add skills
    log('📊 Adding skills data...', 'blue');
    skillsData.forEach((skill, index) => {
      const docRef = db.collection('skills').doc(`skill-${index + 1}`);
      batch.set(docRef, {
        ...skill,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    // Add projects
    log('🚀 Adding projects data...', 'blue');
    projectsData.forEach((project) => {
      const docRef = db.collection('projects').doc(project.id);
      batch.set(docRef, {
        ...project,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    // Commit batch
    await batch.commit();
    
    log('✅ Database seeded successfully!', 'green');
    log(`   - Added ${skillsData.length} skill categories`, 'green');
    log(`   - Added ${projectsData.length} projects`, 'green');

  } catch (error) {
    log(`❌ Error seeding database: ${error.message}`, 'red');
    throw error;
  }
}

/**
 * Backup all collections to JSON files
 */
async function backupDatabase() {
  try {
    log('💾 Creating database backup...', 'green');
    
    const db = getFirestore();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), 'backups', `backup-${timestamp}`);
    
    // Create backup directory
    fs.mkdirSync(backupDir, { recursive: true });

    // Get all collections
    const collections = ['skills', 'projects', 'contacts']; // Add more as needed
    
    for (const collectionName of collections) {
      log(`📁 Backing up ${collectionName} collection...`, 'blue');
      
      const snapshot = await db.collection(collectionName).get();
      const documents = [];
      
      snapshot.forEach(doc => {
        documents.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Write to file
      const filePath = path.join(backupDir, `${collectionName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(documents, null, 2));
      
      log(`   ✓ ${documents.length} documents backed up`, 'green');
    }

    // Create metadata file
    const metadata = {
      timestamp: new Date().toISOString(),
      collections: collections,
      totalCollections: collections.length
    };
    
    fs.writeFileSync(
      path.join(backupDir, 'metadata.json'), 
      JSON.stringify(metadata, null, 2)
    );

    log(`✅ Backup completed: ${backupDir}`, 'green');

  } catch (error) {
    log(`❌ Error creating backup: ${error.message}`, 'red');
    throw error;
  }
}

/**
 * Restore data from backup directory
 */
async function restoreDatabase(backupDir) {
  try {
    if (!backupDir) {
      throw new Error('Backup directory path is required');
    }

    const fullBackupPath = path.resolve(process.cwd(), backupDir);
    
    if (!fs.existsSync(fullBackupPath)) {
      throw new Error(`Backup directory not found: ${fullBackupPath}`);
    }

    log(`🔄 Restoring database from: ${fullBackupPath}`, 'green');
    
    const db = getFirestore();
    
    // Read metadata
    const metadataPath = path.join(fullBackupPath, 'metadata.json');
    if (!fs.existsSync(metadataPath)) {
      throw new Error('Backup metadata not found');
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    log(`📅 Backup created: ${metadata.timestamp}`, 'blue');

    // Restore each collection
    for (const collectionName of metadata.collections) {
      const filePath = path.join(fullBackupPath, `${collectionName}.json`);
      
      if (!fs.existsSync(filePath)) {
        log(`⚠️  Skipping ${collectionName} - file not found`, 'yellow');
        continue;
      }

      log(`📁 Restoring ${collectionName} collection...`, 'blue');
      
      const documents = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const batch = db.batch();

      documents.forEach(doc => {
        const { id, ...data } = doc;
        const docRef = db.collection(collectionName).doc(id);
        batch.set(docRef, data);
      });

      await batch.commit();
      log(`   ✓ ${documents.length} documents restored`, 'green');
    }

    log('✅ Database restored successfully!', 'green');

  } catch (error) {
    log(`❌ Error restoring database: ${error.message}`, 'red');
    throw error;
  }
}

/**
 * Clear all data from database
 */
async function clearDatabase() {
  try {
    log('🗑️  Clearing database...', 'yellow');
    log('⚠️  WARNING: This will delete ALL data!', 'red');
    
    // In a real scenario, you might want to add confirmation
    // For now, we'll proceed with the operation
    
    const db = getFirestore();
    const collections = ['skills', 'projects', 'contacts'];

    for (const collectionName of collections) {
      log(`🗑️  Clearing ${collectionName} collection...`, 'blue');
      
      const snapshot = await db.collection(collectionName).get();
      const batch = db.batch();

      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      log(`   ✓ ${snapshot.size} documents deleted`, 'green');
    }

    log('✅ Database cleared successfully!', 'green');

  } catch (error) {
    log(`❌ Error clearing database: ${error.message}`, 'red');
    throw error;
  }
}

/**
 * List all collections
 */
async function listCollections() {
  try {
    log('📋 Listing collections...', 'green');
    
    const db = getFirestore();
    const collections = await db.listCollections();
    
    log('\nCollections:', 'yellow');
    for (const collection of collections) {
      const snapshot = await collection.get();
      log(`  📁 ${collection.id} (${snapshot.size} documents)`, 'blue');
    }

  } catch (error) {
    log(`❌ Error listing collections: ${error.message}`, 'red');
    throw error;
  }
}

/**
 * Count documents in a collection
 */
async function countDocuments(collectionName) {
  try {
    if (!collectionName) {
      throw new Error('Collection name is required');
    }

    log(`🔢 Counting documents in ${collectionName}...`, 'green');
    
    const db = getFirestore();
    const snapshot = await db.collection(collectionName).get();
    
    log(`📊 Collection '${collectionName}' has ${snapshot.size} documents`, 'blue');

  } catch (error) {
    log(`❌ Error counting documents: ${error.message}`, 'red');
    throw error;
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    // Initialize Firebase Admin
    initializeFirebaseAdmin();

    switch (command) {
      case 'seed':
        await seedDatabase();
        break;
      case 'backup':
        await backupDatabase();
        break;
      case 'restore':
        await restoreDatabase(subCommand);
        break;
      case 'clear':
        await clearDatabase();
        break;
      case 'list':
        await listCollections();
        break;
      case 'count':
        await countDocuments(subCommand);
        break;
      default:
        showUsage();
        process.exit(1);
    }

  } catch (error) {
    log(`💥 Fatal error: ${error.message}`, 'red');
    process.exit(1);
  } finally {
    await closeFirebaseAdmin();
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  seedDatabase,
  backupDatabase,
  restoreDatabase,
  clearDatabase,
  listCollections,
  countDocuments
};