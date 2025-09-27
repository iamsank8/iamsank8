const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

/**
 * Initialize Firebase Admin SDK with service account authentication
 * This module provides a centralized way to initialize Firebase Admin
 * for local development and production environments
 */

let firebaseApp = null;

/**
 * Initialize Firebase Admin SDK
 * @param {Object} options - Configuration options
 * @param {string} options.projectId - Firebase project ID
 * @param {string} options.serviceAccountPath - Path to service account key file
 * @returns {admin.app.App} Firebase Admin app instance
 */
function initializeFirebaseAdmin(options = {}) {
  if (firebaseApp) {
    console.log('Firebase Admin already initialized');
    return firebaseApp;
  }

  try {
    const projectId = options.projectId || process.env.FIREBASE_PROJECT_ID;
    const serviceAccountPath = options.serviceAccountPath || process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!projectId) {
      throw new Error('Firebase project ID is required. Set FIREBASE_PROJECT_ID environment variable.');
    }

    if (!serviceAccountPath) {
      throw new Error('Service account path is required. Set GOOGLE_APPLICATION_CREDENTIALS environment variable.');
    }

    // Resolve the service account path relative to project root
    const resolvedPath = path.resolve(process.cwd(), serviceAccountPath);
    
    console.log(`Initializing Firebase Admin for project: ${projectId}`);
    console.log(`Using service account: ${resolvedPath}`);

    // Check if service account file exists
    const fs = require('fs');
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Service account file not found: ${resolvedPath}`);
    }

    const serviceAccount = require(resolvedPath);

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: projectId
    });

    console.log('Firebase Admin initialized successfully');
    return firebaseApp;

  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error.message);
    throw error;
  }
}

/**
 * Get Firestore database instance
 * @returns {admin.firestore.Firestore} Firestore database instance
 */
function getFirestore() {
  if (!firebaseApp) {
    initializeFirebaseAdmin();
  }
  return admin.firestore();
}

/**
 * Get Firebase Auth instance
 * @returns {admin.auth.Auth} Firebase Auth instance
 */
function getAuth() {
  if (!firebaseApp) {
    initializeFirebaseAdmin();
  }
  return admin.auth();
}

/**
 * Close Firebase Admin connection
 */
async function closeFirebaseAdmin() {
  if (firebaseApp) {
    await firebaseApp.delete();
    firebaseApp = null;
    console.log('Firebase Admin connection closed');
  }
}

module.exports = {
  initializeFirebaseAdmin,
  getFirestore,
  getAuth,
  closeFirebaseAdmin,
  admin
};