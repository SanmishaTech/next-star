'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface CheckboxOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  options: CheckboxOption[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export function CheckboxGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  required = false,
  disabled = false,
  options,
  columns = 2,
  className = ""
}: CheckboxGroupProps<TFieldValues, TName>) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <div>
            <FormLabel>
              {label} {required && '*'}
            </FormLabel>
            {description && (
              <FormDescription className="mt-1">{description}</FormDescription>
            )}
          </div>
          <div className={`grid ${gridCols[columns]} gap-3`}>
            {options.map((option) => (
              <FormField
                key={option.id}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={option.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.id)}
                          disabled={disabled || option.disabled}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, option.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== option.id
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
