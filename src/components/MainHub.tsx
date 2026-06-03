'use client';

import { useState } from 'react';
import { AppMode, AiResponse, RecipientType, FormalityLevel } from '@/types';
import ModeSwitcher from './ModeSwitcher';
import SplitWorkspace from './SplitWorkspace';
import ExtraInsight from './ExtraInsight';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function MainHub() {
  const { user } = useAuth();
  const [mode, setMode] = useState<AppMode>('refiner');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiResponse | null>(null);

  /* Refiner state */
  const [rawText, setRawText] = useState('');
  const [recipient, setRecipient] = useState<RecipientType>('boss');
  const [formality, setFormality] = useState<FormalityLevel>('formal');

  /* Applicant state */
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');

  /* เรียก API: Text Refiner */
  const handleRefine = async () => {
    if (!rawText.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/ai/refine-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText, recipient, formality }),
      });
      const data: AiResponse = await res.json();
      setResult(data);

      if (data.status === 'success' && user) {
        await addDoc(collection(db, 'history'), {
          userId: user.uid,
          mode: 'refiner',
          inputText: rawText,
          outputText: data.convertedText,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('Refine error:', err);
      setResult({
        status: 'error',
        convertedText: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
        explanation: '',
        alternatives: [],
      });
    } finally {
      setLoading(false);
    }
  };

  /* เรียก API: Cover Letter */
  const handleCoverLetter = async () => {
    if (!jobDescription.trim() || !resumeText.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/ai/generate-cover-letter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, resumeText, additionalInfo: rawText }),
      });
      const data: AiResponse = await res.json();
      setResult(data);

      if (data.status === 'success' && user) {
        await addDoc(collection(db, 'history'), {
          userId: user.uid,
          mode: 'applicant',
          inputText: `Job: ${jobDescription.substring(0, 50)}... | Resume: ${resumeFileName || 'Uploaded Resume'}`,
          outputText: data.convertedText,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('Cover letter error:', err);
      setResult({
        status: 'error',
        convertedText: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
        explanation: '',
        alternatives: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (mode === 'refiner') handleRefine();
    else handleCoverLetter();
  };

  return (
    <div className="animate-fade-in">
      <div className="glass-card overflow-hidden">
        {/* Mode Switcher */}
        <ModeSwitcher mode={mode} onChange={setMode} />

        {/* Context + Workspace */}
        <div className="p-6">
          <SplitWorkspace
            mode={mode}
            loading={loading}
            result={result}
            rawText={rawText}
            onRawTextChange={setRawText}
            recipient={recipient}
            onRecipientChange={setRecipient}
            formality={formality}
            onFormalityChange={setFormality}
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            resumeText={resumeText}
            onResumeTextChange={setResumeText}
            resumeFileName={resumeFileName}
            onResumeFileNameChange={setResumeFileName}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* Extra Insight (แสดงหลังได้ผลลัพธ์) */}
      {result && result.status === 'success' && (
        <ExtraInsight explanation={result.explanation} alternatives={result.alternatives} />
      )}
    </div>
  );
}
