import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface MobileDrawerProps {
  children: ReactNode;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ children }) => {
  const [drawerHeight, setDrawerHeight] = useState(40); 
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;
      const maxScroll = 100; 
      
      const scrollPercentage = Math.min(scrollTop / maxScroll, 1);
      const newHeight = 40 + (60 * scrollPercentage); 
      
      setDrawerHeight(newHeight);
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main drawer container - dynamic height based on scroll */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-40 overflow-hidden border-t border-gray-100 transition-all duration-200 ease-out"
        style={{ height: `${drawerHeight}vh` }}
      >        
        
        {/* Drawer content - scrollable */}
        <div 
          ref={scrollRef}
          className="overflow-y-auto h-[calc(100%-48px)] pb-20"
        >
          {children}
          {/* Extra scrollable space to trigger expansion */}
          <div className="h-32" />
        </div>
      </div>
    </>
  );
};