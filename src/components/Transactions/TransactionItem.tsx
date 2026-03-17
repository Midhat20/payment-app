import React from 'react';
import { CreditCard, Plane, ShoppingBag, ChevronRight } from 'lucide-react';
import { Transaction } from '../../types';

interface TransactionItemProps {
  transaction: Transaction;
}

const formatAmount = (amount: number): string => {
  const isNegative = amount < 0;
  const formattedAmount = Math.abs(amount).toFixed(0);
  return `${isNegative ? '- ' : '+ '}S$ ${formattedAmount}`;
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-SG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};

const getTransactionIconAndBg = (transaction: Transaction) => {
  const isRefund = transaction.description?.includes('Refund');
  const merchant = transaction.merchant.toLowerCase();
  
  if (isRefund) {
    return {
      icon: CreditCard,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    };
  }
  
  if (merchant.includes('hamley') || merchant.includes('toy')) {
    // First transaction - green for refund, pink for charge
    if (transaction.amount > 0) {
      return {
        icon: CreditCard,
        bgColor: 'bg-green-100',
        iconColor: 'text-green-600'
      };
    } else {
      // Alternate colors for different transactions
      const colors = [
        { bgColor: 'bg-green-100', iconColor: 'text-green-600', icon: Plane },
        { bgColor: 'bg-pink-100', iconColor: 'text-pink-600', icon: ShoppingBag }
      ];
      const index = Math.abs(transaction.id.charCodeAt(0)) % colors.length;
      return colors[index];
    }
  }
  
  // Default for other merchants
  return {
    icon: CreditCard,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  };
};

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isRefund = transaction.description?.includes('Refund');
  const { icon: IconComponent, bgColor, iconColor } = getTransactionIconAndBg(transaction);

  return (
    <div className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors group">
      <div className="flex items-center space-x-4 flex-1">
        {/* Transaction icon */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}>
          <IconComponent size={20} className={iconColor} />
        </div>
        
        {/* Transaction details */}
        <div className="flex-1">
          <h4 className="font-medium text-aspire-text-primary text-base">
            {transaction.merchant}
          </h4>
          <p className="text-sm text-aspire-text-secondary">
            {formatDate(transaction.date)}
          </p>
          {/* Status with blue card icon */}
          <div className="flex items-center mt-1">
            <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center mr-2">
              <CreditCard size={10} className="text-white" />
            </div>
            <span className="text-xs text-blue-600">
              {isRefund ? 'Refund on debit card' : 'Charged to debit card'}
            </span>
          </div>
        </div>
      </div>

      {/* Transaction amount and arrow */}
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <div className={`font-semibold text-lg ${
            isRefund ? 'text-green-600' : 'text-aspire-text-primary'
          }`}>
            {formatAmount(transaction.amount)}
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
      </div>
    </div>
  );
};