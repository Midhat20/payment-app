import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { BottomNavigation } from './BottomNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-aspire-gray">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      </div>
      
      <main className="flex-1 overflow-hidden lg:overflow-auto lg:ml-0">
        {/* Mobile layout - no padding, full width, no overflow scroll (drawer handles scrolling) */}
        <div className="lg:hidden min-h-screen overflow-hidden">
          {children}
        </div>
        
        {/* Desktop layout - with padding */}
        <div className="hidden lg:block min-h-full px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      {/* Bottom navigation for mobile */}
      <BottomNavigation />
    </div>
  );
};