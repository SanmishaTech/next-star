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
}

export interface TimeFormatOptions {
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  hour12?: boolean;
  timeZone?: string;
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
