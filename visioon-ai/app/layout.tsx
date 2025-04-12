import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from './providers/AuthSessionProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visioon AI | AI-Powered Resume & Portfolio",
  description: "Create professional resumes and portfolios using AI technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900`}
        >
          <AuthSessionProvider>
            <header className="flex justify-end items-center p-4 gap-4 h-16 bg-black border-b border-red-800">
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </header>
            {children}
          </AuthSessionProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
