#!/bin/bash

# Firebase Deployment Script
# This script builds and deploys the application to Firebase

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process...${NC}"

# Check if environment is specified
ENV=${1:-prod}
if [ "$ENV" != "prod" ] && [ "$ENV" != "staging" ]; then
  echo -e "${RED}Invalid environment. Use 'prod' or 'staging'.${NC}"
  exit 1
fi

# Build the Angular application
echo -e "${BLUE}Building Angular application for $ENV environment...${NC}"
if [ "$ENV" == "prod" ]; then
  ng build --configuration=production
else
  ng build --configuration=staging
fi

# Check if build was successful
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Aborting deployment.${NC}"
  exit 1
fi

echo -e "${GREEN}Build successful.${NC}"

# Deploy to Firebase
echo -e "${BLUE}Deploying to Firebase...${NC}"

if [ "$ENV" == "prod" ]; then
  # Deploy to production
  firebase deploy --only hosting,functions
else
  # Deploy to preview channel for staging
  firebase hosting:channel:deploy staging --expires 7d
  firebase deploy --only functions
fi

# Check if deployment was successful
if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed.${NC}"
  exit 1
fi

echo -e "${GREEN}Deployment successful!${NC}"

# If it's a staging deployment, show the preview URL
if [ "$ENV" == "staging" ]; then
  echo -e "${YELLOW}Preview URL:${NC}"
  firebase hosting:channel:open staging
fi

echo -e "${YELLOW}Deployment process completed.${NC}"