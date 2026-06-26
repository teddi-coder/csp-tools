import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const index: string[] = (await kv.get('email:index')) || [];
  const emails = await Promise.all(
    index.map((id) =>
      kv.get(`email:${id}`).then((v) => {
        if (!v) return null;
        return typeof v === 'string' ? JSON.parse(v) : v;
      })
    )
  );
  return NextResponse.json(emails.filter(Boolean));
}
