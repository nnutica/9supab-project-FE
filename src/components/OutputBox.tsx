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
        <label className="text-sm font-medium text-base-content/70">✅ ผลลัพธ์</label>
        {result?.convertedText && (
          <button
            onClick={handleCopy}
            className="btn btn-ghost btn-xs gap-1 text-accent hover:bg-accent/10 transition-colors"
          >
            {copied ? '✓ คัดลอกแล้ว' : '📋 Copy'}
          </button>
        )}
      </div>

      <div className="relative h-64 rounded-xl border-2 border-base-300 bg-white p-4 overflow-auto">
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
          <p className="text-base-content leading-relaxed whitespace-pre-wrap animate-fade-in">
            {result.convertedText}
          </p>
        ) : (
          <p className="text-base-content/30 italic text-center mt-20">
            ผลลัพธ์จะแสดงที่นี่ หลังจากท่านกด &quot;เรียกนายสุภาพ&quot;
          </p>
        )}
      </div>
    </div>
  );
}
