# Role-Based Access Control (RBAC) System

This project implements a comprehensive role-based access control system with fine-grained permissions. The system provides both server-side and client-side authorization capabilities.

## 📁 File Structure

```
lib/
├── config/
│   └── roles.ts              # Main configuration file with roles and permissions
├── utils/
│   └── permissions.ts        # Utility functions for permission management
├── auth.ts                   # Server-side authentication middleware
└── authService.ts            # Client-side authentication service

hooks/
└── usePermissions.ts         # React hooks for permission checking

components/
├── guards/
│   └── PermissionGuards.tsx  # React components for conditional rendering
└── examples/
    └── PermissionExamples.tsx # Example usage components

middleware.ts                 # Next.js middleware for route protection
```

## 🔐 Roles

The system defines 2 simple roles:

1. **Admin** (`admin`) - Full system access
2. **User** (`user`) - Basic dashboard access

Each role has explicitly defined permissions without inheritance.

## 🎯 Permission Categories

Permissions are organized into simple categories:

- **Dashboard**: `dashboard:view`, `dashboard:admin`
- **Users**: `user:manage`
- **Settings**: `settings:manage`

## 🚀 Usage Examples

### Server-Side API Protection

```typescript
import { requirePermission } from '@/lib/auth';
import { PERMISSIONS } from '@/lib/config/roles';

export async function GET(request: NextRequest) {
  // Check specific permission
  const authResult = requirePermission(request, PERMISSIONS.USER_MANAGE);
  if ('error' in authResult) {
    return authResult.error;
  }
  
  // Your API logic here
}
```

### Client-Side Permission Checking

```tsx
import { usePermissions } from '@/hooks/usePermissions';
import { PermissionGuard } from '@/components/guards/PermissionGuards';
import { PERMISSIONS } from '@/lib/config/roles';

function MyComponent() {
  const { hasPermission } = usePermissions();

  return (
    <div>
      {/* Conditional rendering with hooks */}
      {hasPermission(PERMISSIONS.USER_MANAGE) && (
        <button>Manage Users</button>
      )}

      {/* Conditional rendering with components */}
      <PermissionGuard 
        permission={PERMISSIONS.USER_MANAGE}
        fallback={<div>No permission to manage users</div>}
      >
        <button>Manage Users</button>
      </PermissionGuard>
    </div>
  );
}
```

### Route Protection with Guards

```tsx
import { AdminGuard, AuthGuard } from '@/components/guards/PermissionGuards';

function AdminPage() {
  return (
    <AuthGuard fallback={<div>Please log in</div>}>
      <AdminGuard fallback={<div>Admin access required</div>}>
        <h1>Admin Dashboard</h1>
        {/* Admin content */}
      </AdminGuard>
    </AuthGuard>
  );
}
```

## 🛡️ Available Guard Components

- `<AuthGuard>` - Requires authentication
- `<GuestGuard>` - Only for non-authenticated users
- `<RoleGuard role="admin">` - Requires specific role
- `<AnyRoleGuard roles={['admin', 'manager']}>` - Requires any of the specified roles
- `<AdminGuard>` - Requires admin or super_admin role
- `<PermissionGuard permission="user:view">` - Requires specific permission
- `<AnyPermissionGuard permissions={['user:view', 'user:edit']}>` - Requires any permission
- `<AllPermissionsGuard permissions={['user:view', 'user:edit']}>` - Requires all permissions
- `<RouteGuard route="/admin">` - Checks route-specific permissions

## 🔧 Available Hooks

### `usePermissions()`
```typescript
const {
  permissions,           // Array of user's permissions
  hasPermission,         // Function to check single permission
  hasAnyPermission,      // Function to check any of multiple permissions
  hasAllPermissions,     // Function to check all permissions
  canAccessRoute,        // Function to check route access
  role,                  // User's current role
  isLoading,            // Loading state
} = usePermissions();
```

### `useRole(requiredRole)`
```typescript
const { hasRole, role, isLoading } = useRole(ROLES.ADMIN);
```

### `useIsAdmin()`
```typescript
const { isAdmin, role, isLoading } = useIsAdmin();
```

### `useIsAuthenticated()`
```typescript
const { isAuthenticated, user, isLoading } = useIsAuthenticated();
```

## 🌐 Middleware Protection

The system includes Next.js middleware for automatic route protection:

```typescript
// middleware.ts automatically protects these routes:
const PROTECTED_ROUTES = {
  '/dashboard': 'dashboard:view',
  '/users': 'user:view',
  '/admin': 'dashboard:admin',
  '/settings': 'settings:view',
  '/reports': 'reports:view',
  '/profile': 'profile:view',
};
```

## 🔧 Configuration

### Adding New Permissions

1. Add to `PERMISSIONS` object in `lib/config/roles.ts`:
```typescript
export const PERMISSIONS = {
  // ... existing permissions
  NEW_FEATURE_VIEW: 'feature:view',
  NEW_FEATURE_EDIT: 'feature:edit',
} as const;
```

2. Add to role permissions:
```typescript
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // ... existing permissions
    PERMISSIONS.NEW_FEATURE_VIEW,
    PERMISSIONS.NEW_FEATURE_EDIT,
  ],
  // ... other roles
};
```

3. Add user-friendly names:
```typescript
export const PERMISSION_NAMES = {
  // ... existing names
  [PERMISSIONS.NEW_FEATURE_VIEW]: 'View New Feature',
  [PERMISSIONS.NEW_FEATURE_EDIT]: 'Edit New Feature',
} as const;
```

### Adding New Roles

1. Add to `ROLES` object:
```typescript
export const ROLES = {
  // ... existing roles
  MODERATOR: 'moderator',
} as const;
```

2. Define permissions for the new role:
```typescript
export const ROLE_PERMISSIONS = {
  // ... existing roles
  [ROLES.MODERATOR]: [
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_EDIT,
    // ... other permissions
  ],
};
```

3. Add user-friendly names:
```typescript
export const PERMISSION_NAMES = {
  // ... existing names
  [PERMISSIONS.NEW_FEATURE_VIEW]: 'View New Feature',
  [PERMISSIONS.NEW_FEATURE_EDIT]: 'Edit New Feature',
} as const;
```

## 🚨 Error Handling

The system provides specific error messages for different authorization failures:

- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- Specific permission error messages in API responses

## 🧪 Testing Permissions

Use the example component at `/components/examples/PermissionExamples.tsx` to test the permission system:

```typescript
import { ExamplePermissionUsage } from '@/components/examples/PermissionExamples';

// Add to any page to see permission system in action
<ExamplePermissionUsage />
```

## 🔄 Best Practices

1. **Principle of Least Privilege**: Assign minimum permissions necessary
2. **Use Permission Guards**: Prefer declarative permission checking with components
3. **Server-Side Validation**: Always validate permissions on the server
4. **Consistent Naming**: Follow the `category:action` naming convention
5. **Error Handling**: Provide meaningful error messages for permission failures

## 🛠️ Development Commands

```bash
# Test role configuration
npm run test:roles

# Generate permission matrix
npm run generate:permissions
```

This RBAC system provides a scalable foundation for managing user permissions across your Next.js application.
