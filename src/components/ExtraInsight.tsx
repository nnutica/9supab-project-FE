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
          <h3 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
            💡 คำอธิบายการปรับปรุง
          </h3>
          <p className="text-sm text-base-content/70 leading-relaxed">{explanation}</p>
        </div>
      )}

      {/* Alternatives Accordion */}
      {alternatives.length > 0 && (
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-full p-4 flex items-center justify-between hover:bg-base-200/30 transition-colors"
          >
            <span className="text-sm font-semibold text-primary flex items-center gap-2">
              🔄 ทางเลือกอื่น ({alternatives.length} แบบ)
            </span>
            <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {open && (
            <div className="px-4 pb-4 space-y-2 animate-fade-in">
              {alternatives.map((alt, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-base-200/50 text-sm text-base-content/80 hover:bg-base-200 transition-colors cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(alt)}
                  title="คลิกเพื่อคัดลอก"
                >
                  <span className="text-xs text-accent mr-2">#{i + 1}</span>
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
