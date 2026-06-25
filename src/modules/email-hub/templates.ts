function esc(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapper(body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>CSP Email</title><link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,800;0,900;1,700&display=swap" rel="stylesheet"></head><body style="margin:0;padding:0;background:#e6e6e6;font-family:'Nunito',Arial,sans-serif;-webkit-text-size-adjust:100%"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e6e6e6"><tr><td align="center" style="padding:24px 16px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">${body}</table></td></tr></table></body></html>`;
}

function logo(): string {
  return `<tr><td style="padding:24px 0;text-align:center"><div style="display:inline-block;border:2px solid #111111;border-radius:50px;padding:5px 16px;"><span style="font-family:'Nunito',Arial,sans-serif;font-size:11px;font-weight:900;color:#1ab5a0;">CYBER</span><span style="font-family:'Nunito',Arial,sans-serif;font-size:11px;font-weight:900;color:#111111;"> SAFETY </span><span style="font-family:'Nunito',Arial,sans-serif;font-size:11px;font-weight:900;color:#1ab5a0;">PROJECT</span></div></td></tr>`;
}

function tealStrip(leftText: string, ctaText: string): string {
  return `<tr><td style="background:#1ab5a0;padding:12px 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-family:'Nunito',Arial,sans-serif;font-size:11px;font-weight:800;color:rgba(255,255,255,0.85);text-transform:uppercase;letter-spacing:0.5px;vertical-align:middle;">${esc(leftText)}</td><td style="text-align:right;vertical-align:middle;"><a href="#" style="display:inline-block;background:#f5c700;color:#111111;font-family:'Nunito',Arial,sans-serif;font-size:11px;font-weight:900;text-transform:uppercase;padding:8px 20px;border-radius:50px;text-decoration:none;">${esc(ctaText)}</a></td></tr></table></td></tr>`;
}

function bodyCta(ctaText: string): string {
  return `<div style="text-align:center;margin-top:28px;"><a href="#" style="display:inline-block;background:#1ab5a0;color:#ffffff;font-family:'Nunito',Arial,sans-serif;font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:0.5px;padding:15px 52px;border-radius:50px;text-decoration:none;">${esc(ctaText)}</a><p style="margin:8px 0 0;font-family:'Nunito',Arial,sans-serif;font-size:11px;color:#bbbbbb;">No lock-in. Cancel anytime.</p></div>`;
}

function proofQuote(quote: string, attribution: string): string {
  return `<tr><td style="background:#f2f2f2;border-radius:0 0 16px 16px;padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td width="4" style="background:#1ab5a0;">&nbsp;</td><td style="padding:22px 28px;"><p style="margin:0 0 10px;font-family:'Nunito',Arial,sans-serif;font-size:15px;font-weight:700;font-style:italic;color:#222222;line-height:1.6;">&ldquo;${esc(quote)}&rdquo;</p><p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:10px;font-weight:900;color:#bbbbbb;text-transform:uppercase;letter-spacing:1.5px;">${esc(attribution)}</p></td></tr></table></td></tr>`;
}

function footer(): string {
  return `<tr><td style="padding:28px 24px;text-align:center;"><p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:11px;color:#bbbbbb;line-height:1.6;">Cyber Safety Project &middot; <a href="#" style="color:#1ab5a0;text-decoration:none;">Unsubscribe</a> &middot; <a href="#" style="color:#1ab5a0;text-decoration:none;">View in browser</a></p></td></tr>`;
}

function inclusionItems(items: string[]): string {
  return items
    .map(
      (item) =>
        `<p style="margin:0 0 6px;font-family:'Nunito',Arial,sans-serif;font-size:14px;font-weight:700;color:#111111;">&#10022; ${esc(item)}</p>`
    )
    .join('');
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export function buildSalesEarlyBird(c: any): string {
  const cta = c.cta || 'Secure your program now';
  const overline = c.overline || 'Early Bird Offer';
  const headlineParts = (c.headline || '').split(/\n/);
  const lastLine = headlineParts.pop() || '';
  const headlineMain = headlineParts.join('<br>');

  const inclusions = (c.inclusions || []);
  const inclusionHtml = inclusions.length
    ? `<div style="background:#f2faf9;border-radius:10px;padding:16px 20px;margin:20px 0;">${inclusionItems(inclusions)}</div>`
    : '';

  return wrapper(`
${logo()}
<tr><td style="padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="295" style="background:#ffffff;border-radius:16px 0 0 0;padding:36px 28px;vertical-align:top;">
<p style="margin:0 0 10px;font-family:'Nunito',Arial,sans-serif;font-size:10px;font-weight:900;color:#1ab5a0;text-transform:uppercase;letter-spacing:2px;">${esc(overline)}</p>
<h1 style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:36px;font-weight:900;color:#111111;line-height:1.0;letter-spacing:-1.5px;">${headlineMain ? headlineMain + '<br>' : ''}<span style="color:#1ab5a0;">${esc(lastLine)}</span></h1>
</td>
<td width="273" style="background:#1ab5a0;border-radius:0 16px 0 0;padding:28px 20px;vertical-align:top;text-align:center;">
<div style="background:#ffffff;border-radius:8px;padding:16px;text-align:left;">
<p style="margin:0 0 6px;font-family:'Nunito',Arial,sans-serif;font-size:9px;font-weight:900;color:#1ab5a0;text-transform:uppercase;letter-spacing:1px;">Cyber Safe Classroom</p>
<div style="background:#f2faf9;border-radius:4px;padding:8px 10px;margin-bottom:6px;">
<p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:10px;font-weight:700;color:#111111;">Foundation to Year 8</p>
</div>
<div style="background:#f2faf9;border-radius:4px;padding:8px 10px;margin-bottom:6px;">
<p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:10px;font-weight:700;color:#111111;">100+ video-led lessons</p>
</div>
<div style="background:#f2faf9;border-radius:4px;padding:8px 10px;">
<p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:10px;font-weight:700;color:#111111;">eSafety endorsed</p>
</div>
</div>
</td>
</tr></table></td></tr>
${tealStrip(c.stripText || 'Offer closes 18 September 2026', cta)}
<tr><td style="background:#ffffff;border-top:1px solid #eeeeee;padding:28px 32px;">
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:17px;font-weight:800;color:#111111;line-height:1.45;">${esc(c.openingStatement || '')}</p>
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:15px;font-weight:400;color:#444444;line-height:1.75;">${esc(c.body || '')}</p>
${inclusionHtml}
${bodyCta(cta)}
</td></tr>
${c.proofQuote ? proofQuote(c.proofQuote.quote, c.proofQuote.attribution) : ''}
${footer()}`);
}

export function buildSalesUrgency(c: any): string {
  const cta = c.cta || 'Lock in the discount';
  const overline = c.overline || 'Reminder';
  const headlineParts = (c.headline || '').split(/\n/);
  const lastLine = headlineParts.pop() || '';
  const headlineMain = headlineParts.join('<br>');
  const countdown = c.countdownNumber || '4';
  const countdownLabel = c.countdownLabel || 'weeks left';

  const inclusions = (c.inclusions || []);
  const inclusionHtml = inclusions.length
    ? `<div style="background:#f2faf9;border-radius:10px;padding:16px 20px;margin:20px 0;">${inclusionItems(inclusions)}</div>`
    : '';

  return wrapper(`
${logo()}
<tr><td style="padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="295" style="background:#ffffff;border-radius:16px 0 0 0;padding:36px 28px;vertical-align:top;">
<p style="margin:0 0 10px;font-family:'Nunito',Arial,sans-serif;font-size:10px;font-weight:900;color:#1ab5a0;text-transform:uppercase;letter-spacing:2px;">${esc(overline)}</p>
<h1 style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:36px;font-weight:900;color:#111111;line-height:1.0;letter-spacing:-1.5px;">${headlineMain ? headlineMain + '<br>' : ''}<span style="color:#1ab5a0;">${esc(lastLine)}</span></h1>
</td>
<td width="273" style="background:#111111;border-radius:0 16px 0 0;padding:28px 20px;vertical-align:middle;text-align:center;">
<p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:72px;font-weight:900;color:#ffffff;line-height:1;">${esc(countdown)}</p>
<p style="margin:6px 0 0;font-family:'Nunito',Arial,sans-serif;font-size:13px;font-weight:800;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:1px;">${esc(countdownLabel)}</p>
</td>
</tr></table></td></tr>
${tealStrip(c.stripText || 'Deadline approaching', cta)}
<tr><td style="background:#ffffff;border-top:1px solid #eeeeee;padding:28px 32px;">
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:17px;font-weight:800;color:#111111;line-height:1.45;">${esc(c.openingStatement || '')}</p>
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:15px;font-weight:400;color:#444444;line-height:1.75;">${esc(c.body || '')}</p>
${inclusionHtml}
${bodyCta(cta)}
</td></tr>
${c.proofQuote ? proofQuote(c.proofQuote.quote, c.proofQuote.attribution) : ''}
${footer()}`);
}

export function buildSalesFinalCall(c: any): string {
  const heroCta = c.heroCta || 'Book now. Closes tonight.';
  const bodyCta2 = c.bodyCta || heroCta;

  return wrapper(`
${logo()}
<tr><td style="background:#111111;border-radius:16px 16px 0 0;padding:48px 32px;text-align:center;">
<p style="margin:0 0 14px;font-family:'Nunito',Arial,sans-serif;font-size:10px;font-weight:900;color:#1ab5a0;text-transform:uppercase;letter-spacing:2px;">${esc(c.overline || 'Final Call')}</p>
<h1 style="margin:0 0 18px;font-family:'Nunito',Arial,sans-serif;font-size:46px;font-weight:900;color:#ffffff;line-height:1.0;letter-spacing:-1.5px;">${esc(c.headline || '')}</h1>
<p style="margin:0 0 28px;font-family:'Nunito',Arial,sans-serif;font-size:15px;font-weight:400;color:rgba(255,255,255,0.7);line-height:1.6;">${esc(c.subtext || '')}</p>
<a href="#" style="display:inline-block;background:#f5c700;color:#111111;font-family:'Nunito',Arial,sans-serif;font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:0.5px;padding:15px 52px;border-radius:50px;text-decoration:none;">${esc(heroCta)}</a>
</td></tr>
${tealStrip(c.stripText || 'After tonight, the Early Bird offer is gone', bodyCta2)}
<tr><td style="background:#ffffff;border-top:1px solid #eeeeee;padding:28px 32px;">
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:17px;font-weight:800;color:#111111;line-height:1.45;">${esc(c.openingStatement || '')}</p>
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:15px;font-weight:400;color:#444444;line-height:1.75;">${esc(c.body || '')}</p>
<div style="text-align:center;margin-top:28px;"><a href="#" style="display:inline-block;background:#1ab5a0;color:#ffffff;font-family:'Nunito',Arial,sans-serif;font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:0.5px;padding:15px 52px;border-radius:50px;text-decoration:none;">${esc(bodyCta2)}</a><p style="margin:8px 0 0;font-family:'Nunito',Arial,sans-serif;font-size:11px;color:#bbbbbb;">Offer closes at midnight tonight.</p></div>
</td></tr>
${c.proofQuote ? proofQuote(c.proofQuote.quote, c.proofQuote.attribution) : ''}
${footer()}`);
}

export function buildThoughtLeadership(c: any): string {
  const cta = c.cta || 'Start your free trial';
  const overline = c.overline || 'Thought Leadership';
  const headlineParts = (c.headline || '').split(/\n/);
  const lastLine = headlineParts.pop() || '';
  const headlineMain = headlineParts.join('<br>');

  const stat = c.rightPanelStat || '';
  const statLabel = c.rightPanelLabel || '';

  const founderName = c.founderName || '';
  const founderRole = c.founderRole || '';

  let rightPanelContent = '';
  if (founderName) {
    rightPanelContent = `
<div style="background:#1ab5a0;border-radius:8px;padding:20px;text-align:center;">
<p style="margin:0 0 4px;font-family:'Nunito',Arial,sans-serif;font-size:14px;font-weight:900;color:#ffffff;">${esc(founderName)}</p>
<p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,0.8);">${esc(founderRole)}</p>
</div>`;
  } else if (stat) {
    rightPanelContent = `
<p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:48px;font-weight:900;color:#ffffff;line-height:1;">${esc(stat)}</p>
<p style="margin:8px 0 0;font-family:'Nunito',Arial,sans-serif;font-size:12px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:1px;">${esc(statLabel)}</p>`;
  }

  return wrapper(`
${logo()}
<tr><td style="padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="295" style="background:#ffffff;border-radius:16px 0 0 0;padding:36px 28px;vertical-align:top;">
<p style="margin:0 0 10px;font-family:'Nunito',Arial,sans-serif;font-size:10px;font-weight:900;color:#1ab5a0;text-transform:uppercase;letter-spacing:2px;">${esc(overline)}</p>
<h1 style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:36px;font-weight:900;color:#111111;line-height:1.0;letter-spacing:-1.5px;">${headlineMain ? headlineMain + '<br>' : ''}<span style="color:#1ab5a0;">${esc(lastLine)}</span></h1>
</td>
<td width="273" style="background:#111111;border-radius:0 16px 0 0;padding:28px 20px;vertical-align:middle;text-align:center;">
${rightPanelContent}
</td>
</tr></table></td></tr>
${tealStrip(c.stripText || '', cta)}
<tr><td style="background:#ffffff;border-top:1px solid #eeeeee;padding:28px 32px;">
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:17px;font-weight:800;color:#111111;line-height:1.45;">${esc(c.openingStatement || '')}</p>
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:15px;font-weight:400;color:#444444;line-height:1.75;">${esc(c.body || '')}</p>
${bodyCta(cta)}
</td></tr>
${c.proofQuote ? proofQuote(c.proofQuote.quote, c.proofQuote.attribution) : ''}
${footer()}`);
}

export function buildSocialProof(c: any): string {
  const cta = c.cta || 'Book a free trial';
  const overline = c.overline || 'Real School. Real Results.';
  const headlineParts = (c.headline || '').split(/\n/);
  const lastLine = headlineParts.pop() || '';
  const headlineMain = headlineParts.join('<br>');
  const schoolName = c.schoolName || '';
  const stat1 = c.stat1 || '';
  const stat1Label = c.stat1Label || '';
  const stat2 = c.stat2 || '';
  const stat2Label = c.stat2Label || '';

  return wrapper(`
${logo()}
<tr><td style="padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="295" style="background:#ffffff;border-radius:16px 0 0 0;padding:36px 28px;vertical-align:top;">
<p style="margin:0 0 10px;font-family:'Nunito',Arial,sans-serif;font-size:10px;font-weight:900;color:#1ab5a0;text-transform:uppercase;letter-spacing:2px;">${esc(overline)}</p>
<h1 style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:36px;font-weight:900;color:#111111;line-height:1.0;letter-spacing:-1.5px;">${headlineMain ? headlineMain + '<br>' : ''}<span style="color:#1ab5a0;">${esc(lastLine)}</span></h1>
</td>
<td width="273" style="background:#1ab5a0;border-radius:0 16px 0 0;padding:28px 20px;vertical-align:middle;text-align:center;">
<div style="background:rgba(255,255,255,0.15);border-radius:10px;padding:18px 16px;">
<p style="margin:0 0 12px;font-family:'Nunito',Arial,sans-serif;font-size:14px;font-weight:900;color:#ffffff;">${esc(schoolName)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="50%" style="text-align:center;padding:6px;">
<p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:22px;font-weight:900;color:#ffffff;">${esc(stat1)}</p>
<p style="margin:2px 0 0;font-family:'Nunito',Arial,sans-serif;font-size:9px;font-weight:700;color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.5px;">${esc(stat1Label)}</p>
</td>
<td width="50%" style="text-align:center;padding:6px;">
<p style="margin:0;font-family:'Nunito',Arial,sans-serif;font-size:22px;font-weight:900;color:#ffffff;">${esc(stat2)}</p>
<p style="margin:2px 0 0;font-family:'Nunito',Arial,sans-serif;font-size:9px;font-weight:700;color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.5px;">${esc(stat2Label)}</p>
</td>
</tr></table>
</div>
</td>
</tr></table></td></tr>
${tealStrip(c.stripText || '', cta)}
<tr><td style="background:#ffffff;border-top:1px solid #eeeeee;padding:28px 32px;">
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:17px;font-weight:800;color:#111111;line-height:1.45;">${esc(c.openingStatement || '')}</p>
<p style="margin:0 0 16px;font-family:'Nunito',Arial,sans-serif;font-size:15px;font-weight:400;color:#444444;line-height:1.75;">${esc(c.body || '')}</p>
${bodyCta(cta)}
</td></tr>
${c.proofQuote ? proofQuote(c.proofQuote.quote, c.proofQuote.attribution) : ''}
${footer()}`);
}

export function buildEmailHtml(layout: string, content: any): string {
  switch (layout) {
    case 'sales-early-bird':
      return buildSalesEarlyBird(content);
    case 'sales-urgency':
      return buildSalesUrgency(content);
    case 'sales-final-call':
      return buildSalesFinalCall(content);
    case 'thought-leadership':
      return buildThoughtLeadership(content);
    case 'social-proof':
      return buildSocialProof(content);
    default:
      return '<p>Unknown layout</p>';
  }
}
