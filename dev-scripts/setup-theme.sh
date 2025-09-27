#!/bin/bash

# Theme Setup Script
# This script sets up the theme directory and file for the portfolio project

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up theme...${NC}"

# Create theme directory if it doesn't exist
if [ ! -d "./src/theme" ]; then
  echo -e "${BLUE}Creating theme directory...${NC}"
  mkdir -p ./src/theme
fi

# Backup existing theme file if it exists
if [ -f "./src/theme/theme.scss" ]; then
  echo -e "${BLUE}Backing up existing theme file...${NC}"
  cp -n ./src/theme/theme.scss ./src/theme/theme.scss.bak
fi

# Create theme file
echo -e "${BLUE}Creating theme file...${NC}"
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

echo -e "${GREEN}Theme setup complete!${NC}"
echo -e "${YELLOW}You can now use the dark/light theme toggle in the application.${NC}"