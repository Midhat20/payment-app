import { Card, Transaction, User, ApiResponse, AddCardFormData } from '../types';
import { storage } from '../utils/storage';
import { createNewCard } from '../utils/cardUtils';
import { initialUser, initialCards, initialTransactions } from '../data/initialData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Initialize data if not exists
  async initializeData(): Promise<void> {
    storage.clearAll();
    storage.setUser(initialUser);
    storage.setCards(initialCards);
    storage.setTransactions(initialTransactions);
  },

  // User operations
  async getUser(): Promise<ApiResponse<User>> {
    await delay(100);
    const user = storage.getUser();
    
    if (!user) {
      return {
        success: false,
        data: initialUser,
        message: 'User not found'
      };
    }
    
    return {
      success: true,
      data: user
    };
  },

  async updateUserBalance(amount: number): Promise<ApiResponse<User>> {
    await delay(100);
    const user = storage.getUser();
    
    if (!user) {
      return {
        success: false,
        data: initialUser,
        message: 'User not found'
      };
    }
    
    const updatedUser = { ...user, balance: user.balance + amount };
    storage.setUser(updatedUser);
    
    return {
      success: true,
      data: updatedUser
    };
  },

  // Card operations
  async getCards(): Promise<ApiResponse<Card[]>> {
    await delay(200);
    const cards = storage.getCards();
    
    return {
      success: true,
      data: cards
    };
  },

  async addCard(formData: AddCardFormData): Promise<ApiResponse<Card>> {
    await delay(500); // Simulate processing time
    
    if (!formData.name.trim()) {
      return {
        success: false,
        data: {} as Card,
        message: 'Card name is required'
      };
    }
    
    const newCard = createNewCard(formData.name);
    storage.addCard(newCard);
    
    return {
      success: true,
      data: newCard,
      message: 'Card added successfully'
    };
  },

  async freezeCard(cardId: string): Promise<ApiResponse<Card>> {
    await delay(300);
    const cards = storage.getCards();
    const card = cards.find(c => c.id === cardId);
    
    if (!card) {
      return {
        success: false,
        data: {} as Card,
        message: 'Card not found'
      };
    }
    
    storage.updateCard(cardId, { frozen: !card.frozen });
    const updatedCard = { ...card, frozen: !card.frozen };
    
    return {
      success: true,
      data: updatedCard,
      message: `Card ${updatedCard.frozen ? 'frozen' : 'unfrozen'} successfully`
    };
  },

  async deleteCard(cardId: string): Promise<ApiResponse<void>> {
    await delay(300);
    const cards = storage.getCards();
    const card = cards.find(c => c.id === cardId);
    
    if (!card) {
      return {
        success: false,
        data: undefined,
        message: 'Card not found'
      };
    }
    
    storage.deleteCard(cardId);
    
    return {
      success: true,
      data: undefined,
      message: 'Card deleted successfully'
    };
  },

  // Transaction operations
  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    await delay(200);
    const transactions = storage.getTransactions();
    
    return {
      success: true,
      data: transactions
    };
  },

  async getRecentTransactions(limit: number = 10): Promise<ApiResponse<Transaction[]>> {
    await delay(200);
    const transactions = storage.getTransactions();
    const recent = transactions.slice(0, limit);
    
    return {
      success: true,
      data: recent
    };
  },

  async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<ApiResponse<Transaction>> {
    await delay(300);
    
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    
    storage.addTransaction(newTransaction);
    
    return {
      success: true,
      data: newTransaction
    };
  },
};