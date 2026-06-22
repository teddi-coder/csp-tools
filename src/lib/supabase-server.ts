import { createClient } from '@supabase/supabase-js';

// Server-only client — uses the service role key, never shipped to the browser.
// Only import this file in Server Components, API routes, and Server Actions.
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
