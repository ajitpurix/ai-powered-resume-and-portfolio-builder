'use client';

import { ReactNode } from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext';

interface AuthSessionProviderProps extends Partial<SessionProviderProps> {
  children: ReactNode;
}

export default function AuthSessionProvider({ 
  children,
  session,
  ...props
}: AuthSessionProviderProps) {
  return (
    <SessionProvider session={session} {...props}>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}