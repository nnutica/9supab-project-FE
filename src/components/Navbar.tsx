'use client';

import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-[#1E293B]/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white tracking-tight">๙สุภาพ</h1>
          <span className="hidden sm:block text-xs text-accent/80 border-l border-white/20 pl-3">
            AI Professional Communication Assistant
          </span>
        </div>

        {/* Right - User Profile */}
        <div className="flex items-center gap-3">
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full ring-2 ring-accent/50"
            />
          )}
          <span className="hidden sm:block text-white/80 text-sm font-medium">
            {user?.displayName}
          </span>
          <button
            onClick={logout}
            className="btn btn-ghost btn-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors text-xs"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </nav>
  );
}
