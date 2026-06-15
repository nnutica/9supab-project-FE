'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './Logo';

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
    <div className="min-h-screen flex items-center justify-center bg-ps-canvas-dark p-4 font-sans">
      <div className="bg-ps-surface-dark p-10 max-w-md w-full rounded-md animate-slide-up border border-white/5 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Logo width={200} height={60} className="w-full max-w-[200px] h-auto" />
        </div>

        {/* Form Title */}
        <h2 className="text-[28px] font-light text-white mb-8 tracking-[0.1px]">
          {isSignUp ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
        </h2>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-sm bg-[#c81b3a]/10 border border-[#c81b3a]/30 text-[#c81b3a] text-sm text-left">
            {error}
          </div>
        )}

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left mb-6">
          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-white text-black rounded-sm px-4 py-3 h-12 text-[18px] focus:outline-none focus:ring-2 focus:ring-ps-blue placeholder-black/60"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white text-black rounded-sm px-4 py-3 h-12 text-[18px] focus:outline-none focus:ring-2 focus:ring-ps-blue placeholder-black/60"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ps-blue hover:bg-ps-blue-pressed text-white rounded-full h-12 px-7 font-bold text-[18px] tracking-[0.45px] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : isSignUp ? (
              'Sign Up'
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Toggle Mode Link */}
        <div className="text-left mb-8">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-ps-link-dark hover:underline text-[18px] focus:outline-none"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Create New Account'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        {/* Google Sign-in Button */}
        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 rounded-full h-12 px-7 font-bold text-[18px] tracking-[0.45px] hover:bg-white/5 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
