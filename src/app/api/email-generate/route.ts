import { NextRequest, NextResponse } from 'next/server';

const layoutDescriptions: Record<string, string> = {
  'resource-hub':
    'The Resource Hub layout: a card-grid newsletter format with a hero section (badge, headline, subtext, CTA), a 4-card grid of resource highlights, a 3-column stats row, and a closing CTA. Best for monthly updates and Educator Hub announcements.',
  'story-first':
    'The Story-First layout: a narrative flow with a dark hero (headline, subtext, CTA), a numbered 3-step story section, a testimonial pull-quote block, and a dark CTA banner. Best for welcome sequences, re-engagement, and cold nurture.',
  'campaign-launch':
    'The Campaign Launch layout: a high-impact format with pill tags in the hero, dual CTA buttons (primary + ghost), a 2-column feature grid with category tags, and a resource list with icons. Best for Term launches and program announcements.',
};

const jsonStructures: Record<string, string> = {
  'resource-hub': `{
  "badge": "short badge text e.g. Term 3 Update",
  "headline": "main headline",
  "subtext": "1-2 sentence supporting text",
  "heroCta": "CTA button text",
  "sectionTitle": "e.g. What's new this term",
  "cards": [
    { "title": "card title", "description": "1-2 sentence description" },
    { "title": "card title", "description": "1-2 sentence description" },
    { "title": "card title", "description": "1-2 sentence description" },
    { "title": "card title", "description": "1-2 sentence description" }
  ],
  "stats": [
    { "number": "e.g. 2,400+", "label": "e.g. schools reached" },
    { "number": "e.g. 94%", "label": "e.g. educator satisfaction" },
    { "number": "e.g. Free", "label": "e.g. for all educators" }
  ],
  "closingCta": "CTA button text"
}`,
  'story-first': `{
  "headline": "main headline",
  "subtext": "1-2 sentence supporting text",
  "heroCta": "CTA button text",
  "steps": [
    { "title": "step title", "description": "1-2 sentence description" },
    { "title": "step title", "description": "1-2 sentence description" },
    { "title": "step title", "description": "1-2 sentence description" }
  ],
  "testimonial": {
    "quote": "the testimonial text",
    "attribution": "Role, School Type, State"
  },
  "ctaText": "1 sentence prompt",
  "ctaButton": "CTA button text"
}`,
  'campaign-launch': `{
  "pills": ["pill 1", "pill 2", "pill 3"],
  "headline": "main headline",
  "subtext": "1-2 sentence supporting text",
  "primaryCta": "primary CTA button text",
  "secondaryCta": "secondary CTA button text",
  "features": [
    { "tag": "e.g. New this term", "tagColor": "green or blue", "title": "feature title", "description": "1-2 sentence description" },
    { "tag": "e.g. Updated", "tagColor": "green or blue", "title": "feature title", "description": "1-2 sentence description" }
  ],
  "resourcesTitle": "e.g. Free resources for Term 3",
  "resources": [
    { "title": "resource name", "subtitle": "who it's for" },
    { "title": "resource name", "subtitle": "who it's for" },
    { "title": "resource name", "subtitle": "who it's for" }
  ]
}`,
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { brief, layout } = body;

  if (!brief || !layout) {
    return NextResponse.json(
      { error: 'brief and layout are required' },
      { status: 400 }
    );
  }

  if (!layoutDescriptions[layout]) {
    return NextResponse.json(
      { error: 'Invalid layout' },
      { status: 400 }
    );
  }

  const systemPrompt = `You are an email content writer for Cyber Safety Project (CSP), an Australian organisation that provides cyber safety education to schools. Your audience is educators — teachers, ICT coordinators, wellbeing leads, and school leaders.

VOICE: Approachable expert, not corporate. Speak directly to educators. Use Australian English (organise not organize, colour not color). Use specific numbers and examples. Lead with the problem, then the practical fix.

NEVER reference parent audiences — content targets educators only.

You are writing email content for the "${layout}" layout: ${layoutDescriptions[layout]}

Based on the user's brief, generate the email content as a JSON object. Respond with ONLY valid JSON, no markdown backticks, no preamble.

The JSON structure depends on the layout:

For "${layout}":
${jsonStructures[layout]}`;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Here is the brief for this email:\n\n${brief}`,
          },
        ],
      }),
    });

    if (!resp.ok) {
      const err = await resp.json();
      return NextResponse.json(
        { error: 'Anthropic API error', detail: err },
        { status: 502 }
      );
    }

    const data = await resp.json();
    const text = data.content
      .map((c: { text?: string }) => c.text || '')
      .join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json({ content: parsed });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to generate email content', detail: message },
      { status: 500 }
    );
  }
}
