'use client';

import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface TextareaInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  className?: string;
}

export function TextareaInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  showCharacterCount = false,
  className = ""
}: TextareaInputProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label} {required && '*'}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              maxLength={maxLength}
              {...field}
            />
          </FormControl>
          {(description || showCharacterCount) && (
            <FormDescription>
              {description}
              {showCharacterCount && maxLength && (
                <span className="ml-2 text-xs">
                  {field.value?.length || 0}/{maxLength}
                </span>
              )}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
