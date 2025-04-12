'use client';

import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';

interface AuthSessionProviderProps {
  children: ReactNode;
}

export default function AuthSessionProvider({ 
  children 
}: AuthSessionProviderProps) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}