# Job Board AI — Folder Structure

This project is a **Next.js (App Router)** app.

## Top-level
- **`app/`**
  - **`app/layout.tsx`**: Root layout wrapper (HTML/body) + global styles + fonts.
  - **`app/page.tsx`**: Home page composition (Navbar, Hero, SearchBar, and job list).
  - **`app/globals.css`**: Tailwind/global CSS.

- **`components/`** (UI building blocks used by pages)
  - **`Navbar.tsx`**: Top navigation/header.
  - **`Hero.tsx`**: Landing hero section.
  - **`SearchBar.tsx`**: Search input + button (currently presentational).
  - **`JobCard.tsx`**: Job listing card (title/company/location/salary/description).

- **`data/`**
  - **`jobs.ts`**: Static job data array consumed by `app/page.tsx`.

- **`public/`**
  - Static assets (SVGs/images) served as-is.

## Import conventions
- Uses the TypeScript path alias **`@/*` → `./*`** (configured in `tsconfig.json`).
  - Example: `import JobCard from "@/components/JobCard"`

## Notes
- Keep component filename casing consistent (e.g., `JobCard.tsx` vs `Jobcard.tsx`) to avoid import/runtime issues.

