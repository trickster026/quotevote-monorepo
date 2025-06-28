# Build Troubleshooting Guide

## Rollup Native Module Error

### Problem
When building in CI/CD environments (especially Linux), you may encounter this error:

```
Error: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828).
```

### Solution
This issue has been resolved by implementing the following changes:

1. **Environment Variable**: Added `ROLLUP_SKIP_NATIVE=true` to build scripts
2. **Vite Configuration**: Updated `vite.config.js` to handle native module warnings
3. **NPM Configuration**: Created `.npmrc` file to configure optional dependencies
4. **CI-Specific Build**: Added `build:ci` script for CI/CD environments

### Available Build Commands

- `npm run build` - Standard build with native module handling
- `npm run build:ci` - CI/CD optimized build with production environment

### Configuration Files Modified

1. **package.json** - Updated build scripts with environment variables
2. **vite.config.js** - Added warning suppression and native module handling
3. **.npmrc** - Configured npm to handle optional dependencies better

### For CI/CD Environments

Use the `build:ci` command in your CI/CD pipeline:

```bash
npm run build:ci
```

This command sets the necessary environment variables to prevent native module issues across different platforms.

### Additional Notes

- The build process includes a gulp task to add license headers to built files
- Sass deprecation warnings are expected and don't affect the build
- The main JavaScript bundle is large (~2.7MB) - consider code splitting for production optimization 