'use client';

import { LucideIcon, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FormHintProps {
  text: string;
  type?: 'info' | 'warning' | 'success';
  icon?: LucideIcon;
  className?: string;
}

export function FormHint({
  text,
  type = 'info',
  icon,
  className
}: FormHintProps) {
  const defaultIcons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle
  };

  const Icon = icon || defaultIcons[type];

  const typeStyles = {
    info: 'text-muted-foreground',
    warning: 'text-amber-600',
    success: 'text-green-600'
  };

  return (
    <div className={cn(
      'flex items-start gap-2 text-sm',
      typeStyles[type],
      className
    )}>
      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}
