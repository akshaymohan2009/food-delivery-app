import react, { useState } from 'react'
import { Fragment } from 'react';
import Card from './Component/Cart/Card.js';
import Header from './Component/Layout/Header.js';
import Meals from './Component/Meals/Meals.js';
import CartProvider from './store/CardProvider.js';

function App() {
  const [modal, setModal] = useState(false)
  function handleModalOpen() {
    setModal(true)
  }
  function handleModalClose() {
    setModal(false)
  }
  return (
    <CartProvider >
      {modal && <Card closeHandler={handleModalClose}/>}
      <Header clickHandler={handleModalOpen} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
