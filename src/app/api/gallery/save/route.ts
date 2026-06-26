import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, subject, layout, html } = await request.json();

  if (!name || !html) {
    return NextResponse.json({ error: 'name and html are required' }, { status: 400 });
  }

  const id = nanoid(10);
  const entry = {
    id,
    name: name.trim(),
    subject: subject?.trim() || '',
    layout,
    html,
    savedAt: new Date().toISOString(),
    status: 'pending',
    comment: '',
    commentAt: '',
  };

  await kv.set(`email:${id}`, JSON.stringify(entry));

  const index: string[] = (await kv.get('email:index')) || [];
  await kv.set('email:index', [id, ...index]);

  return NextResponse.json({ id });
}
