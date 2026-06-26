export interface AdConcept {
  id: string;
  name: string;
  track: string;
  format: string;
  audience: string;
  funnel: string;
  platforms: string[];
  primaryText: string;
  headline: string;
  cta: string;
  lp: string;
  mockupHtml: string;
  imageUrl?: string;
}

export const ads: AdConcept[] = [
  {
    id: 'ad-01',
    name: 'Notes app',
    track: 'On-trend native',
    format: 'Static 4:5',
    audience: 'Cold',
    funnel: 'Awareness',
    platforms: ['Meta'],
    primaryText:
      "The online safety curriculum for F–8 you keep meaning to sort? It’s already built, mapped, and eSafety endorsed. 10% off until 18 September.",
    headline: 'Stop building it from scratch',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DNEhuIPYiUFiUuOURsDCLxx5Ld/hf_20260626_030454_08be410a-5594-4bc4-b7c9-d69202c5206c.png',
    mockupHtml: `<div style="background:#fff;border-radius:12px;padding:20px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;box-shadow:0 2px 12px rgba(0,0,0,0.1);max-width:280px"><div style="font-size:16px;font-weight:700;margin-bottom:12px">Notes</div><div style="font-size:11px;color:#888;margin-bottom:8px">Things I’m locking in before the end of Term 3:</div><div style="line-height:1.8"><div>☑ Cyber Safe Classroom sub (10% off until 18 Sept 🙌)</div><div>☑ F–8 online safety + AI literacy — done</div><div>☑ No more Sunday lesson building</div><div>☐ Staff actually confident in conversations</div><div>☐ Parents have something to point to</div></div><div style="margin-top:12px;font-size:10px;color:#aaa">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-02',
    name: 'iMessage',
    track: 'On-trend native',
    format: 'Static 4:5',
    audience: 'Cold',
    funnel: 'Awareness',
    platforms: ['Meta'],
    primaryText:
      "The online safety curriculum for F–8 you keep meaning to sort? It’s already built, mapped, and eSafety endorsed. 10% off until 18 September.",
    headline: 'What other schools already use',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: '/mockups/ad-02.png',
    mockupHtml: `<div style="background:#f5f5f7;border-radius:12px;padding:16px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;max-width:280px"><div style="text-align:center;font-size:11px;color:#888;margin-bottom:12px">iMessage</div><div style="margin-bottom:8px"><span style="background:#e5e5ea;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">do you know how schools handle online safety if they can’t get an incursion?</span></div><div style="margin-bottom:8px;text-align:right"><span style="background:#007aff;color:#fff;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">Cyber Safety Project has a digital one. Cyber Safe Classroom. we’ve been using it all year</span></div><div style="margin-bottom:8px"><span style="background:#e5e5ea;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">wait it’s actually digital? we don’t need someone to come in?</span></div><div style="margin-bottom:8px;text-align:right"><span style="background:#007aff;color:#fff;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">yep. F–8, mapped, AI literacy included. free trial and 10% off until sept ✅✅</span></div><div style="margin-bottom:8px"><span style="background:#e5e5ea;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">🙏🙏 sending this to the deputy now</span></div><div style="margin-top:8px;font-size:10px;color:#aaa;text-align:center">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-03',
    name: 'Reddit',
    track: 'On-trend native',
    format: 'Static 4:5',
    audience: 'Cold',
    funnel: 'Awareness',
    platforms: ['Meta'],
    primaryText:
      "Teaching AI literacy F to 8 without losing your weekends. Here’s what other teachers actually use.",
    headline: 'AI literacy and online safety, sorted',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: '/mockups/ad-03.png',
    mockupHtml: `<div style="background:#fff;border-radius:8px;padding:16px;font-family:Verdana,sans-serif;font-size:11px;max-width:280px;border:1px solid #edeff1"><div style="color:#1c1c1c;font-size:10px;margin-bottom:8px">r/AustralianTeachers · 4h</div><div style="font-weight:700;margin-bottom:8px;font-size:12px">What are regional and rural schools using for cyber safety and AI literacy? Incursions aren’t practical for us.</div><div style="color:#0079d3;font-size:10px;margin-bottom:12px">▲ 284 · 💬 76 comments</div><hr style="border:none;border-top:1px solid #edeff1;margin-bottom:10px"/><div style="color:#787c7e;font-size:10px;margin-bottom:4px">u/staffroom_sage · 3h · ▲ 198</div><div style="line-height:1.6">Cyber Safety Project — they have a fully digital curriculum called Cyber Safe Classroom. F–8, mapped to the Australian Curriculum, eSafety endorsed. We’re in regional QLD. Free trial, less than $2 per child per term. 10% off at the moment too.</div><div style="margin-top:8px;font-size:10px;color:#aaa">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-04',
    name: 'Big number ($2)',
    track: 'Direct response',
    format: 'Static 4:5',
    audience: 'Cold',
    funnel: 'Awareness',
    platforms: ['Meta'],
    primaryText:
      "Less than $2 per child per term. Cyber Safe Classroom: ready-to-teach online safety + AI literacy. F–8. Mapped. eSafety endorsed. 10% off until 18 September.",
    headline: 'Less than $2 per child per term',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DNEhuIPYiUFiUuOURsDCLxx5Ld/hf_20260626_030500_a05cc618-ca0a-45fd-a921-3de633023814.png',
    mockupHtml: `<div style="background:#F0F4FA;border-radius:12px;padding:24px;text-align:center;font-family:'Helvetica Neue',sans-serif;max-width:280px"><div style="font-size:11px;color:#444;margin-bottom:4px">Less than</div><div style="font-size:80px;font-weight:900;color:#3EC9A0;line-height:1;margin-bottom:4px">$2</div><div style="font-size:13px;color:#0F1F4B;font-weight:500;margin-bottom:16px">per child, per term.</div><div style="font-size:11px;color:#0F1F4B;font-weight:700;margin-bottom:4px">Cyber Safe Classroom.</div><div style="font-size:10px;color:#555;line-height:1.6">Ready-to-teach online safety + AI literacy.<br/>F–8. Mapped. eSafety endorsed.<br/>Anywhere in Australia.</div><div style="margin-top:12px;font-size:11px;color:#3EC9A0;font-weight:700">10% off until 18 September.</div><div style="font-size:10px;color:#888">Free trial, no commitment.</div><div style="margin-top:10px;font-size:10px;color:#aaa">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-05',
    name: 'Open letter',
    track: 'Empathy / authority',
    format: 'Static 4:5',
    audience: 'Cold',
    funnel: 'Awareness',
    platforms: ['Meta'],
    primaryText:
      "To the school that has been meaning to sort cyber safety for three terms now. Next term is now.",
    headline: 'An open letter',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DNEhuIPYiUFiUuOURsDCLxx5Ld/hf_20260626_030507_1c7df111-2107-42c5-ad63-f7d9706fbd1a.png',
    mockupHtml: `<div style="background:#FAF8F5;border-radius:8px;padding:20px;font-family:Georgia,serif;font-size:11px;max-width:280px;line-height:1.8"><div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:12px">AN OPEN LETTER</div><div style="margin-bottom:8px;font-weight:bold">To the school that has been meaning to sort cyber safety for three terms now.</div><div style="margin-bottom:8px">Every term, something more urgent lands on your desk and cyber safety slides to next term’s list. Meanwhile the group chats keep running.</div><div style="margin-bottom:8px">You don’t need a presenter. You don’t need to build anything. You don’t even need a significant budget line.</div><div style="margin-bottom:8px">Cyber Safe Classroom: ready-to-teach F–8 lessons. Less than $2 per child per term. Free trial.</div><div style="color:#3EC9A0;font-weight:bold;margin-bottom:4px">10% off before 18 September.</div><div style="font-style:italic">Next term is now.</div><div style="margin-top:12px;font-size:10px;color:#aaa">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-06',
    name: 'Type poster',
    track: 'Authority',
    format: 'Static 4:5',
    audience: 'Cold',
    funnel: 'Awareness',
    platforms: ['Meta'],
    primaryText:
      "The schools getting ahead of cyber safety aren’t waiting for a presenter to arrive. They found a curriculum that works anywhere.",
    headline: 'They found a curriculum that works anywhere',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DNEhuIPYiUFiUuOURsDCLxx5Ld/hf_20260626_030524_04939f2f-c08f-48d0-83c4-76a9b2ff8160.jpeg',
    mockupHtml: `<div style="background:#0F1F4B;border-radius:12px;padding:24px;font-family:'Helvetica Neue',sans-serif;max-width:280px;color:#fff"><div style="font-size:15px;font-weight:700;line-height:1.4;margin-bottom:12px">The schools getting ahead of cyber safety aren’t waiting for a presenter to arrive.</div><div style="font-size:12px;color:rgba(255,255,255,0.7);margin-bottom:12px">They found a curriculum that works anywhere.</div><div style="border-top:1px solid rgba(255,255,255,0.2);padding-top:12px"><div style="color:#3EC9A0;font-weight:700;font-size:12px;margin-bottom:4px">Cyber Safe Classroom.</div><div style="font-size:10px;color:rgba(255,255,255,0.7);line-height:1.7">Foundation to Year 8. AI literacy included.<br/>eSafety endorsed. Less than $2 per child per term.</div></div><div style="margin-top:12px;color:#3EC9A0;font-size:11px;font-weight:700">10% off before 18 September.</div><div style="font-size:10px;color:rgba(255,255,255,0.5);margin-top:8px">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-07',
    name: 'Scenario',
    track: 'Problem-aware',
    format: 'Static 4:5',
    audience: 'Cold',
    funnel: 'Awareness',
    platforms: ['Meta'],
    primaryText:
      "A Year 6 group chat spiralled last night. Does every staff member know what to say right now?",
    headline: 'Build the culture before the incident',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: '/mockups/ad-07.png',
    mockupHtml: `<div style="background:#0F1F4B;border-radius:12px;padding:24px;font-family:'Helvetica Neue',sans-serif;max-width:280px;color:#fff"><div style="font-size:16px;font-weight:800;line-height:1.4;margin-bottom:16px">A Year 6 group chat spiralled last night.<br/>A parent called this morning.<br/>A student is in the deputy’s office.</div><div style="color:#3EC9A0;font-style:italic;font-size:12px;margin-bottom:12px">Does every staff member know what to say right now?</div><div style="font-size:11px;color:rgba(255,255,255,0.8);line-height:1.7;margin-bottom:12px">The schools that handle this well build the culture before the incident. Cyber Safe Classroom gives your whole school a framework.</div><div style="font-size:10px;color:rgba(255,255,255,0.6)">Foundation to Year 8. eSafety endorsed.</div><div style="margin-top:10px;color:#3EC9A0;font-size:11px;font-weight:700">10% off before 18 September.</div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:6px">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-08',
    name: 'Proof (2,400+)',
    track: 'Social proof',
    format: 'Static 4:5',
    audience: 'Warm',
    funnel: 'Consideration',
    platforms: ['Meta'],
    primaryText:
      "2,400+ Australian schools trust Cyber Safe Classroom. eSafety endorsed, F–8, curriculum-mapped, AI literacy included. 10% off until 18 September.",
    headline: '2,400+ schools trust Cyber Safe Classroom',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DNEhuIPYiUFiUuOURsDCLxx5Ld/hf_20260626_030519_fae58998-665b-4345-87a0-16c9f618058b.png',
    mockupHtml: `<div style="background:#0F1F4B;border-radius:12px;padding:24px;font-family:'Helvetica Neue',sans-serif;max-width:280px;text-align:center;color:#fff"><div style="font-size:60px;font-weight:900;color:#3EC9A0;line-height:1">2,400+</div><div style="font-size:13px;color:rgba(255,255,255,0.8);margin-bottom:4px">Australian schools trust</div><div style="font-size:14px;font-weight:700;margin-bottom:16px">Cyber Safe Classroom.</div><div style="text-align:left;font-size:11px;line-height:1.9;color:rgba(255,255,255,0.85)"><div>✓ eSafety Commissioner endorsed</div><div>✓ F–8, curriculum-mapped</div><div>✓ AI literacy included</div><div>✓ Less than $2 per child per term</div><div>✓ Works anywhere in Australia</div></div><div style="margin-top:14px;color:#3EC9A0;font-weight:700;font-size:12px">10% off, closes 18 September 2026.</div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:6px">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-09',
    name: 'Urgency (CLOSING 18 SEPT)',
    track: 'Urgency',
    format: 'Static 4:5',
    audience: 'Warm',
    funnel: 'Conversion',
    platforms: ['Meta'],
    primaryText:
      "10% off Cyber Safe Classroom closes 18 September. Online safety + AI literacy. F–8. Mapped. eSafety endorsed. Book before the deadline.",
    headline: 'Closing 18 September',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DNEhuIPYiUFiUuOURsDCLxx5Ld/hf_20260626_030513_cfb127e1-1d77-4ce6-874c-db0e0e508930.png',
    mockupHtml: `<div style="background:#0F1F4B;border-radius:12px;padding:24px;font-family:'Helvetica Neue',sans-serif;max-width:280px;text-align:center;color:#fff"><div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">CLOSING</div><div style="font-size:72px;font-weight:900;color:#3EC9A0;line-height:1;margin-bottom:12px">18<br/>SEPT</div><div style="border-top:1px solid rgba(255,255,255,0.2);padding-top:12px;font-size:13px;font-weight:700;margin-bottom:8px">10% off Cyber Safe Classroom.</div><div style="font-size:10px;color:rgba(255,255,255,0.7);line-height:1.7;margin-bottom:10px">Online safety + AI literacy. F–8.<br/>Mapped. eSafety endorsed.<br/>Less than $2 per child per term.</div><div style="font-size:12px;color:#3EC9A0;font-weight:700">Book before the deadline.</div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:8px">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-10',
    name: 'Carousel (5 slides)',
    track: 'Educational',
    format: 'Carousel',
    audience: 'Cold',
    funnel: 'Awareness',
    platforms: ['Meta'],
    primaryText:
      "5 things Cyber Safe Classroom does that most schools still do themselves. F–8, mapped, eSafety endorsed. 10% off until 18 September.",
    headline: '5 things CSC does for you',
    cta: 'Learn more',
    lp: '/cyber-safe-classroom/',
    imageUrl: '/mockups/ad-10.png',
    mockupHtml: `<div style="font-family:'Helvetica Neue',sans-serif;max-width:300px"><div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px"><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;font-size:11px;margin-bottom:4px;color:#3EC9A0">SLIDE 1</div>5 things Cyber Safe Classroom does that most schools still do themselves</div><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;color:#3EC9A0;margin-bottom:4px">Builds the lessons.</div><div style="color:rgba(255,255,255,0.5)">DIY: your teacher, on Sunday</div><div style="color:#3EC9A0">CSC: open and go</div></div><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;color:#3EC9A0;margin-bottom:4px">Maps to curriculum.</div><div style="color:rgba(255,255,255,0.5)">DIY: hope for the best</div><div style="color:#3EC9A0">CSC: F–8, done</div></div><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;color:#3EC9A0;margin-bottom:4px">Covers AI literacy.</div><div style="color:rgba(255,255,255,0.5)">DIY: where do we start?</div><div style="color:#3EC9A0">CSC: included</div></div><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;color:#3EC9A0;margin-bottom:8px">Less than $2 per child per term.</div><div style="color:rgba(255,255,255,0.7)">10% off before 18 September.</div><div style="color:#3EC9A0;font-weight:700;margin-top:4px">Free trial.</div></div></div><div style="font-size:9px;color:#888;margin-top:4px">Scroll to see all 5 slides →</div></div>`,
  },
];
