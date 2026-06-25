import { NextRequest, NextResponse } from 'next/server';

const structurePrompts: Record<string, string> = {
  'sales-early-bird': `Use this structure:
1. Split-panel hero: white left column (overline + headline), teal right column with product UI mockup
2. Teal strip below hero: deadline text left, yellow pill CTA right
3. Body section: opening statement (bold), body paragraphs, offer inclusion box (teal-tinted bg, items prefixed with &#10022;), teal pill CTA button
4. Proof quote section: grey background, teal left border, italic quote + attribution
5. Footer: unsubscribe + view in browser`,

  'sales-urgency': `Use this structure:
1. Split-panel hero: white left column (overline + headline), dark (#111111) right column with large countdown number
2. Teal strip below hero: deadline text left, yellow pill CTA right
3. Body section: opening statement (bold), body paragraphs, offer inclusion box, teal pill CTA button
4. Proof quote section: grey background, teal left border
5. Footer: unsubscribe + view in browser`,

  'sales-final-call': `Use this structure -- NO split panel:
1. Full-width dark (#111111) hero: overline, large headline (46px), subtext, YELLOW pill CTA button (the only time yellow is the primary CTA)
2. Teal strip below hero: states exactly what is lost after deadline
3. Body section: opening statement (bold), body paragraphs, teal pill CTA button (NOT yellow in the body)
4. Proof quote section: grey background, teal left border
5. Footer: unsubscribe + view in browser`,

  'thought-leadership': `Use this structure:
1. Split-panel hero: white left column (overline "Thought Leadership" or "A message from [name]", headline), dark right column with a stat OR founder card
2. Teal strip below hero: topical text, yellow pill CTA
3. Body section: opening statement (bold), body paragraphs (no hard sales push -- offer mentioned softly at end), teal pill CTA (soft action like "Book a call" or "Start your free trial")
4. Proof quote section: grey background, teal left border
5. Footer: unsubscribe + view in browser`,

  'social-proof': `Use this structure:
1. Split-panel hero: white left column (overline "Real School. Real Results.", headline), teal right column with school name card and 2 outcome stats
2. Teal strip below hero: text, yellow pill CTA
3. Body section: narrative before/after story (opening statement bold), body paragraphs with pull quote woven in, teal pill CTA
4. Proof quote section: grey background, teal left border
5. Footer: unsubscribe + view in browser`,
};

