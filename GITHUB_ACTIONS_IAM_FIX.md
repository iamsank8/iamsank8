# GitHub Actions Firebase Deployment IAM Fix

## Problem
The GitHub Actions workflow is failing with the following error:
```
Error: Missing permissions required for functions deploy. You must have permission iam.serviceAccounts.ActAs on service account portfolio-sanket-c5165@appspot.gserviceaccount.com.
```

## Root Cause
The Firebase service account used in GitHub Actions doesn't have the required IAM permissions to deploy Cloud Functions. Specifically, it needs the "Service Account User" role and other Firebase-related permissions.

## Solutions

### Solution 1: Fix IAM Permissions (Recommended)

#### Step 1: Assign Required IAM Roles
Run the IAM setup script to see the required roles:
```bash
chmod +x scripts/setup-firebase-iam.sh
./scripts/setup-firebase-iam.sh
```

#### Step 2: Assign Roles via Google Cloud Console
1. Go to [IAM Admin Console](https://console.cloud.google.com/iam-admin/iam?project=portfolio-sanket-c5165)
2. Find the service account: `portfolio-sanket-c5165@appspot.gserviceaccount.com`
3. Click "Edit" and add these roles:
   - Cloud Functions Admin
   - Service Account User
   - Firebase Admin
   - Storage Admin
   - Logging Admin
   - Cloud Scheduler Admin

#### Step 3: Assign Roles via gcloud CLI
```bash
PROJECT_ID="portfolio-sanket-c5165"
SERVICE_ACCOUNT="portfolio-sanket-c5165@appspot.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/cloudfunctions.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/firebase.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/logging.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/cloudscheduler.admin"
```

### Solution 2: Use Alternative Workflow
If you prefer a different approach, use the alternative workflow file:
```bash
# Rename current workflow
mv .github/workflows/firebase-deploy.yml .github/workflows/firebase-deploy.yml.backup

# Use alternative workflow
mv .github/workflows/firebase-deploy-alternative.yml .github/workflows/firebase-deploy.yml
```

### Solution 3: Deploy Only Hosting via GitHub Actions
If you want to deploy functions separately, modify the workflow to only deploy hosting:

1. Remove the functions deployment steps from the GitHub Actions workflow
2. Deploy functions manually or via a separate CI/CD pipeline:
   ```bash
   firebase deploy --only functions --project portfolio-sanket-c5165
   ```

## Verification
After applying the IAM permissions:

1. Push a commit to the main branch
2. Check the GitHub Actions workflow execution
3. Verify that both hosting and functions deploy successfully

## Additional Notes

### Service Account Key Security
- Ensure the `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_SANKET_C5165` secret is properly configured in GitHub repository secrets
- The service account key should have minimal required permissions
- Consider rotating the service account key periodically

### Alternative Authentication Methods
- Consider using Workload Identity Federation for more secure authentication
- Use short-lived tokens instead of long-lived service account keys when possible

### Troubleshooting
If you still encounter issues:

1. Verify the service account key is valid:
   ```bash
   gcloud auth activate-service-account --key-file=path/to/service-account.json
   gcloud projects list
   ```

2. Check Firebase project permissions:
   ```bash
   firebase projects:list
   firebase use portfolio-sanket-c5165
   ```

3. Test local deployment:
   ```bash
   firebase deploy --only functions --project portfolio-sanket-c5165
   ```

## Files Modified
- `.github/workflows/firebase-deploy.yml` - Updated workflow with better error handling
- `.github/workflows/firebase-deploy-alternative.yml` - Alternative workflow using Google Cloud SDK
- `scripts/setup-firebase-iam.sh` - Script to help set up IAM permissions
- `GITHUB_ACTIONS_IAM_FIX.md` - This documentation file