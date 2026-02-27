'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

// Accessibility utilities
const generateId = (prefix: string = 'field') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

const getAriaDescribedBy = (errorId: string, helpId: string) => {
  const ids = [];
  if (errorId) ids.push(errorId);
  if (helpId) ids.push(helpId);
  return ids.length > 0 ? ids.join(' ') : undefined;
};

// Form context for accessibility
interface FormContext {
  fieldId: string;
  errorId: string;
  helpId: string;
  required: boolean;
  disabled: boolean;
}

// Form validation schemas
export const formSchemas = {
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number'),
  projectTitle: z.string().min(2, 'Project title must be at least 2 characters').max(200, 'Project title cannot exceed 200 characters'),
};

// Form field types
interface BaseFieldProps {
  name: string;
  label: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

interface TextFieldProps extends BaseFieldProps {
  type?: 'text' | 'email' | 'tel' | 'url' | 'password';
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
}

interface TextAreaProps extends BaseFieldProps {
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  placeholder?: string;
  defaultValue?: string;
}

interface CheckboxFieldProps extends BaseFieldProps {
  defaultValue?: boolean;
}

interface RadioFieldProps extends BaseFieldProps {
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  defaultValue?: string;
}

interface SwitchFieldProps extends BaseFieldProps {
  defaultValue?: boolean;
}

// Accessible Text Field Component
export const AccessibleTextField: React.FC<TextFieldProps> = ({
  name,
  label,
  helpText,
  type = 'text',
  placeholder,
  defaultValue,
  required = false,
  disabled = false,
  maxLength,
  className,
}) => {
  const { register, formState: { errors } } = useFormContext();
  const [fieldId, setFieldId] = useState('');
  const [errorId, setErrorId] = useState('');
  const [helpId, setHelpId] = useState('');

  useEffect(() => {
    setFieldId(generateId('text-field'));
    setErrorId(generateId('text-error'));
    setHelpId(generateId('text-help'));
  }, []);

  const error = errors[name];
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={fieldId} className={required ? 'after:content-["_*"] after:text-red-500' : ''}>
        {label}
      </Label>
      
      <Input
        id={fieldId}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={hasError}
        aria-describedby={getAriaDescribedBy(errorId, helpId)}
        aria-required={required}
        disabled={disabled}
        maxLength={maxLength}
        {...register(name, {
          required: required ? `${label} is required` : false,
          maxLength: maxLength ? {
            value: maxLength,
            message: `${label} cannot exceed ${maxLength} characters`
          } : undefined,
        })}
      />
      
      {helpText && (
        <p id={helpId} className="text-sm text-gray-600" role="note">
          {helpText}
        </p>
      )}
      
      {hasError && (
        <div id={errorId} className="flex items-center gap-2 text-red-600 text-sm" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>{(error as FieldError)?.message}</span>
        </div>
      )}
      
      {maxLength && !hasError && (
        <div className="text-xs text-gray-500 text-right">
          {defaultValue?.length || 0}/{maxLength}
        </div>
      )}
    </div>
  );
};

// Accessible Text Area Component
export const AccessibleTextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  helpText,
  placeholder,
  defaultValue,
  required = false,
  disabled = false,
  maxLength,
  rows = 4,
  className,
}) => {
  const { register, formState: { errors } } = useFormContext();
  const [fieldId, setFieldId] = useState('');
  const [errorId, setErrorId] = useState('');
  const [helpId, setHelpId] = useState('');

  useEffect(() => {
    setFieldId(generateId('textarea-field'));
    setErrorId(generateId('textarea-error'));
    setHelpId(generateId('textarea-help'));
  }, []);

  const error = errors[name];
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={fieldId} className={required ? 'after:content-["_*"] after:text-red-500' : ''}>
        {label}
      </Label>
      
      <Textarea
        id={fieldId}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={rows}
        aria-invalid={hasError}
        aria-describedby={getAriaDescribedBy(errorId, helpId)}
        aria-required={required}
        disabled={disabled}
        maxLength={maxLength}
        {...register(name, {
          required: required ? `${label} is required` : false,
          maxLength: maxLength ? {
            value: maxLength,
            message: `${label} cannot exceed ${maxLength} characters`
          } : undefined,
        })}
      />
      
      {helpText && (
        <p id={helpId} className="text-sm text-gray-600" role="note">
          {helpText}
        </p>
      )}
      
      {hasError && (
        <div id={errorId} className="flex items-center gap-2 text-red-600 text-sm" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>{(error as FieldError)?.message}</span>
        </div>
      )}
      
      {maxLength && !hasError && (
        <div className="text-xs text-gray-500 text-right">
          {defaultValue?.length || 0}/{maxLength}
        </div>
      )}
    </div>
  );
};

