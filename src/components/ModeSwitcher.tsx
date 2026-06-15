'use client';

import { AppMode } from '@/types';

interface Props {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
}

export default function ModeSwitcher({ mode, onChange }: Props) {
  return (
    <div className="flex border-b border-white/5 bg-ps-surface-dark">
      {/* Tab: นายขัดเกลา */}
      <button
        onClick={() => onChange('refiner')}
        className={`flex-1 py-4 px-6 text-center font-light tracking-wide transition-all duration-300 relative
          ${mode === 'refiner'
            ? 'text-white bg-ps-surface-card'
            : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
      >
        <span className="text-lg mr-2">🏷️</span>
        นายขัดเกลา
        <span className="block text-xs font-normal mt-0.5 opacity-60">Text Refiner</span>
        {mode === 'refiner' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ps-link-dark animate-fade-in" />
        )}
      </button>

      {/* Tab: นายสมัครงาน */}
      <button
        onClick={() => onChange('applicant')}
        className={`flex-1 py-4 px-6 text-center font-light tracking-wide transition-all duration-300 relative
          ${mode === 'applicant'
            ? 'text-white bg-ps-surface-card'
            : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
      >
        <span className="text-lg mr-2">💼</span>
        นายสมัครงาน
        <span className="block text-xs font-normal mt-0.5 opacity-60">Cover Letter</span>
        {mode === 'applicant' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ps-link-dark animate-fade-in" />
        )}
      </button>
    </div>
  );
}
