'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { SortableHeader, ViewButton, EditButton, DeleteButton, ButtonGroup, TablePagination, SearchInput } from "@/components/custom";
import { formatDateTime, formatAmount, formatDate } from '@/lib/locale-utils';
import { toast } from "@/hooks/useToast";
import {
  Plus,
  Download,
} from 'lucide-react';

// Note: Currency and datetime formatting is now configured via environment variables
// Check .env.local for NEXT_PUBLIC_CURRENCY_* and NEXT_PUBLIC_DATE_* settings

// Simple data structure
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  joined: string;
  lastLogin: string;
  amount: number;
}

// Sample data - 37 records
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active', joined: '2024-01-15', lastLogin: '2024-07-23 14:30:00', amount: 7500065.00 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'Active', joined: '2024-01-10', lastLogin: '2024-07-23 09:15:00', amount: 68000.50 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager', status: 'Inactive', joined: '2024-01-08', lastLogin: '2024-07-20 16:45:00', amount: 95000.00 },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Analyst', status: 'Active', joined: '2024-01-12', lastLogin: '2024-07-23 11:20:00', amount: 62000.75 },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Developer', status: 'Active', joined: '2024-01-20', lastLogin: '2024-07-23 13:10:00', amount: 78000.00 },
  { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', role: 'Designer', status: 'Inactive', joined: '2024-01-18', lastLogin: '2024-07-19 10:30:00', amount: 65000.25 },
  { id: 7, name: 'Alex Chen', email: 'alex@example.com', role: 'Developer', status: 'Active', joined: '2024-01-25', lastLogin: '2024-07-23 15:45:00', amount: 82000.00 },
  { id: 8, name: 'Emily White', email: 'emily@example.com', role: 'Manager', status: 'Active', joined: '2024-01-22', lastLogin: '2024-07-23 08:30:00', amount: 98000.50 },
  { id: 9, name: 'David Miller', email: 'david@example.com', role: 'Developer', status: 'Active', joined: '2024-02-01', lastLogin: '2024-07-23 16:20:00', amount: 73000.00 },
  { id: 10, name: 'Anna Garcia', email: 'anna@example.com', role: 'Designer', status: 'Active', joined: '2024-02-05', lastLogin: '2024-07-23 12:00:00', amount: 69500.75 },
  { id: 11, name: 'Chris Taylor', email: 'chris@example.com', role: 'Analyst', status: 'Inactive', joined: '2024-02-10', lastLogin: '2024-07-21 14:15:00', amount: 58000.00 },
  { id: 12, name: 'Maria Rodriguez', email: 'maria@example.com', role: 'Manager', status: 'Active', joined: '2024-02-12', lastLogin: '2024-07-23 10:45:00', amount: 92000.25 },
  { id: 13, name: 'Kevin Lee', email: 'kevin@example.com', role: 'Developer', status: 'Active', joined: '2024-02-15', lastLogin: '2024-07-23 17:30:00', amount: 76500.00 },
  { id: 14, name: 'Jessica Adams', email: 'jessica@example.com', role: 'Designer', status: 'Active', joined: '2024-02-18', lastLogin: '2024-07-23 13:25:00', amount: 71000.50 },
  { id: 15, name: 'Ryan Moore', email: 'ryan@example.com', role: 'Analyst', status: 'Active', joined: '2024-02-20', lastLogin: '2024-07-23 15:10:00', amount: 64000.00 },
  { id: 16, name: 'Laura Thompson', email: 'laura@example.com', role: 'Manager', status: 'Inactive', joined: '2024-02-22', lastLogin: '2024-07-22 11:30:00', amount: 89000.75 },
  { id: 17, name: 'Mark Anderson', email: 'mark@example.com', role: 'Developer', status: 'Active', joined: '2024-02-25', lastLogin: '2024-07-23 16:50:00', amount: 80000.00 },
  { id: 18, name: 'Nicole Clark', email: 'nicole@example.com', role: 'Designer', status: 'Active', joined: '2024-03-01', lastLogin: '2024-07-23 14:20:00', amount: 67500.25 },
  { id: 19, name: 'Jason Wright', email: 'jason@example.com', role: 'Analyst', status: 'Active', joined: '2024-03-05', lastLogin: '2024-07-23 12:40:00', amount: 61500.00 },
  { id: 20, name: 'Amy Turner', email: 'amy@example.com', role: 'Manager', status: 'Active', joined: '2024-03-08', lastLogin: '2024-07-23 09:55:00', amount: 94500.50 },
  { id: 21, name: 'Robert Harris', email: 'robert@example.com', role: 'Developer', status: 'Inactive', joined: '2024-03-10', lastLogin: '2024-07-20 15:20:00', amount: 77000.00 },
  { id: 22, name: 'Linda Martinez', email: 'linda@example.com', role: 'Designer', status: 'Active', joined: '2024-03-12', lastLogin: '2024-07-23 11:15:00', amount: 70000.75 },
  { id: 23, name: 'Steven King', email: 'steven@example.com', role: 'Analyst', status: 'Active', joined: '2024-03-15', lastLogin: '2024-07-23 16:05:00', amount: 63500.00 },
  { id: 24, name: 'Patricia Scott', email: 'patricia@example.com', role: 'Manager', status: 'Active', joined: '2024-03-18', lastLogin: '2024-07-23 13:50:00', amount: 91000.25 },
  { id: 25, name: 'Daniel Green', email: 'daniel@example.com', role: 'Developer', status: 'Active', joined: '2024-03-20', lastLogin: '2024-07-23 10:25:00', amount: 79500.00 },
  { id: 26, name: 'Michelle Baker', email: 'michelle@example.com', role: 'Designer', status: 'Active', joined: '2024-03-22', lastLogin: '2024-07-23 15:35:00', amount: 72000.50 },
  { id: 27, name: 'Andrew Hall', email: 'andrew@example.com', role: 'Analyst', status: 'Inactive', joined: '2024-03-25', lastLogin: '2024-07-21 12:10:00', amount: 59500.00 },
  { id: 28, name: 'Kimberly Allen', email: 'kimberly@example.com', role: 'Manager', status: 'Active', joined: '2024-04-01', lastLogin: '2024-07-23 14:45:00', amount: 96000.75 },
  { id: 29, name: 'Joshua Young', email: 'joshua@example.com', role: 'Developer', status: 'Active', joined: '2024-04-03', lastLogin: '2024-07-23 11:55:00', amount: 81000.00 },
  { id: 30, name: 'Amanda Lewis', email: 'amanda@example.com', role: 'Designer', status: 'Active', joined: '2024-04-05', lastLogin: '2024-07-23 16:40:00', amount: 68500.25 },
  { id: 31, name: 'Brian Walker', email: 'brian@example.com', role: 'Analyst', status: 'Active', joined: '2024-04-08', lastLogin: '2024-07-23 13:15:00', amount: 62500.00 },
  { id: 32, name: 'Rebecca Nelson', email: 'rebecca@example.com', role: 'Manager', status: 'Active', joined: '2024-04-10', lastLogin: '2024-07-23 15:25:00', amount: 93500.50 },
  { id: 33, name: 'Eric Hill', email: 'eric@example.com', role: 'Developer', status: 'Inactive', joined: '2024-04-12', lastLogin: '2024-07-22 10:30:00', amount: 75000.00 },
  { id: 34, name: 'Stephanie Carter', email: 'stephanie@example.com', role: 'Designer', status: 'Active', joined: '2024-04-15', lastLogin: '2024-07-23 12:20:00', amount: 71500.75 },
  { id: 35, name: 'Gary Phillips', email: 'gary@example.com', role: 'Analyst', status: 'Active', joined: '2024-04-18', lastLogin: '2024-07-23 14:10:00', amount: 60000.00 },
  { id: 36, name: 'Melissa Evans', email: 'melissa@example.com', role: 'Manager', status: 'Active', joined: '2024-04-20', lastLogin: '2024-07-23 16:15:00', amount: 97500.25 },
  { id: 37, name: 'Timothy Collins', email: 'timothy@example.com', role: 'Developer', status: 'Active', joined: '2024-04-22', lastLogin: '2024-07-23 11:40:00', amount: 78500.00 },
];

