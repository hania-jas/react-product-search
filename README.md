# Product Search (React + TypeScript + Vite)

Mini aplikacja demonstracyjna w React + TypeScript pokazująca flow:
wyszukiwania produktów z **debounce**, **filtrowaniem**, **sortowaniem** oraz obsługą stanów **loading / error / empty**.

## Features

- 🔎 Search input (controlled)
- ⏳ Debounced API calls (`useEffect` + cleanup)
- 🧩 Client-side filtering:
  - only in stock
  - category (all / dynamic categories)
- ↕️ Sorting:
  - rating desc
  - price asc / desc
  - name asc
- 🧠 Derived state (list is computed in `useMemo`)
- 🧯 Race condition protection for async responses (request id guard)
- ✅ TypeScript types for products and props

## Tech stack

- React
- TypeScript
- Vite

## Getting started

### Requirements
- Node.js

### Install & run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```