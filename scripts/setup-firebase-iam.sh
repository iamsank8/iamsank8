#!/bin/bash

# Firebase IAM Setup Script
# This script helps set up the required IAM permissions for GitHub Actions deployment

PROJECT_ID="portfolio-sanket-c5165"
SERVICE_ACCOUNT_EMAIL="portfolio-sanket-c5165@appspot.gserviceaccount.com"

echo "Setting up Firebase IAM permissions for GitHub Actions deployment..."
echo "Project ID: $PROJECT_ID"
echo "Service Account: $SERVICE_ACCOUNT_EMAIL"

# Required roles for Firebase Functions deployment
REQUIRED_ROLES=(
    "roles/cloudfunctions.admin"
    "roles/iam.serviceAccountUser"
    "roles/firebase.admin"
    "roles/storage.admin"
    "roles/logging.admin"
    "roles/cloudscheduler.admin"
)

echo ""
echo "The following IAM roles need to be assigned to the service account:"
for role in "${REQUIRED_ROLES[@]}"; do
    echo "  - $role"
done

echo ""
echo "To assign these roles, run the following commands:"
echo ""

for role in "${REQUIRED_ROLES[@]}"; do
    echo "gcloud projects add-iam-policy-binding $PROJECT_ID \\"
    echo "    --member=\"serviceAccount:$SERVICE_ACCOUNT_EMAIL\" \\"
    echo "    --role=\"$role\""
    echo ""
done

echo "Alternatively, you can assign these roles through the Google Cloud Console:"
echo "1. Go to: https://console.cloud.google.com/iam-admin/iam?project=$PROJECT_ID"
echo "2. Find the service account: $SERVICE_ACCOUNT_EMAIL"
echo "3. Click 'Edit' and add the required roles listed above"

echo ""
echo "After setting up the IAM permissions, the GitHub Actions deployment should work correctly."