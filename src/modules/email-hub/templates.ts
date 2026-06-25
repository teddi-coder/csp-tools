function esc(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapper(body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>CSP Email</title></head><body style="margin:0;padding:0;background:#F0F4FA;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F0F4FA"><tr><td align="center" style="padding:24px 16px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">${body}</table></td></tr></table></body></html>`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export function buildResourceHub(c: any): string {
  const icons = ['&#128187;', '&#128101;', '&#127942;', '&#128200;'];
  const cards = (c.cards || []).map(
    (card: any, i: number) =>
      `<td width="50%" style="padding:6px;vertical-align:top"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#F8FAFC;border:1px solid #DDE3EE;border-radius:8px;padding:16px"><p style="margin:0 0 8px;font-size:22px">${icons[i % 4]}</p><p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#1A2B5C">${esc(card.title)}</p><p style="margin:0;font-size:13px;color:#6B7589;line-height:1.5">${esc(card.description)}</p></td></tr></table></td>`
  );
  const stats = (c.stats || [])
    .map(
      (s: any) =>
        `<td width="33%" style="text-align:center;background:#F0F4FA;border-radius:6px;padding:14px 8px"><p style="margin:0;font-size:22px;font-weight:700;color:#1A2B5C">${esc(s.number)}</p><p style="margin:4px 0 0;font-size:11px;color:#6B7589">${esc(s.label)}</p></td>`
    )
    .join('');

  return wrapper(`
<tr><td style="background:#1A2B5C;padding:20px 24px;text-align:center"><p style="margin:0;color:#fff;font-size:16px;font-weight:600">Cyber Safety <span style="color:#4FC9A4">Project</span></p></td></tr>
<tr><td style="background:#F0F4FA;padding:32px 24px;text-align:center"><p style="display:inline-block;background:#E8F5EF;color:#0D6B4E;font-size:12px;font-weight:600;padding:5px 14px;border-radius:20px;margin:0 0 14px">${esc(c.badge)}</p><h1 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#1A2B5C;line-height:1.35">${esc(c.headline)}</h1><p style="margin:0 0 20px;font-size:14px;color:#5A6478;line-height:1.6">${esc(c.subtext)}</p><a href="#" style="display:inline-block;background:#1A2B5C;color:#fff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:6px;text-decoration:none">${esc(c.heroCta)}</a></td></tr>
<tr><td style="background:#fff;padding:24px"><p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#1A2B5C">${esc(c.sectionTitle)}</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${cards.slice(0, 2).join('')}</tr><tr>${cards.slice(2, 4).join('')}</tr></table><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px"><tr>${stats}</tr></table><div style="text-align:center;margin-top:24px"><a href="#" style="display:inline-block;background:#1A2B5C;color:#fff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:6px;text-decoration:none">${esc(c.closingCta)}</a></div></td></tr>
<tr><td style="background:#F8FAFC;border-top:1px solid #DDE3EE;padding:18px 24px;text-align:center"><p style="margin:0;font-size:12px;color:#9AA3B5;line-height:1.6">Cyber Safety Project &middot; <a href="#" style="color:#1A2B5C;text-decoration:none">Unsubscribe</a> &middot; <a href="#" style="color:#1A2B5C;text-decoration:none">View in browser</a></p></td></tr>`);
}

export function buildStoryFirst(c: any): string {
  const steps = (c.steps || [])
    .map(
      (s: any, i: number) =>
        `<tr><td style="padding:10px 0"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="width:40px;vertical-align:top"><div style="width:32px;height:32px;background:#E8F5EF;border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#0D6B4E">${i + 1}</div></td><td style="padding-left:12px"><p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#1A2B5C">${esc(s.title)}</p><p style="margin:0;font-size:13px;color:#6B7589;line-height:1.55">${esc(s.description)}</p></td></tr></table></td></tr>`
    )
    .join('');

  return wrapper(`
<tr><td style="background:#1A2B5C;padding:18px 24px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td><div style="width:32px;height:32px;background:#4FC9A4;border-radius:50%"></div></td><td style="padding-left:12px"><p style="margin:0;color:#fff;font-size:14px;font-weight:600">Cyber Safety Project</p></td></tr></table></td></tr>
<tr><td style="background:#1A2B5C;padding:32px 24px;border-left:4px solid #4FC9A4"><h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#fff;line-height:1.3">${esc(c.headline)}</h1><p style="margin:0 0 22px;font-size:14px;color:#A8C0DB;line-height:1.6">${esc(c.subtext)}</p><a href="#" style="display:inline-block;background:#4FC9A4;color:#0D3B2A;font-size:14px;font-weight:600;padding:12px 24px;border-radius:6px;text-decoration:none">${esc(c.heroCta)}</a></td></tr>
<tr><td style="background:#fff;padding:24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table><hr style="border:none;border-top:1px solid #DDE3EE;margin:20px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#F0F4FA;border-left:3px solid #4FC9A4;padding:16px 18px;border-radius:0 8px 8px 0"><p style="margin:0 0 6px;font-size:14px;color:#3D4761;line-height:1.6;font-style:italic">&ldquo;${esc(c.testimonial?.quote)}&rdquo;</p><p style="margin:0;font-size:12px;color:#9AA3B5">&mdash; ${esc(c.testimonial?.attribution)}</p></td></tr></table><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px"><tr><td style="background:#1A2B5C;border-radius:8px;padding:22px 24px;text-align:center"><p style="margin:0 0 14px;font-size:14px;color:#A8C0DB;line-height:1.5">${esc(c.ctaText)}</p><a href="#" style="display:inline-block;background:#4FC9A4;color:#0D3B2A;font-size:14px;font-weight:600;padding:12px 24px;border-radius:6px;text-decoration:none">${esc(c.ctaButton)}</a></td></tr></table></td></tr>
<tr><td style="background:#F8FAFC;border-top:1px solid #DDE3EE;padding:18px 24px;text-align:center"><p style="margin:0;font-size:12px;color:#9AA3B5;line-height:1.6">Cyber Safety Project &middot; <a href="#" style="color:#1A2B5C;text-decoration:none">Unsubscribe</a> &middot; <a href="#" style="color:#1A2B5C;text-decoration:none">View in browser</a></p></td></tr>`);
}

