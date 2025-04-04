'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext';

export default function AuthSessionProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
} 