// Accessible Select Component
export const AccessibleSelect: React.FC<SelectFieldProps> = ({
  name,
  label,
  helpText,
  options,
  placeholder,
  defaultValue,
  required = false,
  disabled = false,
  className,
}) => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const [fieldId, setFieldId] = useState('');
  const [errorId, setErrorId] = useState('');
  const [helpId, setHelpId] = useState('');

  useEffect(() => {
    setFieldId(generateId('select-field'));
    setErrorId(generateId('select-error'));
    setHelpId(generateId('select-help'));
  }, []);

  const selectedValue = watch(name);
  const error = errors[name];
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={fieldId} className={required ? 'after:content-["_*"] after:text-red-500' : ''}>
        {label}
      </Label>
      
      <Select
        value={selectedValue || defaultValue}
        onValueChange={(value) => setValue(name, value)}
        disabled={disabled}
      >
        <SelectTrigger 
          id={fieldId}
          aria-invalid={hasError}
          aria-describedby={getAriaDescribedBy(errorId, helpId)}
          aria-required={required}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {helpText && (
        <p id={helpId} className="text-sm text-gray-600" role="note">
          {helpText}
        </p>
      )}
      
      {hasError && (
        <div id={errorId} className="flex items-center gap-2 text-red-600 text-sm" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>{(error as FieldError)?.message}</span>
        </div>
      )}
    </div>
  );
};

// Accessible Checkbox Component
export const AccessibleCheckbox: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  helpText,
  defaultValue = false,
  disabled = false,
  className,
}) => {
  const { register, watch, formState: { errors } } = useFormContext();
  const [fieldId, setFieldId] = useState('');
  const [errorId, setErrorId] = useState('');
  const [helpId, setHelpId] = useState('');

  useEffect(() => {
    setFieldId(generateId('checkbox-field'));
    setErrorId(generateId('checkbox-error'));
    setHelpId(generateId('checkbox-help'));
  }, []);

  const isChecked = watch(name);
  const error = errors[name];
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={fieldId}
          checked={isChecked ?? defaultValue}
          onCheckedChange={(checked) => register(name).onChange({ target: { value: checked } })}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={getAriaDescribedBy(errorId, helpId)}
        />
        <Label htmlFor={fieldId}>
          {label}
        </Label>
      </div>
      
      {helpText && (
        <p id={helpId} className="text-sm text-gray-600 ml-6" role="note">
          {helpText}
        </p>
      )}
      
      {hasError && (
        <div id={errorId} className="flex items-center gap-2 text-red-600 text-sm ml-6" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>{(error as FieldError)?.message}</span>
        </div>
      )}
    </div>
  );
};

// Accessible Radio Group Component
export const AccessibleRadioGroup: React.FC<RadioFieldProps> = ({
  name,
  label,
  helpText,
  options,
  defaultValue,
  disabled = false,
  className,
}) => {
  const { register, watch, formState: { errors } } = useFormContext();
  const [fieldId, setFieldId] = useState('');
  const [errorId, setErrorId] = useState('');
  const [helpId, setHelpId] = useState('');

  useEffect(() => {
    setFieldId(generateId('radio-field'));
    setErrorId(generateId('radio-error'));
    setHelpId(generateId('radio-help'));
  }, []);

  const selectedValue = watch(name);
  const error = errors[name];
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      
      <RadioGroup
        value={selectedValue || defaultValue}
        onValueChange={(value) => register(name).onChange({ target: { value } })}
        disabled={disabled}
        aria-describedby={getAriaDescribedBy(errorId, helpId)}
        aria-invalid={hasError}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={option.value} 
              id={`${fieldId}-${option.value}`}
              disabled={option.disabled}
            />
            <Label htmlFor={`${fieldId}-${option.value}`}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {helpText && (
        <p id={helpId} className="text-sm text-gray-600" role="note">
          {helpText}
        </p>
      )}
      
      {hasError && (
        <div id={errorId} className="flex items-center gap-2 text-red-600 text-sm" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>{(error as FieldError)?.message}</span>
        </div>
      )}
    </div>
  );
};

