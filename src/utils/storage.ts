import { Card, Transaction, User } from '../types';

const STORAGE_KEYS = {
  CARDS: 'aspire_cards',
  TRANSACTIONS: 'aspire_transactions',
  USER: 'aspire_user',
} as const;

export const storage = {
  // Cards
  getCards(): Card[] {
    const cards = localStorage.getItem(STORAGE_KEYS.CARDS);
    return cards ? JSON.parse(cards) : [];
  },

  setCards(cards: Card[]): void {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  },

  addCard(card: Card): void {
    const cards = this.getCards();
    cards.push(card);
    this.setCards(cards);
  },

  updateCard(cardId: string, updates: Partial<Card>): void {
    const cards = this.getCards();
    const index = cards.findIndex(card => card.id === cardId);
    if (index !== -1) {
      cards[index] = { ...cards[index], ...updates };
      this.setCards(cards);
    }
  },

  deleteCard(cardId: string): void {
    const cards = this.getCards();
    const filtered = cards.filter(card => card.id !== cardId);
    this.setCards(filtered);
  },

  // Transactions
  getTransactions(): Transaction[] {
    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return transactions ? JSON.parse(transactions) : [];
  },

  setTransactions(transactions: Transaction[]): void {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  addTransaction(transaction: Transaction): void {
    const transactions = this.getTransactions();
    transactions.unshift(transaction); // Add to beginning for chronological order
    this.setTransactions(transactions);
  },

  // User
  getUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Clear all data
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};