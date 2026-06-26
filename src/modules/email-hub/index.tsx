'use client';

import { useCallback, useRef, useState } from 'react';
import { buildEmailHtml } from './templates';

type Layout = 'sales-early-bird' | 'sales-urgency' | 'sales-final-call' | 'thought-leadership' | 'social-proof';

const layouts: { id: Layout; tag: string; tagColor: string; name: string; description: string }[] = [
  {
    id: 'sales-early-bird',
    tag: 'Sales',
    tagColor: 'bg-orange-100 text-orange-800',
    name: 'Early Bird / Launch',
    description:
      'Split panel with product UI mockup on teal. For initial offer launch and standard sales emails.',
  },
  {
    id: 'sales-urgency',
    tag: 'Sales',
    tagColor: 'bg-orange-100 text-orange-800',
    name: 'Urgency / Reminder',
    description:
      'Split panel with countdown visual on dark. For approaching deadlines and reminder sends.',
  },
  {
    id: 'sales-final-call',
    tag: 'Sales',
    tagColor: 'bg-red-100 text-red-800',
    name: 'Final Call',
    description:
      'Full-width dark hero with yellow CTA. For last-chance deadline emails only.',
  },
  {
    id: 'thought-leadership',
    tag: 'Thought Leadership',
    tagColor: 'bg-blue-100 text-blue-800',
    name: 'Thought Leadership',
    description:
      'Dark right panel with stat or founder card. Insight-led, offer mentioned softly at end.',
  },
  {
    id: 'social-proof',
    tag: 'Social Proof',
    tagColor: 'bg-green-100 text-green-800',
    name: 'School Success Story',
    description:
      'Teal right panel with school card and outcome stats. Narrative before/after case study.',
  },
];

const placeholders: Record<Layout, string> = {
  'sales-early-bird':
    'Describe the offer, deadline, and any bonus inclusions. Leave out TBC items.\n\nE.g. "10% off 2027 Cyber Safe Classroom subscription. Offer closes 18 September 2026. Bonus Planning and Success Session with Amanda (valued at $200)."',
  'sales-urgency':
    'Describe the offer, deadline, and any bonus inclusions. Leave out TBC items.\n\nE.g. "Only 4 weeks left. 10% Early Bird pricing closes 18 September. Include the free Planning Session bonus."',
  'sales-final-call':
    'Describe the offer, deadline, and any bonus inclusions. Leave out TBC items.\n\nE.g. "Final call. 10% Early Bird pricing closes tonight. After midnight, full price only. Mention free trial as a fallback."',
  'thought-leadership':
    'Describe the key insight, challenge, or topic. Who is speaking? What is the expert angle?\n\nE.g. "Schools dealing with group chat incidents weekly. Proactive planning vs reactive response. Term 3 is budget season. Early Bird closes 18 September."',
  'social-proof':
    'Name the school. Describe the before/after. What were the outcomes?\n\nE.g. "Northcross Christian School. Before: ad hoc incursions, low teacher confidence. After: embedded F-8 curriculum, 94% teacher confidence, 40% fewer incidents."',
};

export function EmailHub() {
  const [selectedLayout, setSelectedLayout] = useState<Layout>('sales-early-bird');
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [toast, setToast] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveSubject, setSaveSubject] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
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

  const saveToGallery = useCallback(async () => {
    if (!saveName.trim() || !generatedHtml) return;
    setSaveStatus('saving');
    try {
      const resp = await fetch('/api/gallery/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: saveName,
          subject: saveSubject,
          layout: selectedLayout,
          html: generatedHtml,
        }),
      });
      if (!resp.ok) throw new Error('Save failed');
      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    }
  }, [saveName, saveSubject, selectedLayout, generatedHtml]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 font-body">
      {/* Step 1: Layout picker */}
      <div className="mb-2">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-hh-black/40">
          Step 1
        </p>
        <h2 className="text-lg font-bold text-hh-black font-display">Choose a layout</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
        placeholder={placeholders[selectedLayout]}
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
              <button
                onClick={() => {
                  setShowSaveForm(true);
                  setSaveStatus('idle');
                  setSaveName('');
                  setSaveSubject('');
                }}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-hh-blue text-white hover:bg-hh-blue/80 transition"
              >
                Save to Gallery
              </button>
            </div>
          </div>

          {/* Save to Gallery form */}
          {showSaveForm && saveStatus !== 'saved' && (
            <div className="bg-white border-2 border-hh-blue/30 rounded-xl p-5 mb-4 max-w-[640px] mx-auto">
              <p className="text-sm font-bold text-hh-black mb-3">Save to Campaign Review</p>
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="e.g. Email 1 — Early Bird Launch"
                className="w-full p-3 border-2 border-black/10 rounded-lg text-sm text-hh-black bg-white outline-none focus:border-hh-blue transition placeholder:text-black/30 mb-2"
              />
              <input
                type="text"
                value={saveSubject}
                onChange={(e) => setSaveSubject(e.target.value)}
                placeholder="e.g. Secure your 2027 dates (optional)"
                className="w-full p-3 border-2 border-black/10 rounded-lg text-sm text-hh-black bg-white outline-none focus:border-hh-blue transition placeholder:text-black/30 mb-3"
              />
              {saveStatus === 'error' && (
                <p className="text-xs text-red-600 mb-2">Failed to save. Please try again.</p>
              )}
              <div className="flex items-center gap-3">
                <button
                  onClick={saveToGallery}
                  disabled={!saveName.trim() || saveStatus === 'saving'}
                  className="px-5 py-2 rounded-lg text-sm font-semibold bg-hh-black text-white hover:bg-hh-black/80 transition disabled:opacity-40"
                >
                  {saveStatus === 'saving' ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setShowSaveForm(false)}
                  className="text-sm text-hh-black/50 hover:text-hh-black transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Save confirmation */}
          {saveStatus === 'saved' && (
            <div className="bg-[#e8f8f2] border border-[#1ab5a0] rounded-xl p-4 mb-4 max-w-[640px] mx-auto text-sm text-[#1ab5a0] font-medium">
              Saved to Campaign Review.{' '}
              <button
                onClick={() => {
                  const btns = document.querySelectorAll('nav button');
                  const crBtn = Array.from(btns).find((b) =>
                    b.textContent?.includes('Campaign review')
                  ) as HTMLButtonElement | undefined;
                  crBtn?.click();
                }}
                className="underline font-semibold hover:no-underline"
              >
                Go to Campaign Review
              </button>
            </div>
          )}

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
