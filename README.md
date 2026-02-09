# HTN Events Platform

A frontend submission for the Hack the North challenge.

This project is a responsive events dashboard built with Next.js, TypeScript, and React. It fetches live event data from the HTN API, supports auth-gated private events, and focuses on a strong visual identity inspired by Hack the North branding.

## Why this project exists

I treated this as both a challenge submission and a learning sprint:
- Build a clean typed foundation first
- Ship a complete, usable product in limited time
- Push design quality beyond generic component-library output

## What’s implemented

- Event feed from `https://api.hackthenorth.com/v3/events`
- Search (debounced)
- Event type filters (`workshop`, `tech_talk`, `activity`)
- Access filters (all/public/private, private visible only when authenticated)
- Sorting (`start`, `name`, `speaker count`)
- Private/public permission handling
- Event detail modal with related-event navigation
- Skeleton loading states and retry on API failure
- Dedicated login route with persisted auth state
- Responsive layout (adaptive grid + desktop side rail)

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS v4
- Radix UI Themes + Icons

## Design direction

The visual direction is intentionally HTN-inspired:
- HTN fonts (`Satoshi`, `Castledown`) via `@font-face`
- Dark cosmic palette and layered hero banner treatment
- Vertical, media-forward event cards with modal expansion

I initially started with denser text-first cards and then refactored into vertical cards for better scanability and stronger visual hierarchy.

## Architecture notes

- `src/lib/api.ts`: typed API access + centralized error handling
- `src/context/AuthContext.tsx`: auth via Context + `localStorage` + `useSyncExternalStore`
- `src/lib/filters.ts`: pure filter/sort functions
- `src/components/*`: separated by domain (`events`, `filters`, `layout`, `auth`, `ui`)

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Test credentials

- Username: `hacker`
- Password: `htn2026`

## Project structure

```txt
app/
  layout.tsx
  page.tsx
  login/page.tsx
  loading.tsx
src/
  components/
  constants/
  context/
  hooks/
  lib/
  types/
```

## Trade-offs and next steps

Given the timebox, I prioritized a cohesive end-to-end experience over shipping every optional feature.

Planned improvements:
- Event bookmarking/ranking
- More advanced filters (date/speaker facets)
- Additional views (table/list/board)
- Stronger modal focus management and reduced-motion support
- Automated tests (unit + e2e)
