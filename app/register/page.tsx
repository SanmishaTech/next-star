'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Form } from "@/components/ui/form";
import { 
  TextInput, 
  EmailInput, 
  PasswordInput, 
  CheckboxInput, 
  LoadingButton 
} from '@/components/custom';

// Validation schema
const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const handleSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate registration - replace with actual API call
      console.log('Registration data:', data);
      
      // For demo, just redirect to login
      router.push('/login?message=Registration successful! Please sign in.');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join our platform to get started"
      variant="split"
    >
      {/* Error Message */}
      {error && (
        <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {/* Registration Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="John"
              required
            />
            <TextInput
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              required
            />
          </div>

          {/* Email Field */}
          <EmailInput
            control={form.control}
            name="email"
            required
            placeholder="john.doe@example.com"
          />

          {/* Company Field */}
          <TextInput
            control={form.control}
            name="company"
            label="Company"
            placeholder="Your company name"
            required
          />

          {/* Password Fields */}
          <div className="grid grid-cols-1 gap-4">
            <PasswordInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              required
            />
            <PasswordInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <CheckboxInput
            control={form.control}
            name="acceptTerms"
            label="I agree to the Terms of Service and Privacy Policy"
          />

          {/* Submit Button */}
          <LoadingButton
            type="submit"
            loading={isLoading}
            className="w-full"
          >
            Create Account
          </LoadingButton>
        </form>
      </Form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-primary hover:text-primary/80">
            Sign in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
