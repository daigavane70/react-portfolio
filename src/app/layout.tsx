import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vedant Daigavane - Portfolio',
  description: 'Vedant Daigavane, Software Development Engineer at Upstox',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' title='Vedant Daigavane - Portfolio'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
