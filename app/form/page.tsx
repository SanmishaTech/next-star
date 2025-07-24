'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Form } from "@/components/ui/form";
import {
  FormContainer,
  FormSection,
  FormFieldGroup,
  FormActions,
  ValidationSummary,
  TextInput,
  EmailInput,
  PhoneInput,
  DatePicker,
  TextareaInput,
  SelectInput,
  ComboboxInput,
  CheckboxGroup,
  SingleCheckbox
} from '@/components/custom/form';
import {
  User,
  Building,
  Calendar as CalendarIconLucide,
} from 'lucide-react';
import { toast } from "@/hooks/useToast";

// Form validation schema
const formSchema = z.object({
  // Personal Information
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name should only contain letters and spaces"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name should only contain letters and spaces"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  
  // Date field
  birthDate: z.date({
    message: "Please select a birth date",
  }).optional(),
  
  // Company Information
  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  position: z.string()
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must be less than 100 characters"),
  department: z.string({
    message: "Please select a department",
  }).min(1, "Department is required"),
  
  // Project Details
  projectType: z.string({
    message: "Please select a project type",
  }).min(1, "Project type is required"),
  budget: z.string({
    message: "Please select a budget range",
  }).min(1, "Budget range is required"),
  timeline: z.string({
    message: "Please select a timeline",
  }).min(1, "Timeline is required"),
  
  // Additional Information
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  requirements: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Please select at least one service requirement",
  }),
  newsletter: z.boolean(),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions to proceed",
  }),
});

type FormData = z.infer<typeof formSchema>;

// Department options
const departmentOptions = [
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
  { value: "operations", label: "Operations" },
  { value: "other", label: "Other" },
];

// Project type options
const projectTypeOptions = [
  { 
    value: "web-app", 
    label: "Web Application",
    searchKeywords: ["web", "webapp", "application", "frontend", "backend"]
  },
  { 
    value: "mobile-app", 
    label: "Mobile Application",
    searchKeywords: ["mobile", "app", "ios", "android", "react native", "flutter"]
  },
  { 
    value: "website", 
    label: "Website",
    searchKeywords: ["website", "site", "landing", "corporate", "portfolio"]
  },
  { 
    value: "e-commerce", 
    label: "E-commerce",
    searchKeywords: ["ecommerce", "shop", "store", "online store", "marketplace"]
  },
  { 
    value: "saas", 
    label: "SaaS Platform",
    searchKeywords: ["saas", "platform", "software", "service", "subscription"]
  },
  { 
    value: "consulting", 
    label: "Consulting",
    searchKeywords: ["consulting", "advice", "strategy", "technical", "architecture"]
  },
];

// Budget options
const budgetOptions = [
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-30k", label: "$15,000 - $30,000" },
  { value: "30k-50k", label: "$30,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k+", label: "$100,000+" },
];

// Timeline options
const timelineOptions = [
  { value: "1-2-months", label: "1-2 months" },
  { value: "3-4-months", label: "3-4 months" },
  { value: "5-6-months", label: "5-6 months" },
  { value: "6-12-months", label: "6-12 months" },
  { value: "12-months+", label: "12+ months" },
];

const initialRequirements = [
  { id: "web-development", label: "Web Development" },
  { id: "mobile-app", label: "Mobile App Development" },
  { id: "ui-ux-design", label: "UI/UX Design" },
  { id: "consulting", label: "Technical Consulting" },
  { id: "maintenance", label: "Maintenance & Support" },
  { id: "testing", label: "Quality Assurance & Testing" },
];

