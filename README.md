# Films

React + TypeScript starter with Vite, TanStack Query, TanStack Router, and Axios.

## Stack

- Vite + React + TypeScript
- TanStack Router (file-based routes)
- TanStack Query
- Axios

Sample data comes from the public [Studio Ghibli API](https://ghibliapi.vercel.app).

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Structure

- `src/api` — Axios client and film requests
- `src/lib` — QueryClient
- `src/routes` — TanStack Router pages (`/`, `/films/$filmId`)
