# Custom Form Components

This directory contains reusable form components that provide a consistent and type-safe way to build forms across the application. All components are built with React Hook Form integration and full TypeScript support.

## Core Form Components

### 📦 **FormContainer**
**Purpose**: Main wrapper for forms with consistent styling and layout.

**Props:**
- `title`: Form title
- `description?`: Optional form description
- `children`: Form content
- `className?`: Additional CSS classes

**Usage:**
```tsx
<FormContainer title="User Registration" description="Please fill out all required fields">
  <form>...</form>
</FormContainer>
```

### 🏷️ **FormSection**
**Purpose**: Section wrapper with icon, title, and separator for organizing form content.

**Props:**
- `title`: Section title
- `icon?`: Optional Lucide icon
- `description?`: Optional section description
- `children`: Section content
- `className?`: Additional CSS classes

**Usage:**
```tsx
<FormSection title="Personal Information" icon={User} description="Basic details">
  <FormFieldGroup>...</FormFieldGroup>
</FormSection>
```

### 📊 **FormFieldGroup**
**Purpose**: Grid layout wrapper for organizing form fields in responsive columns.

**Props:**
- `children`: Form fields
- `columns?`: Number of columns (1, 2, 3, 4) - defaults to 2
- `gap?`: Spacing between fields ('sm', 'normal', 'lg') - defaults to 'normal'
- `className?`: Additional CSS classes

**Usage:**
```tsx
<FormFieldGroup columns={2} gap="normal">
  <TextInput control={form.control} name="firstName" label="First Name" />
  <TextInput control={form.control} name="lastName" label="Last Name" />
</FormFieldGroup>
```

### ⚡ **FormActions**
**Purpose**: Action buttons area with save, cancel, and reset functionality.

**Props:**
- `onSave?`: Save button click handler
- `onCancel?`: Cancel button click handler
- `onReset?`: Reset button click handler
- `isSubmitting?`: Loading state
- `saveText?`: Save button text (default: "Save")
- `cancelText?`: Cancel button text (default: "Cancel")
- `resetText?`: Reset button text (default: "Reset")
- `showCancel?`: Show cancel button (default: true)
- `showReset?`: Show reset button (default: false)
- `saveDisabled?`: Disable save button

**Usage:**
```tsx
<FormActions
  onSave={handleSave}
  onCancel={handleCancel}
  isSubmitting={isSubmitting}
  showReset={true}
/>
```

### ⚠️ **ValidationSummary**
**Purpose**: Display validation errors in a consistent format.

**Props:**
- `errors`: Array of error messages
- `title?`: Summary title (default: "Please fix the following errors:")
- `className?`: Additional CSS classes

**Usage:**
```tsx
<ValidationSummary 
  errors={validationErrors} 
  title="Form contains errors:"
/>
```

### 🔄 **LoadingButton**
**Purpose**: Button with loading state and icon support.

**Props:**
- `loading?`: Loading state
- `loadingText?`: Text during loading (default: "Loading...")
- `icon?`: Lucide icon
- `children`: Button content
- `onClick?`: Click handler
- `disabled?`: Disabled state
- `variant?`: Button variant
- `size?`: Button size
- `type?`: Button type

**Usage:**
```tsx
<LoadingButton
  loading={isSubmitting}
  loadingText="Saving..."
  icon={Send}
  onClick={handleSubmit}
>
  Save Form
</LoadingButton>
```

### ℹ️ **FormHint**
**Purpose**: Display contextual help text with icons.

**Props:**
- `text`: Help text
- `type?`: Hint type ('info', 'warning', 'success') - defaults to 'info'
- `icon?`: Optional custom icon
- `className?`: Additional CSS classes

**Usage:**
```tsx
<FormHint 
  text="Password must be at least 8 characters long"
  type="info"
/>
```

### ➖ **FormSeparator**
**Purpose**: Visual separator with optional text.

**Props:**
- `text?`: Optional separator text
- `className?`: Additional CSS classes

**Usage:**
```tsx
<FormSeparator text="Additional Information" />
```

## Input Components

### 📝 **TextInput**
**Purpose**: Standard text input with validation.

**Usage:**
```tsx
<TextInput
  control={form.control}
  name="firstName"
  label="First Name"
  placeholder="John"
  required={true}
/>
```

### 📧 **EmailInput**
**Purpose**: Email input with built-in email validation.

**Usage:**
```tsx
<EmailInput
  control={form.control}
  name="email"
  label="Email Address"
  required={true}
/>
```

### 📱 **PhoneInput**
**Purpose**: Phone input with tel type.

**Usage:**
```tsx
<PhoneInput
  control={form.control}
  name="phone"
  label="Phone Number"
  required={true}
/>
```

### 📅 **DatePicker**
**Purpose**: Date picker with calendar popup.