export default function FormPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      department: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      requirements: [],
      newsletter: false,
      terms: false,
    },
  });

  // Watch form state for validation
  const formState = form.formState;
  const isFormValid = formState.isValid && Object.keys(formState.errors).length === 0;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setValidationErrors([]);
    
    try {
      // Additional client-side validation
      const errors: string[] = [];
      
      if (!data.terms) {
        errors.push("You must accept the terms and conditions");
      }
      
      if (data.requirements.length === 0) {
        errors.push("Please select at least one service requirement");
      }
      
      if (errors.length > 0) {
        setValidationErrors(errors);
        setIsSubmitting(false);
        toast({
          title: "Validation Error",
          description: "Please fix the errors below before submitting.",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form saved successfully:', data);
      
      form.reset();
      
      // Redirect to table directly without showing toast here
      // The toast will be shown on the tables page
      router.push('/table?saved=true');
    } catch (error) {
      console.error('Form save error:', error);
      toast({
        title: "Save failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setValidationErrors([]);
  };

  const handleCancel = () => {
    router.back(); // Go back to previous page
  };

  return (
    <DashboardLayout>
      <FormContainer 
        title="Form" 
        description="Please fill out all required fields to submit your request"
      >
        {validationErrors.length > 0 && (
          <ValidationSummary errors={validationErrors} />
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Personal Information Section */}
            <FormSection title="Personal Information" icon={User}>
              <FormFieldGroup columns={2}>
                <TextInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  required={true}
                />
                
                <TextInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  required={true}
                />
                
                <EmailInput
                  control={form.control}
                  name="email"
                  placeholder="john.doe@example.com"
                  required={true}
                />
                
                <PhoneInput
                  control={form.control}
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  required={true}
                />
              </FormFieldGroup>
              
              <FormFieldGroup columns={1}>
                <DatePicker
                  control={form.control}
                  name="birthDate"
                  label="Birth Date"
                  placeholder="Select date of birth"
                  description="Your date of birth (optional)"
                  maxDate={new Date()}
                  minDate={new Date("1900-01-01")}
                />
              </FormFieldGroup>
            </FormSection>

            {/* Company Information Section */}
            <FormSection title="Company Information" icon={Building}>
              <FormFieldGroup columns={2}>
                <TextInput
                  control={form.control}
                  name="company"
                  label="Company Name"
                  placeholder="Acme Inc."
                  required={true}
                />
                
                <TextInput
                  control={form.control}
                  name="position"
                  label="Position"
                  placeholder="Product Manager"
                  required={true}
                />
              </FormFieldGroup>
              
              <FormFieldGroup columns={1}>
                <SelectInput
                  control={form.control}
                  name="department"
                  label="Department"
                  placeholder="Select your department"
                  options={departmentOptions}
                  required={true}
                />
              </FormFieldGroup>
            </FormSection>

            {/* Project Details Section */}
            <FormSection title="Project Details" icon={CalendarIconLucide}>
              <FormFieldGroup columns={3}>
                <ComboboxInput
                  control={form.control}
                  name="projectType"
                  label="Project Type"
                  placeholder="Search and select project type..."
                  searchPlaceholder="Search project types..."
                  emptyMessage="No project type found."
                  options={projectTypeOptions}
                  required={true}
                />
                
                <SelectInput
                  control={form.control}
                  name="budget"
                  label="Budget Range"
                  placeholder="Select budget"
                  options={budgetOptions}
                  required={true}
                />
                
                <SelectInput
                  control={form.control}
                  name="timeline"
                  label="Timeline"
                  placeholder="Select timeline"
                  options={timelineOptions}
                  required={true}
                />
              </FormFieldGroup>
              
              <FormFieldGroup columns={1}>
                <TextareaInput
                  control={form.control}
                  name="description"
                  label="Project Description"
                  placeholder="Please describe your project requirements, goals, and any specific features you need..."
                  description="Provide as much detail as possible to help us understand your needs."
                  rows={5}
                  maxLength={1000}
                  showCharacterCount={true}
                  required={true}
                />
              </FormFieldGroup>
            </FormSection>

            {/* Requirements Section */}
            <FormSection title="Services Required" description="Select all services that apply to your project.">
              <CheckboxGroup
                control={form.control}
                name="requirements"
                label="Services Required"
                options={initialRequirements}
                columns={2}
                required={true}
              />
            </FormSection>

            {/* Additional Options */}
            <FormSection title="Additional Options">
              <div className="space-y-4">
                <SingleCheckbox
                  control={form.control}
                  name="newsletter"
                  label="Subscribe to our newsletter"
                  description="Receive updates about our services and industry insights."
                />
                
                <SingleCheckbox
                  control={form.control}
                  name="terms"
                  label="I agree to the terms and conditions"
                  description="You agree to our Terms of Service and Privacy Policy."
                  required={true}
                />
              </div>
            </FormSection>

            <FormActions
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
              saveText="Save"
            />
          </form>
        </Form>
      </FormContainer>
    </DashboardLayout>
  );
}
