'use client';

import { ReactNode } from 'react';

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  spacing?: 'tight' | 'normal' | 'wide';
  orientation?: 'horizontal' | 'vertical';
  align?: 'start' | 'center' | 'end';
}

export function ButtonGroup({
  children,
  className,
  spacing = 'tight',
  orientation = 'horizontal',
  align = 'center'
}: ButtonGroupProps) {
  const spacingClasses = {
    tight: orientation === 'horizontal' ? 'space-x-1' : 'space-y-1',
    normal: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    wide: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4'
  };

  const orientationClasses = {
    horizontal: 'flex flex-row',
    vertical: 'flex flex-col'
  };

  const alignClasses = {
    start: orientation === 'horizontal' ? 'justify-start' : 'items-start',
    center: orientation === 'horizontal' ? 'justify-center' : 'items-center',
    end: orientation === 'horizontal' ? 'justify-end' : 'items-end'
  };

  const classes = [
    orientationClasses[orientation],
    spacingClasses[spacing],
    alignClasses[align],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
