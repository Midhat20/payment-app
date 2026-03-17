import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Card } from '../../types';
import { DebitCard } from './DebitCard';

interface CardCarouselProps {
  cards: Card[];
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNumber, setShowNumber] = useState(false);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setShowNumber(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setShowNumber(false);
  };

  const toggleNumber = () => {
    setShowNumber(!showNumber);
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-white rounded-xl shadow-card">
        <p className="text-aspire-text-secondary">No cards available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Show card number control - moved above card */}
      <div className="flex items-center justify-end mb-4 px-4 lg:px-0">
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={toggleNumber}
            className="p-1 hover:bg-gray-100 lg:hover:bg-gray-100 rounded transition-colors"
          >
            {showNumber ? <EyeOff size={16} color="green" /> : <Eye size={16} color="green" />}
          </button>
          <span className="text-green-600 font-semibold text-sm w-32">
            { showNumber ? 'Hide card number' : 'Show card number' }
          </span>
        </div>
      </div>

      {/* Card display area */}
      <div className="relative h-56 lg:h-64 mb-4 px-4 lg:px-0">
        <DebitCard
          card={cards[currentIndex]}
          showNumber={showNumber}
        />
        
        {/* Navigation buttons - hidden on mobile */}
        {cards.length > 1 && (
          <>
            <button
              onClick={prevCard}
              className="hidden lg:block absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
              disabled={cards.length <= 1}
            >
              <ChevronLeft size={20} className="text-aspire-blue" />
            </button>
            <button
              onClick={nextCard}
              className="hidden lg:block absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
              disabled={cards.length <= 1}
            >
              <ChevronRight size={20} className="text-aspire-blue" />
            </button>
          </>
        )}
      </div>

      {/* Card indicators */}
      {cards.length > 1 && (
        <div className="flex justify-center space-x-2 mb-4 px-4 lg:px-0">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setShowNumber(false);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-aspire-green'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};