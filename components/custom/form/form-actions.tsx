'use client';

import { Button } from "@/components/ui/button";
import { RefreshCw, Send } from 'lucide-react';

export interface FormActionsProps {
  onSave?: () => void;
  onCancel?: () => void;
  onReset?: () => void;
  isSubmitting?: boolean;
  saveText?: string;
  cancelText?: string;
  resetText?: string;
  showCancel?: boolean;
  showReset?: boolean;
  className?: string;
  saveDisabled?: boolean;
}

export function FormActions({
  onSave,
  onCancel,
  onReset,
  isSubmitting = false,
  saveText = "Save",
  cancelText = "Cancel",
  resetText = "Reset",
  showCancel = true,
  showReset = false,
  className = "",
  saveDisabled = false
}: FormActionsProps) {
  return (
    <div className={`flex justify-end gap-4 pt-4 border-t ${className}`}>
      {showReset && onReset && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onReset}
          disabled={isSubmitting}
        >
          {resetText}
        </Button>
      )}
      
      {showCancel && onCancel && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelText}
        </Button>
      )}
      
      <Button 
        type="submit" 
        disabled={isSubmitting || saveDisabled}
        onClick={onSave}
        className="flex items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {saveText}
          </>
        )}
      </Button>
    </div>
  );
}
