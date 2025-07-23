'use client';

import { Separator } from "@/components/ui/separator";
import { cn } from '@/lib/utils';

export interface FormSeparatorProps {
  text?: string;
  className?: string;
}

export function FormSeparator({
  text,
  className
}: FormSeparatorProps) {
  if (text) {
    return (
      <div className={cn("relative", className)}>
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {text}
          </span>
        </div>
      </div>
    );
  }

  return <Separator className={className} />;
}
