import { Inter } from 'next/font/google'

import '../../globals.css'
import HomeHeader from '@/components/layout/header'

import "bootstrap/dist/css/bootstrap.min.css"


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <HomeHeader/>
        </header>
        {children}
      </body>
    </html>
  )
}
