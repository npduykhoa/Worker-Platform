import { League_Spartan } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { NavigationBar } from '@/components/sidebar';
import AppProvider from '@/providers/app-provider';
import { Toaster } from '@/components/ui/toaster';

const leaguageSpartan = League_Spartan({ subsets: ['vietnamese'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={leaguageSpartan.className}>
        <AppProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <div className='flex bg-indigo-50 dark:bg-slate-900 overflow-x-hidden'>
              <NavigationBar />
              {children}
              <Toaster />
            </div>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
