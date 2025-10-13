# GitHub Actions Firebase Deployment Setup

This document provides step-by-step instructions for setting up GitHub Actions to automatically deploy your Firebase project.

## Overview

The GitHub Actions workflow automatically:
- Builds the Angular application
- Deploys to Firebase Hosting (live channel for main branch, preview for PRs)
- Deploys Firebase Functions (for main branch only)

## Required GitHub Secrets

You need to set up the following secrets in your GitHub repository:

### 1. FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_SANKET_C5165

This is the Firebase service account key for authentication.

#### Steps to generate:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `portfolio-sanket-c5165`
3. Click on the gear icon (Settings) → Project settings
4. Go to the "Service accounts" tab
5. Click "Generate new private key"
6. Download the JSON file
7. Copy the entire contents of the JSON file
8. In your GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_SANKET_C5165`
   - Value: Paste the entire JSON content

### 2. FIREBASE_TOKEN

This is the Firebase CLI token for deploying functions.

#### Steps to generate:

1. Install Firebase CLI if not already installed:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login:ci
   ```

3. This will open a browser window for authentication
4. After successful login, it will display a token
5. Copy this token
6. In your GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `FIREBASE_TOKEN`
   - Value: Paste the token

## Workflow Configuration

The workflow is configured in `.github/workflows/firebase-deploy.yml` and includes:

### Triggers
- **Push to main branch**: Deploys to live Firebase Hosting and Functions
- **Pull requests**: Creates preview deployments
- **Manual trigger**: Can be run manually from GitHub Actions tab

### Build Process
1. Checkout code
2. Set up Node.js 18
3. Install dependencies with `npm ci`
4. Build Angular app with production configuration

### Deployment Process
- **Main branch**: Deploys to live hosting channel and updates functions
- **Pull requests**: Creates preview deployments for testing

## Security Considerations

1. **Service Account Permissions**: The service account should have minimal required permissions:
   - Firebase Hosting Admin
   - Cloud Functions Developer
   - Firestore User (if using Firestore)

2. **Secret Management**: 
   - Never commit secrets to your repository
   - Regularly rotate service account keys
   - Monitor secret usage in GitHub Actions logs

## Troubleshooting

### Common Issues

1. **"Input required and not supplied: firebaseServiceAccount"**
   - Ensure `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_SANKET_C5165` secret is set
   - Verify the secret name matches exactly (case-sensitive)

2. **"Permission denied" errors**
   - Check service account permissions in Firebase Console
   - Ensure the service account has the required roles

3. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are properly listed in package.json
   - Review build logs for specific error messages

4. **Function deployment failures**
   - Ensure `FIREBASE_TOKEN` is valid and not expired
   - Check function code for syntax errors
   - Verify Firebase project configuration

### Debugging Steps

1. Check GitHub Actions logs:
   - Go to your repository → Actions tab
   - Click on the failed workflow run
   - Review each step's logs

2. Verify secrets are set:
   - Repository Settings → Secrets and variables → Actions
   - Ensure both required secrets are listed

3. Test locally:
   ```bash
   # Test build
   npm run build --configuration=production
   
   # Test Firebase deployment (requires authentication)
   firebase deploy --only hosting
   firebase deploy --only functions
   ```

## Manual Deployment

If you need to deploy manually:

```bash
# Build the application
npm run build --configuration=production

# Deploy to Firebase
firebase deploy --only hosting,functions
```

## Monitoring

- Monitor deployments in the Firebase Console
- Check GitHub Actions for deployment status
- Review Firebase Hosting deployment history
- Monitor Cloud Functions logs for any runtime issues

## Additional Resources

- [Firebase CLI Documentation](https://firebase.google.com/docs/cli)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase Hosting GitHub Action](https://github.com/FirebaseExtended/action-hosting-deploy)