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
echo -e "${BLUE}Creating PrimeNG theme file...${NC}"
cat > ./src/theme/theme.scss << EOF
/*
 * Portfolio PrimeNG Theme Configuration
 * Custom theme for PrimeNG components with design system integration
 */

// Import design tokens and components
@import './design-tokens.scss';
@import './components.scss';

/* ===== PRIMENG THEME CUSTOMIZATION ===== */

// Override PrimeNG CSS variables for consistent theming
:root {
  // Primary colors
  --primary-color: var(--accent-blue);
  --primary-color-text: var(--text-white);
  
  // Surface colors
  --surface-0: var(--bg-primary);
  --surface-50: var(--bg-secondary);
  --surface-100: var(--bg-tertiary);
  --surface-200: #e5e7eb;
  --surface-300: #d1d5db;
  --surface-400: #9ca3af;
  --surface-500: #6b7280;
  --surface-600: #4b5563;
  --surface-700: #374151;
  --surface-800: #1f2937;
  --surface-900: #111827;
  
  // Text colors
  --text-color: var(--text-primary);
  --text-color-secondary: var(--text-secondary);
  
  // Border colors
  --surface-border: var(--border-light);
  
  // Focus and hover states
  --focus-ring: 0 0 0 0.2rem rgba(59, 130, 246, 0.2);
  --maskbg: rgba(0, 0, 0, 0.4);
}

// Dark theme overrides for PrimeNG
.dark-theme {
  --surface-0: var(--bg-primary);
  --surface-50: #2d3748;
  --surface-100: #4a5568;
  --surface-200: #718096;
  --surface-300: #a0aec0;
  --surface-400: #cbd5e0;
  --surface-500: #e2e8f0;
  --surface-600: #edf2f7;
  --surface-700: #f7fafc;
  --surface-800: #ffffff;
  --surface-900: #ffffff;
  
  --text-color: var(--text-primary);
  --text-color-secondary: var(--text-secondary);
  --surface-border: var(--border-color);
  
  --primary-color: var(--accent-blue);
  --primary-color-text: var(--text-white);
  
  --focus-ring: 0 0 0 0.2rem rgba(59, 130, 246, 0.3);
  --maskbg: rgba(0, 0, 0, 0.6);
}

/* ===== PRIMENG COMPONENT CUSTOMIZATIONS ===== */

// Button customizations
.p-button {
  font-family: var(--font-body);
  font-weight: var(--font-medium);
  border-radius: var(--radius-md);
  transition: var(--transition-all);
  
  &.p-button-primary {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    
    &:hover {
      background: var(--accent-blue-dark);
      border-color: var(--accent-blue-dark);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
  }
  
  &.p-button-secondary {
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--text-primary);
    
    &:hover {
      background: var(--text-primary);
      color: var(--text-white);
    }
  }
}

// Card customizations
.p-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  border: 1px solid var(--border-light);
  transition: var(--transition-all);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  .p-card-header {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-light);
    padding: var(--space-6);
  }
  
  .p-card-body {
    padding: var(--space-6);
  }
  
  .p-card-footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-light);
    padding: var(--space-6);
  }
}

// Input field customizations
.p-inputtext,
.p-inputtextarea,
.p-dropdown,
.p-multiselect {
  font-family: var(--font-body);
  border-radius: var(--radius-md);
  border: 2px solid var(--border-light);
  transition: var(--transition-fast);
  
  &:focus {
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 3px rgba(59, 130, 206, 0.1);
  }
}

// Panel customizations
.p-panel {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  
  .p-panel-header {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-light);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
}

// DataTable customizations
.p-datatable {
  .p-datatable-header {
    background: var(--bg-secondary);
    border: 1px solid var(--border-light);
  }
  
  .p-datatable-tbody > tr {
    transition: var(--transition-fast);
    
    &:hover {
      background: var(--bg-secondary);
    }
  }
}

// Menu customizations
.p-menu {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  
  .p-menuitem-link {
    transition: var(--transition-fast);
    
    &:hover {
      background: var(--bg-secondary);
    }
  }
}

// Dialog customizations
.p-dialog {
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  
  .p-dialog-header {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-light);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }
}

// Toast customizations
.p-toast {
  .p-toast-message {
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    
    &.p-toast-message-success {
      background: var(--success-green);
      border-color: var(--success-green-dark);
    }
    
    &.p-toast-message-error {
      background: var(--error-red);
      border-color: var(--error-red-dark);
    }
    
    &.p-toast-message-warn {
      background: var(--warning-orange);
      border-color: var(--warning-orange-dark);
    }
    
    &.p-toast-message-info {
      background: var(--accent-blue);
      border-color: var(--accent-blue-dark);
    }
  }
}

// Progress Bar customizations
.p-progressbar {
  border-radius: var(--radius-full);
  background: var(--bg-tertiary);
  
  .p-progressbar-value {
    background: linear-gradient(90deg, var(--accent-blue), var(--success-green));
    border-radius: var(--radius-full);
  }
}

// Chip/Tag customizations
.p-chip {
  background: var(--bg-accent);
  color: var(--text-primary);
  border-radius: var(--radius-full);
  font-weight: var(--font-medium);
  
  &.p-chip-primary {
    background: var(--accent-blue);
    color: var(--text-white);
  }
}

/* ===== RESPONSIVE ADJUSTMENTS ===== */

@media (max-width: 768px) {
  .p-dialog {
    width: 95vw !important;
    margin: 0 auto;
  }
  
  .p-datatable {
    font-size: var(--text-sm);
  }
  
  .p-button {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
  }
}

/* ===== ACCESSIBILITY ENHANCEMENTS ===== */

// Enhanced focus indicators for PrimeNG components
.p-button:focus,
.p-inputtext:focus,
.p-dropdown:focus,
.p-multiselect:focus {
  outline: 3px solid var(--accent-blue) !important;
  outline-offset: 2px !important;
}

// High contrast mode support for PrimeNG
@media (prefers-contrast: high) {
  .p-button,
  .p-inputtext,
  .p-card {
    border-width: 2px !important;
    border-color: currentColor !important;
  }
}
EOF

echo -e "${GREEN}PrimeNG theme setup complete!${NC}"
echo -e "${YELLOW}The theme now uses PrimeNG components with custom design tokens.${NC}"
echo -e "${BLUE}You can use the dark/light theme toggle in the application.${NC}"