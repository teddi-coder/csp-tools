# CSP Tools

Extensible client tool for Cyber Safety Project, surfaced inside the Burrow. Built with Next.js 14 (App Router), TypeScript, Tailwind, and Supabase.

Production URL: `https://csp-tools.vercel.app`

## Architecture

### Module registry

The app is driven by a **module registry** at `src/modules/registry.ts`. The nav and routed content both read from this array. Each entry has:

- `id` — URL slug (e.g. `creative-review`)
- `label` — tab label shown in the nav
- `icon` — emoji/icon
- `status` — `'live'` (clickable) or `'soon'` (shows placeholder)
- `Component` — the React component to render

### Adding a new module

1. Create a component file at `src/modules/<your-module>/index.tsx` (or a single file at `src/modules/<your-module>.tsx`).
2. Add one entry to the `modules` array in `src/modules/registry.ts`:

```ts
import { YourModule } from './<your-module>';

// Add to the modules array:
{
  id: 'your-module',
  label: 'Your module',
  icon: '🔧',
  status: 'live',
  Component: YourModule,
}
```

That's it. No router changes, no nav changes.

### Persistence

Feedback is stored in a `tool_feedback` table in the hedgehog-master Supabase project (`zfmraowvqigcagscdive`). Writes go through `POST /api/feedback` using the service role key (server-only). Reads via `GET /api/feedback?client=<slug>&module=<id>`.

The table uses a unique constraint on `(client_slug, module_id, item_id)` so upserts work cleanly across clients and modules.

### Brand tokens

- Colours: `#F1F1F1` (bg), `#1B1918` (text), `#7DD3FC` (blue), `#65E499` (green), `#F4F7A6` (yellow), `#FFA8D1` (pink)
- Fonts: Fraunces (display/headings), Poppins (body)

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in SUPABASE_SERVICE_ROLE_KEY from the Supabase dashboard
npm run dev
```

## Environment variables

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + server | hedgehog-master project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + server | Anon/public key (read-only) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Service role key — never expose to client |

## Modules

| Module | Status | Description |
|---|---|---|
| Creative review | Live | Approve/request changes on 13 creatives from the Cyber Safe Curriculum ad pack |
| Campaign performance | Coming soon | — |
| Email hub | Coming soon | — |
