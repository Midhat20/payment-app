import React from 'react';
import { Home, CreditCard, DollarSign, TrendingUp, Settings, Menu, X } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  active: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: Home, active: false },
  { id: 'cards', label: 'Cards', icon: CreditCard, active: true },
  { id: 'payments', label: 'Payments', icon: DollarSign, active: false },
  { id: 'credit', label: 'Credit', icon: TrendingUp, active: false },
  { id: 'settings', label: 'Settings', icon: Settings, active: false },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-aspire-blue text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-80 bg-aspire-blue-dark 
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full pt-6">
          {/* Logo */}
          <div className="px-6 py-12">
            <div className="flex flex-col">
           <div className="flex items-center">
           <div className="w-7 h-7 bg-aspire-green rounded flex items-center justify-center flex-shrink-0">
                A
              </div>
              <h1 className="text-green-600 font-bold text-xl leading-none pl-2" style={{ color: '#4ade80',fontSize: '32px' }}>aspire</h1>
           </div>
              <div className="flex-1">
                <p className="text-white/70 text-md leading-tight pt-6">
                  Trusted way of banking for 3,000+<br />SMEs and startups in Singapore
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-0">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className={`sidebar-nav-item ${item.active ? 'active' : ''}`}
                >
                  <IconComponent size={20} className="mr-4" />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};