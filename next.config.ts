import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* รองรับรูป profile จาก Google OAuth */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
