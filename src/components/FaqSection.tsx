'use client';

import { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  lang?: 'en' | 'te';
  title?: string;
}

export default function FaqSection({ faqs, lang = 'en', title }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(null);
  const isTE = lang === 'te';

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl sm:text-3xl font-black text-white mb-8 ${isTE ? 'font-telugu' : ''}`}>
          {title ?? (isTE ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Frequently Asked Questions')}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-dark-800 border border-gold-500/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-dark-700 ${isTE ? 'font-telugu' : ''}`}
                aria-expanded={open === i}
              >
                <span className="text-white font-semibold pr-4">{faq.question}</span>
                <span className={`flex-shrink-0 text-gold-400 text-xl transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className={`px-6 pb-4 text-gray-300 leading-relaxed border-t border-gold-500/10 pt-4 ${isTE ? 'font-telugu' : ''}`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