// Accessible Switch Component
export const AccessibleSwitch: React.FC<SwitchFieldProps> = ({
  name,
  label,
  helpText,
  defaultValue = false,
  disabled = false,
  className,
}) => {
  const { register, watch, formState: { errors } } = useFormContext();
  const [fieldId, setFieldId] = useState('');
  const [errorId, setErrorId] = useState('');
  const [helpId, setHelpId] = useState('');

  useEffect(() => {
    setFieldId(generateId('switch-field'));
    setErrorId(generateId('switch-error'));
    setHelpId(generateId('switch-help'));
  }, []);

  const isOn = watch(name);
  const error = errors[name];
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor={fieldId}>
            {label}
          </Label>
          {helpText && (
            <p id={helpId} className="text-sm text-gray-600" role="note">
              {helpText}
            </p>
          )}
        </div>
        
        <Switch
          id={fieldId}
          checked={isOn ?? defaultValue}
          onCheckedChange={(checked) => register(name).onChange({ target: { value: checked } })}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={getAriaDescribedBy(errorId, helpId)}
        />
      </div>
      
      {hasError && (
        <div id={errorId} className="flex items-center gap-2 text-red-600 text-sm" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>{(error as FieldError)?.message}</span>
        </div>
      )}
    </div>
  );
};

// Form Context
const FormContext = React.createContext<{
  register: any;
  formState: any;
  watch: any;
  setValue: any;
  trigger: any;
} | null>(null);

const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

// Enhanced Form Provider with Accessibility Features
interface AccessibleFormProps<T extends Record<string, any>> {
  onSubmit: SubmitHandler<T>;
  schema?: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  children: ReactNode;
  className?: string;
  id?: string;
  noValidate?: boolean;
}

export function AccessibleForm<T extends Record<string, any>>({
  onSubmit,
  schema,
  defaultValues,
  children,
  className,
  id,
  noValidate = false,
}: AccessibleFormProps<T>) {
  const methods = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues as T,
    mode: 'onBlur',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: T) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      await onSubmit(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          noValidate={noValidate}
          id={id}
          className={className}
          role="form"
          aria-label={id || 'Form'}
        >
          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
              <div className="flex items-center gap-2 text-red-800">
                <XCircle className="w-5 h-5" />
                <span className="font-medium">Error:</span>
              </div>
              <p className="mt-1 text-red-700">{submitError}</p>
            </div>
          )}
          
          {children}
          
          {isSubmitting && (
            <div className="mt-4">
              <Progress value={50} className="w-full" />
              <p className="mt-2 text-sm text-gray-600" aria-live="polite">
                Submitting your form...
              </p>
            </div>
          )}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
}

// Accessibility utilities for forms
export const formAccessibility = {
  // Announce form submission status
  announceSubmit: (success: boolean, message?: string) => {
    if (typeof window !== 'undefined') {
      const announcement = success 
        ? `Form submitted successfully. ${message || ''}`
        : `Form submission failed. ${message || 'Please try again.'}`;
      
      // Use ARIA live region for announcements
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.textContent = announcement;
      document.body.appendChild(liveRegion);
      
      setTimeout(() => {
        document.body.removeChild(liveRegion);
      }, 1000);
    }
  },

  // Focus management utilities
  focusFirstError: () => {
    const firstError = document.querySelector('[aria-invalid="true"]');
    if (firstError) {
      (firstError as HTMLElement).focus();
      return true;
    }
    return false;
  },

  // Form validation summary
  getValidationSummary: (errors: any) => {
    const errorMessages = Object.values(errors).map((error: any) => error.message);
    return {
      count: errorMessages.length,
      messages: errorMessages,
      summary: `Please correct the ${errorMessages.length} error(s) below before submitting.`
    };
  },
};