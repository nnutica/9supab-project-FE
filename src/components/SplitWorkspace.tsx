'use client';

import { useCallback } from 'react';
import { AppMode, AiResponse, RecipientType, FormalityLevel } from '@/types';
import OutputBox from './OutputBox';

interface Props {
  mode: AppMode;
  loading: boolean;
  result: AiResponse | null;
  rawText: string;
  onRawTextChange: (v: string) => void;
  recipient: RecipientType;
  onRecipientChange: (v: RecipientType) => void;
  formality: FormalityLevel;
  onFormalityChange: (v: FormalityLevel) => void;
  jobDescription: string;
  onJobDescriptionChange: (v: string) => void;
  resumeText: string;
  onResumeTextChange: (v: string) => void;
  resumeFileName: string;
  onResumeFileNameChange: (v: string) => void;
  onSubmit: () => void;
}

export default function SplitWorkspace({
  mode, loading, result,
  rawText, onRawTextChange,
  recipient, onRecipientChange,
  formality, onFormalityChange,
  jobDescription, onJobDescriptionChange,
  resumeText, onResumeTextChange,
  resumeFileName, onResumeFileNameChange,
  onSubmit,
}: Props) {

  /* PDF parsing ฝั่ง client ด้วย pdfjs-dist */
  const handlePdfUpload = useCallback(async (file: File) => {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ');
        fullText += pageText + '\n';
      }

      onResumeTextChange(fullText.trim());
      onResumeFileNameChange(file.name);
    } catch (err) {
      console.error('PDF parse error:', err);
    }
  }, [onResumeTextChange, onResumeFileNameChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') handlePdfUpload(file);
  }, [handlePdfUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handlePdfUpload(file);
  }, [handlePdfUpload]);

  return (
    <div>
      {/* === Context Selectors === */}
      {mode === 'refiner' ? (
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-base-content/70 mb-1.5">
              ผู้รับคือใคร
            </label>
            <select
              value={recipient}
              onChange={(e) => onRecipientChange(e.target.value as RecipientType)}
              className="select select-bordered w-full bg-white"
            >
              <option value="boss">👔 หัวหน้า / ผู้บังคับบัญชา</option>
              <option value="professor">🎓 อาจารย์</option>
              <option value="client">🤝 ลูกค้า / พาร์ทเนอร์</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-base-content/70 mb-1.5">
              ระดับความทางการ
            </label>
            <select
              value={formality}
              onChange={(e) => onFormalityChange(e.target.value as FormalityLevel)}
              className="select select-bordered w-full bg-white"
            >
              <option value="semi-formal">📝 กึ่งทางการ</option>
              <option value="formal">📜 ทางการมาก</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-base-content/70 mb-1.5">
              Job Description (JD)
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => onJobDescriptionChange(e.target.value)}
              placeholder="วาง Job Description ที่ต้องการสมัครตรงนี้..."
              className="input-supab h-32"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-base-content/70 mb-1.5">
              Resume / CV (PDF)
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="h-32 border-2 border-dashed border-base-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent hover:bg-accent/5 transition-all"
              onClick={() => document.getElementById('pdf-input')?.click()}
            >
              {resumeFileName ? (
                <>
                  <span className="text-2xl">📄</span>
                  <span className="text-sm text-base-content/70">{resumeFileName}</span>
                  <span className="text-xs text-success">อัปโหลดสำเร็จ ✓</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">📁</span>
                  <span className="text-sm text-base-content/50">ลากไฟล์มาวาง หรือ คลิกเพื่อเลือก</span>
                  <span className="text-xs text-base-content/30">รองรับเฉพาะ .pdf</span>
                </>
              )}
            </div>
            <input
              id="pdf-input"
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* === Split Workspace: Input + Output === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Input Box */}
        <div>
          <label className="block text-sm font-medium text-base-content/70 mb-1.5">
            {mode === 'refiner' ? '📝 ข้อความดิบ' : '📝 ข้อมูลเพิ่มเติม (ถ้ามี)'}
          </label>
          <textarea
            value={rawText}
            onChange={(e) => onRawTextChange(e.target.value)}
            placeholder={
              mode === 'refiner'
                ? 'พิมพ์ไอเดียห้วนๆ ของท่านตรงนี้...'
                : 'เพิ่มรายละเอียดที่อยากเน้นใน Cover Letter...'
            }
            className="input-supab h-64"
          />
        </div>

        {/* Right - Output Box */}
        <OutputBox loading={loading} result={result} />
      </div>

      {/* === Action Button === */}
      <div className="flex justify-center mt-6">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="btn-accent-glow text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              กำลังประมวลผล...
            </>
          ) : (
            <>เรียกนายสุภาพ ✨</>
          )}
        </button>
      </div>
    </div>
  );
}
