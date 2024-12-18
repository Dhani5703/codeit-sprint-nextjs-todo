// import type { Metadata } from 'next';
import React from 'react';
import localFont from 'next/font/local';
import './globals.css';

// NanumSquareR 폰트 설정
const nanumSquareR = localFont({
  src: './fonts/NanumSquareR.otf', // 저장한 폰트 경로
  variable: '--font-nanum-square-r',
  weight: '100 900',
});

const nanumSquareB = localFont({
  src: './fonts/NanumSquareB.otf', // 저장한 폰트 경로
  variable: '--font-nanum-square-b',
  weight: '100 900', // 필요에 따라 조정
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nanumSquareR.variable} ${nanumSquareB.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
