interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  profilePhoto?: string;
  emailVerified?: string;
  createdAt: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export class AuthService {
  
  /**
   * Get current authentication state
   */
  static getAuthState(): AuthState {
    if (typeof window === 'undefined') {
      return { token: null, user: null, isAuthenticated: false };
    }

    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    return {
      token,
      user,
      isAuthenticated: !!(token && user),
    };
  }

  /**
   * Set authentication data
   */
  static setAuth(token: string, user: User, rememberMe: boolean = false): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Set cookie with appropriate expiry
    const maxAge = rememberMe ? 86400 * 30 : 86400; // 30 days or 1 day
    document.cookie = `authToken=${token}; path=/; max-age=${maxAge}; SameSite=Strict`;
  }

  /**
   * Clear authentication data
   */
  static clearAuth(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }

  /**
   * Get authorization header for API calls
   */
  static getAuthHeader(): Record<string, string> {
    const { token } = this.getAuthState();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  /**
   * Check if user has specific role
   */
  static hasRole(requiredRole: string): boolean {
    const { user } = this.getAuthState();
    return user?.role === requiredRole;
  }

  /**
   * Check if user is admin
   */
  static isAdmin(): boolean {
    return this.hasRole('admin');
  }

  /**
   * Login user
   */
  static async login(email: string, password: string, rememberMe: boolean = false): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        this.setAuth(result.token, result.user, rememberMe);
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      const authHeader = this.getAuthHeader();
      
      // Call logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: authHeader,
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local auth data
      this.clearAuth();
    }
  }

  /**
   * Verify current token
   */
  static async verifyToken(): Promise<{ valid: boolean; user?: User }> {
    try {
      const authHeader = this.getAuthHeader();
      
      if (!authHeader.Authorization) {
        return { valid: false };
      }

      const response = await fetch('/api/auth/me', {
        headers: authHeader,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update user data in localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        return { valid: true, user: result.user };
      } else {
        // Token is invalid, clear auth data
        this.clearAuth();
        return { valid: false };
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return { valid: false };
    }
  }
}
