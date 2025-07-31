'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form } from "@/components/ui/form";
import { 
  FormSection,
  FormFieldGroup,
  FormActions,
  TextInput,
  EmailInput,
  PasswordInput,
  TextareaInput,
  CheckboxInput,
  SelectInput
} from '@/components/custom';
import { useToast } from "@/hooks/useToast";
import { formatAmount, formatDate } from "@/lib/utils";
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle, 
  User, 
  Star,
  Heart,
  Share2,
  Download,
  Bell,
  Mail,
  Zap,
  Palette,
  FormInput,
  MessageSquare,
  BarChart3,
  Sparkles,
  Shield,
  Settings
} from 'lucide-react';

// Form validation schema for testing
const testFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  notifications: z.boolean().optional(),
  category: z.string().min(1, 'Please select a category'),
});

type TestFormData = z.infer<typeof testFormSchema>;

// Sample dashboard data
const dashboardData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-07-23', revenue: 12500 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active', lastLogin: '2024-07-22', revenue: 8750 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-07-20', revenue: 3200 },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Manager', status: 'Active', lastLogin: '2024-07-23', revenue: 9840 },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'User', status: 'Active', lastLogin: '2024-07-21', revenue: 5630 },
];

export default function ElementsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(45);

  const form = useForm<TestFormData>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      message: '',
      notifications: false,
      category: '',
    },
  });

  // Toast hook destructuring
  const { toast, success, error, warning, info } = useToast();

  // Helper function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Inactive':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Category options for select input
  const categoryOptions = [
    { value: 'general', label: 'General' },
    { value: 'support', label: 'Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'bug-report', label: 'Bug Report' },
  ];

  // Toast testing functions
  const showSuccessToast = () => {
    success("Success!", "Your action was completed successfully.");
  };

  const showErrorToast = () => {
    error("Error occurred", "Something went wrong. Please try again.");
  };

  const showWarningToast = () => {
    warning("Warning", "Please review your input before proceeding.");
  };

  const showInfoToast = () => {
    info("Information", "Here's some useful information for you.");
  };

  const showLoadingToast = () => {
    toast({
      title: "Processing...",
      description: "Please wait while we process your request.",
    });
    
    // Simulate progress
    setIsLoading(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        setProgress(45);
        toast({
          title: "Completed!",
          description: "Process finished successfully.",
        });
      }
    }, 200);
  };

  const handleFormSubmit = async (data: TestFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form data:', data);
    
    toast({
      title: "Form submitted!",
      description: `Thank you ${data.name}, your message has been received.`,
    });
    
    form.reset();
    setIsLoading(false);
  };
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">UI Elements</CardTitle>
            <p className="text-muted-foreground">
              Explore the available UI components and their variations
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tabs for different categories */}
          <Tabs defaultValue="components" className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/50 rounded-xl">
              <TabsTrigger 
                value="components" 
                className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                <Palette className="h-4 w-4" />
                <span className="text-xs font-medium">Components</span>
              </TabsTrigger>
              <TabsTrigger 
                value="forms" 
                className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                <FormInput className="h-4 w-4" />
                <span className="text-xs font-medium">Forms</span>
              </TabsTrigger>
              <TabsTrigger 
                value="feedback" 
                className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs font-medium">Feedback</span>
              </TabsTrigger>
              <TabsTrigger 
                value="data" 
                className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs font-medium">Data Display</span>
              </TabsTrigger>
              <TabsTrigger 
                value="toasts" 
                className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-medium">Toasts</span>
              </TabsTrigger>
            </TabsList>

            {/* Components Tab */}
            <TabsContent value="components" className="space-y-6 mt-6">
              <div className="grid gap-6">
                {/* Buttons */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Buttons
                    </CardTitle>
                    <CardDescription>Different button variants and sizes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-muted-foreground">Button Variants</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-muted-foreground">Button Sizes</h4>
                      <div className="flex flex-wrap gap-3 items-center">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon"><Star className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Badges
                    </CardTitle>
                    <CardDescription>Status indicators and labels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="default" className="px-3 py-1">Default</Badge>
                      <Badge variant="secondary" className="px-3 py-1">Secondary</Badge>
                      <Badge variant="destructive" className="px-3 py-1">Destructive</Badge>
                      <Badge variant="outline" className="px-3 py-1">Outline</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Avatars */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Avatars
                    </CardTitle>
                    <CardDescription>User profile pictures and placeholders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 items-center">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-12 w-12">
                        <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Forms Tab */}
            <TabsContent value="forms" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FormInput className="h-4 w-4" />
                    Comprehensive Form Components
                  </CardTitle>
                  <CardDescription>Showcase of FormSection, FormFieldGroup, and FormActions components with validation</CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                    <FormSection title="Personal Information" icon={User} description="Basic personal details for your account">
                      <FormFieldGroup columns={2}>
                        <TextInput
                          control={form.control}
                          name="name"
                          label="Full Name"
                          placeholder="Enter your full name"
                          required
                        />
                        
                        <EmailInput
                          control={form.control}
                          name="email"
                          required
                          placeholder="Enter your email"
                        />
                      </FormFieldGroup>

                      <FormFieldGroup columns={1}>
                        <PasswordInput
                          control={form.control}
                          name="password"
                          label="Password"
                          placeholder="Enter a secure password"
                          required
                        />
                      </FormFieldGroup>
                    </FormSection>

                    <FormSection title="Communication Preferences" icon={Settings} description="Configure how you'd like to be contacted">
                      <FormFieldGroup columns={1}>
                        <SelectInput
                          control={form.control}
                          name="category"
                          label="Category"
                          placeholder="Select a category"
                          options={categoryOptions}
                          required
                        />

                        <TextareaInput
                          control={form.control}
                          name="message"
                          label="Message"
                          placeholder="Type your message here..."
                          rows={4}
                          required
                        />

                        <CheckboxInput
                          control={form.control}
                          name="notifications"
                          label="Send me email notifications"
                        />
                      </FormFieldGroup>
                    </FormSection>

                    <FormActions
                      saveText="Submit Form"
                      resetText="Reset"
                      isSubmitting={isLoading}
                      showReset={true}
                      showCancel={false}
                      onReset={() => form.reset()}
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6 mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Alerts
                  </CardTitle>
                  <CardDescription>Contextual feedback messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                      You can add components to your app using the cli.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Your session has expired. Please log in again.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-200 text-green-800 dark:border-green-900/50 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Your changes have been saved successfully.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-blue-200 text-blue-800 dark:border-blue-900/50 dark:text-blue-400">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      New features are available in this version.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Progress
                  </CardTitle>
                  <CardDescription>Progress indicators and loading states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Download progress</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Installation progress</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Data Display Tab */}
          <TabsContent value="data" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Dashboard Data Table
                </CardTitle>
                <CardDescription>Example of tabular data display for dashboards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dashboardData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(user.status)}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(user.lastLogin)}</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatAmount(user.revenue)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Cards & Layout
                </CardTitle>
                <CardDescription>Content containers and separators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        Favorites
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Your most loved items
                      </p>
                      <div className="mt-2">
                        <Badge variant="secondary">24 items</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-blue-500" />
                        Shared
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Files shared with you
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline">12 files</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-green-500" />
                        Downloads
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Your downloaded content
                      </p>
                      <div className="mt-2">
                        <Badge variant="destructive">8 pending</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Data Display Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Responsive table layout with proper spacing</li>
                    <li>• Avatar integration for user identification</li>
                    <li>• Badge variants for status and role display</li>
                    <li>• Currency formatting for financial data</li>
                    <li>• Consistent typography and alignment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Toasts Tab */}
          <TabsContent value="toasts" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Toast Notifications
                </CardTitle>
                <CardDescription>Test different types of toast notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Button 
                    onClick={showSuccessToast}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Success Toast
                  </Button>
                  
                  <Button 
                    onClick={showErrorToast}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Error Toast
                  </Button>
                  
                  <Button 
                    onClick={showWarningToast}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Warning Toast
                  </Button>
                  
                  <Button 
                    onClick={showInfoToast}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Info className="h-4 w-4" />
                    Info Toast
                  </Button>
                  
                  <Button 
                    onClick={showLoadingToast}
                    variant="secondary"
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    {isLoading ? 'Processing...' : 'Loading Toast'}
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Toast Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automatic dismissal after 5 seconds</li>
                    <li>• Manual dismissal with close button</li>
                    <li>• Four variants: Success, Error, Warning, and Info</li>
                    <li>• Contextual icons and color coding</li>
                    <li>• Dark mode support</li>
                    <li>• Stacked notifications (up to 3)</li>
                    <li>• Helper functions for easy usage</li>
                  </ul>
                </div>

                <Alert>
                  <Bell className="h-4 w-4" />
                  <AlertTitle>Testing Tips</AlertTitle>
                  <AlertDescription>
                    Click the buttons above to test different toast notifications with success, error, warning, and info variants. 
                    Each toast includes contextual icons and appropriate color schemes for better user experience.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
