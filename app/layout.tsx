import type { Metadata } from "next";
import { Geist, Geist_Mono, Quantico } from "next/font/google";
import "./globals.css";
import BearcatLogo from "@/components/BearcatLogo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quantico = Quantico({
  variable: "--font-quantico",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SBU Basketball - Seating Chart",
  description: "Interactive seating chart for SBU Basketball Arena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quantico.variable} antialiased`}
      >
        {/* SBU-Style Navigation Bar */}
        <nav className="bg-[#5B2C91] shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Main nav bar */}
            <div className="flex items-center justify-between py-6">
              {/* Logo and branding */}
              <a href="/" className="flex items-center space-x-3">
                <BearcatLogo className="h-16 w-auto" />
              </a>
              
              {/* Navigation links */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <a href="/" className="nav-link">
                  Seating Chart
                </a>
                <a href="/login" className="nav-link">
                  Admin Login
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
