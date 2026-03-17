# Aspire Payment App

A modern, responsive payment application built with React and TypeScript, featuring card management and transaction tracking capabilities.

## 🚀 Live Demo

The application is deployed and can be viewed at: https://github.com/Midhat20/payment-app.git

## 🎯 Features

### Core Functionality
- **Card Management**: Add, view, freeze/unfreeze debit cards
- **Interactive Card Carousel**: Navigate between multiple cards with smooth transitions
- **Transaction History**: View recent transactions with detailed information
- **Real-time Balance**: Display account balance with proper formatting
- **Local Data Persistence**: All data is stored in localStorage

### User Interactions
- **Add New Card**: Modal-based form with validation for adding new cards
- **Freeze/Unfreeze Cards**: Toggle card status with visual feedback
- **Card Number Visibility**: Toggle between masked and visible card numbers
- **Responsive Design**: Optimized for both desktop and mobile devices

## 🛠 Technology Stack

### Core Technologies
- **React 19**: Latest React version with modern hooks and features
- **TypeScript**: Full type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Modern icon library

### Architecture
- **Component-based Architecture**: Modular and reusable components
- **Custom Hooks**: For state management and side effects
- **API Layer**: Simulated backend with localStorage persistence
- **Type-safe APIs**: Full TypeScript coverage for all data operations

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── MainLayout.tsx
│   │   └── Sidebar.tsx
│   ├── Cards/
│   │   ├── DebitCard.tsx
│   │   ├── CardCarousel.tsx
│   │   └── CardActions.tsx
│   ├── Transactions/
│   │   ├── TransactionList.tsx
│   │   └── TransactionItem.tsx
│   └── Modal/
│       ├── Modal.tsx
│       └── AddCardModal.tsx
├── pages/
│   └── CardsPage.tsx
├── services/
│   └── api.ts
├── utils/
│   ├── storage.ts
│   └── cardUtils.ts
├── types/
│   └── index.ts
├── data/
│   └── initialData.ts
└── App.tsx
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Midhat20/payment-app.git
   cd payment-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
# or
yarn build
```
