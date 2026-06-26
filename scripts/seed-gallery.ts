/**
 * Seed script for pre-populating the Campaign Review gallery
 * with the 6 approved Term 3 Early Bird campaign emails.
 *
 * Usage: npx tsx scripts/seed-gallery.ts
 *
 * Requires:
 *   - KV_REST_API_URL and KV_REST_API_TOKEN env vars (from .env.local or Vercel)
 *   - HTML files in seeds/ directory
 *
 * Idempotent: skips seeding if email:index already has entries.
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = process.env.SEED_BASE_URL || 'http://localhost:3000';

const emails = [
  {
    name: 'Email 1 — Early Bird Offer Launch',
    subject: "Secure your preferred 2027 dates before they're gone",
    layout: 'sales-early-bird',
    htmlFile: 'email-1-early-bird-launch.html',
  },
  {
    name: 'Email 2 — Why Schools Should Plan Early',
    subject: "The schools getting ahead aren't waiting until Term 1",
    layout: 'thought-leadership',
    htmlFile: 'email-2-why-plan-early.html',
  },
  {
    name: 'Email 3 — School Success Story',
    subject: "How one school made online safety everyone's job",
    layout: 'social-proof',
    htmlFile: 'email-3-success-story.html',
  },
  {
    name: 'Email 4 — Early Bird Reminder',
    subject: 'Only 4 weeks left — 10% Early Bird pricing closes soon',
    layout: 'sales-urgency',
    htmlFile: 'email-4-early-bird-reminder.html',
  },
  {
    name: 'Email 5 — A Message from Trent',
    subject: 'A message from Trent: five things schools need to know before 2027',
    layout: 'thought-leadership',
    htmlFile: 'email-5-trent-message.html',
  },
  {
    name: 'Email 6 — Final Call',
    subject: 'This is your last chance to secure 10% Early Bird pricing for 2027',
    layout: 'sales-final-call',
    htmlFile: 'email-6-final-call.html',
  },
];

async function main() {
  // Check if gallery already has entries
  const listResp = await fetch(`${BASE_URL}/api/gallery/list`);
  if (listResp.ok) {
    const existing = await listResp.json();
    if (existing.length > 0) {
      console.log(`Gallery already has ${existing.length} emails. Skipping seed.`);
      return;
    }
  }

  const seedsDir = join(process.cwd(), 'seeds');
  let seeded = 0;

  for (const email of emails) {
    const htmlPath = join(seedsDir, email.htmlFile);
    if (!existsSync(htmlPath)) {
      console.warn(`Skipping ${email.name}: ${email.htmlFile} not found in seeds/`);
      continue;
    }

    const html = readFileSync(htmlPath, 'utf-8');
    const resp = await fetch(`${BASE_URL}/api/gallery/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: email.name,
        subject: email.subject,
        layout: email.layout,
        html,
      }),
    });

    if (resp.ok) {
      const { id } = await resp.json();
      console.log(`Seeded: ${email.name} (${id})`);
      seeded++;
    } else {
      console.error(`Failed to seed ${email.name}:`, await resp.text());
    }
  }

  console.log(`Done. ${seeded}/${emails.length} emails seeded.`);
}

main().catch(console.error);
