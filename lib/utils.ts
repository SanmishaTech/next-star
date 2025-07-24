import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safe JSON parsing function
const safeJSONParse = (jsonString: string | undefined, fallback: any) => {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse JSON from environment variable:', jsonString);
    return fallback;
  }
};

// Environment configuration for localization
export const localeConfig = {
  currency: {
    code: process.env.NEXT_PUBLIC_CURRENCY_CODE || 'USD',
    locale: process.env.NEXT_PUBLIC_CURRENCY_LOCALE || 'en-US',
  },
  date: {
    locale: process.env.NEXT_PUBLIC_DATE_LOCALE || 'en-US',
    timezone: process.env.NEXT_PUBLIC_TIMEZONE || 'UTC',
    formatOptions: safeJSONParse(
      process.env.NEXT_PUBLIC_DATE_FORMAT_OPTIONS,
      { year: 'numeric', month: 'short', day: 'numeric' }
    ),
    timeFormatOptions: safeJSONParse(
      process.env.NEXT_PUBLIC_TIME_FORMAT_OPTIONS,
      { hour: '2-digit', minute: '2-digit', hour12: true }
    ),
  },
};

// Type definitions for better type safety
export interface DateFormatOptions {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  timeZone?: string;
}

export interface TimeFormatOptions {
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  hour12?: boolean;
  timeZone?: string;
}

/**
 * Get date format from environment variables
 * Falls back to a default format if not specified
 */
export function getDateFormat(): string {
  // First try to get the simple date format
  const dateFormat = process.env.NEXT_PUBLIC_DATE_FORMAT;
  if (dateFormat) {
    return dateFormat;
  }
  
  // Fallback: Try to get the date format from JSON options
  const dateFormatOptions = process.env.NEXT_PUBLIC_DATE_FORMAT_OPTIONS;
  
  if (dateFormatOptions) {
    try {
      const options = JSON.parse(dateFormatOptions);
      // Convert Intl.DateTimeFormatOptions to date-fns format string
      if (options.year === 'numeric' && options.month === '2-digit' && options.day === 'numeric') {
        return 'MM/dd/yyyy'; // US format
      } else if (options.year === 'numeric' && options.month === '2-digit' && options.day === '2-digit') {
        return 'dd/MM/yyyy'; // European format
      } else if (options.year === 'numeric' && options.month === 'long' && options.day === 'numeric') {
        return 'MMMM d, yyyy'; // Long format
      }
    } catch (error) {
      console.warn('Invalid date format options in environment:', error);
    }
  }
  
  // Default to a readable format
  return 'PPP'; // date-fns format for "April 29th, 2023"
}

/**
 * Get time format from environment variables
 */
export function getTimeFormat(): string {
  return process.env.NEXT_PUBLIC_TIME_FORMAT || 'hh:mm a';
}

/**
 * Get locale from environment variables
 */
export function getDateLocale(): string {
  return process.env.NEXT_PUBLIC_DATE_LOCALE || 'en-US';
}

// Utility functions for formatting with environment configuration
export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string provided:', dateString);
      return 'Invalid Date';
    }
    
    return date.toLocaleDateString(
      localeConfig.date.locale, 
      localeConfig.date.formatOptions as DateFormatOptions
    );
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Error';
  }
};

export const formatDateTime = (dateTimeString: string) => {
  try {
    const date = new Date(dateTimeString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string provided:', dateTimeString);
      return { date: 'Invalid Date', time: 'Invalid Time' };
    }
    
    // Ensure timezone is included in time formatting options
    const timeOptions = {
      ...localeConfig.date.timeFormatOptions,
      timeZone: localeConfig.date.timezone,
    } as TimeFormatOptions;
    
    return {
      date: date.toLocaleDateString(
        localeConfig.date.locale, 
        localeConfig.date.formatOptions as DateFormatOptions
      ),
      time: date.toLocaleTimeString(
        localeConfig.date.locale, 
        timeOptions
      ),
    };
  } catch (error) {
    console.error('Error formatting date/time:', error);
    return { date: 'Error', time: 'Error' };
  }
};

// Additional utility function to get current time in configured timezone
export const getCurrentDateTime = () => {
  return formatDateTime(new Date().toISOString());
};

// Utility function to convert any date to configured timezone
export const formatDateTimeWithTimezone = (dateTimeString: string, customTimezone?: string) => {
  try {
    const date = new Date(dateTimeString);
    
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string provided:', dateTimeString);
      return { date: 'Invalid Date', time: 'Invalid Time' };
    }
    
    const timezone = customTimezone || localeConfig.date.timezone;
    const timeOptions = {
      ...localeConfig.date.timeFormatOptions,
      timeZone: timezone,
    } as TimeFormatOptions;
    
    return {
      date: date.toLocaleDateString(localeConfig.date.locale, {
        ...localeConfig.date.formatOptions as DateFormatOptions,
        timeZone: timezone,
      }),
      time: date.toLocaleTimeString(localeConfig.date.locale, timeOptions),
      timezone: timezone,
    };
  } catch (error) {
    console.error('Error formatting date/time with timezone:', error);
    return { date: 'Error', time: 'Error', timezone: 'Error' };
  }
};

export const formatAmount = (amount: number) => {
  try {
    // Check if amount is a valid number
    if (typeof amount !== 'number' || isNaN(amount)) {
      console.warn('Invalid amount provided:', amount);
      return 'Invalid Amount';
    }
    
    return new Intl.NumberFormat(localeConfig.currency.locale, {
      style: 'currency',
      currency: localeConfig.currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting amount:', error);
    return `${localeConfig.currency.code} ${amount.toFixed(2)}`;
  }
};
