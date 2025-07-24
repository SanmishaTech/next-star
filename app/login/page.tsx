'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Form } from "@/components/ui/form";
import { EmailInput, LoadingButton, PasswordInput, CheckboxInput } from '@/components/custom';
import { useClientOnly } from '@/hooks/useAuth';
import { AuthService } from '@/lib/authService';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const isClient = useClientOnly();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await AuthService.login(data.email, data.password, data.rememberMe);

      if (result.success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      variant="split"
    >
      {/* Error Message */}
      {error && (
        <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Email Field */}
          <EmailInput
            control={form.control}
            name="email"
            required
            placeholder="Enter your email"
          />

          {/* Password Field */}
          <PasswordInput
            control={form.control}
            name="password"
            required
            placeholder="Enter your password"
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <CheckboxInput
              control={form.control}
              name="rememberMe"
              label="Remember me"
            />
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-primary hover:text-primary/80">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <LoadingButton
            type="submit"
            loading={isLoading}
            className="w-full"
          >
            Sign in
          </LoadingButton>
        </form>
      </Form>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Demo Credentials:</strong><br />
          Email: admin@example.com<br />
          Password: admin123@
        </p>
      </div>

      {/* Auth Links */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:text-primary/80">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
