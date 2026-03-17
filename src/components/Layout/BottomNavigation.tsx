import React from 'react';
import { Home, CreditCard, DollarSign, TrendingUp, User } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  active: boolean;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: Home, active: false },
  { id: 'cards', label: 'Cards', icon: CreditCard, active: true },
  { id: 'payments', label: 'Payments', icon: DollarSign, active: false },
  { id: 'credit', label: 'Credit', icon: TrendingUp, active: false },
  { id: 'profile', label: 'Profile', icon: User, active: false },
];

export const BottomNavigation: React.FC = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 ${
                item.active ? 'text-aspire-green' : 'text-gray-500'
              }`}
            >
              <IconComponent 
                size={20} 
                className={item.active ? 'text-aspire-green' : 'text-gray-500'} 
              />
              <span className={`text-xs mt-1 font-medium ${
                item.active ? 'text-aspire-green' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};