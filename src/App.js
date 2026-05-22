import React, { useState } from 'react';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Invoice from './components/Invoice';
import Payment from './components/Payment';
import Header from './components/Header';
import OrderHistory from './components/OrderHistory';
import './styles/App.css';

const COLUMNS = ['Menu', 'Cart', 'Invoice', 'Payment'];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [activeColumn, setActiveColumn] = useState(0);
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
    setActiveColumn(index);
    if (scrollRef.current) {
      const columnWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: columnWidth * index,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    if (activeColumn > 0) scrollToColumn(activeColumn - 1);
  };

  const handleNext = () => {
    if (activeColumn < COLUMNS.length - 1) scrollToColumn(activeColumn + 1);
  };

  return (
    <div className="app-wrapper">
      <Header onShowHistory={() => setShowHistory(true)} orderCount={orders.length} />

      <div className="app-container" ref={scrollRef}>
        <Menu onAddItem={handleAddItem} />
        <Cart
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
        />
        <Invoice
          cartItems={cartItems}
          selectedState={selectedState}
          onStateChange={setSelectedState}
        />
        <Payment
          cartItems={cartItems}
          selectedState={selectedState}
          onOrderComplete={handleOrderComplete}
        />
      </div>

      <div className="mobile-nav">
        <button className="nav-arrow" onClick={handlePrev} disabled={activeColumn === 0}>
          ‹
        </button>
        <div className="pagination-dots">
          {COLUMNS.map((col, index) => (
            <button
              key={col}
              className={`dot ${activeColumn === index ? 'active' : ''}`}
              onClick={() => scrollToColumn(index)}
            />
          ))}
        </div>
        <button className="nav-arrow" onClick={handleNext} disabled={activeColumn === COLUMNS.length - 1}>
          ›
        </button>
      </div>

      {showHistory && (
        <OrderHistory orders={orders} onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
}

export default App;