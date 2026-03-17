import React, { useState } from 'react';
import { CreditCard, ChevronDown, ChevronUp } from 'lucide-react';

interface CardDetailsProps {
  defaultExpanded?: boolean;
}

export const CardDetails: React.FC<CardDetailsProps> = ({ 
  defaultExpanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="lg:rounded-xl lg:shadow-card mb-6 bg-white lg:bg-transparent">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 lg:p-6 bg-blue-50 lg:bg-blue-100 rounded-xl"
      >
        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard size={20} className="text-blue-600" />
          </div>
          <h3 className="text-base lg:text-lg font-semibold text-aspire-text-primary">
            Card details
          </h3>
        </div>
        <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gray-100 rounded-full flex items-center justify-center">
          {isExpanded ? (
            <ChevronUp size={16} className="text-gray-500" />
          ) : (
            <ChevronDown size={16} className="text-gray-500" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 lg:px-6 pb-4 lg:pb-6 border-t border-gray-100">
          <div className="pt-4 space-y-3 lg:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-aspire-text-secondary">Card holder</span>
              <span className="text-sm font-medium text-aspire-text-primary">Mark Henry</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-aspire-text-secondary">Card number</span>
              <span className="text-sm font-medium text-aspire-text-primary">**** **** **** 2020</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-aspire-text-secondary">Valid thru</span>
              <span className="text-sm font-medium text-aspire-text-primary">12/26</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-aspire-text-secondary">CVV</span>
              <span className="text-sm font-medium text-aspire-text-primary">***</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};