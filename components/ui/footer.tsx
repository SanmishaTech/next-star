'use client';

import { Heart } from 'lucide-react';
import config from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          {/* Left side - Copyright */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} {config.app.name}</span>
            <span>•</span>
            <span>Version {config.app.version}</span>
          </div>

          {/* Center - Made with love */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by Your Team</span>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center space-x-4 text-sm">
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => window.open('/privacy', '_blank')}
            >
              Privacy
            </button>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => window.open('/terms', '_blank')}
            >
              Terms
            </button>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => window.open('/support', '_blank')}
            >
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
