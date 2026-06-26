import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status, comment } = await request.json();

  const raw = await kv.get(`email:${id}`);
  if (!raw) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }

  const existing = typeof raw === 'string' ? JSON.parse(raw) : raw;
  const updated = {
    ...existing,
    ...(status ? { status } : {}),
    ...(comment !== undefined
      ? { comment, commentAt: new Date().toISOString() }
      : {}),
  };

  await kv.set(`email:${id}`, JSON.stringify(updated));
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await kv.del(`email:${id}`);
  const index: string[] = (await kv.get('email:index')) || [];
  await kv.set(
    'email:index',
    index.filter((i) => i !== id)
  );

  return NextResponse.json({ ok: true });
}
