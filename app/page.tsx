import './globals.css'
import { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'

export const metadata = {
  title: 'CiviPilot Pro',
  description: 'Field-first civil engineering toolkit'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
