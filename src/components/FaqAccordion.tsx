'use client';

import { useState } from 'react';

interface FaqAccordionProps {
  items: { q: string; a: string }[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="card p-0 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-brand-card/70 transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-white pr-4">{item.q}</span>
            <span className={`flex-shrink-0 text-gold-400 text-xl font-light transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          {open === i && (
            <div className="px-6 pb-4 text-gray-300 text-sm leading-relaxed border-t border-brand-border pt-4">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
