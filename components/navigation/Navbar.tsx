'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePermissions } from '@/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/config/permissions';
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  DollarSign,
  CreditCard,
  FileText,
  Settings,
  Shield,
  HelpCircle,
  ChevronDown,
  X,
  Building,
  FormInput,
  Table,
} from 'lucide-react';
import config from '@/lib/config';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  permission?: string; // Permission required to access this nav item
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface NavbarProps {
  sidebarCollapsed: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ sidebarCollapsed, sidebarOpen, setSidebarOpen }: NavbarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set([0, 1, 2])); // All groups expanded by default
  const router = useRouter();
  const pathname = usePathname();
  const { hasPermission } = usePermissions();

  // Dashboard item - standalone outside groups
  const dashboardItem: NavItem = {
    icon: <Home className="h-4 w-4" />,
    label: 'Dashboard',
    href: '/dashboard',
    // No permission required for dashboard - accessible to all users
  };

  const menuGroups: NavGroup[] = [
    {
      title: "Customers",
      items: [
        {
          icon: <Users className="h-4 w-4" />,
          label: 'All Customers',
          href: '/customers',
          permission: PERMISSIONS.USER_VIEW, // Requires user view permission
        },
        {
          icon: <MessageSquare className="h-4 w-4" />,
          label: 'Communications',
          href: '/communications',
          permission: PERMISSIONS.USER_VIEW, // Requires user view permission
        },
        {
          icon: <Calendar className="h-4 w-4" />,
          label: 'Appointments',
          href: '/appointments',
          permission: PERMISSIONS.USER_VIEW, // Requires user view permission
        },
      ].filter(item => !item.permission || hasPermission(item.permission))
    },
    {
      title: "UI",
      items: [        
        {
          icon: <Table className="h-4 w-4" />,
          label: 'Table',
          href: '/table',
          permission: PERMISSIONS.USER_VIEW, // Requires user view permission
        },
        {
          icon: <FormInput className="h-4 w-4" />,
          label: 'Form',
          href: '/form',
          permission: PERMISSIONS.USER_CREATE, // Requires user create permission
        },
        {
          icon: <Building className="h-4 w-4" />,
          label: 'Elements',
          href: '/elements',
          // No permission required - accessible to all users
        },        
      ].filter(item => !item.permission || hasPermission(item.permission))
    },
    {
      title: "Finance",
      items: [
        {
          icon: <DollarSign className="h-4 w-4" />,
          label: 'Accounting',
          href: '/finance/accounts',
          permission: PERMISSIONS.ADMIN_FULL_ACCESS, // Requires admin access
        },
        {
          icon: <CreditCard className="h-4 w-4" />,
          label: 'Payments',
          href: '/finance/payments',
          permission: PERMISSIONS.ADMIN_FULL_ACCESS, // Requires admin access
        },
        {
          icon: <FileText className="h-4 w-4" />,
          label: 'Tax Management',
          href: '/finance/tax',
          permission: PERMISSIONS.ADMIN_FULL_ACCESS, // Requires admin access
        },
      ].filter(item => !item.permission || hasPermission(item.permission))
    },
    {
      title: "Settings",
      items: [
        {
          icon: <Settings className="h-4 w-4" />,
          label: 'General',
          href: '/settings',
          permission: PERMISSIONS.USER_VIEW, // Basic settings for all users
        },
        {
          icon: <Shield className="h-4 w-4" />,
          label: 'Security',
          href: '/settings/security',
          permission: PERMISSIONS.ADMIN_FULL_ACCESS, // Security settings for admins only
        },
        {
          icon: <HelpCircle className="h-4 w-4" />,
          label: 'Support',
          href: '/support',
          // No permission required - support accessible to all users
        },
      ].filter(item => !item.permission || hasPermission(item.permission))
    },
  ].filter(group => group.items.length > 0);

  const toggleGroup = (groupIndex: number) => {
    setExpandedGroups(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(groupIndex)) {
        newExpanded.delete(groupIndex);
      } else {
        newExpanded.add(groupIndex);
      }
      return newExpanded;
    });
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href;
    const itemKey = item.label.toLowerCase().replace(/\s+/g, '-');

    return (
      <Button
        key={itemKey}
        variant={isActive ? "default" : "ghost"}
        className="w-full justify-start h-9 px-3 transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          if (item.href) {
            router.push(item.href);
            setSidebarOpen(false);
          }
        }}
      >
        {!sidebarCollapsed && (
          <>
            <span className="flex items-center gap-2 flex-1">
              {item.icon}
              <span className="truncate text-left">{item.label}</span>
            </span>
            {item.badge && (
              <Badge variant="secondary" className="ml-2 text-xs flex-shrink-0">
                {item.badge}
              </Badge>
            )}
          </>
        )}
        {sidebarCollapsed && (
          <span className="flex items-center justify-center w-full">
            {item.icon}
          </span>
        )}
      </Button>
    );
  };

  const sidebarWidth = sidebarCollapsed 
    ? 'w-16' 
    : 'w-64';
  const headerHeight = 'h-16';
  const padding = 'p-4';

  return (
    <div className={`fixed inset-y-0 left-0 z-50 ${sidebarWidth} bg-card border-r transform ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col min-h-screen`}>
      
      {/* Logo */}
      <div className={`flex items-center justify-between ${headerHeight} ${padding} border-b flex-shrink-0`}>
        {!sidebarCollapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Building className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="ml-2 text-lg font-bold truncate">
              {config.app.name}
            </span>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="flex items-center justify-center w-full">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Building className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className={`mt-2 ${sidebarCollapsed ? 'px-2' : padding} space-y-4 overflow-y-auto flex-1`}>
        {/* Dashboard - standalone item */}
        <div className="space-y-1">
          {renderNavItem(dashboardItem)}
        </div>
        
        {/* Separator */}
        {!sidebarCollapsed && (
          <div className="border-t border-border"></div>
        )}
        
        {/* Navigation Groups */}
        {menuGroups.map((group, groupIndex) => {
          return (
            <div key={groupIndex} className="space-y-2">
              {!sidebarCollapsed && (
                <Button
                  variant="ghost"
                  className="w-full justify-between px-2 h-auto py-2"
                  onClick={() => toggleGroup(groupIndex)}
                >
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.title}
                  </h3>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${expandedGroups.has(groupIndex) ? 'rotate-0' : '-rotate-90'}`} />
                </Button>
              )}
              {(sidebarCollapsed || expandedGroups.has(groupIndex)) && (
                <div className="space-y-1">
                  {group.items.map((item) => renderNavItem(item))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
