'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface GalleryEmail {
  id: string;
  name: string;
  subject: string;
  layout: string;
  html: string;
  savedAt: string;
  status: 'pending' | 'approved' | 'changes_requested';
  comment: string;
  commentAt: string;
}

const statusConfig = {
  pending: { label: 'Pending', bg: '#f5f5f5', text: '#888888', border: '#dddddd' },
  approved: { label: 'Approved', bg: '#e8f8f2', text: '#1ab5a0', border: '#1ab5a0' },
  changes_requested: {
    label: 'Changes Requested',
    bg: '#fff8e6',
    text: '#cc8800',
    border: '#f5c700',
  },
};

export function CampaignReview() {
  const [emails, setEmails] = useState<GalleryEmail[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const selected = emails.find((e) => e.id === selectedId) || null;

  const fetchEmails = useCallback(async () => {
    try {
      const resp = await fetch('/api/gallery/list');
      if (resp.ok) {
        const data = await resp.json();
        setEmails(data);
      }
    } catch {
      // silently fail on network error
    }
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  useEffect(() => {
    if (!selected || !iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(selected.html);
    doc.close();
  }, [selected]);

  const updateStatus = useCallback(
    async (status: 'approved' | 'changes_requested', commentText?: string) => {
      if (!selectedId) return;
      setSaving(true);
      try {
        const body: Record<string, string> = { status };
        if (commentText !== undefined) body.comment = commentText;
        const resp = await fetch(`/api/gallery/${selectedId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (resp.ok) {
          const updated = await resp.json();
          setEmails((prev) => prev.map((e) => (e.id === selectedId ? updated : e)));
        }
      } finally {
        setSaving(false);
      }
    },
    [selectedId]
  );

  const saveComment = useCallback(async () => {
    if (!selectedId) return;
    setSaving(true);
    try {
      const resp = await fetch(`/api/gallery/${selectedId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });
      if (resp.ok) {
        const updated = await resp.json();
        setEmails((prev) => prev.map((e) => (e.id === selectedId ? updated : e)));
      }
    } finally {
      setSaving(false);
    }
  }, [selectedId, comment]);

  const deleteEmail = useCallback(
    async (id: string) => {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      setEmails((prev) => prev.filter((e) => e.id !== id));
      if (selectedId === id) setSelectedId(null);
      setDeleteConfirm(null);
    },
    [selectedId]
  );

  useEffect(() => {
    if (selected) setComment(selected.comment || '');
  }, [selected]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 font-body">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-lg font-bold text-hh-black font-display">Campaign Review</h2>
        <span className="text-xs text-hh-black/40 font-medium">
          {emails.length} email{emails.length !== 1 ? 's' : ''}
        </span>
      </div>

      {emails.length === 0 ? (
        <div className="text-center py-20 text-hh-black/40 text-sm">
          No emails saved yet. Generate an email in the Email Hub and click &quot;Save to
          Gallery&quot;.
        </div>
      ) : (
        <div className="flex gap-6" style={{ minHeight: 600 }}>
          {/* Left column — email list */}
          <div className="w-[280px] shrink-0 overflow-y-auto space-y-2" style={{ maxHeight: 900 }}>
            {emails.map((e) => {
              const sc = statusConfig[e.status];
              const isSelected = selectedId === e.id;
              return (
                <button
                  key={e.id}
                  onClick={() => setSelectedId(e.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition ${
                    isSelected
                      ? 'border-l-4 border-l-[#1ab5a0] border-t-black/10 border-r-black/10 border-b-black/10 bg-white'
                      : 'border-black/10 bg-white hover:border-hh-blue/30'
                  }`}
                >
                  <p className="text-sm font-bold text-hh-black truncate">{e.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#1ab5a0]/10 text-[#1ab5a0]">
                      {e.layout}
                    </span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: sc.bg,
                        color: sc.text,
                        border: `1px solid ${sc.border}`,
                      }}
                    >
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-hh-black/30 mt-2">
                    {new Date(e.savedAt).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right column — preview panel */}
          <div className="flex-1 min-w-0">
            {!selected ? (
              <div className="flex items-center justify-center h-full text-hh-black/30 text-sm">
                Select an email to preview
              </div>
            ) : (
              <div>
                {/* Toolbar */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold text-hh-black">{selected.name}</p>
                    {selected.subject && (
                      <p className="text-xs text-hh-black/50 mt-0.5">{selected.subject}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateStatus('approved')}
                      disabled={saving}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#1ab5a0] text-white hover:bg-[#13917f] transition disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus('changes_requested', comment)}
                      disabled={saving}
                      className="px-4 py-2 rounded-lg text-xs font-semibold border-2 border-[#f5c700] text-[#cc8800] hover:bg-[#fff8e6] transition disabled:opacity-50"
                    >
                      Request Changes
                    </button>
                    {deleteConfirm === selected.id ? (
                      <span className="text-xs text-hh-black/50">
                        Are you sure?{' '}
                        <button
                          onClick={() => deleteEmail(selected.id)}
                          className="text-red-600 font-semibold hover:underline"
                        >
                          Yes
                        </button>
                        {' / '}
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-hh-black/50 hover:underline"
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(selected.id)}
                        className="text-xs text-red-500 hover:text-red-700 transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {/* Comment section */}
                <div className="mb-4">
                  {selected.comment && (
                    <div className="bg-[#f9f9f9] border border-black/10 rounded-lg p-3 mb-2">
                      <p className="text-xs text-hh-black/70">{selected.comment}</p>
                      {selected.commentAt && (
                        <p className="text-[10px] text-hh-black/30 mt-1">
                          {new Date(selected.commentAt).toLocaleString('en-AU', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      )}
                    </div>
                  )}
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment for the Hedgehog team..."
                    className="w-full min-h-[60px] p-3 border-2 border-black/10 rounded-lg text-xs text-hh-black bg-white resize-y outline-none focus:border-hh-blue transition placeholder:text-black/30"
                  />
                  <button
                    onClick={saveComment}
                    disabled={saving}
                    className="mt-1 px-4 py-1.5 rounded-lg text-[11px] font-semibold border-2 border-black/10 text-hh-black hover:border-hh-black/30 transition disabled:opacity-50"
                  >
                    Save comment
                  </button>
                </div>

                {/* Email preview */}
                <div
                  className="bg-white border border-[#e0e0e0] overflow-hidden"
                  style={{ borderRadius: 8 }}
                >
                  <iframe
                    ref={iframeRef}
                    title="Email preview"
                    className="w-full border-none"
                    style={{ minHeight: 800, pointerEvents: 'none' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
