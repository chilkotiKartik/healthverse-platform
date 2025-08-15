import type React from "react"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "HealthVerse AI - Your Recovery, Redefined",
  description:
    "A restorative healthcare ecosystem with AI companion, VR healing rooms, and personalized recovery plans",
  generator: "HealthVerse AI",
  keywords: ["healthcare", "AI", "recovery", "VR therapy", "family support", "wellness"],
  authors: [{ name: "HealthVerse AI Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable} antialiased`}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
