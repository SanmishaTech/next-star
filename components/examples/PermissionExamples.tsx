'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PermissionGuard, 
  AdminGuard, 
  RoleGuard, 
  AnyPermissionGuard 
} from '@/components/guards/PermissionGuards';
import { ActionButtons } from '@/components/custom';
import { PERMISSIONS, ROLES } from '@/lib/config/roles';
import { usePermissions, useIsAuthenticated } from '@/hooks/usePermissions';
import { Plus, Settings, Eye, Edit, Trash2 } from 'lucide-react';

/**
 * Example component demonstrating various permission patterns
 * This shows how to implement role-based access control using the permission system
 */
export function PermissionExamples() {
  const { permissions, hasPermission, role } = usePermissions();
  const { user, isAuthenticated } = useIsAuthenticated();

  const handleAction = (action: string, id?: number) => {
    alert(`${action} ${id ? `item ${id}` : 'action performed'}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Permission System Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Current User Info */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Current User Status</h3>
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>User:</strong> {user.name} ({user.email})
                </p>
                <p className="text-sm">
                  <strong>Role:</strong> <Badge variant="outline">{role}</Badge>
                </p>
                <p className="text-sm">
                  <strong>Permissions:</strong> {permissions.join(', ')}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not authenticated</p>
            )}
          </div>

          {/* Basic Permission Guards */}
          <div>
            <h3 className="font-semibold mb-3">1. Basic Permission Guards</h3>
            <div className="flex gap-2 flex-wrap">
              
              <PermissionGuard 
                permission={PERMISSIONS.USER_VIEW}
                fallback={<Badge variant="secondary">View Hidden</Badge>}
              >
                <Button size="sm" variant="outline" onClick={() => handleAction('View')}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Users
                </Button>
              </PermissionGuard>

              <PermissionGuard 
                permission={PERMISSIONS.USER_EDIT}
                fallback={<Badge variant="secondary">Edit Hidden</Badge>}
              >
                <Button size="sm" variant="outline" onClick={() => handleAction('Edit')}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Users
                </Button>
              </PermissionGuard>

              <PermissionGuard 
                permission={PERMISSIONS.USER_DELETE}
                fallback={<Badge variant="secondary">Delete Hidden</Badge>}
              >
                <Button size="sm" variant="destructive" onClick={() => handleAction('Delete')}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Users
                </Button>
              </PermissionGuard>

              <PermissionGuard 
                permission={PERMISSIONS.USER_CREATE}
                fallback={<Badge variant="secondary">Create Hidden</Badge>}
              >
                <Button size="sm" onClick={() => handleAction('Create')}>
                  <Plus className="h-4 w-4 mr-1" />
                  Create User
                </Button>
              </PermissionGuard>

            </div>
          </div>

          {/* Role-based Guards */}
          <div>
            <h3 className="font-semibold mb-3">2. Role-based Guards</h3>
            <div className="flex gap-2 flex-wrap">
              
              <AdminGuard fallback={<Badge variant="secondary">Admin Only</Badge>}>
                <Button size="sm" variant="outline" onClick={() => handleAction('Admin Panel')}>
                  <Settings className="h-4 w-4 mr-1" />
                  Admin Panel
                </Button>
              </AdminGuard>

              <RoleGuard 
                role={ROLES.USER}
                fallback={<Badge variant="secondary">User Only</Badge>}
              >
                <Button size="sm" variant="outline" onClick={() => handleAction('User Dashboard')}>
                  User Dashboard
                </Button>
              </RoleGuard>

            </div>
          </div>

          {/* Multiple Permission Guards */}
          <div>
            <h3 className="font-semibold mb-3">3. Multiple Permission Guards</h3>
            <div className="flex gap-2 flex-wrap">
              
              <AnyPermissionGuard 
                permissions={[PERMISSIONS.USER_EDIT, PERMISSIONS.USER_DELETE]}
                fallback={<Badge variant="secondary">Edit or Delete Required</Badge>}
              >
                <Button size="sm" variant="outline" onClick={() => handleAction('Modify Users')}>
                  Modify Users
                </Button>
              </AnyPermissionGuard>

            </div>
          </div>

          {/* ActionButtons with Permissions */}
          <div>
            <h3 className="font-semibold mb-3">4. ActionButtons with Permission Control</h3>
            <div className="space-y-4">
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  With permission guards (buttons automatically hidden based on permissions):
                </p>
                <ActionButtons
                  id={1}
                  onView={hasPermission(PERMISSIONS.USER_VIEW) ? (id) => handleAction('View', id as number) : undefined}
                  onEdit={hasPermission(PERMISSIONS.USER_EDIT) ? (id) => handleAction('Edit', id as number) : undefined}
                  onDelete={hasPermission(PERMISSIONS.USER_DELETE) ? (id) => handleAction('Delete', id as number) : undefined}
                  confirmDeleteMessage="Are you sure you want to delete this item?"
                />
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Without permission guards (all buttons visible regardless of permissions):
                </p>
                <ActionButtons
                  id={2}
                  onView={(id) => handleAction('View', id as number)}
                  onEdit={(id) => handleAction('Edit', id as number)}
                  onDelete={(id) => handleAction('Delete', id as number)}
                  confirmDeleteMessage="Are you sure you want to delete this item?"
                />
              </div>

            </div>
          </div>

          {/* Programmatic Permission Checks */}
          <div>
            <h3 className="font-semibold mb-3">5. Programmatic Permission Checks</h3>
            <div className="space-y-2">
              <p className="text-sm">
                Can view users: <Badge variant={hasPermission(PERMISSIONS.USER_VIEW) ? "default" : "secondary"}>
                  {hasPermission(PERMISSIONS.USER_VIEW) ? "Yes" : "No"}
                </Badge>
              </p>
              <p className="text-sm">
                Can edit users: <Badge variant={hasPermission(PERMISSIONS.USER_EDIT) ? "default" : "secondary"}>
                  {hasPermission(PERMISSIONS.USER_EDIT) ? "Yes" : "No"}
                </Badge>
              </p>
              <p className="text-sm">
                Can delete users: <Badge variant={hasPermission(PERMISSIONS.USER_DELETE) ? "default" : "secondary"}>
                  {hasPermission(PERMISSIONS.USER_DELETE) ? "Yes" : "No"}
                </Badge>
              </p>
              <p className="text-sm">
                Can create users: <Badge variant={hasPermission(PERMISSIONS.USER_CREATE) ? "default" : "secondary"}>
                  {hasPermission(PERMISSIONS.USER_CREATE) ? "Yes" : "No"}
                </Badge>
              </p>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}