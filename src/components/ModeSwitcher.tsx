'use client';

import { AppMode } from '@/types';

interface Props {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
}

export default function ModeSwitcher({ mode, onChange }: Props) {
  return (
    <div className="flex border-b border-base-300">
      {/* Tab: นายขัดเกลา */}
      <button
        onClick={() => onChange('refiner')}
        className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 relative
          ${mode === 'refiner'
            ? 'text-primary bg-white'
            : 'text-base-content/50 hover:text-base-content/80 hover:bg-base-200/50'
          }`}
      >
        <span className="text-lg mr-2">🏷️</span>
        นายขัดเกลา
        <span className="block text-xs font-normal mt-0.5 opacity-60">Text Refiner</span>
        {mode === 'refiner' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent animate-fade-in" />
        )}
      </button>

      {/* Tab: นายสมัครงาน */}
      <button
        onClick={() => onChange('applicant')}
        className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 relative
          ${mode === 'applicant'
            ? 'text-primary bg-white'
            : 'text-base-content/50 hover:text-base-content/80 hover:bg-base-200/50'
          }`}
      >
        <span className="text-lg mr-2">💼</span>
        นายสมัครงาน
        <span className="block text-xs font-normal mt-0.5 opacity-60">Cover Letter</span>
        {mode === 'applicant' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent animate-fade-in" />
        )}
      </button>
    </div>
  );
}
