# Angular Upgrade Guide: v13 to v17

This guide provides detailed instructions for upgrading the portfolio application from Angular 13 to Angular 17, following the recommended incremental upgrade path.

## Prerequisites

- Node.js v18 or higher (required for Angular 17)
- Git (ensure all changes are committed before upgrading)
- Backup of your project

## Upgrade Path

The upgrade will follow this path:
1. Angular 13 → 14
2. Angular 14 → 15
3. Angular 15 → 16
4. Angular 16 → 17

## Automated Upgrade

An automated upgrade script is provided to handle the upgrade process:

```bash
# Make the script executable
chmod +x upgrade-angular.sh

# Run the upgrade script
./upgrade-angular.sh
```

The script will:
1. Check prerequisites
2. Create a backup of package.json
3. Upgrade Angular core and CLI in incremental steps
4. Update Angular Material in each step
5. Update other dependencies
6. Verify the build works
7. Offer to convert to standalone components
8. Clean up and reinstall dependencies

## Manual Upgrade Process

If you prefer to upgrade manually or if the automated script encounters issues, follow these steps:

### Step 1: Angular 13 to 14

```bash
# Update Angular core and CLI
ng update @angular/core@14 @angular/cli@14

# Update Angular Material
ng update @angular/material@14
```

**Key Changes in Angular 14:**
- Typed Forms
- Standalone Components (initial support)
- Extended developer diagnostics
- Optional NgModules

**Potential Issues:**
- Forms may need updates for strict typing
- RxJS operators might need updates

### Step 2: Angular 14 to 15

```bash
# Update Angular core and CLI
ng update @angular/core@15 @angular/cli@15

# Update Angular Material
ng update @angular/material@15
```

**Key Changes in Angular 15:**
- Standalone Components improvements
- Directive composition API
- Router improvements
- NgOptimizedImage directive

**Potential Issues:**
- Router configuration might need updates
- Image loading strategies may change

### Step 3: Angular 15 to 16

```bash
# Update Angular core and CLI
ng update @angular/core@16 @angular/cli@16

# Update Angular Material
ng update @angular/material@16
```

**Key Changes in Angular 16:**
- Required input signals
- Server-side rendering improvements
- Hydration support
- Improved standalone APIs

**Potential Issues:**
- Required inputs need to be properly marked
- SSR code might need adjustments

### Step 4: Angular 16 to 17

```bash
# Update Angular core and CLI
ng update @angular/core@17 @angular/cli@17

# Update Angular Material
ng update @angular/material@17
```

**Key Changes in Angular 17:**
- New control flow syntax (@if, @for, etc.)
- Deferrable views
- Built-in application loading UI
- Signals improvements

**Potential Issues:**
- Template syntax changes may be required
- Signal-based components need adaptation

## Post-Upgrade Tasks

After completing the upgrade to Angular 17:

1. **Convert to Standalone Components**
   ```bash
   ng generate @angular/core:standalone
   ```

2. **Update Angular Configuration**
   ```bash
   ng config
   ```

3. **Update to New Control Flow Syntax (Optional)**
   - Replace `*ngIf` with `@if`
   - Replace `*ngFor` with `@for`
   - Replace `*ngSwitch` with `@switch`

4. **Implement Signals (Optional)**
   - Convert RxJS-based state to signals
   - Use computed signals for derived state
   - Implement signal-based inputs/outputs

5. **Test Thoroughly**
   - Run unit tests
   - Check for visual regressions
   - Verify all features work as expected

## Troubleshooting Common Issues

### Build Errors

If you encounter build errors after upgrading:

1. Check for deprecated APIs and replace them
2. Ensure all dependencies are compatible with the new Angular version
3. Review breaking changes in the [Angular Update Guide](https://update.angular.io/)

### Runtime Errors

For runtime errors:

1. Check browser console for specific errors
2. Verify that all components are properly imported
3. Check for template syntax errors with the new version

### Material Theme Issues

If Angular Material components look incorrect:

1. Update theme imports to the new syntax
2. Check for deprecated component APIs
3. Review Material breaking changes for each version

## Resources

- [Official Angular Update Guide](https://update.angular.io/)
- [Angular Blog](https://blog.angular.io/)
- [Angular Material Documentation](https://material.angular.io/)
- [Angular CLI Documentation](https://angular.io/cli)

## Reverting (If Necessary)

If you need to revert the upgrade:

1. Restore your Git backup
2. Restore package.json.bak to package.json
3. Run `npm install` to reinstall dependencies