'use client';

import { useState } from 'react';

interface Props {
  explanation: string;
  alternatives: string[];
}

export default function ExtraInsight({ explanation, alternatives }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 space-y-3 animate-slide-up">
      {/* Explanation Block */}
      {explanation && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-light tracking-wide text-white mb-2 flex items-center gap-2">
            💡 คำอธิบายการปรับปรุง
          </h3>
          <p className="text-sm text-white/70 leading-relaxed font-light">{explanation}</p>
        </div>
      )}

      {/* Alternatives Accordion */}
      {alternatives.length > 0 && (
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors focus:outline-none"
          >
            <span className="text-sm font-light tracking-wide text-white flex items-center gap-2">
              🔄 ทางเลือกอื่น ({alternatives.length} แบบ)
            </span>
            <span className={`transition-transform duration-300 text-white/50 ${open ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {open && (
            <div className="px-4 pb-4 space-y-2 animate-fade-in">
              {alternatives.map((alt, i) => (
                <div
                  key={i}
                  className="p-3 rounded-sm bg-ps-surface-card border border-white/10 text-sm text-white/80 hover:border-ps-blue transition-colors cursor-pointer font-light"
                  onClick={() => navigator.clipboard.writeText(alt)}
                  title="คลิกเพื่อคัดลอก"
                >
                  <span className="text-xs text-ps-link-dark mr-2">#{i + 1}</span>
                  {alt}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
