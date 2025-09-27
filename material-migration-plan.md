# Angular Material Migration Plan

## Overview
This document outlines the plan to migrate from legacy Angular Material components to the new ones as part of the Angular 17 upgrade. The migration is necessary because legacy components are no longer receiving bug fixes, accessibility improvements, or new features.

## Issues Identified
1. The project is using legacy Angular Material components (with `legacy-` prefix)
2. The theme file is using legacy theming APIs
3. Build errors related to Material component compatibility

## Migration Steps

### 1. Update Material Module
Replace all legacy imports with their modern equivalents in `src/app/core/material.module.ts`:

```typescript
// Before
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

// After
import { MatButtonModule } from '@angular/material/button';
```

### 2. Update Theme File
Migrate the theme file from legacy to modern theming:

```scss
// Before
@include mat.all-legacy-component-typographies();
@include mat.legacy-core();

// After
@include mat.typography-hierarchy();
@include mat.core();
```

### 3. Update Component References
Update all component references in templates:

- Replace `mat-card` with `mat-mdc-card`
- Replace `mat-form-field` with `mat-mdc-form-field`
- Replace `mat-button` with `mat-mdc-button`
- And so on for all legacy components

### 4. Update Component Imports
Update all component imports in TypeScript files:

```typescript
// Before
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

// After
import { MatSnackBar } from '@angular/material/snack-bar';
```

### 5. Update CSS Selectors
Update CSS selectors in component styles:

```scss
// Before
.mat-card { ... }

// After
.mat-mdc-card { ... }
```

### 6. Test Each Component
After migration, test each component to ensure it works correctly with the new Material components.

## Implementation Plan

1. Start with the theme file to fix the build errors
2. Update the Material module
3. Update the contact component
4. Update all other components that use Material components
5. Test the application thoroughly

## References
- [Angular Material MDC Migration Guide](https://material.angular.io/guide/mdc-migration)
- [Angular Material Component Documentation](https://material.angular.io/components/categories)