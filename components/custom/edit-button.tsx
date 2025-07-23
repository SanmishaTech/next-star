'use client';

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit } from 'lucide-react';

export interface EditButtonProps {
  id: number | string;
  onEdit: (id: number | string) => void;
  tooltip?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export function EditButton({
  id,
  onEdit,
  tooltip = "Edit",
  size = "sm",
  variant = "outline",
  className
}: EditButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={size}
          variant={variant}
          onClick={() => onEdit(id)}
          className={className}
        >
          <Edit className="h-3 w-3" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
