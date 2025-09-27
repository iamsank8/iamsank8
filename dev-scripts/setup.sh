#!/bin/bash

# Development Environment Setup Script
# This script sets up the development environment for the portfolio project

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up development environment...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
  exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d '.' -f 1)
if [ $NODE_MAJOR -lt 18 ]; then
  echo -e "${RED}Node.js version 18 or higher is required. Current version: $NODE_VERSION${NC}"
  echo -e "${YELLOW}Please upgrade Node.js and try again.${NC}"
  exit 1
fi

echo -e "${GREEN}Node.js version $NODE_VERSION detected.${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
  echo -e "${RED}npm is not installed. Please install npm first.${NC}"
  exit 1
fi

echo -e "${GREEN}npm detected.${NC}"

# Check if Angular CLI is installed
if ! command -v ng &> /dev/null; then
  echo -e "${YELLOW}Angular CLI not found. Installing...${NC}"
  npm install -g @angular/cli
else
  echo -e "${GREEN}Angular CLI detected.${NC}"
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
  echo -e "${YELLOW}Firebase CLI not found. Installing...${NC}"
  npm install -g firebase-tools
else
  echo -e "${GREEN}Firebase CLI detected.${NC}"
fi

# Install project dependencies
echo -e "${BLUE}Installing project dependencies...${NC}"
npm ci

# Install API dependencies
echo -e "${BLUE}Installing API dependencies...${NC}"
cd api && npm ci && cd ..

# Install Firebase Functions dependencies
echo -e "${BLUE}Installing Firebase Functions dependencies...${NC}"
cd functions && npm ci && cd ..

# Make scripts executable
echo -e "${BLUE}Making development scripts executable...${NC}"
chmod +x dev-scripts/*.sh

# Create logs directory
mkdir -p logs

# Create theme directory and file if they don't exist
echo -e "${BLUE}Checking theme directory and file...${NC}"
if [ ! -d "./src/theme" ]; then
  echo -e "${YELLOW}Creating theme directory...${NC}"
  mkdir -p ./src/theme
fi

if [ ! -f "./src/theme/theme.scss" ]; then
  echo -e "${YELLOW}Creating theme file...${NC}"
  # Create a minimal theme file
  cat > ./src/theme/theme.scss << EOF
@use '@angular/material' as mat;
@import '@angular/material/theming';

// Include the common styles for Angular Material
@include mat.core();

// Define the light theme
\$light-primary: mat.define-palette(mat.\$indigo-palette);
\$light-accent: mat.define-palette(mat.\$pink-palette, A200, A100, A400);
\$light-warn: mat.define-palette(mat.\$red-palette);

\$light-theme: mat.define-light-theme((
  color: (
    primary: \$light-primary,
    accent: \$light-accent,
    warn: \$light-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

// Define the dark theme
\$dark-primary: mat.define-palette(mat.\$blue-palette);
\$dark-accent: mat.define-palette(mat.\$amber-palette, A200, A100, A400);
\$dark-warn: mat.define-palette(mat.\$deep-orange-palette);

\$dark-theme: mat.define-dark-theme((
  color: (
    primary: \$dark-primary,
    accent: \$dark-accent,
    warn: \$dark-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

// Apply the light theme by default
@include mat.all-component-themes(\$light-theme);

// Apply the dark theme only when the \`.dark-theme\` CSS class is applied
// to an ancestor element of the components (such as \`body\`)
.dark-theme {
  @include mat.all-component-colors(\$dark-theme);

  // Custom dark theme styles
  --background-color: #121212;
  --text-color: #ffffff;
  --card-background: #1e1e1e;
  --border-color: #333333;
  --hover-color: rgba(255, 255, 255, 0.1);
  
  background-color: var(--background-color);
  color: var(--text-color);
  
  .mat-card {
    background-color: var(--card-background);
  }
  
  a:not(.mat-button):not(.mat-raised-button):not(.mat-fab):not(.mat-mini-fab):not([mat-list-item]) {
    color: mat.get-color-from-palette(\$dark-primary, 300);
    
    &:hover {
      color: mat.get-color-from-palette(\$dark-primary, 100);
    }
  }
}

// Light theme custom variables
:root {
  --background-color: #f5f5f5;
  --text-color: rgba(0, 0, 0, 0.87);
  --card-background: #ffffff;
  --border-color: #e0e0e0;
  --hover-color: rgba(0, 0, 0, 0.04);
}

// Global styles
body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
}

// Add smooth transitions for theme switching
.mat-card,
.mat-toolbar,
.mat-button,
.mat-icon-button,
.mat-raised-button,
.mat-form-field,
.mat-input-element,
.mat-select,
.mat-option {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
EOF
  echo -e "${GREEN}Theme file created.${NC}"
else
  echo -e "${GREEN}Theme file already exists.${NC}"
fi

# Firebase login check
echo -e "${BLUE}Checking Firebase login status...${NC}"
firebase login:list

echo -e "${GREEN}Development environment setup complete!${NC}"
echo -e "${YELLOW}You can now run the application using:${NC}"
echo -e "${BLUE}./dev-scripts/start-all.sh${NC}"