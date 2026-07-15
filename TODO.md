# TODO

- [ ] Add resume upload + JD matching (PDF/DOCX)
  - [ ] Install server-side parsing deps: `pdf-parse` and `mammoth`
  - [ ] Add API route `/api/match-resume`:
    - [ ] accept multipart/form-data upload
    - [ ] extract resume text from PDF/DOCX
    - [ ] compute match score vs each job description
    - [ ] return top-N matches
  - [ ] Add UI on home page (or new route `/resume-match`):
    - [ ] upload input (PDF/DOCX)
    - [ ] match button + loading state
    - [ ] results list with match percent + interactive cards/progress
- [x] Normalize duplicate components casing (prevent future module resolution issues)
  - [x] remove unused duplicates (`components/navbar.tsx`, `components/Jobcard.tsx`) or update imports to single casing
- [ ] Re-run `npm run lint` and `npm run build`
- [ ] Update docs/STRUCTURE.md for new feature


