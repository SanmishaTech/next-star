'use client';

import { useState, Suspense } from 'react';
import { Navbar, Header, Footer } from '@/components/navigation';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  loadingMessage?: string;
}

function DashboardLoadingFallback({ loadingMessage = "Loading..." }: { loadingMessage: string }) {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <div className="text-muted-foreground">{loadingMessage}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardLayout({ children, loadingMessage = "Loading..." }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Navbar/Sidebar */}
      <Navbar
        sidebarCollapsed={sidebarCollapsed}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          <TooltipProvider>
            <div className="p-6 space-y-6">
              <Suspense fallback={<DashboardLoadingFallback loadingMessage={loadingMessage} />}>
                {children}
              </Suspense>
            </div>
          </TooltipProvider>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
