# Fix for Turbopack workspace root error

## Problem
Build fails with:
- `Error: Next.js inferred your workspace root, but it may not be correct.`
- `We couldn't find the Next.js package (next/package.json) from the project directory: .../app`

This usually happens when Next/Turbopack is treating `app/` as the project root, often due to:
- multiple lockfiles present (example: `C:\Users\YAMA SINHA\package-lock.json` and one inside the repo)
- running build from the wrong working directory

## Fix (recommended)
1. Ensure you run commands from the repo root:
   - `c:\Users\YAMA SINHA\OneDrive\New folder\Desktop\job-board-ai`
2. Remove the *other* lockfile that’s outside the repo root:
   - Delete: `C:\Users\YAMA SINHA\package-lock.json`
   - Keep the repo’s: `c:\Users\YAMA SINHA\OneDrive\New folder\Desktop\job-board-ai\package-lock.json`
3. Clean install + rebuild:
   - `rmdir /s /q node_modules`
   - `del /q .next`
   - `npm install`
   - `npm run build`

## Alternative fix (if you can’t delete the user-level lockfile)
Add Turbopack root override in `next.config.ts`:
```ts
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
```
Then rebuild.

