'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    if (password.length < 6) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('อีเมลนี้ถูกใช้งานแล้ว');
      } else if (err.code === 'auth/invalid-credential') {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      } else if (err.code === 'auth/invalid-email') {
        setError('รูปแบบอีเมลไม่ถูกต้อง');
      } else {
        setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] p-4">
      <div className="glass-card p-10 max-w-md w-full text-center animate-slide-up">
        {/* Logo */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">๙สุภาพ</h1>
          <p className="text-accent text-sm tracking-widest uppercase">
            AI Professional Communication Assistant
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-accent/40 mx-auto mb-6"></div>

        {/* Form Title */}
        <h2 className="text-xl font-semibold text-white mb-4">
          {isSignUp ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
        </h2>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm text-left">
            ⚠️ {error}
          </div>
        )}

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left mb-4">
          <div>
            <label className="label text-xs font-semibold text-white/70 uppercase">อีเมล</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@test.com"
              className="input input-bordered w-full bg-slate-900/50 text-white border-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="label text-xs font-semibold text-white/70 uppercase">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="input input-bordered w-full bg-slate-900/50 text-white border-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-accent-glow w-full mt-2 text-md font-semibold py-3 flex items-center justify-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : isSignUp ? (
              'สมัครสมาชิกด้วยอีเมล'
            ) : (
              'เข้าสู่ระบบด้วยอีเมล'
            )}
          </button>
        </form>

        {/* Toggle Mode Link */}
        <div className="text-sm mb-6">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-accent hover:underline focus:outline-none"
          >
            {isSignUp ? 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ' : 'ยังไม่มีบัญชี? สมัครสมาชิก'}
          </button>
        </div>

        {/* Divider with Text */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-4 text-white/40 text-xs uppercase">หรือ</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Google Sign-in Button */}
        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 text-white border border-white/10 bg-white/5 hover:bg-white/10 py-3 rounded-lg font-medium transition-all shadow-md active:scale-95 focus:outline-none"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          เข้าสู่ระบบด้วย Google
        </button>

        {/* Footer */}
        <p className="text-white/30 text-xs mt-8">
          Powered by Google Gemini AI
        </p>
      </div>
    </div>
  );
}
