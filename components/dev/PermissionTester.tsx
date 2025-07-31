'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthService } from '@/lib/authService';
import { ROLES, ROLE_NAMES } from '@/lib/config/roles';
import { useIsAuthenticated } from '@/hooks/usePermissions';

/**
 * Development component for testing permissions
 * This allows switching between different user roles to test permission behavior
 */
export function PermissionTester() {
  const { user, isLoading } = useIsAuthenticated();
  const [switching, setSwitching] = useState(false);

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  const switchRole = async (role: string) => {
    setSwitching(true);
    
    // Create mock user with the selected role
    const mockUser = {
      id: 1,
      name: role === ROLES.ADMIN ? 'Admin User' : 'Regular User',
      email: role === ROLES.ADMIN ? 'admin@example.com' : 'user@example.com',
      role: role,
      createdAt: new Date().toISOString(),
    };

    // Set the auth data
    AuthService.setAuth('mock-token', mockUser);
    
    // Small delay to show loading state
    setTimeout(() => {
      setSwitching(false);
      // Force page reload to update permissions
      window.location.reload();
    }, 500);
  };

  const logout = () => {
    AuthService.clearAuth();
    window.location.reload();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">Permission Tester (Dev Mode)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current Role:</span>
              <Badge variant="outline">
                {ROLE_NAMES[user.role as keyof typeof ROLE_NAMES] || user.role}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Switch to test permissions:</p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={switching || user.role === ROLES.ADMIN}
                  onClick={() => switchRole(ROLES.ADMIN)}
                >
                  {switching ? 'Switching...' : 'Admin'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={switching || user.role === ROLES.USER}
                  onClick={() => switchRole(ROLES.USER)}
                >
                  {switching ? 'Switching...' : 'User'}
                </Button>
              </div>
            </div>

            <Button 
              size="sm" 
              variant="destructive" 
              onClick={logout}
              className="w-full"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Not authenticated</p>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Login as:</p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  disabled={switching}
                  onClick={() => switchRole(ROLES.ADMIN)}
                >
                  {switching ? 'Logging in...' : 'Admin'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  disabled={switching}
                  onClick={() => switchRole(ROLES.USER)}
                >
                  {switching ? 'Logging in...' : 'User'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
