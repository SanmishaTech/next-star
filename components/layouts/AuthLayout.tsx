'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building, Shield, Zap, Users, ChevronRight } from 'lucide-react';
import config from '@/lib/config';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  variant?: 'split' | 'minimal';
  showLogo?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  variant = 'split',
  showLogo = true 
}: AuthLayoutProps) {
  
  // Split variant - image on left, form on right (default)
  if (variant === 'split') {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:flex-1 relative">
          <Image
            src="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Team collaboration"
            fill
            className="object-cover brightness-75"
            priority
          />
          
          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white">
            {/* Top Section */}
            <div>
              <div className="flex items-center gap-3 mb-12">
                <div className="h-12 w-12 bg-black/40 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold drop-shadow-lg">{config.app.name}</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6 leading-tight drop-shadow-lg">
                Streamline Your
                <br />
                <span className="text-blue-200">Business Operations</span>
              </h2>
              
              <p className="text-xl text-white mb-8 leading-relaxed drop-shadow-md">
                Powerful ERP solution designed to optimize your workflow and boost productivity across all departments.
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-black/40 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold drop-shadow-md">Enterprise Security</h3>
                  <p className="text-white/90 text-sm drop-shadow-sm">Bank-level encryption and compliance</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-black/40 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold drop-shadow-md">Lightning Fast</h3>
                  <p className="text-white/90 text-sm drop-shadow-sm">Optimized performance at scale</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-black/40 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold drop-shadow-md">Team Collaboration</h3>
                  <p className="text-white/90 text-sm drop-shadow-sm">Connect teams across departments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              {showLogo && (
                <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg lg:hidden">
                  <Building className="h-8 w-8 text-white" />
                </div>
              )}              
              <h1 className="text-3xl font-bold text-gray-900">{title} {showLogo}</h1>
              {subtitle && (
                <p className="text-gray-600 mt-2 text-lg">{subtitle}</p>
              )}
            </div>
            
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                {children}
              </CardContent>
            </Card>
            
            {/* Mobile branding */}
            <div className="text-center mt-6 lg:hidden">
              <p className="text-sm text-gray-600">
                {config.app.name} v{config.app.version}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Minimal variant - clean with subtle image
  if (variant === 'minimal') {
    return (
      <div className="min-h-screen relative bg-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Abstract pattern"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-sm w-full">
            <div className="text-center mb-12">
              {showLogo && (
                <div className="mx-auto h-14 w-14 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mb-8">
                  <Building className="h-7 w-7 text-white" />
                </div>
              )}
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>
              {subtitle && (
                <p className="text-gray-500">{subtitle}</p>
              )}
            </div>
            
            <div className="space-y-6">
              {children}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-xs text-gray-400">
                {config.app.name} © 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to split variant
  return (
    <AuthLayout variant="split" title={title} subtitle={subtitle} showLogo={showLogo}>
      {children}
    </AuthLayout>
  );
}
