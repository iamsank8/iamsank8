#!/bin/bash

# GitHub Actions Firebase Deployment Setup Script
# This script helps generate the required secrets for GitHub Actions

set -e

echo "🔥 Firebase GitHub Actions Setup"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI is not installed${NC}"
    echo -e "${YELLOW}Installing Firebase CLI...${NC}"
    npm install -g firebase-tools
fi

echo -e "${GREEN}✅ Firebase CLI is available${NC}"
echo ""

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo -e "${YELLOW}🔐 You need to login to Firebase first${NC}"
    firebase login
fi

echo -e "${GREEN}✅ Firebase authentication verified${NC}"
echo ""

# Generate Firebase token
echo -e "${BLUE}📝 Generating Firebase CI token...${NC}"
echo -e "${YELLOW}This will open a browser window for authentication${NC}"
echo ""

FIREBASE_TOKEN=$(firebase login:ci --no-localhost)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Firebase token generated successfully${NC}"
    echo ""
    echo -e "${BLUE}🔑 Your Firebase Token:${NC}"
    echo -e "${GREEN}$FIREBASE_TOKEN${NC}"
    echo ""
else
    echo -e "${RED}❌ Failed to generate Firebase token${NC}"
    exit 1
fi

# Instructions for service account
echo -e "${BLUE}📋 Next Steps:${NC}"
echo ""
echo -e "${YELLOW}1. Generate Firebase Service Account Key:${NC}"
echo "   • Go to: https://console.firebase.google.com/project/portfolio-sanket-c5165/settings/serviceaccounts/adminsdk"
echo "   • Click 'Generate new private key'"
echo "   • Download the JSON file"
echo "   • Copy the entire JSON content"
echo ""

echo -e "${YELLOW}2. Add GitHub Repository Secrets:${NC}"
echo "   • Go to your GitHub repository"
echo "   • Navigate to: Settings → Secrets and variables → Actions"
echo "   • Add these secrets:"
echo ""
echo -e "   ${GREEN}Secret Name:${NC} FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_SANKET_C5165"
echo -e "   ${GREEN}Secret Value:${NC} [Paste the entire JSON content from step 1]"
echo ""
echo -e "   ${GREEN}Secret Name:${NC} FIREBASE_TOKEN"
echo -e "   ${GREEN}Secret Value:${NC} $FIREBASE_TOKEN"
echo ""

echo -e "${YELLOW}3. Test the deployment:${NC}"
echo "   • Push a commit to the main branch"
echo "   • Check GitHub Actions tab for deployment status"
echo ""

echo -e "${GREEN}🎉 Setup complete! Your GitHub Actions should now work properly.${NC}"
echo ""
echo -e "${BLUE}📚 For detailed instructions, see: GITHUB_ACTIONS_SETUP.md${NC}"