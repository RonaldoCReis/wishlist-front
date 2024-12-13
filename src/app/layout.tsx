import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import NextTopLoader from 'nextjs-toploader';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Providers } from './providers';

import { fontSans } from '@/config/fonts';

export const metadata: Metadata = {
  title: {
    default: 'wishlist',
    template: `%s - $'wishlist'`,
  },
  description: 'A wishlist app',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextTopLoader />
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <ReactQueryDevtools position="right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
