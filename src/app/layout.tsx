import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'CSP Tools — Cyber Safety Project',
  description: 'Client tools for Cyber Safety Project, by Hedgehog Marketing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`@keyframes cspblink{50%{opacity:0}}`}</style>
      </head>
      <body className="bg-hh-bg text-hh-black font-body min-h-screen">
        {children}
      </body>
    </html>
  );
}
