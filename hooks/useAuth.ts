'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(redirectTo?: string) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const authenticated = !!token;
        setIsAuthenticated(authenticated);
        
        if (redirectTo && !authenticated) {
          router.push(redirectTo);
        }
      } catch (error) {
        // Handle cases where localStorage is not available
        setIsAuthenticated(false);
        if (redirectTo) {
          router.push(redirectTo);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, [router, redirectTo]);

  return { isAuthenticated, isLoading };
}

export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
