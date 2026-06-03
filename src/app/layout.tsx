import type { Metadata } from 'next';
import { Inter, Noto_Sans_Thai } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  variable: '--font-noto-thai',
});

export const metadata: Metadata = {
  title: '๙สุภาพ | AI Professional Communication Assistant',
  description: 'แปลงข้อความธรรมดาให้กลายเป็นภาษาทางการระดับมืออาชีพ พร้อมระบบสร้าง Cover Letter อัจฉริยะ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" data-theme="supab">
      <body className={`${inter.variable} ${notoSansThai.variable} font-sans min-h-screen antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
