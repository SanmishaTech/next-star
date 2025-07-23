'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';

export interface DeleteButtonProps {
  id: number | string;
  onDelete: (id: number | string) => void;
  tooltip?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  confirmMessage?: string;
  confirmTitle?: string;
  confirmActionText?: string;
  confirmCancelText?: string;
}

export function DeleteButton({
  id,
  onDelete,
  tooltip = "Delete",
  size = "sm",
  variant = "outline",
  className = "text-red-600 hover:text-red-700",
  confirmMessage = "This action cannot be undone. This will permanently delete the item.",
  confirmTitle = "Are you absolutely sure?",
  confirmActionText = "Delete",
  confirmCancelText = "Cancel"
}: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete(id);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              size={size}
              variant={variant}
              className={className}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {confirmMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{confirmCancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {confirmActionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
