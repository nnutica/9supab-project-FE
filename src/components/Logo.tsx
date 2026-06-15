import React from 'react';

interface LogoProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export default function Logo({ className = '', width = '100%', height = '100%' }: LogoProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 400 120" 
      width={width} 
      height={height}
      className={className}
    >
      <defs>
        {/* ไล่เฉดสีเพิ่มมิติความพรีเมียม (ปรับสีสว่างขึ้นเพื่อแสดงผลบนสีเข้มได้สวยงาม) */}
        <linearGradient id="supabGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" /> {/* Sky Blue */}
          <stop offset="60%" stopColor="#6366F1" /> {/* Indigo */}
          <stop offset="100%" stopColor="#34D399" /> {/* Mint Green */}
        </linearGradient>
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>

      {/* ICON: ดีไซน์เลข ๙ สไตล์มินิมอลโมเดิร์น */}
      <g transform="translate(10, 10)">
        {/* วงกลมฐานของเลข ๙ */}
        <circle cx="45" cy="55" r="14" fill="none" stroke="url(#supabGradient)" strokeWidth="8" strokeLinecap="round"/>
        
        {/* หางของเลข ๙ ที่ตวัดขึ้นเป็นรูปคลื่นและปลายปากกา */}
        <path d="M 45 41 
                 C 45 20, 75 15, 75 38 
                 C 75 55, 55 75, 85 85 
                 C 100 90, 105 70, 105 50" 
              fill="none" 
              stroke="url(#supabGradient)" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeLinejoin="round"/>
              
        {/* ประกายไอคอน AI (Sparkle ✨) แสดงความฉลาด */}
        <path d="M 105 25 Q 112 25 112 18 Q 112 25 119 25 Q 112 25 112 32 Q 112 25 105 25 Z" fill="url(#sparkleGradient)" />
        <path d="M 118 42 Q 122 42 122 38 Q 122 42 126 42 Q 122 42 122 46 Q 122 42 118 42 Z" fill="url(#sparkleGradient)" />
      </g>

      {/* TEXT: ตัวอักษรโลโก้ */}
      {/* คำว่า 9Supab */}
      <text x="155" y="65" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="42" fill="#FFFFFF" letterSpacing="-1">
        9<tspan fill="url(#supabGradient)">Supab</tspan>
      </text>
      
      {/* สโลแกนเล็ก ๆ ด้านล่าง */}
      <text x="157" y="88" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500" fontSize="13" fill="#94A3B8" letterSpacing="1.5">
        AI REFINER & CAREER ASSISTANT
      </text>
    </svg>
  );
}
