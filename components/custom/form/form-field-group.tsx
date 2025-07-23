'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface FormFieldGroupProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'normal' | 'lg';
  className?: string;
}

export function FormFieldGroup({
  children,
  columns = 2,
  gap = 'normal',
  className
}: FormFieldGroupProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const gapSize = {
    sm: 'gap-2',
    normal: 'gap-4',
    lg: 'gap-6'
  };

  return (
    <div className={cn(
      'grid',
      gridCols[columns],
      gapSize[gap],
      className
    )}>
      {children}
    </div>
  );
}
