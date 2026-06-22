import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const client = searchParams.get('client');
  const module = searchParams.get('module');

  if (!client || !module) {
    return NextResponse.json(
      { error: 'client and module query params are required' },
      { status: 400 }
    );
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('tool_feedback')
    .select('item_id, status, note, updated_at')
    .eq('client_slug', client)
    .eq('module_id', module);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { client_slug, module_id, item_id, status, note } = body;

  if (!client_slug || !module_id || !item_id || !status) {
    return NextResponse.json(
      { error: 'client_slug, module_id, item_id and status are required' },
      { status: 400 }
    );
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('tool_feedback')
    .upsert(
      {
        client_slug,
        module_id,
        item_id,
        status,
        note: note ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'client_slug,module_id,item_id' }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
