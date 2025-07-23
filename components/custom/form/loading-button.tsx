'use client';

import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function LoadingButton({
  loading = false,
  loadingText = "Loading...",
  icon: Icon,
  children,
  onClick,
  disabled,
  variant = "default",
  size = "default",
  className,
  type = "button"
}: LoadingButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={loading || disabled}
      onClick={onClick}
      className={cn("flex items-center gap-2", className)}
    >
      {loading ? (
        <>
          <RefreshCw className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </>
      )}
    </Button>
  );
}
