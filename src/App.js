import { useState } from 'react'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Footer from './components/Layout/Footer';
function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const handleShowCart = () => {
    setCartIsShown(true)
  }
  const handleCloseCart = () => {
    setCartIsShown(false)
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={handleCloseCart}></Cart>}
      <Header onShowCart={handleShowCart}></Header>
      <main>
        <Meals></Meals>
      </main>
      <Footer></Footer>
    </CartProvider>
  );
}

export default App;
