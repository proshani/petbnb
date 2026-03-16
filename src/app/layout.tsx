import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Richmondhill Real Estate — Luxury Real Estate · GTA",
  description:
    "Richmondhill Real Estate — Million Dollar Award Winner 2025 & Trusted Realtor in the GTA. Luxury properties in Yorkville, Rosedale, Forest Hill, Bridle Path and beyond.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
