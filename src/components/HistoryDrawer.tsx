'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { HistoryRecord } from '@/types';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function HistoryDrawer() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  /* Realtime listener จาก Firestore */
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'history'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as HistoryRecord[];
      setHistory(records);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Toggle Button (มุมขวาล่าง) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-ps-blue hover:bg-ps-blue-pressed text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl text-xl transition-all"
        title="ประวัติการใช้งาน"
      >
        📜
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel (สไลด์จากขวา) */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-ps-surface-dark border-l border-white/5 shadow-2xl transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-light text-white tracking-wide">📜 ประวัติการแปลง</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/50 hover:text-white transition-colors focus:outline-none"
            >
              ✕
            </button>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {history.length === 0 ? (
              <p className="text-center text-white/40 mt-10 text-sm font-light">
                ยังไม่มีประวัติการใช้งาน
              </p>
            ) : (
              history.map((record) => (
                <div
                  key={record.id}
                  className="p-4 rounded-sm border border-white/10 bg-ps-surface-card hover:border-ps-blue hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleCopy(record.outputText, record.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-sm bg-ps-blue/20 text-ps-link-dark font-light">
                      {record.mode === 'refiner' ? '🏷️ ขัดเกลา' : '💼 สมัครงาน'}
                    </span>
                    <span className="text-xs text-white/40 font-light">
                      {record.createdAt.toLocaleDateString('th-TH')}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 line-clamp-2 mb-1 font-light">
                    {record.inputText}
                  </p>
                  <p className="text-sm text-white font-light line-clamp-2">
                    {record.outputText}
                  </p>
                  <span className="text-xs text-ps-link-dark opacity-0 group-hover:opacity-100 transition-opacity mt-1 block">
                    {copiedId === record.id ? '✓ คัดลอกแล้ว' : 'คลิกเพื่อคัดลอก'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
