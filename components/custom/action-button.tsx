'use client';

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from 'lucide-react';

export interface ActionButtonProps {
  id?: number | string;
  onClick: (id?: number | string) => void;
  icon: LucideIcon;
  tooltip?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  disabled?: boolean;
  confirmMessage?: string;
}

export function ActionButton({
  id,
  onClick,
  icon: Icon,
  tooltip,
  size = "sm",
  variant = "outline",
  className,
  disabled = false,
  confirmMessage
}: ActionButtonProps) {
  const handleClick = () => {
    if (confirmMessage) {
      if (confirm(confirmMessage)) {
        onClick(id);
      }
    } else {
      onClick(id);
    }
  };

  const button = (
    <Button
      size={size}
      variant={variant}
      onClick={handleClick}
      className={className}
      disabled={disabled}
    >
      <Icon className="h-3 w-3" />
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
