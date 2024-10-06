import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { NavigationBar } from '@/components/sidebar'

const leaguageSpartan = League_Spartan({ subsets: ['vietnamese'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={leaguageSpartan.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <div className='flex bg-indigo-50 dark:bg-slate-900'>
            <NavigationBar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