export function buildCampaignLaunch(c: any): string {
  const pill = c.pill || (c.pills ? c.pills[0] : '');
  const cta = c.cta || c.primaryCta || 'Learn more';

  let proofHtml = '';
  if (c.proofSection) {
    if (c.proofSection.type === 'testimonial' && c.proofSection.quote) {
      proofHtml = `<tr><td style="background:#F0F4FA;border-left:3px solid #4FC9A4;padding:16px 18px;border-radius:0 8px 8px 0"><p style="margin:0 0 6px;font-size:14px;color:#3D4761;line-height:1.6;font-style:italic">&ldquo;${esc(c.proofSection.quote)}&rdquo;</p><p style="margin:0;font-size:12px;color:#9AA3B5">&mdash; ${esc(c.proofSection.attribution)}</p></td></tr>`;
    } else if (c.proofSection.statText) {
      proofHtml = `<tr><td style="background:#F0F4FA;border-left:3px solid #4FC9A4;padding:16px 18px;border-radius:0 8px 8px 0"><p style="margin:0;font-size:14px;color:#3D4761;line-height:1.6">${esc(c.proofSection.statText)}</p></td></tr>`;
    }
  }

  const stats = (c.stats || [])
    .map(
      (s: any) =>
        `<td width="33%" style="text-align:center;background:#F0F4FA;border-radius:6px;padding:14px 8px"><p style="margin:0;font-size:22px;font-weight:700;color:#1A2B5C">${esc(s.number)}</p><p style="margin:4px 0 0;font-size:11px;color:#6B7589">${esc(s.label)}</p></td>`
    )
    .join('');

  return wrapper(`
<tr><td style="background:#fff;border-bottom:1px solid #DDE3EE;padding:14px 24px;text-align:center"><p style="margin:0;font-size:15px;font-weight:700;color:#1A2B5C">Cyber Safety <span style="color:#4FC9A4">Project</span></p></td></tr>
<tr><td style="background:linear-gradient(135deg,#1A2B5C 0%,#223880 100%);padding:36px 24px;text-align:center"><div style="margin-bottom:18px"><span style="display:inline-block;background:rgba(79,201,164,.15);color:#4FC9A4;font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;border:1px solid rgba(79,201,164,.4)">${esc(pill)}</span></div><h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#fff;line-height:1.35">${esc(c.headline)}</h1><p style="margin:0 0 24px;font-size:14px;color:#A8C0DB;line-height:1.6">${esc(c.subtext)}</p><a href="#" style="display:inline-block;background:#4FC9A4;color:#0D3B2A;font-size:14px;font-weight:600;padding:12px 28px;border-radius:6px;text-decoration:none">${esc(cta)}</a></td></tr>
<tr><td style="background:#fff;padding:24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${proofHtml}</table><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px"><tr>${stats}</tr></table><div style="text-align:center;margin-top:24px"><a href="#" style="display:inline-block;background:#1A2B5C;color:#fff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:6px;text-decoration:none">${esc(cta)}</a></div></td></tr>
<tr><td style="background:#F8FAFC;border-top:1px solid #DDE3EE;padding:18px 24px;text-align:center"><p style="margin:0;font-size:12px;color:#9AA3B5;line-height:1.6">Cyber Safety Project &middot; <a href="#" style="color:#1A2B5C;text-decoration:none">Unsubscribe</a> &middot; <a href="#" style="color:#1A2B5C;text-decoration:none">View in browser</a></p></td></tr>`);
}

export function buildEmailHtml(layout: string, content: any): string {
  switch (layout) {
    case 'resource-hub':
      return buildResourceHub(content);
    case 'story-first':
      return buildStoryFirst(content);
    case 'campaign-launch':
      return buildCampaignLaunch(content);
    default:
      return '<p>Unknown layout</p>';
  }
}
