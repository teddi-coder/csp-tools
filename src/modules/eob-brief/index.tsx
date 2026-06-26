'use client';

import { useCallback, useEffect, useState } from 'react';
import { ads } from './data';

type Status = 'pending' | 'approved' | 'changes_requested';

interface FeedbackState {
  [itemId: string]: { status: Status; note: string };
}

const CLIENT_SLUG = 'cyber-safety-project';
const MODULE_ID = 'eob-brief';

export function EobBrief() {
  const [feedback, setFeedback] = useState<FeedbackState>({});
  const [noteOpen, setNoteOpen] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/feedback?client=${CLIENT_SLUG}&module=${MODULE_ID}`)
      .then((r) => r.json())
      .then((rows: Array<{ item_id: string; status: Status; note: string | null }>) => {
        const state: FeedbackState = {};
        rows.forEach((row) => {
          state[row.item_id] = { status: row.status, note: row.note ?? '' };
        });
        setFeedback(state);
      })
      .catch(console.error);
  }, []);

  const save = useCallback(async (itemId: string, status: Status, note: string) => {
    setSaving(itemId);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_slug: CLIENT_SLUG,
          module_id: MODULE_ID,
          item_id: itemId,
          status,
          note,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setFeedback((prev) => ({ ...prev, [itemId]: { status, note } }));
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(null);
    }
  }, []);

  const handleApprove = (id: string) => {
    setNoteOpen(null);
    save(id, 'approved', feedback[id]?.note ?? '');
  };

  const handleRequestChanges = (id: string) => {
    setNoteOpen(id);
    setNoteText(feedback[id]?.note ?? '');
  };

  const handleSubmitNote = (id: string) => {
    save(id, 'changes_requested', noteText);
    setNoteOpen(null);
    setNoteText('');
  };

  const handleReset = (id: string) => {
    save(id, 'pending', '');
  };

  const approvedCount = ads.filter((a) => feedback[a.id]?.status === 'approved').length;

  return (
    <div className="p-4 sm:p-6">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-black/10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl text-hh-black">
              Cyber Safe Classroom — Early Bird Campaign Brief
            </h2>
            <p className="text-xs text-hh-black/50 font-body mt-0.5">
              Meta Ads &middot; National &middot; Closes 18 September 2026
            </p>
          </div>
          <div className="flex-shrink-0 bg-hh-green/20 text-hh-black font-body font-semibold text-sm px-3 py-1.5 rounded-full">
            {approvedCount} / {ads.length} approved
          </div>
        </div>
      </div>

      <p className="text-sm text-hh-black/60 font-body mb-8">
        Review each ad concept below. Approve individually or request changes with a note.
      </p>

      <div style={{ columns: 2, columnGap: '16px' }}>
        {ads.map((ad) => {
          const fb = feedback[ad.id];
          const status: Status = fb?.status ?? 'pending';
          const isSaving = saving === ad.id;
          const noteIsOpen = noteOpen === ad.id;

          return (
            <div
              key={ad.id}
              style={{ breakInside: 'avoid', marginBottom: '16px', display: 'inline-block', width: '100%' }}
              className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex flex-col"
            >
              {/* Creative — all cards now use imageUrl */}
              <div style={{
                width: '100%',
                height: '300px',
                overflow: 'hidden',
              }}>
                <img
                  src={ad.imageUrl || ''}
                  alt={ad.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                  }}
                />
              </div>

              {/* Metadata tags */}
              <div className="px-4 pt-3 pb-2 border-t border-black/5">
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="text-[10px] font-body font-semibold uppercase tracking-wide bg-hh-yellow text-hh-black px-2 py-0.5 rounded-full">
                    {ad.format}
                  </span>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-wide bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {ad.audience}
                  </span>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-wide bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                    {ad.funnel}
                  </span>
                  {ad.platforms.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] font-body font-semibold uppercase tracking-wide bg-black/5 text-hh-black/60 px-2 py-0.5 rounded-full"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Copy */}
                <p className="text-xs text-hh-black/70 font-body mb-1">
                  <span className="font-semibold">Primary:</span> {ad.primaryText}
                </p>
                <p className="text-xs text-hh-black font-body font-semibold mb-0.5">
                  {ad.headline}
                </p>
                <p className="text-xs text-hh-black/60 font-body">
                  CTA: {ad.cta} &middot; LP: {ad.lp}
                </p>
              </div>

              {/* Status + actions */}
              <div className="px-4 pb-4 pt-2 mt-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-body font-semibold text-hh-black/50 uppercase tracking-wide">
                    {ad.name}
                  </span>
                  <StatusBadge status={status} />
                  {status !== 'pending' && (
                    <button
                      onClick={() => handleReset(ad.id)}
                      disabled={isSaving}
                      className="text-[10px] font-body text-hh-black/40 hover:text-hh-black/60 underline ml-auto"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {fb?.status === 'changes_requested' && fb.note && !noteIsOpen && (
                  <div className="bg-hh-pink/20 border border-hh-pink/30 rounded-lg px-3 py-2 mb-3">
                    <p className="text-xs font-body text-hh-black/70">
                      <span className="font-semibold">Note:</span> {fb.note}
                    </p>
                  </div>
                )}

                {!noteIsOpen ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(ad.id)}
                      disabled={isSaving}
                      className="flex-1 text-sm font-body font-semibold py-2 rounded-xl bg-hh-green text-hh-black hover:opacity-90 transition disabled:opacity-50"
                    >
                      {isSaving && status !== 'changes_requested' ? 'Saving...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleRequestChanges(ad.id)}
                      disabled={isSaving}
                      className="flex-1 text-sm font-body font-semibold py-2 rounded-xl bg-hh-pink text-hh-black hover:opacity-90 transition disabled:opacity-50"
                    >
                      Request changes
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Describe the changes needed..."
                      className="w-full text-sm font-body border border-black/20 rounded-xl p-2 resize-none bg-hh-bg focus:outline-none focus:ring-2 focus:ring-hh-blue"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSubmitNote(ad.id)}
                        disabled={isSaving}
                        className="flex-1 text-sm font-body font-semibold py-2 rounded-xl bg-hh-black text-hh-bg hover:opacity-80 transition disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Submit'}
                      </button>
                      <button
                        onClick={() => setNoteOpen(null)}
                        className="text-sm font-body py-2 px-4 rounded-xl border border-black/20 hover:bg-black/5 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === 'approved') {
    return (
      <span className="text-xs font-body font-semibold px-2 py-0.5 rounded-full bg-hh-green text-hh-black">
        Approved
      </span>
    );
  }
  if (status === 'changes_requested') {
    return (
      <span className="text-xs font-body font-semibold px-2 py-0.5 rounded-full bg-hh-pink text-hh-black">
        Changes requested
      </span>
    );
  }
  return (
    <span className="text-xs font-body font-semibold px-2 py-0.5 rounded-full bg-black/10 text-hh-black/60">
      Pending
    </span>
  );
}
