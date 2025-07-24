'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EmailInput } from '@/components/custom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const router = useRouter();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate password reset email - replace with actual API call
      console.log('Sending password reset email to:', data.email);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSentEmail(data.email);
      setIsEmailSent(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  if (isEmailSent) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent password reset instructions"
        showLogo={false}
        variant="split"
      >
        <div className="text-center py-6">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-muted-foreground mb-6">
            We've sent a password reset link to <strong>{sentEmail}</strong>
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            If you don't see the email, check your spam folder or try again with a different email address.
          </p>
          <div className="space-y-3">
            <Button
              onClick={handleBackToLogin}
              className="w-full"
            >
              Back to Login
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsEmailSent(false)}
              className="w-full"
            >
              Try Another Email
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive reset instructions"
      variant="split"
    >
      {/* Error Message */}
      {error && (
        <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {/* Reset Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Email Field */}
          <EmailInput
            control={form.control}
            name="email"
            required
            placeholder="Enter your email address"
            autoFocus
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Sending Instructions...' : 'Send Reset Instructions'}
          </Button>
        </form>
      </Form>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Back to Login */}
      <div className="mt-6 text-center">
        <Button
          variant="ghost"
          onClick={handleBackToLogin}
          className="text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Button>
      </div>
    </AuthLayout>
  );
}
