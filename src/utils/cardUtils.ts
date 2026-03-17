import { Card } from '../types';

export const generateCardNumber = (): string => {
  const prefix = '4532'; 
  const remaining = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
  return prefix + remaining;
};

export const generateExpiryDate = (): string => {
  const currentYear = new Date().getFullYear() % 100; 
  const expiryYear = currentYear + Math.floor(Math.random() * 5) + 1;
  const expiryMonth = Math.floor(Math.random() * 12) + 1;
  
  return `${expiryMonth.toString().padStart(2, '0')}/${expiryYear.toString().padStart(2, '0')}`;
};

export const generateCVV = (): string => {
  return Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join('');
};

export const formatCardNumber = (cardNumber: string): string => {
  return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
};

export const maskCardNumber = (cardNumber: string): string => {
  if (cardNumber.length < 4) return cardNumber;
  const lastFour = cardNumber.slice(-4);
  const masked = '•'.repeat(cardNumber.length - 4);
  return `${masked.match(/.{1,4}/g)?.join(' ')} ${lastFour}`.trim();
};

export const createNewCard = (name: string): Card => {
  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name,
    number: generateCardNumber(),
    expiryDate: generateExpiryDate(),
    cvv: generateCVV(),
    type: 'debit',
    frozen: false,
    createdAt: new Date(),
  };
};

export const getCardBrandIcon = (cardNumber: string): string => {
  const firstDigit = cardNumber.charAt(0);
  switch (firstDigit) {
    case '4':
      return 'visa';
    case '5':
      return 'mastercard';
    case '3':
      return 'amex';
    default:
      return 'visa';
  }
};