import { Inter } from 'next/font/google'

import '../../globals.css'
import HomeHeader from '@/components/layout/header'

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

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
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}
