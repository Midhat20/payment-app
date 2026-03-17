import React from 'react';
import { Card } from '../../types';
import { formatCardNumber, maskCardNumber } from '../../utils/cardUtils';

interface DebitCardProps {
  card: Card;
  showNumber?: boolean;
}

export const DebitCard: React.FC<DebitCardProps> = ({ 
  card, 
  showNumber = false 
}) => {
  const displayNumber = showNumber ? formatCardNumber(card.number) : maskCardNumber(card.number);

  return (
    <div className={`relative w-full max-w-sm mx-auto ${card.frozen ? 'frozen-card' : ''}`}>
      <div className="bg-gradient-to-br from-aspire-green to-green-400 rounded-2xl p-6 text-white shadow-card-lg card-3d min-h-[200px] flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-end items-start mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-white font-semibold">aspire</span>
          </div>
        </div>

        {/* Card holder name */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold tracking-wide">{card.name}</h3>
        </div>

        {/* Card number */}
        <div className="mb-6">
          <div className="font-mono text-lg tracking-wider">
            {displayNumber}
          </div>
        </div>

        {/* Card details */}
        <div className="flex justify-between items-end">
          <div className="text-xs opacity-80">
            Thru: {card.expiryDate} &nbsp;&nbsp; CVV: {showNumber ? card.cvv : '***'}
          </div>
          <div className="text-2xl font-bold">VISA</div>
        </div>

        {/* Frozen overlay */}
        {card.frozen && (
          <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center z-10">
            <div className="bg-white/90 px-4 py-2 rounded-lg">
              <span className="text-aspire-blue font-semibold text-sm">Card Frozen</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};