**Usage:**
```tsx
<DatePicker
  control={form.control}
  name="birthDate"
  label="Birth Date"
  maxDate={new Date()}
  minDate={new Date("1900-01-01")}
/>
```

### 📝 **TextareaInput**
**Purpose**: Textarea with character count and validation.

**Usage:**
```tsx
<TextareaInput
  control={form.control}
  name="description"
  label="Description"
  rows={4}
  maxLength={500}
  showCharacterCount={true}
  required={true}
/>
```

### 🔽 **SelectInput**
**Purpose**: Select dropdown with options.

**Usage:**
```tsx
<SelectInput
  control={form.control}
  name="department"
  label="Department"
  options={[
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" }
  ]}
  required={true}
/>
```

### ☑️ **CheckboxGroup**
**Purpose**: Multiple checkbox selection.

**Usage:**
```tsx
<CheckboxGroup
  control={form.control}
  name="requirements"
  label="Services Required"
  options={[
    { id: "web-dev", label: "Web Development" },
    { id: "mobile-app", label: "Mobile App" },
    { id: "design", label: "UI/UX Design" }
  ]}
  columns={2}
  required={true}
/>
```

### ☑️ **SingleCheckbox**
**Purpose**: Individual checkbox with description.

**Usage:**
```tsx
<SingleCheckbox
  control={form.control}
  name="terms"
  label="I agree to the terms and conditions"
  description="You agree to our Terms of Service and Privacy Policy"
  required={true}
/>
```

## Form Validation Schema Example

```tsx
import * as z from 'zod';

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  birthDate: z.date().optional(),
  department: z.string().min(1, "Department is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.array(z.string()).min(1, "Please select at least one requirement"),
  newsletter: z.boolean().default(false),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormData = z.infer<typeof formSchema>;
```

## Complete Form Example

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormContainer,
  FormSection,
  FormFieldGroup,
  FormActions,
  TextInput,
  EmailInput,
  SelectInput,
  CheckboxGroup,
  SingleCheckbox
} from '@/components/custom/form';

export function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { /* ... */ }
  });

  const onSubmit = async (data: FormData) => {
    // Handle form submission
  };

  return (
    <FormContainer title="User Registration">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormSection title="Personal Information" icon={User}>
            <FormFieldGroup columns={2}>
              <TextInput control={form.control} name="firstName" label="First Name" required />
              <TextInput control={form.control} name="lastName" label="Last Name" required />
              <EmailInput control={form.control} name="email" required />
              <PhoneInput control={form.control} name="phone" required />
            </FormFieldGroup>
          </FormSection>

          <FormSection title="Additional Information">
            <SelectInput
              control={form.control}
              name="department"
              label="Department"
              options={departmentOptions}
              required
            />
            <CheckboxGroup
              control={form.control}
              name="requirements"
              label="Services Required"
              options={serviceOptions}
              required
            />
            <SingleCheckbox
              control={form.control}
              name="terms"
              label="I agree to the terms and conditions"
              required
            />
          </FormSection>

          <FormActions
            onCancel={() => router.back()}
            isSubmitting={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </FormContainer>
  );
}
```

## Import Structure

### Individual Imports
```tsx
import { TextInput } from '@/components/custom/form/inputs/text-input';
import { FormSection } from '@/components/custom/form/form-section';
```

### Barrel Imports (Recommended)
```tsx
import {
  FormContainer,
  FormSection,
  FormFieldGroup,
  FormActions,
  TextInput,
  EmailInput,
  DatePicker,
  SelectInput,
  CheckboxGroup,
  SingleCheckbox
} from '@/components/custom/form';
```

### Type Imports
```tsx
import type {
  FormContainerProps,
  TextInputProps,
  SelectOption,
  CheckboxOption
} from '@/components/custom/form';
```

## Design Principles

1. **Type Safety**: Full TypeScript support with generic type parameters
2. **React Hook Form Integration**: Seamless integration with react-hook-form
3. **Validation Ready**: Built-in support for validation libraries like Zod
4. **Accessibility**: Proper ARIA attributes and labels
5. **Responsive Design**: Mobile-first responsive layouts
6. **Consistency**: Standardized styling and behavior
7. **Composition**: Mix and match components as needed
8. **Reusability**: Components work across different form contexts

## Best Practices

1. **Use TypeScript**: Import and use exported TypeScript interfaces
2. **Consistent Validation**: Use Zod or similar validation libraries
3. **Form Structure**: Organize forms with FormSection and FormFieldGroup
4. **Error Handling**: Use ValidationSummary for form-level errors
5. **Loading States**: Use FormActions with isSubmitting for better UX
6. **Accessibility**: Provide meaningful labels and descriptions
7. **Responsive Design**: Use appropriate column counts for different screen sizes
