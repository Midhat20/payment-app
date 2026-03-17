import { Card, Transaction, User } from '../types';

export const initialUser: User = {
  id: '1',
  name: 'Mark Henry',
  email: 'mark.henry@aspire.com',
  balance: 3000,
};

export const initialCards: Card[] = [
  {
    id: '1',
    name: 'Mark Henry',
    number: '4532123456782020',
    expiryDate: '12/26',
    cvv: '123',
    type: 'debit',
    frozen: false,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Mark Henry',
    number: '4532987654321234',
    expiryDate: '08/27',
    cvv: '456',
    type: 'debit',
    frozen: false,
    createdAt: new Date('2024-02-20'),
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Hamleys',
    amount: 150,
    type: 'credit',
    date: new Date('2024-05-20T14:20:00'),
    category: 'Shopping',
    icon: '🧸',
    description: 'Refund on debit card',
  },
  {
    id: '2',
    merchant: 'Hamleys',
    amount: -150,
    type: 'debit',
    date: new Date('2024-05-20T14:15:00'),
    category: 'Shopping',
    icon: '🧸',
    description: 'Charged to debit card',
  },
  {
    id: '3',
    merchant: 'Hamleys',
    amount: -150,
    type: 'debit',
    date: new Date('2024-05-20T14:10:00'),
    category: 'Shopping',
    icon: '🧸',
    description: 'Charged to debit card',
  },
  {
    id: '4',
    merchant: 'Hamleys',
    amount: -150,
    type: 'debit',
    date: new Date('2024-05-20T14:05:00'),
    category: 'Shopping',
    icon: '🧸',
    description: 'Charged to debit card',
  },
];