const jsonStructures: Record<string, string> = {
  'sales-early-bird': `{
  "overline": "short overline e.g. Early Bird Offer",
  "headline": "main headline -- put the final line on a new line with \\n, it will render in teal accent colour. Lead with benefit or scarcity.",
  "stripText": "teal strip text e.g. Offer closes 18 September 2026",
  "cta": "single CTA text used everywhere e.g. Secure your 2027 program now",
  "openingStatement": "1-2 sentence bold opening -- the hook",
  "body": "2-3 paragraphs of body copy. Use commas and full stops, never em dashes.",
  "inclusions": ["inclusion item 1", "inclusion item 2", "inclusion item 3"],
  "proofQuote": {
    "quote": "testimonial quote text",
    "attribution": "Role, School Type, State"
  }
}`,

  'sales-urgency': `{
  "overline": "short overline e.g. Reminder",
  "headline": "main headline -- final line on new \\n renders in teal",
  "countdownNumber": "e.g. 4",
  "countdownLabel": "e.g. weeks left",
  "stripText": "teal strip text e.g. Deadline: 18 September 2026. Don't lose it.",
  "cta": "single CTA text e.g. Lock in the 10% before it closes",
  "openingStatement": "bold opening hook",
  "body": "2-3 paragraphs. No em dashes.",
  "inclusions": ["inclusion item 1", "inclusion item 2"],
  "proofQuote": {
    "quote": "testimonial quote text",
    "attribution": "Role, School Type, State"
  }
}`,

  'sales-final-call': `{
  "overline": "Final Call",
  "headline": "short, punchy headline for full-width dark hero",
  "subtext": "1-2 sentences below the headline",
  "heroCta": "yellow CTA in hero e.g. Book now. Closes tonight.",
  "stripText": "what is lost after deadline e.g. After tonight, Early Bird pricing is gone",
  "bodyCta": "teal CTA in body (can match heroCta or be softer)",
  "openingStatement": "bold opening hook",
  "body": "2-3 paragraphs. No em dashes.",
  "proofQuote": {
    "quote": "testimonial quote text",
    "attribution": "Role, School Type, State"
  }
}`,

  'thought-leadership': `{
  "overline": "Thought Leadership or A message from [Name]",
  "headline": "main headline -- final line on new \\n renders in teal",
  "rightPanelStat": "a stat number for the dark right panel e.g. 73% (omit if using founderName)",
  "rightPanelLabel": "stat label e.g. of incidents happen in group chats (omit if using founderName)",
  "founderName": "name for founder card (omit if using stat)",
  "founderRole": "role for founder card e.g. Founder, Cyber Safety Project (omit if using stat)",
  "stripText": "teal strip text",
  "cta": "soft CTA e.g. Start your free trial",
  "openingStatement": "bold opening hook",
  "body": "2-4 paragraphs. Insight-led, not sales-led. Mention offer softly at end only. No em dashes.",
  "proofQuote": {
    "quote": "testimonial quote text",
    "attribution": "Role, School Type, State"
  }
}`,

  'social-proof': `{
  "overline": "Real School. Real Results.",
  "headline": "main headline -- final line on new \\n renders in teal",
  "schoolName": "school name for the right panel card",
  "stat1": "outcome stat 1 e.g. 94%",
  "stat1Label": "stat 1 label e.g. teacher confidence",
  "stat2": "outcome stat 2 e.g. 40%",
  "stat2Label": "stat 2 label e.g. fewer incidents",
  "stripText": "teal strip text",
  "cta": "CTA text e.g. See what your school could achieve",
  "openingStatement": "bold opening -- narrative before/after",
  "body": "2-4 paragraphs. Tell the school's story: before, implementation, results. No em dashes.",
  "proofQuote": {
    "quote": "pull quote from the school or educator",
    "attribution": "Role, School Name"
  }
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

CLIENT CONTEXT:
- Audience: School booking coordinators, wellbeing leads, and curriculum leaders at Australian primary and secondary schools. Time-poor, budget-conscious educators.
- Voice: Warm authority. Conversational but credible. First-person from "the CSP team". Short sentences. Use "your school" not "schools". No corporate plural.
- Words to use: "your school", "preferred dates", "Term 1 and 2 fill fast", "lock in", "secure your spot"
- Words to avoid: "leverage", "solutions", "exciting opportunity", "don't miss out", "world-class", "we are pleased to offer"
- Use Australian English (organise not organize, colour not color).
- The email platform is Transpond. All HTML must be email-safe (no CSS Grid, no Flexbox, table-based layout, inline styles only).

APPROVED DESIGN SYSTEM:
- Font: Nunito only (via Google Fonts). Fallback stack: 'Nunito', Arial, sans-serif.
- Colours: teal #1ab5a0 (primary CTA, accents), dark teal #13917f (depth), yellow #f5c700 (ONLY for the pill CTA in the teal strip, never as body CTA), near-black #111111 (headlines, dark panels), dark grey #444444 (body copy), light grey bg #f2f2f2 or #f2faf9 (proof sections), white #ffffff (card bg).
- Outer email background: always #e6e6e6.
- Logo: small centred pill logo, NOT a header block.
- Hero: split-panel with white left (overline + headline) and coloured right panel. Exception: Final Call uses full-width dark hero.
- Teal strip: always immediately below hero. Left = small caps text. Right = yellow pill CTA.
- Body CTA: teal (#1ab5a0) pill button, 50px border-radius. NEVER yellow in the body.
- Proof section: grey bg, 4px teal left border, italic quote.

BANNED ELEMENTS -- never include any of these:
- No stats bars spanning full width
- No 2x2 card grids or multi-column grids
- No full-bleed teal sections as hero backgrounds (teal is a strip/panel, not a full hero)
- No video placeholder blocks (reference video as a text link if needed)
- No em dashes anywhere. Use commas, full stops, or restructure the sentence.
- No placeholder/TBC copy. Write concrete copy from what the brief provides.

CRITICAL RULES:
- Use ONE primary CTA button label throughout. All button instances must use identical wording.
- Do NOT introduce any product, feature, or offer not explicitly in the brief.
- Do NOT generate placeholder copy. Never write "details coming soon" or any variation.
- Do NOT add secondary CTAs, trial offers, or product cross-sells unless they appear verbatim in the brief.
- Do NOT invent new offers, discounts, or programs not in the brief.

LAYOUT STRUCTURE:
${structurePrompts[layout]}

Generate the email content as a JSON object. Respond with ONLY valid JSON, no markdown backticks, no preamble.

JSON structure:
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
