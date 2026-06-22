'use client';

import { useCallback, useEffect, useState } from 'react';
import { copy } from './copy';
import { NotesApp } from './creatives/notes-app';
import { IMessageStaffroom } from './creatives/imessage-staffroom';
import { RedditThread } from './creatives/reddit-thread';
import { WhiteboardComparison } from './creatives/whiteboard-comparison';
import { GoogleSearch } from './creatives/google-search';
import { EmailInbox } from './creatives/email-inbox';
import { NotificationStack } from './creatives/notification-stack';
import { OpenLetter } from './creatives/open-letter';
import { StickyNotes } from './creatives/sticky-notes';
import { WhatsAppGroup } from './creatives/whatsapp-group';
import { CarouselC1 } from './creatives/carousel-c1';
import { CarouselC2 } from './creatives/carousel-c2';
import { CarouselC3 } from './creatives/carousel-c3';

type Status = 'pending' | 'approved' | 'changes_requested';

interface FeedbackState {
  [itemId: string]: { status: Status; note: string };
}

interface Creative {
  id: string;
  label: string;
  Component: React.ComponentType;
}

const CLIENT_SLUG = 'cyber-safety-project';
const MODULE_ID = 'creative-review';

const creatives: Creative[] = [
  { id: 'notes-app', label: '1. Notes app', Component: NotesApp },
  { id: 'imessage-staffroom', label: '2. iMessage staffroom', Component: IMessageStaffroom },
  { id: 'reddit-thread', label: '3. Reddit', Component: RedditThread },
  { id: 'whiteboard-comparison', label: '4. Whiteboard', Component: WhiteboardComparison },
  { id: 'google-search', label: '5. Google Search', Component: GoogleSearch },
  { id: 'email-inbox', label: '6. Email inbox', Component: EmailInbox },
  { id: 'notification-stack', label: '7. Notification stack', Component: NotificationStack },
  { id: 'open-letter', label: '8. Open letter', Component: OpenLetter },
  { id: 'sticky-notes', label: '9. Sticky notes', Component: StickyNotes },
  { id: 'whatsapp-group', label: '10. WhatsApp group', Component: WhatsAppGroup },
  { id: 'carousel-c1', label: 'C1. Your term, sorted', Component: CarouselC1 },
  { id: 'carousel-c2', label: 'C2. Testimonials', Component: CarouselC2 },
  { id: 'carousel-c3', label: 'C3. DIY vs done', Component: CarouselC3 },
];

export function CreativeReview() {
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

  const save = useCallback(
    async (itemId: string, status: Status, note: string) => {
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
    },
    []
  );

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

  return (
    <div className="p-4 sm:p-6">
      <h2 className="font-display text-3xl text-hh-black mb-2">Creative review</h2>
      <p className="text-hh-black/60 font-body mb-8 text-sm">
        Cyber Safe Curriculum ad pack &middot; {creatives.length} creatives
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {creatives.map(({ id, label, Component }) => {
          const fb = feedback[id];
          const status = fb?.status ?? 'pending';
          const isSaving = saving === id;
          const noteIsOpen = noteOpen === id;
          const creativeCopy = copy[id];

          return (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-center p-4 bg-hh-bg overflow-auto">
                <Component />
              </div>

              {creativeCopy && (
                <div className="px-4 pt-3 pb-2 border-t border-black/5">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {creativeCopy.formats.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] font-body font-semibold uppercase tracking-wide bg-hh-yellow text-hh-black px-2 py-0.5 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  {creativeCopy.primary && (
                    <p className="text-xs text-hh-black/70 font-body mb-1">
                      <span className="font-semibold">Primary:</span> {creativeCopy.primary}
                    </p>
                  )}
                  <p className="text-xs text-hh-black font-body font-semibold mb-0.5">
                    {creativeCopy.headline}
                  </p>
                  {creativeCopy.description && (
                    <p className="text-xs text-hh-black/70 font-body mb-0.5">
                      {creativeCopy.description}
                    </p>
                  )}
                  {creativeCopy.cta && (
                    <p className="text-xs text-hh-black/60 font-body">
                      CTA: {creativeCopy.cta} &middot; LP: {creativeCopy.lp}
                    </p>
                  )}
                </div>
              )}

              <div className="px-4 pb-4 pt-2 mt-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-body font-semibold text-hh-black/50 uppercase tracking-wide">
                    {label}
                  </span>
                  <StatusBadge status={status} />
                </div>

                {!noteIsOpen ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(id)}
                      disabled={isSaving}
                      className="flex-1 text-sm font-body font-semibold py-2 rounded-xl bg-hh-green text-hh-black hover:opacity-90 transition disabled:opacity-50"
                    >
                      {isSaving && status !== 'changes_requested' ? 'Saving…' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleRequestChanges(id)}
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
                      placeholder="Describe the changes needed…"
                      className="w-full text-sm font-body border border-black/20 rounded-xl p-2 resize-none bg-hh-bg focus:outline-none focus:ring-2 focus:ring-hh-blue"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSubmitNote(id)}
                        disabled={isSaving}
                        className="flex-1 text-sm font-body font-semibold py-2 rounded-xl bg-hh-black text-hh-bg hover:opacity-80 transition disabled:opacity-50"
                      >
                        {isSaving ? 'Saving…' : 'Submit'}
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
