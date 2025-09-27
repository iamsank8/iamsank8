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

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
  echo -e "${YELLOW}nvm (Node Version Manager) is not installed. Checking Node.js version directly...${NC}"
  
  # Check if Node.js is installed
  if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
  fi

  # Check Node.js version
  NODE_VERSION=$(node -v | cut -d 'v' -f 2)
  NODE_MAJOR=$(echo $NODE_VERSION | cut -d '.' -f 1)
  
  if [ $NODE_MAJOR -gt 20 ]; then
    echo -e "${RED}Node.js version 20 is recommended for Angular 17. Current version: $NODE_VERSION${NC}"
    echo -e "${YELLOW}This version may not be fully compatible. Consider using nvm to install Node.js 20.${NC}"
    
    # Ask if user wants to continue
    echo -e "${YELLOW}Do you want to continue with the current Node.js version? (y/n)${NC}"
    read -r response
    if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
      echo -e "${BLUE}Exiting. Please install nvm and run this script again.${NC}"
      echo -e "${BLUE}nvm installation instructions: https://github.com/nvm-sh/nvm#installing-and-updating${NC}"
      exit 1
    fi
  fi
else
  # Use nvm to switch to Node.js 20
  echo -e "${BLUE}Using nvm to switch to Node.js 20...${NC}"
  nvm use 20 || nvm install 20
  
  # Verify Node.js version after switch
  NODE_VERSION=$(node -v | cut -d 'v' -f 2)
  NODE_MAJOR=$(echo $NODE_VERSION | cut -d '.' -f 1)
  
  if [ $NODE_MAJOR -ne 20 ]; then
    echo -e "${RED}Failed to switch to Node.js 20. Current version: $NODE_VERSION${NC}"
    echo -e "${YELLOW}Do you want to continue with the current Node.js version? (y/n)${NC}"
    read -r response
    if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
      exit 1
    fi
  fi
fi

echo -e "${GREEN}Node.js version $(node -v) detected.${NC}"

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

# Handle potential dependency conflicts
echo -e "${BLUE}Checking for dependency conflicts...${NC}"
npm ls 2>/dev/null | grep -i "peer dep missing\|invalid\|conflict"

if [ $? -eq 0 ]; then
  echo -e "${YELLOW}Dependency conflicts detected. Attempting to resolve...${NC}"
  npm install --legacy-peer-deps
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Could not automatically resolve all dependency conflicts.${NC}"
    echo -e "${YELLOW}You may need to manually update some dependencies.${NC}"
  else
    echo -e "${GREEN}Dependencies resolved successfully.${NC}"
  fi
else
  echo -e "${GREEN}No dependency conflicts detected.${NC}"
fi

# Fix security vulnerabilities if possible
echo -e "${BLUE}Fixing security vulnerabilities...${NC}"
npm audit fix --force || echo -e "${YELLOW}Some vulnerabilities could not be fixed automatically.${NC}"

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
echo -e "${YELLOW}Converting to standalone components is recommended for Angular 17.${NC}"
echo -e "${YELLOW}Would you like to convert to standalone components? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  echo -e "${BLUE}Converting to standalone components...${NC}"
  # Use --defaults to avoid interactive prompts
  npx @angular/cli@17 generate @angular/core:standalone --defaults
  
  if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Standalone conversion encountered issues. This is not critical and can be done manually later.${NC}"
  else
    echo -e "${GREEN}Successfully converted to standalone components.${NC}"
  fi
else
  echo -e "${BLUE}Skipping standalone components conversion. You can do this manually later.${NC}"
fi

# Update Angular config
echo -e "${BLUE}Updating Angular configuration...${NC}"
npx @angular/cli@17 config

# Handle TypeScript compatibility
echo -e "${BLUE}Checking TypeScript compatibility...${NC}"
TS_VERSION=$(npm list typescript | grep typescript | head -1 | awk -F@ '{print $2}' | awk '{print $1}')
echo -e "${BLUE}Current TypeScript version: $TS_VERSION${NC}"

# Angular 17 requires TypeScript 5.2 or higher
if [[ $(echo "$TS_VERSION" | cut -d. -f1) -lt 5 || ($(echo "$TS_VERSION" | cut -d. -f1) -eq 5 && $(echo "$TS_VERSION" | cut -d. -f2) -lt 2) ]]; then
  echo -e "${YELLOW}Updating TypeScript to version compatible with Angular 17...${NC}"
  npm install typescript@~5.2.0 --save-dev
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to update TypeScript. You may need to update it manually.${NC}"
  else
    echo -e "${GREEN}TypeScript updated successfully.${NC}"
  fi
fi

# Clean up
echo -e "${BLUE}Cleaning up...${NC}"
npm cache clean --force
echo -e "${BLUE}Removing node_modules...${NC}"
rm -rf node_modules
echo -e "${BLUE}Reinstalling dependencies...${NC}"
npm install

echo -e "${GREEN}Angular upgrade from v13 to v17 completed successfully!${NC}"
echo -e "${YELLOW}Please test your application thoroughly to ensure everything works as expected.${NC}"
echo -e "${YELLOW}You may need to update your code to address any breaking changes in Angular 17.${NC}"
echo -e "${BLUE}For more information, see the Angular update guide: https://update.angular.io/${NC}"