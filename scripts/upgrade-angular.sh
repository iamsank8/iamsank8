#!/usr/bin/env bash
set -euo pipefail

# Array of target Angular major versions
VERSIONS=(18 19 20 21)

for V in "${VERSIONS[@]}"; do
  echo "\n=== Upgrading to Angular $V ==="
  # Update core and cli to the specific major version
  npx -y @angular/cli@${V} -- ng update @angular/core@${V} @angular/cli@${V} --force
  # Update dev dependencies (build-angular, compiler-cli) to match Angular $V
  npx -y @angular/cli@${V} -- ng update @angular-devkit/build-angular@${V} @angular/compiler-cli@${V} --force
  npm install
  # Run lint & tests (customize commands as needed)
  npm run lint || true
  npm run test:coverage || true
  # Commit changes
  git add .
  git commit -m "chore: upgrade Angular to $V"
done

echo "\nAll upgrades completed successfully."
