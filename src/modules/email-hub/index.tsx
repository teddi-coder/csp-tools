'use client';

import { useCallback, useRef, useState } from 'react';
import { buildEmailHtml } from './templates';

type Layout = 'resource-hub' | 'story-first' | 'campaign-launch';

const layouts: { id: Layout; tag: string; tagColor: string; name: string; description: string }[] = [
  {
    id: 'resource-hub',
    tag: 'Newsletter',
    tagColor: 'bg-green-100 text-green-800',
    name: 'The Resource Hub',
    description:
      'Card grid layout. Hero + 4 resource cards + stats row + closing CTA. Great for monthly updates and Educator Hub announcements.',
  },
  {
    id: 'story-first',
    tag: 'Nurture',
    tagColor: 'bg-blue-100 text-blue-800',
    name: 'The Story-First',
    description:
      'Narrative flow. Dark hero + 3-step story + testimonial quote + CTA banner. Great for welcome sequences and re-engagement.',
  },
  {
    id: 'campaign-launch',
    tag: 'Campaign',
    tagColor: 'bg-orange-100 text-orange-800',
    name: 'The Campaign Launch',
    description:
      'High-impact launch format. Pill tags + dual CTAs + feature grid + resource list. Great for Term launches and program promos.',
  },
];

export function EmailHub() {
  const [selectedLayout, setSelectedLayout] = useState<Layout>('resource-hub');
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [toast, setToast] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generate = useCallback(async () => {
    if (!brief.trim()) {
      setError('Please write a brief first.');
      return;
    }

    const cleanedBrief = brief
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .filter((line) => {
        const lower = line.toLowerCase();
        return (
          !lower.includes('(tbc)') &&
          !lower.includes('tbc)') &&
          !lower.match(/^\s*tbc\s*$/) &&
          !lower.includes('coming soon') &&
          !lower.includes('to be confirmed') &&
          !lower.includes('to be decided') &&
          !lower.includes('placeholder')
        );
      })
      .join('\n');

    if (cleanedBrief.replace(/\W/g, '').length < 20) {
      setError(
        'Your brief needs a bit more detail before we can generate. Remove any TBC items and describe the main offer or message.'
      );
      return;
    }

    setLoading(true);
    setError('');

    try {
      const resp = await fetch('/api/email-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief: cleanedBrief, layout: selectedLayout }),
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || 'Generation failed');
      }

      const { content } = await resp.json();
      const html = buildEmailHtml(selectedLayout, content);
      setGeneratedHtml(html);

      requestAnimationFrame(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;
        doc.open();
        doc.write(html);
        doc.close();
        setTimeout(() => {
          iframe.style.height = (doc.body?.scrollHeight || 600) + 40 + 'px';
        }, 300);
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [brief, selectedLayout]);

  const copyHtml = useCallback(() => {
    if (!generatedHtml) return;
    navigator.clipboard.writeText(generatedHtml).then(() => {
      setToast(true);
      setTimeout(() => setToast(false), 2500);
    });
  }, [generatedHtml]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 font-body">
      {/* Step 1: Layout picker */}
      <div className="mb-2">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-hh-black/40">
          Step 1
        </p>
        <h2 className="text-lg font-bold text-hh-black font-display">Choose a layout</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {layouts.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelectedLayout(l.id)}
            className={`text-left p-5 rounded-xl border-2 transition ${
              selectedLayout === l.id
                ? 'border-hh-blue bg-hh-blue/5'
                : 'border-black/10 bg-white hover:border-hh-blue/50'
            }`}
          >
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${l.tagColor} inline-block mb-2`}
            >
              {l.tag}
            </span>
            <h3 className="text-sm font-bold text-hh-black mb-1">{l.name}</h3>
            <p className="text-xs text-hh-black/50 leading-relaxed">{l.description}</p>
          </button>
        ))}
      </div>

      {/* Step 2: Brief */}
      <div className="mb-2">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-hh-black/40">
          Step 2
        </p>
        <h2 className="text-lg font-bold text-hh-black font-display">Write your brief</h2>
      </div>

      <textarea
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        placeholder="Describe what this email is about. E.g. 'Term 3 launch email announcing our new AI literacy curriculum, free PD sessions, and the updated Educator Hub. Mention the early bird booking deadline of 18 July.'"
        className="w-full min-h-[120px] p-4 border-2 border-black/10 rounded-xl text-sm text-hh-black bg-white resize-y outline-none focus:border-hh-blue transition placeholder:text-black/30 mb-1"
      />
      <p className="text-xs text-hh-black/40 mb-6">
        Paste full copy or just describe what you need. The AI will generate the email content for
        your chosen layout.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-3 mb-8">
        <button
          onClick={generate}
          disabled={loading}
          className={`px-7 py-3 rounded-lg text-sm font-semibold transition ${
            loading
              ? 'bg-hh-black/30 text-white cursor-not-allowed'
              : 'bg-hh-black text-white hover:bg-hh-black/80'
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </span>
          ) : (
            'Generate email'
          )}
        </button>
      </div>

      {/* Step 3: Preview */}
      {generatedHtml && (
        <div>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-hh-black/40">
                Step 3
              </p>
              <h2 className="text-lg font-bold text-hh-black font-display">Preview and copy</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyHtml}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-hh-green text-hh-black hover:bg-hh-green/80 transition"
              >
                Copy HTML for Transpond
              </button>
              <button
                onClick={generate}
                disabled={loading}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-white border-2 border-black/10 text-hh-black hover:border-hh-black/30 transition"
              >
                Regenerate
              </button>
            </div>
          </div>

          <div className="bg-white border-2 border-black/10 rounded-xl overflow-hidden max-w-[640px] mx-auto">
            <iframe
              ref={iframeRef}
              title="Email preview"
              className="w-full border-none"
              style={{ minHeight: 600 }}
            />
          </div>
        </div>
      )}

      {/* Toast */}
      <div
        className={`fixed bottom-6 right-6 bg-hh-black text-white px-5 py-3 rounded-lg text-sm font-medium transition-all z-50 ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        Copied to clipboard
      </div>
    </div>
  );
}
