'use client';

import { ReactNode } from 'react';
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from 'lucide-react';

export interface FormSectionProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  description?: string;
}

export function FormSection({
  title,
  icon: Icon,
  children,
  className = "",
  description
}: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <Separator />
      {children}
    </div>
  );
}
