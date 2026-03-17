import React from 'react';
import { 
  Snowflake, 
  DollarSign, 
  Smartphone, 
  CreditCard, 
  X,
  RotateCcw
} from 'lucide-react';
import { Card } from '../../types';

interface CardAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
  disabled?: boolean;
}

interface CardActionsProps {
  card: Card;
  onFreezeToggle: (cardId: string) => void;
  onAddToGPay: (cardId: string) => void;
  onSetSpendLimit: (cardId: string) => void;
  onReplaceCard: (cardId: string) => void;
  onCancelCard: (cardId: string) => void;
}

export const CardActions: React.FC<CardActionsProps> = ({
  card,
  onFreezeToggle,
  onAddToGPay,
  onSetSpendLimit,
  onReplaceCard,
  onCancelCard,
}) => {
  const actions: CardAction[] = [
    {
      id: 'freeze',
      label: card.frozen ? 'Unfreeze card' : 'Freeze card',
      icon: card.frozen ? RotateCcw : Snowflake,
      onClick: () => onFreezeToggle(card.id),
    },
    {
      id: 'spend-limit',
      label: 'Set spend limit',
      icon: DollarSign,
      onClick: () => onSetSpendLimit(card.id),
    },
    {
      id: 'gpay',
      label: 'Add to GPay',
      icon: Smartphone,
      onClick: () => onAddToGPay(card.id),
    },
    {
      id: 'replace',
      label: 'Replace card',
      icon: CreditCard,
      onClick: () => onReplaceCard(card.id),
    },
    {
      id: 'cancel',
      label: 'Cancel card',
      icon: X,
      onClick: () => onCancelCard(card.id),
    },
  ];

  return (
    <div className="lg:bg-blue-100 lg:rounded-xl lg:shadow-card overflow-hidden">
      {/* Mobile horizontal scroll layout */}
      <div className="lg:hidden py-4">
        <div className="flex space-x-5 overflow-x-auto scrollbar-hide">
          {actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                disabled={action.disabled}
                className="flex flex-col items-center flex-shrink-0 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  action.id === 'freeze' 
                    ? card.frozen
                      ? 'bg-orange-100 text-orange-600 group-hover:bg-orange-200'
                      : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                }`}>
                  <IconComponent size={20} />
                </div>
                <span className="text-xs text-center text-aspire-text-primary font-medium w-16">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop grid layout */}
      <div className="hidden lg:grid grid-cols-5 gap-4 p-6">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              disabled={action.disabled}
              className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                action.id === 'freeze' 
                  ? card.frozen
                    ? 'bg-orange-100 text-orange-600 group-hover:bg-orange-200'
                    : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
              }`}>
                <IconComponent size={20} />
              </div>
              <span className="text-xs text-center text-aspire-text-primary font-medium">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};