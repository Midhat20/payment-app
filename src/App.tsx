import React from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import { CardsPage } from './pages/CardsPage';

function App() {
  return (
    <MainLayout>
      <CardsPage />
    </MainLayout>
  );
}

export default App;
