export interface Card {
  id: string;
  name: string;
  number: string;
  expiryDate: string;
  cvv: string;
  type: 'debit' | 'credit';
  frozen: boolean;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  type: 'debit' | 'credit';
  date: Date;
  category: string;
  icon?: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  active: boolean;
}

export interface AddCardFormData {
  name: string;
}

export interface CardAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  disabled?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type Theme = 'light' | 'dark';

export interface AppState {
  user: User;
  cards: Card[];
  transactions: Transaction[];
  theme: Theme;
  loading: boolean;
  error?: string;
}