import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LunchAOS - Lunch Rating & Feedback System',
  description: 'Rate your lunch experience, share feedback, and discover the best lunch spots in your building.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
} 