'use client';

import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import MainHub from '@/components/MainHub';
import HistoryDrawer from '@/components/HistoryDrawer';
import LoginScreen from '@/components/LoginScreen';

export default function Home() {
  const { user, loading } = useAuth();

  /* Loading state */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ps-canvas-dark">
        <span className="loading loading-spinner loading-lg text-ps-blue"></span>
      </div>
    );
  }

  /* ยังไม่ login */
  if (!user) return <LoginScreen />;

  /* Dashboard หลัก */
  return (
    <div className="min-h-screen bg-ps-canvas-dark">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <MainHub />
      </main>
      <HistoryDrawer />
    </div>
  );
}
