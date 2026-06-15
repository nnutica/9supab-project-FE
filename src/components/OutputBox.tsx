'use client';

import { useState } from 'react';
import { AiResponse } from '@/types';

interface Props {
  loading: boolean;
  result: AiResponse | null;
}

export default function OutputBox({ loading, result }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result?.convertedText) return;
    await navigator.clipboard.writeText(result.convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-light text-white/70">✅ ผลลัพธ์</label>
        {result?.convertedText && (
          <button
            onClick={handleCopy}
            className="text-ps-link-dark hover:text-white transition-colors text-sm focus:outline-none"
          >
            {copied ? '✓ คัดลอกแล้ว' : '📋 Copy'}
          </button>
        )}
      </div>

      <div className="relative h-64 rounded-sm border border-white/20 bg-ps-surface-card p-4 overflow-auto">
        {loading ? (
          /* Skeleton Loading Animation */
          <div className="space-y-3">
            <div className="skeleton-supab h-4 w-full"></div>
            <div className="skeleton-supab h-4 w-5/6"></div>
            <div className="skeleton-supab h-4 w-4/6"></div>
            <div className="skeleton-supab h-4 w-full"></div>
            <div className="skeleton-supab h-4 w-3/6"></div>
            <div className="skeleton-supab h-4 w-5/6"></div>
            <div className="skeleton-supab h-4 w-2/6"></div>
          </div>
        ) : result ? (
          <p className="text-white leading-relaxed whitespace-pre-wrap animate-fade-in font-light">
            {result.convertedText}
          </p>
        ) : (
          <p className="text-white/30 italic text-center mt-20 font-light">
            ผลลัพธ์จะแสดงที่นี่ หลังจากท่านกด &quot;เรียกนายสุภาพ&quot;
          </p>
        )}
      </div>
    </div>
  );
}
