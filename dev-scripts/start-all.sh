#!/bin/bash

# Start All Development Services Script
# This script starts all the necessary services for local development

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Store PIDs in a file for reliable cleanup
PID_FILE="./.dev_pids"
touch $PID_FILE

# Function to clean up background processes
cleanup() {
  echo -e "${YELLOW}Shutting down all services...${NC}"
  
  if [ -f "$PID_FILE" ]; then
    while read pid; do
      if ps -p $pid > /dev/null; then
        echo -e "${BLUE}Stopping process with PID: $pid${NC}"
        kill $pid 2>/dev/null || true
      fi
    done < "$PID_FILE"
    rm $PID_FILE
  fi
  
  echo -e "${GREEN}All services have been stopped.${NC}"
  exit 0
}

# Set up trap to catch Ctrl+C and other termination signals
trap cleanup EXIT INT TERM

echo -e "${YELLOW}Starting all development services...${NC}"

# Create a directory for logs
mkdir -p ./logs

# Start Firebase emulators in the background
echo -e "${BLUE}Starting Firebase emulators...${NC}"
firebase emulators:start --only functions,firestore,hosting > ./logs/firebase-emulators.log 2>&1 &
FIREBASE_PID=$!
echo $FIREBASE_PID >> $PID_FILE
echo -e "${GREEN}Firebase emulators started with PID: $FIREBASE_PID${NC}"

# Wait a bit for Firebase emulators to initialize
sleep 5

# Start API server in the background
echo -e "${BLUE}Starting API server...${NC}"
cd api && node server.js > ../logs/api-server.log 2>&1 &
API_PID=$!
echo $API_PID >> $PID_FILE
cd ..
echo -e "${GREEN}API server started with PID: $API_PID${NC}"

# Start Angular development server
echo -e "${BLUE}Starting Angular development server...${NC}"

# Check if theme directory exists, if not create it
if [ ! -d "./src/theme" ]; then
  echo -e "${YELLOW}Creating theme directory...${NC}"
  mkdir -p ./src/theme
  
  # Check if theme file exists in the wrong location
  if [ -f "./src/theme/theme.scss" ]; then
    echo -e "${YELLOW}Theme file already exists in the correct location.${NC}"
  else
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

// Apply the light theme by default
@include mat.all-component-themes(\$light-theme);
EOF
  fi
fi

ng serve --open

# The cleanup function will be called automatically when the script exits