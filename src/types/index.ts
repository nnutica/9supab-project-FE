/* AI Response จาก Backend */
export interface AiResponse {
  status: 'success' | 'error';
  convertedText: string;
  explanation: string;
  alternatives: string[];
}

/* Payload สำหรับ Text Refiner */
export interface RefineTextPayload {
  rawText: string;
  recipient: RecipientType;
  formality: FormalityLevel;
}

/* Payload สำหรับ Cover Letter */
export interface CoverLetterPayload {
  jobDescription: string;
  resumeText: string;
}

export type RecipientType = 'boss' | 'professor' | 'client';
export type FormalityLevel = 'semi-formal' | 'formal';
export type AppMode = 'refiner' | 'applicant';

/* Firestore History Record */
export interface HistoryRecord {
  id: string;
  mode: AppMode;
  inputText: string;
  outputText: string;
  createdAt: Date;
  userId: string;
}

/* User Profile จาก Firebase Auth */
export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}
