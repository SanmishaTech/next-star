'use client';

import React, { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export interface ComboboxOption {
  value: string;
  label: string;
  searchKeywords?: string[]; // Additional keywords for better search
}

export interface ComboboxInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  options: ComboboxOption[];
  required?: boolean;
  disabled?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function ComboboxInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select an option...",
  description,
  options,
  required = false,
  disabled = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  className,
}: ComboboxInputProps<T>) {
  const [open, setOpen] = useState(false);

  const displayLabel = label || name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedOption = options.find(option => option.value === field.value);
        
        return (
          <FormItem className={className}>
            <FormLabel>
              {displayLabel}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground",
                      fieldState.error && "border-destructive"
                    )}
                    disabled={disabled}
                  >
                    {selectedOption ? selectedOption.label : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder={searchPlaceholder}
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          keywords={option.searchKeywords}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue === field.value ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === option.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default ComboboxInput;
