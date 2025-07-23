'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import {
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import config from '@/lib/config';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    location: 'New York, NY',
    totalOrders: 24,
    totalSpent: 45680,
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (555) 987-6543',
    company: 'Creative Agency',
    location: 'Los Angeles, CA',
    totalOrders: 18,
    totalSpent: 32150,
    status: 'active',
    joinDate: '2024-02-20',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1 (555) 456-7890',
    company: 'Global Corp',
    location: 'Chicago, IL',
    totalOrders: 12,
    totalSpent: 28900,
    status: 'inactive',
    joinDate: '2024-03-10',
  },
];

function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {customer.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{customer.name}</h3>
            <p className="text-sm text-muted-foreground">{customer.company}</p>
          </div>
        </div>
        
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Mail className="h-4 w-4 mr-2" />
          {customer.email}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Phone className="h-4 w-4 mr-2" />
          {customer.phone}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {customer.location}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <p className="text-2xl font-bold">{customer.totalOrders}</p>
          <p className="text-sm text-muted-foreground">Total Orders</p>
        </div>
        <div>
          <p className="text-2xl font-bold">${customer.totalSpent.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Spent</p>
        </div>
      </div>
    </Card>
  );
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Customers</h1>
            <p className="text-muted-foreground mt-2">Manage your customer relationships and data</p>
          </div>
          <Button size="default">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-lg">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="p-6">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg">Total Customers</CardTitle>
            </CardHeader>
            <p className="text-3xl font-bold text-primary">
              {mockCustomers.length}
            </p>
          </Card>
          <Card className="p-6">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg">Active</CardTitle>
            </CardHeader>
            <p className="text-3xl font-bold text-green-600">
              {mockCustomers.filter(c => c.status === 'active').length}
            </p>
          </Card>
          <Card className="p-6">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg">Total Revenue</CardTitle>
            </CardHeader>
            <p className="text-3xl font-bold text-blue-600">
              ${mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </p>
          </Card>
          <Card className="p-6">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg">Avg. Order Value</CardTitle>
            </CardHeader>
            <p className="text-3xl font-bold text-purple-600">$2,847</p>
          </Card>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No customers found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
