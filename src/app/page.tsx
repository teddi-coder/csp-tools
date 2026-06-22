'use client';

import { useState } from 'react';
import { modules } from '@/modules/registry';

export default function Home() {
  const liveModules = modules.filter((m) => m.status === 'live');
  const [activeId, setActiveId] = useState(liveModules[0]?.id ?? '');
  const active = modules.find((m) => m.id === activeId);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-hh-black text-white px-6 py-4">
        <h1 className="font-display text-xl">Cyber Safe Hub</h1>
        <p className="text-xs text-white/50 font-body mt-0.5">
          Cyber Safety Project &middot; Hedgehog Marketing
        </p>
      </header>

      {/* Tab nav — driven by the modules registry */}
      <nav className="bg-white border-b border-black/10 px-6 flex gap-1 overflow-x-auto">
        {modules.map((m) => {
          const isActive = m.id === activeId;
          const isSoon = m.status === 'soon';
          return (
            <button
              key={m.id}
              onClick={() => !isSoon && setActiveId(m.id)}
              disabled={isSoon}
              className={`
                flex items-center gap-1.5 px-4 py-3 text-sm font-body font-medium whitespace-nowrap transition
                ${isActive ? 'border-b-2 border-hh-blue text-hh-black' : ''}
                ${isSoon ? 'text-black/30 cursor-not-allowed' : 'text-black/60 hover:text-hh-black'}
              `}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
              {isSoon && (
                <span className="text-[10px] uppercase tracking-wide bg-black/10 text-black/40 px-1.5 py-0.5 rounded-full ml-1">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Active module */}
      <main className="flex-1">
        {active ? <active.Component /> : null}
      </main>

      <footer className="text-center text-xs text-hh-black/40 font-body py-6">
        Hedgehog Marketing &middot; Cyber Safety Project
      </footer>
    </div>
  );
}
