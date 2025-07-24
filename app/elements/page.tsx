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
import { Form } from "@/components/ui/form";
import { 
  TextInput,
  EmailInput,
  PasswordInput,
  TextareaInput,
  CheckboxInput,
  SelectInput,
  LoadingButton
} from '@/components/custom';
import { useToast } from "@/hooks/useToast";
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
  Sparkles
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
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UI Elements</h1>
          <p className="text-muted-foreground">
            Explore the available UI components and their variations
          </p>
        </div>

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
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Palette className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    Buttons
                  </CardTitle>
                  <CardDescription>Different button variants and sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
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
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    Badges
                  </CardTitle>
                  <CardDescription>Status indicators and labels</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default" className="px-3 py-1">Default</Badge>
                    <Badge variant="secondary" className="px-3 py-1">Secondary</Badge>
                    <Badge variant="destructive" className="px-3 py-1">Destructive</Badge>
                    <Badge variant="outline" className="px-3 py-1">Outline</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Avatars */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    Avatars
                  </CardTitle>
                  <CardDescription>User profile pictures and placeholders</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex gap-4 items-center">
                    <Avatar className="h-12 w-12 border-2 border-muted">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12 border-2 border-muted">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12 border-2 border-muted">
                      <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <FormInput className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Reusable Form Components
                </CardTitle>
                <CardDescription>Test form with validation using custom components</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    <PasswordInput
                      control={form.control}
                      name="password"
                      label="Password"
                      placeholder="Enter a secure password"
                      required
                    />

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

                    <div className="flex gap-3 pt-4">
                      <LoadingButton
                        type="submit"
                        loading={isLoading}
                        className="flex-1"
                      >
                        Submit Form
                      </LoadingButton>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => form.reset()}
                        className="px-8"
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6 mt-6">
            <div className="grid gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    Alerts
                  </CardTitle>
                  <CardDescription>Contextual feedback messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <Alert className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30">
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertTitle className="text-blue-800 dark:text-blue-200">Heads up!</AlertTitle>
                    <AlertDescription className="text-blue-700 dark:text-blue-300">
                      You can add components to your app using the cli.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="destructive" className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/30">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Your session has expired. Please log in again.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-200 bg-green-50/50 text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Your changes have been saved successfully.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-amber-200 bg-amber-50/50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                    <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      New features are available in this version.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                      <BarChart3 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    Progress
                  </CardTitle>
                  <CardDescription>Progress indicators and loading states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Processing progress</span>
                      <span className="text-blue-600 dark:text-blue-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Download progress</span>
                      <span className="text-green-600 dark:text-green-400">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Installation progress</span>
                      <span className="text-emerald-600 dark:text-emerald-400">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Data Display Tab */}
          <TabsContent value="data" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  Cards & Layout
                </CardTitle>
                <CardDescription>Content containers and separators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/10 dark:to-rose-950/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <Heart className="h-5 w-5 text-red-500" />
                        </div>
                        Favorites
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your most loved items
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">24 items</Badge>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/10 dark:to-sky-950/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Share2 className="h-5 w-5 text-blue-500" />
                        </div>
                        Shared
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Files shared with you
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">12 files</Badge>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/10 dark:to-emerald-950/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Download className="h-5 w-5 text-green-500" />
                        </div>
                        Downloads
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your downloaded content
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="destructive" className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800">8 pending</Badge>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="my-8" />

                <div className="rounded-lg bg-muted/30 p-6">
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <div className="p-1 bg-primary/10 rounded">
                      <Separator className="h-4 w-4" />
                    </div>
                    Separator Usage
                  </h4>
                  <p className="text-muted-foreground">
                    Separators help organize content sections visually and create clear divisions between different areas of your interface.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Toasts Tab */}
          <TabsContent value="toasts" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                    <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  Toast Notifications
                </CardTitle>
                <CardDescription>Test different types of toast notifications with enhanced UI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Button 
                    onClick={showSuccessToast}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Success
                  </Button>
                  
                  <Button 
                    onClick={showErrorToast}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Error
                  </Button>
                  
                  <Button 
                    onClick={showWarningToast}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Warning
                  </Button>
                  
                  <Button 
                    onClick={showInfoToast}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Info className="h-4 w-4" />
                    Info
                  </Button>
                  
                  <Button 
                    onClick={showLoadingToast}
                    variant="secondary"
                    disabled={isLoading}
                    className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                  >
                    <Zap className="h-4 w-4" />
                    {isLoading ? 'Processing...' : 'Loading'}
                  </Button>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <div className="p-1 bg-primary/10 rounded">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      Toast Features
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Automatic dismissal after 5 seconds
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Manual dismissal with close button
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Four variants: Success, Error, Warning, and Info
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        Contextual icons and color coding
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                        Dark mode support
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                        Stacked notifications (up to 3)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                        Helper functions for easy usage
                      </li>
                    </ul>
                  </div>

                  <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 dark:border-amber-800 dark:from-amber-950/20 dark:to-yellow-950/20">
                    <Bell className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertTitle className="text-amber-800 dark:text-amber-200">Testing Tips</AlertTitle>
                    <AlertDescription className="text-amber-700 dark:text-amber-300">
                      Click the buttons above to test different toast notifications with success, error, warning, and info variants. 
                      Each toast includes contextual icons and appropriate color schemes for better user experience.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
