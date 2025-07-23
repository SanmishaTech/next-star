'use client';

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye } from 'lucide-react';

export interface ViewButtonProps {
  id: number | string;
  onView: (id: number | string) => void;
  tooltip?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export function ViewButton({
  id,
  onView,
  tooltip = "View",
  size = "sm",
  variant = "outline",
  className
}: ViewButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={size}
          variant={variant}
          onClick={() => onView(id)}
          className={className}
        >
          <Eye className="h-3 w-3" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
