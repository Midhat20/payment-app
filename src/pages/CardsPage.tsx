import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Card, Transaction, User } from '../types';
import { api } from '../services/api';
import { CardCarousel } from '../components/Cards/CardCarousel';
import { CardActions } from '../components/Cards/CardActions';
import { CardDetails } from '../components/Cards/CardDetails';
import { TransactionList } from '../components/Transactions/TransactionList';
import { AddCardModal } from '../components/Modal/AddCardModal';
import { MobileDrawer } from '../components/Layout/MobileDrawer';

export const CardsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [addCardModalOpen, setAddCardModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Initialize data on component mount
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(true);
      await api.initializeData();
      
      const [userResponse, cardsResponse, transactionsResponse] = await Promise.all([
        api.getUser(),
        api.getCards(),
        api.getRecentTransactions(10),
      ]);

      if (userResponse.success) {
        setUser(userResponse.data);
      }

      if (cardsResponse.success) {
        setCards(cardsResponse.data);
      }

      if (transactionsResponse.success) {
        setTransactions(transactionsResponse.data);
      }
    } catch (error) {
      console.error('Failed to initialize data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (formData: { name: string }) => {
    const response = await api.addCard(formData);
    if (response.success) {
      setCards(prev => [...prev, response.data]);
    }
  };

  const handleFreezeToggle = async (cardId: string) => {
    setActionLoading(true);
    try {
      const response = await api.freezeCard(cardId);
      if (response.success) {
        setCards(prev =>
          prev.map(card =>
            card.id === cardId ? { ...card, frozen: response.data.frozen } : card
          )
        );
      }
    } catch (error) {
      console.error('Failed to toggle card freeze:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddToGPay = (cardId: string) => {
    console.log('Add to GPay:', cardId);
    // Implement GPay integration
  };

  const handleSetSpendLimit = (cardId: string) => {
    console.log('Set spend limit:', cardId);
    // Implement spend limit functionality
  };

  const handleReplaceCard = (cardId: string) => {
    console.log('Replace card:', cardId);
    // Implement card replacement
  };

  const handleCancelCard = async (cardId: string) => {
    if (window.confirm('Are you sure you want to cancel this card?')) {
      try {
        const response = await api.deleteCard(cardId);
        if (response.success) {
          setCards(prev => prev.filter(card => card.id !== cardId));
        }
      } catch (error) {
        console.error('Failed to cancel card:', error);
      }
    }
  };

  const currentCard = cards.length > 0 ? cards[0] : null;

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-64 bg-gray-200 rounded-xl" />
        <div className="h-32 bg-gray-200 rounded-xl" />
        <div className="h-96 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aspire-blue-dark lg:bg-aspire-gray">
      {/* Mobile layout */}
      <div className="lg:hidden">
        {/* Fixed header and cards section */}
        <div className="fixed top-0 left-0 right-0 z-30 bg-aspire-blue-dark">
          {/* Mobile header */}
          <div className="px-4 pt-12 pb-6">
            {/* Account balance */}
            {user && (
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm text-white/70 mb-2">
                    Account balance
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs bg-aspire-green text-white px-2 py-1 rounded">
                      S$
                    </span>
                    <span className="text-4xl font-bold text-white">
                      {user.balance.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setAddCardModalOpen(true)}
                  className="flex items-center space-x-2 bg-white/20 text-white px-3 py-2 rounded-lg backdrop-blur-sm"
                >
                  <Plus size={16} />
                  <span className="text-sm">New card</span>
                </button>
              </div>
            )}
          </div>

          {/* Card tabs */}
          <div className="px-4">
            <div className="flex space-x-6 border-b border-white/20">
              <button className="pb-3 text-aspire-green border-b-2 border-aspire-green font-medium">
                My debit cards
              </button>
              <button className="pb-3 text-white/70 hover:text-white">
                All company cards
              </button>
            </div>
          </div>

          {/* Fixed card carousel */}
          <div className="px-4 py-6">
            <CardCarousel cards={cards} />
          </div>
        </div>

        {/* Spacer to ensure header is visible initially */}
        <div className="h-[60vh]" />

        {/* Mobile drawer with card actions, details and transactions */}
        <MobileDrawer>
          <div className="px-4 pt-4 space-y-6">
            {/* Card actions */}
            {currentCard && (
              <CardActions
                card={currentCard}
                onFreezeToggle={handleFreezeToggle}
                onAddToGPay={handleAddToGPay}
                onSetSpendLimit={handleSetSpendLimit}
                onReplaceCard={handleReplaceCard}
                onCancelCard={handleCancelCard}
              />
            )}

            {/* Card Details & Transactions */}
            <div className="space-y-6">
              <CardDetails defaultExpanded={false} />
              <TransactionList transactions={transactions} loading={false} />
            </div>
          </div>
        </MobileDrawer>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block">
        <div className="flex justify-between items-center pt-12 mb-8">
          {/* Account balance */}
          {user && (
            <div>
              <div className="text-sm text-aspire-text-secondary mb-1">
                Available balance
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-aspire-green text-white px-2 py-1 rounded">
                  S$
                </span>
                <span className="text-3xl font-bold text-aspire-text-primary">
                  {user.balance.toLocaleString()}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={() => setAddCardModalOpen(true)}
            className="flex items-center space-x-2 bg-aspire-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            <span>New card</span>
          </button>
        </div>

        {/* Card tabs */}
        <div className="mb-6">
          <div className="flex space-x-6 border-b border-gray-200">
            <button className="pb-3 text-aspire-green border-b-2 border-aspire-green font-medium">
              My debit cards
            </button>
            <button className="pb-3 text-aspire-text-secondary hover:text-aspire-text-primary">
              All company cards
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-t-3xl p-12">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8" style={{ gap: '2rem' }}>
            {/* Left column - Cards */}
            <div className="space-y-6">
              {/* Card carousel */}
              <CardCarousel cards={cards} />

              {/* Card actions */}
              {currentCard && (
                <CardActions
                  card={currentCard}
                  onFreezeToggle={handleFreezeToggle}
                  onAddToGPay={handleAddToGPay}
                  onSetSpendLimit={handleSetSpendLimit}
                  onReplaceCard={handleReplaceCard}
                  onCancelCard={handleCancelCard}
                />
              )}
            </div>

            {/* Right column - Card Details & Transactions */}
            <div>
              <CardDetails defaultExpanded={false} />
              <TransactionList transactions={transactions} loading={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Add card modal */}
      <AddCardModal
        isOpen={addCardModalOpen}
        onClose={() => setAddCardModalOpen(false)}
        onSubmit={handleAddCard}
        loading={actionLoading}
      />
    </div>
  );
};