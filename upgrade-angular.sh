#!/bin/bash

# Angular Upgrade Script
# This script upgrades Angular from v13 to v17 following the recommended upgrade path

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Angular Upgrade Script${NC}"
echo -e "${BLUE}This script will upgrade Angular from v13 to v17 following the recommended upgrade path.${NC}"
echo -e "${YELLOW}Make sure you have committed all your changes before proceeding.${NC}"
echo -e "${YELLOW}The upgrade process will be done in steps: 13 -> 14 -> 15 -> 16 -> 17${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
  exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d '.' -f 1)
if [ $NODE_MAJOR -lt 18 ]; then
  echo -e "${RED}Node.js version 18 or higher is required for Angular 17. Current version: $NODE_VERSION${NC}"
  echo -e "${YELLOW}Please upgrade Node.js and try again.${NC}"
  exit 1
fi

echo -e "${GREEN}Node.js version $NODE_VERSION detected.${NC}"

# Function to check if the upgrade was successful
check_upgrade() {
  if [ $? -ne 0 ]; then
    echo -e "${RED}Upgrade to Angular $1 failed. Please check the error messages above.${NC}"
    exit 1
  else
    echo -e "${GREEN}Successfully upgraded to Angular $1.${NC}"
  fi
}

# Create backup
echo -e "${BLUE}Creating backup of package.json...${NC}"
cp package.json package.json.bak

# Step 1: Upgrade from Angular 13 to 14
echo -e "${YELLOW}Step 1: Upgrading from Angular 13 to 14...${NC}"
npx @angular/cli@14 update @angular/core@14 @angular/cli@14
check_upgrade "14"

# Update Angular Material
echo -e "${BLUE}Updating Angular Material to v14...${NC}"
npx @angular/cli@14 update @angular/material@14
check_upgrade "Material 14"

# Step 2: Upgrade from Angular 14 to 15
echo -e "${YELLOW}Step 2: Upgrading from Angular 14 to 15...${NC}"
npx @angular/cli@15 update @angular/core@15 @angular/cli@15
check_upgrade "15"

# Update Angular Material
echo -e "${BLUE}Updating Angular Material to v15...${NC}"
npx @angular/cli@15 update @angular/material@15
check_upgrade "Material 15"

# Step 3: Upgrade from Angular 15 to 16
echo -e "${YELLOW}Step 3: Upgrading from Angular 15 to 16...${NC}"
npx @angular/cli@16 update @angular/core@16 @angular/cli@16
check_upgrade "16"

# Update Angular Material
echo -e "${BLUE}Updating Angular Material to v16...${NC}"
npx @angular/cli@16 update @angular/material@16
check_upgrade "Material 16"

# Step 4: Upgrade from Angular 16 to 17
echo -e "${YELLOW}Step 4: Upgrading from Angular 16 to 17...${NC}"
npx @angular/cli@17 update @angular/core@17 @angular/cli@17
check_upgrade "17"

# Update Angular Material
echo -e "${BLUE}Updating Angular Material to v17...${NC}"
npx @angular/cli@17 update @angular/material@17
check_upgrade "Material 17"

# Update other dependencies
echo -e "${BLUE}Updating other dependencies...${NC}"
npm update
npm audit fix

# Run build to verify everything works
echo -e "${BLUE}Building the application to verify the upgrade...${NC}"
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed after upgrade. Please check the error messages above.${NC}"
  echo -e "${YELLOW}You may need to manually fix some issues.${NC}"
  echo -e "${YELLOW}A backup of your original package.json is available at package.json.bak${NC}"
  exit 1
else
  echo -e "${GREEN}Build successful! The upgrade to Angular 17 is complete.${NC}"
fi

# Post-upgrade tasks
echo -e "${BLUE}Performing post-upgrade tasks...${NC}"

# Update to standalone components (optional)
echo -e "${YELLOW}Would you like to convert to standalone components? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  echo -e "${BLUE}Converting to standalone components...${NC}"
  npx @angular/cli@17 generate @angular/core:standalone
fi

# Update Angular config
echo -e "${BLUE}Updating Angular configuration...${NC}"
npx @angular/cli@17 config

# Clean up
echo -e "${BLUE}Cleaning up...${NC}"
npm cache clean --force
rm -rf node_modules
npm install

echo -e "${GREEN}Angular upgrade from v13 to v17 completed successfully!${NC}"
echo -e "${YELLOW}Please test your application thoroughly to ensure everything works as expected.${NC}"
echo -e "${YELLOW}You may need to update your code to address any breaking changes in Angular 17.${NC}"
echo -e "${BLUE}For more information, see the Angular update guide: https://update.angular.io/${NC}"