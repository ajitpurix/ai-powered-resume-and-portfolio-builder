'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-neutral-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <Link href="/">
            <span className="text-4xl font-bold text-red-600 cursor-pointer">Visioon AI</span>
          </Link>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-red-800 hover:bg-red-900',
                card: 'bg-neutral-800 border border-red-900/30',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-300',
                formFieldLabel: 'text-gray-300',
                formFieldInput: 'bg-neutral-700 border-red-900/30 text-white',
                footerActionLink: 'text-red-500 hover:text-red-400',
                socialButtonsBlockButton: 'border-red-900/30 text-white',
                socialButtonsBlockButtonArrow: 'text-red-600',
                socialButtonsBlockButtonText: 'text-white',
                dividerLine: 'bg-red-900/30',
                dividerText: 'text-gray-300'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
} 