import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'mockups');

const mockupCards: Array<{ id: string; mockupHtml: string }> = [
  {
    id: 'ad-02',
    mockupHtml: `<div style="background:#f5f5f7;border-radius:12px;padding:16px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;max-width:280px"><div style="text-align:center;font-size:11px;color:#888;margin-bottom:12px">iMessage</div><div style="margin-bottom:8px"><span style="background:#e5e5ea;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">do you know how schools handle online safety if they can't get an incursion?</span></div><div style="margin-bottom:8px;text-align:right"><span style="background:#007aff;color:#fff;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">Cyber Safety Project has a digital one. Cyber Safe Classroom. we've been using it all year</span></div><div style="margin-bottom:8px"><span style="background:#e5e5ea;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">wait it's actually digital? we don't need someone to come in?</span></div><div style="margin-bottom:8px;text-align:right"><span style="background:#007aff;color:#fff;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">yep. F–8, mapped, AI literacy included. free trial and 10% off until sept ✅✅</span></div><div style="margin-bottom:8px"><span style="background:#e5e5ea;border-radius:14px;padding:6px 10px;display:inline-block;max-width:75%">🙏🙏 sending this to the deputy now</span></div><div style="margin-top:8px;font-size:10px;color:#aaa;text-align:center">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-03',
    mockupHtml: `<div style="background:#fff;border-radius:8px;padding:16px;font-family:Verdana,sans-serif;font-size:11px;max-width:280px;border:1px solid #edeff1"><div style="color:#1c1c1c;font-size:10px;margin-bottom:8px">r/AustralianTeachers · 4h</div><div style="font-weight:700;margin-bottom:8px;font-size:12px">What are regional and rural schools using for cyber safety and AI literacy? Incursions aren't practical for us.</div><div style="color:#0079d3;font-size:10px;margin-bottom:12px">▲ 284 · 💬 76 comments</div><hr style="border:none;border-top:1px solid #edeff1;margin-bottom:10px"/><div style="color:#787c7e;font-size:10px;margin-bottom:4px">u/staffroom_sage · 3h · ▲ 198</div><div style="line-height:1.6">Cyber Safety Project — they have a fully digital curriculum called Cyber Safe Classroom. F–8, mapped to the Australian Curriculum, eSafety endorsed. We're in regional QLD. Free trial, less than $2 per child per term. 10% off at the moment too.</div><div style="margin-top:8px;font-size:10px;color:#aaa">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-07',
    mockupHtml: `<div style="background:#0F1F4B;border-radius:12px;padding:24px;font-family:'Helvetica Neue',sans-serif;max-width:280px;color:#fff"><div style="font-size:16px;font-weight:800;line-height:1.4;margin-bottom:16px">A Year 6 group chat spiralled last night.<br/>A parent called this morning.<br/>A student is in the deputy's office.</div><div style="color:#3EC9A0;font-style:italic;font-size:12px;margin-bottom:12px">Does every staff member know what to say right now?</div><div style="font-size:11px;color:rgba(255,255,255,0.8);line-height:1.7;margin-bottom:12px">The schools that handle this well build the culture before the incident. Cyber Safe Classroom gives your whole school a framework.</div><div style="font-size:10px;color:rgba(255,255,255,0.6)">Foundation to Year 8. eSafety endorsed.</div><div style="margin-top:10px;color:#3EC9A0;font-size:11px;font-weight:700">10% off before 18 September.</div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:6px">cybersafetyproject.com.au</div></div>`,
  },
  {
    id: 'ad-10',
    mockupHtml: `<div style="font-family:'Helvetica Neue',sans-serif;max-width:300px"><div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px"><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;font-size:11px;margin-bottom:4px;color:#3EC9A0">SLIDE 1</div>5 things Cyber Safe Classroom does that most schools still do themselves</div><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;color:#3EC9A0;margin-bottom:4px">Builds the lessons.</div><div style="color:rgba(255,255,255,0.5)">DIY: your teacher, on Sunday</div><div style="color:#3EC9A0">CSC: open and go</div></div><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;color:#3EC9A0;margin-bottom:4px">Maps to curriculum.</div><div style="color:rgba(255,255,255,0.5)">DIY: hope for the best</div><div style="color:#3EC9A0">CSC: F–8, done</div></div><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;color:#3EC9A0;margin-bottom:4px">Covers AI literacy.</div><div style="color:rgba(255,255,255,0.5)">DIY: where do we start?</div><div style="color:#3EC9A0">CSC: included</div></div><div style="background:#0F1F4B;border-radius:8px;padding:12px;min-width:120px;color:#fff;font-size:10px;flex-shrink:0"><div style="font-weight:700;color:#3EC9A0;margin-bottom:8px">Less than $2 per child per term.</div><div style="color:rgba(255,255,255,0.7)">10% off before 18 September.</div><div style="color:#3EC9A0;font-weight:700;margin-top:4px">Free trial.</div></div></div><div style="font-size:9px;color:#888;margin-top:4px">Scroll to see all 5 slides →</div></div>`,
  },
];

async function renderMockups() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 400, height: 600, deviceScaleFactor: 2 });

  for (const ad of mockupCards) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 400px;
            min-height: 400px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 20px;
            background: #1b3a6b;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
        </style>
      </head>
      <body>
        ${ad.mockupHtml}
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const contentHeight = await page.evaluate(() => document.body.scrollHeight);

    await page.setViewport({
      width: 400,
      height: Math.max(contentHeight, 400),
      deviceScaleFactor: 2,
    });

    const filename = `${ad.id}.png`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    await page.screenshot({
      path: outputPath,
      fullPage: false,
      type: 'png',
    });

    console.log(`Rendered: ${ad.id} → public/mockups/${filename}`);
  }

  await browser.close();
  console.log('Done.');
}

renderMockups().catch(console.error);
