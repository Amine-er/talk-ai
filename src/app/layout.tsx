import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { TRPCReactProvider } from '@/trpc/client';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Talk AI',
  description: 'Connect Beyond Boundaries - AI-Powered Video Calling',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </TRPCReactProvider>
  );
}
