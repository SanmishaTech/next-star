'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building } from 'lucide-react';
import config from '@/lib/config';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showLogo = true 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-2">
            {showLogo && (
              <div className="mx-auto h-12 w-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary-foreground" />
              </div>
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </CardHeader>
          
          <CardContent>
            {children}
          </CardContent>
        </Card>
        
        {/* Branding Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {config.app.name} v{config.app.version}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Enterprise Resource Planning System
          </p>
        </div>
      </div>
    </div>
  );
}
