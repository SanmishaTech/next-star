# ERP Admin System

A modern, enterprise-grade ERP admin system built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Development Guidelines](#-development-guidelines)
- [Naming Conventions](#-naming-conventions)
- [Development Checklist](#-development-checklist)
- [Project Structure](#-project-structure)
- [Environment Configuration](#-environment-configuration)
- [Contributing](#-contributing)

## ✨ Features

- 🚀 **Next.js 15** with App Router and Turbopack
- 🎨 **shadcn/ui** components with Radix UI primitives
- 💅 **Tailwind CSS** with modern design system
- 🔐 **Authentication** with JWT tokens and route protection
- 📱 **Responsive Design** optimized for all devices
- 🏗️ **Modular Architecture** with organized routing
- ⚙️ **Environment Configuration** with comprehensive settings
- 🎯 **TypeScript** for type safety and better DX
- 🌙 **Dark/Light Theme** support
- 📊 **Dashboard** with metrics and activity tracking

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.4+
- **Components**: shadcn/ui (Radix UI + CVA)
- **Icons**: Lucide React
- **Themes**: next-themes
- **Linting**: ESLint + Prettier
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm 9.0 or later

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-star
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Development Guidelines

### Code Quality Standards

1. **TypeScript First**: All components and utilities must be written in TypeScript
2. **Component Design**: Use functional components with hooks
3. **Styling**: Use Tailwind CSS classes, avoid inline styles
4. **State Management**: Use React hooks for local state
5. **Error Handling**: Implement proper error boundaries and try-catch blocks
6. **Performance**: Implement code splitting and lazy loading where appropriate

### Best Practices

- ✅ Use TypeScript interfaces for all props and data structures
- ✅ Implement proper error handling and loading states
- ✅ Write self-documenting code with clear variable names
- ✅ Use constants for magic numbers and strings
- ✅ Implement proper accessibility (a11y) standards
- ✅ Use semantic HTML elements
- ✅ Optimize images and assets
- ✅ Follow the single responsibility principle

## 📝 Naming Conventions

### Files and Folders

```
📁 Components: PascalCase
   ✅ UserProfile.tsx
   ✅ DashboardLayout.tsx
   ❌ userProfile.tsx

📁 Pages: kebab-case
   ✅ user-profile/page.tsx
   ✅ forgot-password/page.tsx
   ❌ userProfile/page.tsx

📁 Utilities: camelCase
   ✅ authUtils.ts
   ✅ dateHelpers.ts
   ❌ auth-utils.ts

📁 Hooks: camelCase starting with 'use'
   ✅ useAuth.ts
   ✅ useClientOnly.ts
   ❌ auth.ts
```

### Variables and Functions

```typescript
// ✅ Variables: camelCase
const userProfile = {};
const isAuthenticated = true;

// ✅ Functions: camelCase with verbs
const handleSubmit = () => {};
const validateForm = () => {};

// ✅ Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// ✅ Components: PascalCase
const UserProfile = () => {};
const DashboardLayout = () => {};

// ✅ Interfaces: PascalCase with 'I' prefix (optional)
interface UserProfileProps {}
interface IApiResponse {}

// ✅ Types: PascalCase with 'T' prefix (optional)
type UserRole = 'admin' | 'user';
type TApiStatus = 'loading' | 'success' | 'error';
```

### CSS Classes

```css
/* ✅ BEM Methodology for custom CSS */
.header__navigation
.button--primary
.modal__content--large

/* ✅ Tailwind: Use utility classes */
className="flex items-center justify-between p-4 bg-white rounded-lg"
```

## ✅ Development Checklist

### Before Starting Development

- [ ] Read and understand the project requirements
- [ ] Review existing code patterns and conventions
- [ ] Set up development environment
- [ ] Configure IDE with TypeScript and ESLint extensions
- [ ] Understand the component library (shadcn/ui)

### During Development

#### Component Development
- [ ] Create TypeScript interfaces for all props
- [ ] Implement proper error handling
- [ ] Add loading and empty states
- [ ] Ensure responsive design (mobile-first)
- [ ] Test component in isolation
- [ ] Add proper accessibility attributes
- [ ] Use semantic HTML elements
- [ ] Implement proper keyboard navigation

#### Code Quality
- [ ] Follow naming conventions consistently
- [ ] Write self-documenting code
- [ ] Add comments for complex logic
- [ ] Remove unused imports and variables
- [ ] Use TypeScript strict mode
- [ ] Handle all possible error states
- [ ] Implement proper form validation

#### Styling
- [ ] Use Tailwind CSS utility classes
- [ ] Ensure consistent spacing and sizing
- [ ] Test in both light and dark themes
- [ ] Verify responsive breakpoints
- [ ] Check color contrast ratios
- [ ] Use design system tokens

### Before Committing

- [ ] Run `npm run build` to check for build errors
- [ ] Run `npm run lint` to check for linting issues
- [ ] Test all functionality manually
- [ ] Check browser console for errors
- [ ] Verify responsive design on different devices
- [ ] Test accessibility with screen readers
- [ ] Review code for security vulnerabilities
- [ ] Update documentation if needed

### Testing Checklist

- [ ] Test happy path scenarios
- [ ] Test error scenarios
- [ ] Test edge cases and boundary conditions
- [ ] Test form validation
- [ ] Test navigation and routing
- [ ] Test authentication flows
- [ ] Cross-browser testing
- [ ] Mobile device testing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── login/             # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── customers/         # Customer management
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layouts/          # Layout components
│   ├── navigation/       # Navigation components
│   └── providers/        # Context providers
├── lib/                   # Utility libraries
│   ├── config.ts         # App configuration
│   └── utils.ts          # Helper utilities
├── hooks/                 # Custom React hooks
│   └── useAuth.ts        # Authentication hook
└── styles/               # Global styles
    └── globals.css       # Tailwind CSS imports
```

## ⚙️ Environment Configuration

### Environment Variables

```bash
# Application Configuration
NEXT_PUBLIC_APP_NAME="ERP Admin System"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Authentication
NEXT_PUBLIC_AUTH_ENABLED=true
JWT_SECRET="your-super-secret-jwt-key"
AUTH_TOKEN_EXPIRY="24h"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
API_RATE_LIMIT=100

# Database Configuration
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Logging
LOG_LEVEL="info"

# Localization Settings
NEXT_PUBLIC_CURRENCY_CODE="INR"           # Currency code (INR, USD, EUR, GBP, etc.)
NEXT_PUBLIC_CURRENCY_LOCALE="hi-IN"       # Locale for currency formatting
NEXT_PUBLIC_DATE_LOCALE="hi-IN"           # Locale for date/time formatting
NEXT_PUBLIC_TIMEZONE="Asia/Kolkata"       # Timezone for date/time display
NEXT_PUBLIC_DATE_FORMAT_OPTIONS='{"year":"numeric","month":"short","day":"numeric"}'
NEXT_PUBLIC_TIME_FORMAT_OPTIONS='{"hour":"2-digit","minute":"2-digit","hour12":true,"timeZone":"Asia/Kolkata"}'
```

### Localization Configuration

The system supports configurable currency, date/time formatting, and timezone through environment variables:

```typescript
// Available localization settings
NEXT_PUBLIC_CURRENCY_CODE        # Currency code (ISO 4217)
NEXT_PUBLIC_CURRENCY_LOCALE      # Locale for currency formatting  
NEXT_PUBLIC_DATE_LOCALE          # Locale for date/time formatting
NEXT_PUBLIC_TIMEZONE             # Timezone (IANA timezone identifier)
NEXT_PUBLIC_DATE_FORMAT_OPTIONS  # JSON string with date format options
NEXT_PUBLIC_TIME_FORMAT_OPTIONS  # JSON string with time format options
```

**Example configurations for different regions:**

```bash
# Indian Format (current default)
NEXT_PUBLIC_CURRENCY_CODE=INR
NEXT_PUBLIC_CURRENCY_LOCALE=hi-IN
NEXT_PUBLIC_DATE_LOCALE=hi-IN
NEXT_PUBLIC_TIMEZONE=Asia/Kolkata

# US Format
NEXT_PUBLIC_CURRENCY_CODE=USD
NEXT_PUBLIC_CURRENCY_LOCALE=en-US
NEXT_PUBLIC_DATE_LOCALE=en-US
NEXT_PUBLIC_TIMEZONE=America/New_York

# European Format
NEXT_PUBLIC_CURRENCY_CODE=EUR
NEXT_PUBLIC_CURRENCY_LOCALE=de-DE
NEXT_PUBLIC_DATE_LOCALE=de-DE
NEXT_PUBLIC_TIMEZONE=Europe/Berlin

# UK Format
NEXT_PUBLIC_CURRENCY_CODE=GBP
NEXT_PUBLIC_CURRENCY_LOCALE=en-GB
NEXT_PUBLIC_DATE_LOCALE=en-GB
NEXT_PUBLIC_TIMEZONE=Europe/London
```

**Usage in components:**

```typescript
import { formatDateTime, formatAmount, getCurrentDateTime, formatDateTimeWithTimezone } from '@/lib/locale-utils';

// Format currency amounts
const formattedPrice = formatAmount(1234.56); // "₹1,234.56" (India) or "$1,234.56" (US)

// Format date/time values with timezone
const { date, time } = formatDateTime('2024-07-23 14:30:00');
// date: "23 जुल॰ 2024" (Hindi) or "Jul 23, 2024" (US)
// time: "2:30 PM" (with IST timezone) or "2:30 PM" (with local timezone)

// Get current date/time in configured timezone
const current = getCurrentDateTime();

// Format with custom timezone
const { date, time, timezone } = formatDateTimeWithTimezone('2024-07-23 14:30:00', 'America/New_York');
```

### Configuration Usage

```typescript
import config from '@/lib/config';

// Access configuration values
console.log(config.app.name);        // "ERP Admin System"
console.log(config.auth.enabled);    // true
console.log(config.api.url);         // "http://localhost:3001/api"
```

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript compiler

# Utilities
npm run clean        # Clean build artifacts
```

## 🎨 Component Guidelines

### Component Structure

```typescript
// ✅ Recommended component structure
'use client'; // If using client-side features

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  title: string;
  onSubmit: () => void;
  isLoading?: boolean;
}

export default function Component({ 
  title, 
  onSubmit, 
  isLoading = false 
}: ComponentProps) {
  const [state, setState] = useState();

  const handleAction = () => {
    // Implementation
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button 
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
    </div>
  );
}
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Follow the development checklist**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Commit Message Convention

```
feat: add user authentication
fix: resolve navigation issue
docs: update README
style: format code
refactor: restructure components
test: add unit tests
chore: update dependencies
```

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

---

**Happy Coding! 🚀**
    compactMode: false,
    theme: 'light',
  }
}
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## Demo Credentials

- **Email**: admin@example.com
- **Password**: admin123

## Project Structure

```
app/
├── (auth)/
│   └── login/
├── dashboard/           # Main dashboard
├── analytics/           # Business analytics
├── customers/           # Customer management
├── inventory/           # Product inventory
├── orders/              # Order management
└── components/
    ├── ui/              # shadcn/ui components
    └── layouts/         # Layout components

components/
├── ui/                  # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
└── layouts/
    └── CompactLayout.tsx

lib/
├── config.ts           # Environment configuration
└── utils.ts            # Utility functions
```

## shadcn/ui Components

The application uses shadcn/ui for consistent, accessible components:

- **Button** - Various sizes and variants
- **Card** - Content containers with headers
- **Input** - Form inputs with validation
- **Layout** - Responsive navigation and structure

## Route Protection

The middleware protects authenticated routes:

```typescript
// Protected routes
- /dashboard/*
- /analytics/*
- /customers/*
- /inventory/*
- /orders/*

// Public routes
- /login
- /
```

## Customization

### Compact Mode
Enable compact UI mode in `lib/config.ts`:
```typescript
ui: {
  compactMode: true
}
```

### Feature Flags
Toggle modules in `lib/config.ts`:
```typescript
features: {
  analytics: false,  // Disable analytics
  inventory: true,   // Keep inventory
}
```

### Theme Configuration
Customize the theme in `tailwind.config.ts` using CSS variables and design tokens.

## Development

### Adding New Modules
1. Create new route in `app/[module-name]/page.tsx`
2. Add feature flag in `lib/config.ts` 
3. Update middleware protection in `middleware.ts`
4. Add navigation link in `CompactLayout.tsx`

### Building for Production
```bash
npm run build
npm start
```

## License

This project is open source and available under the MIT License.
