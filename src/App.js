import React, { useState } from 'react';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Invoice from './components/Invoice';
import Payment from './components/Payment';
import Header from './components/Header';
import OrderHistory from './components/OrderHistory';
import './styles/App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('hegolz-orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = React.useRef(null);

  const handleAddItem = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleOrderComplete = (orderType, total) => {
    const newOrder = {
      items: cartItems,
      type: orderType,
      state: selectedState || 'N/A',
      total: total,
      date: new Date().toLocaleString(),
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('hegolz-orders', JSON.stringify(updatedOrders));
    setCartItems([]);
  };

  const scrollToColumn = (index) => {
    if (scrollRef.current) {
      const columnWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: columnWidth * index,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="app-wrapper">
      <Header onShowHistory={() => setShowHistory(true)} orderCount={orders.length} />

      <div className="app-container" ref={scrollRef}>
        <Menu
          onAddItem={handleAddItem}
          onNext={() => scrollToColumn(1)}
        />
        <Cart
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onNext={() => scrollToColumn(2)}
          onPrev={() => scrollToColumn(0)}
        />
        <Invoice
          cartItems={cartItems}
          selectedState={selectedState}
          onStateChange={setSelectedState}
          onNext={() => scrollToColumn(3)}
          onPrev={() => scrollToColumn(1)}
        />
        <Payment
          cartItems={cartItems}
          selectedState={selectedState}
          onOrderComplete={handleOrderComplete}
          onPrev={() => scrollToColumn(2)}
        />
      </div>

      {showHistory && (
        <OrderHistory orders={orders} onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
}

export default App;