export default function SimpleTablesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 10;

  // Check if user was redirected after successful form save
  useEffect(() => {
    const saved = searchParams.get('saved');
    if (saved === 'true') {
      toast({
        title: "Record saved successfully!",
        description: "Your form data has been saved and added to the table.",
      });
      
      // Clean up the URL parameter
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  // Sorting function
  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Simple search filter
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle different data types
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Simple pagination
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  // Simple actions
  const handleView = (id: number | string) => {
    alert(`View user ${id}`);
  };

  const handleEdit = (id: number | string) => {
    router.push(`/forms?edit=${id}`);
  };

  const handleDelete = (id: number | string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      alert(`Delete user ${id}`);
    }
  };

  const handleCreateNew = () => {
    router.push('/forms');
  };

  const handleExport = () => {
    // Create CSV content using sorted and filtered data
    const headers = ['Name', 'Email', 'Role', 'Status', 'Joined', 'Last Login', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...sortedUsers.map(user => {
        const lastLogin = formatDateTime(user.lastLogin);
        const joinedDate = formatDate(user.joined);
        return [
          `"${user.name}"`,
          `"${user.email}"`,
          `"${user.role}"`,
          `"${user.status}"`,
          `"${joinedDate}"`,
          `"${lastLogin.date} ${lastLogin.time}"`,
          `"${formatAmount(user.amount)}"`
        ].join(',');
      })
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `users-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful!",
      description: `Exported ${sortedUsers.length} users to CSV file.`,
    });
  };

  return (
    <DashboardLayout>
      <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">Users</CardTitle>
              <div className="flex gap-2">
                <Button 
                  onClick={handleExport} 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button onClick={handleCreateNew} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <SearchInput
              value={searchTerm}
              onChange={(value) => {
                setSearchTerm(value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHeader field="name" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Name</SortableHeader>
                  <SortableHeader field="email" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Email</SortableHeader>
                  <SortableHeader field="role" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Role</SortableHeader>
                  <SortableHeader field="status" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Status</SortableHeader>
                  <SortableHeader field="joined" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Joined</SortableHeader>
                  <TableHead>Last Login</TableHead>
                  <SortableHeader field="amount" sortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Amount</SortableHeader>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user) => {
                    const lastLogin = formatDateTime(user.lastLogin);
                    const joinedDate = formatDate(user.joined);
                    return (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="text-gray-600">{user.email}</TableCell>
                        <TableCell className="text-gray-600">{user.role}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === 'Active' ? 'default' : 'secondary'}
                            className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{joinedDate}</TableCell>
                        <TableCell className="text-gray-600">
                          <div className="flex flex-col">
                            <span className="font-medium">{lastLogin.date}</span>
                            <span className="text-xs text-gray-500">{lastLogin.time}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatAmount(user.amount)}
                        </TableCell>
                        <TableCell>
                          <ButtonGroup>
                            <ViewButton
                              id={user.id}
                              onView={handleView}
                            />
                            <EditButton
                              id={user.id}
                              onEdit={handleEdit}
                            />
                            <DeleteButton
                              id={user.id}
                              onDelete={handleDelete}
                              confirmMessage="Are you sure you want to delete this user?"
                            />
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedUsers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </CardContent>
        </Card>
    </DashboardLayout>
  );
}
