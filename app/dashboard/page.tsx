'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClientOnly } from '@/hooks/useAuth';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  CreditCard,
  FileText,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle
} from 'lucide-react';
import config from '@/lib/config';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <div className="flex items-center mt-2">
            {changeType === 'increase' ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ml-1 ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
            <span className="text-sm text-muted-foreground ml-1">vs last month</span>
          </div>
        </div>
        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
    </Card>
  );
}

interface RecentActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'customer' | 'payment';
}

function RecentActivity() {
  const activities: RecentActivityItem[] = [
    {
      id: '3',
      title: 'Payment Received',
      description: 'Invoice #INV-5678 paid by ABC Corp - $15,000',
      time: '1 hour ago',
      type: 'payment',
    },
    {
      id: '4',
      title: 'New Customer',
      description: 'Jane Smith registered as a new customer',
      time: '2 hours ago',
      type: 'customer',
    },
    {
      id: '5',
      title: 'Payment Processed',
      description: 'Monthly subscription payment from TechCorp - $5,000',
      time: '3 hours ago',
      type: 'payment',
    },
    {
      id: '6',
      title: 'Customer Update',
      description: 'Mike Johnson updated his profile information',
      time: '4 hours ago',
      type: 'customer',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'customer':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  const router = useRouter();
  
  const actions = [
    {
      title: 'Add New Customer',
      description: 'Register a new customer in the system',
      icon: <Users className="h-6 w-6 text-primary" />,
      href: '/customers',
    },
    {
      title: 'Create Invoice',
      description: 'Generate a new invoice for customer',
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      href: '/finance/invoices/new',
    },
    {
      title: 'Process Payment',
      description: 'Handle customer payments and transactions',
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      href: '/finance/payments',
    },
    {
      title: 'Manage Settings',
      description: 'Configure system settings and preferences',
      icon: <Settings className="h-6 w-6 text-purple-600" />,
      href: '/settings',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex items-start space-x-3 p-4 h-auto justify-start hover:bg-muted"
              onClick={() => router.push(action.href)}
            >
              <div className="flex-shrink-0">{action.icon}</div>
              <div className="text-left">
                <h4 className="text-sm font-medium">{action.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const isClient = useClientOnly();

  useEffect(() => {
    if (!isClient) return;
    
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    }
  }, [router, isClient]);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,580',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: <DollarSign className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: 'Total Customers',
      value: '2,847',
      change: '+15.3%',
      changeType: 'increase' as const,
      icon: <Users className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: 'Monthly Payments',
      value: '1,245',
      change: '+8.7%',
      changeType: 'increase' as const,
      icon: <CreditCard className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: 'Active Invoices',
      value: '89',
      change: '+5.2%',
      changeType: 'increase' as const,
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening in your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Placeholder */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chart component would go here</p>
                  <p className="text-sm text-muted-foreground">Integrate with Chart.js or Recharts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* Quick Actions and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActions />
          
          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Low Stock Warning</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      5 products are running low on stock and need restocking.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Sales Trending Up</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your sales have increased by 15% compared to last month.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
