'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClientOnly } from '@/hooks/useAuth';
import { AuthService } from '@/lib/authService';

export default function Home() {
  const router = useRouter();
  const isClient = useClientOnly();

  useEffect(() => {
    if (!isClient) return;
    
    // Check if user is authenticated (only on client side)
    const authState = AuthService.getAuthState();
    
    if (authState.isAuthenticated) {
      // Verify token is still valid
      AuthService.verifyToken()
        .then(({ valid }) => {
          if (valid) {
            router.push('/dashboard');
          } else {
            router.push('/login');
          }
        })
        .catch(() => {
          router.push('/login');
        });
    } else {
      router.push('/login');
    }
  }, [router, isClient]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading ERP System...</p>
      </div>
    </div>
  );
}
