import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Transaction } from '../../types';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  loading = false 
}) => {
  const [isTransactionsExpanded, setIsTransactionsExpanded] = useState(true);
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-aspire-text-primary">
            Recent transactions
          </h3>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4 py-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-aspire-text-primary">
            Recent transactions
          </h3>
        </div>
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-aspire-text-secondary">No transactions available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recent transactions section */}
      <div className="lg:rounded-xl lg:shadow-card bg-white lg:bg-transparent">
        <button
          onClick={() => setIsTransactionsExpanded(!isTransactionsExpanded)}
          className="w-full flex items-center justify-between p-4 lg:p-6 bg-blue-50 lg:bg-blue-100 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText size={20} className="text-blue-600" />
            </div>
            <span className="text-base lg:text-lg font-semibold text-aspire-text-primary">
              Recent transactions
            </span>
          </div>
          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gray-100 rounded-full flex items-center justify-center">
            {isTransactionsExpanded ? (
              <ChevronUp size={16} className="text-gray-600" />
            ) : (
              <ChevronDown size={16} className="text-gray-600" />
            )}
          </div>
        </button>
        
        {isTransactionsExpanded && (
          <div>
            <div className="px-4 lg:px-6 pb-4">
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
            
            {/* View all transactions link */}
            {transactions.length > 0 && (
              <div className="px-4 lg:px-6 pb-4 lg:pb-6 text-center border-t border-gray-100 pt-4 bg-gray-50 lg:bg-gray-100">
                <button className="text-aspire-green font-medium hover:text-green-600 transition-colors text-sm">
                  View all card transactions
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};