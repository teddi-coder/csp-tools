import { NextRequest, NextResponse } from 'next/server';

const structurePrompts: Record<string, string> = {
  'resource-hub': `Use this structure:
1. Logo header
2. Badge pill + headline + intro paragraph + single CTA button
3. Section title + 4-card resource grid (2x2)
4. Stats row (3 stats — real proof metrics)
5. Single closing CTA button — same label as the hero CTA
6. Footer (unsubscribe + view in browser)`,

  'story-first': `Use this structure:
1. Logo header
2. Opening narrative paragraph (dark hero style) + single CTA button
3. 3-step numbered story section
4. Testimonial quote block (real or realistic educator quote)
5. Single CTA banner — same button label as the hero CTA
6. Footer (unsubscribe + view in browser)`,

  'campaign-launch': `Use this structure — this is a single-goal conversion email, NOT a feature showcase:
1. Logo header (light treatment — do not use a full-bleed dark block)
2. Pill tag (e.g. "Early Bird Offer")
3. Hero headline (lead with the key benefit or scarcity, not the offer mechanics)
4. Hero subtext (2 sentences max)
5. Single primary CTA button — full-width on mobile
6. ONE reason-to-believe section: either a single testimonial quote OR a short paragraph with a real proof stat. Do NOT use a 2x2 card grid here.
7. Stats strip (3 stats — must be real proof metrics like school count, satisfaction rate, or curriculum coverage. Not restatements of the offer terms)
8. Closing CTA button — same label as the hero CTA
9. Footer (unsubscribe + view in browser)

Do NOT add a 2x2 feature card grid. Do NOT add a section for any product or offer not in the brief.`,
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
  "closingCta": "same CTA button text as heroCta"
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
  "ctaButton": "same CTA button text as heroCta"
}`,
  'campaign-launch': `{
  "pill": "single pill tag e.g. Early Bird Offer",
  "headline": "main headline — lead with benefit or scarcity",
  "subtext": "1-2 sentence supporting text",
  "cta": "single CTA button text — used for ALL buttons in the email",
  "proofSection": {
    "type": "testimonial or stat",
    "quote": "if testimonial: the quote text (omit if stat)",
    "attribution": "if testimonial: Role, School Type, State (omit if stat)",
    "statText": "if stat: a short paragraph with a real proof metric (omit if testimonial)"
  },
  "stats": [
    { "number": "e.g. 2,400+", "label": "e.g. schools reached" },
    { "number": "e.g. 94%", "label": "e.g. educator satisfaction" },
    { "number": "e.g. Free", "label": "e.g. for all educators" }
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

  if (!structurePrompts[layout]) {
    return NextResponse.json(
      { error: 'Invalid layout' },
      { status: 400 }
    );
  }

  const systemPrompt = `You are an email content writer for Cyber Safety Project (CSP), an Australian organisation that provides cyber safety education to schools.

CLIENT CONTEXT — Cyber Safety Project (CSP):
- Audience: School booking coordinators, wellbeing leads, and curriculum leaders at Australian primary and secondary schools. Time-poor, budget-conscious educators.
- Voice: Warm authority. Conversational but credible. First-person from "the CSP team". Short sentences. Use "your school" not "schools". No corporate plural.
- Words to use: "your school", "preferred dates", "Term 1 and 2 fill fast", "lock in", "secure your spot"
- Words to avoid: "leverage", "solutions", "exciting opportunity", "don't miss out", "world-class", "we are pleased to offer"
- Use Australian English (organise not organize, colour not color).
- The email platform is Transpond — all HTML must be email-safe (no CSS Grid, no Flexbox, table-based layout, inline styles only).

CRITICAL RULES — you must follow all of these without exception:
- Use ONE primary CTA button label throughout the entire email. Do not introduce a second CTA label. All button instances must use identical wording.
- Do NOT introduce any product, feature, or offer that was not explicitly mentioned in the user's brief. If the brief mentions "Early Bird discount", the email is about that and only that.
- Do NOT generate placeholder copy. If a brief item is vague or incomplete, write concrete copy based on what IS provided. Never write "details coming soon" or any variation.
- Do NOT add secondary CTAs, trial offers, or product cross-sells unless they appear verbatim in the brief.
- Do NOT invent new offers, discounts, or programs not in the brief.

LAYOUT STRUCTURE — you must follow this structure exactly:
${structurePrompts[layout]}

Based on the user's brief, generate the email content as a JSON object. Respond with ONLY valid JSON, no markdown backticks, no preamble.

The JSON structure for this layout:
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
