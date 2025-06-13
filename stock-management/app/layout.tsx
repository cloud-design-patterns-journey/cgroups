import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stock Management System",
  description: "A stock management system built with Next.js and GraphQL",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  )
}
