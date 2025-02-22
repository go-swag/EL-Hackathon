import AppShell from '@/components/shell/AppShell';
import { Inter } from 'next/font/google';
import './app.css';

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${interFont.className} bg-black-900 text-white`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
