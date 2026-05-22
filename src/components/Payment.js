import React, { useState } from 'react';
import '../styles/Payment.css';

const TAX_RATES = {
  'California': 0.0725,
  'New York': 0.08,
  'Texas': 0.0625,
  'Florida': 0.06,
  'Illinois': 0.0625,
  'Michigan': 0.06,
};

function Payment({ cartItems, selectedState, onOrderComplete }) {
  const [orderType, setOrderType] = useState('Dine-in');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const taxRate = TAX_RATES[selectedState] || 0;
  const total = (subtotal + subtotal * taxRate).toFixed(2);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    setOrderPlaced(true);
    onOrderComplete(orderType, total);
  };

  if (orderPlaced) {
    return (
      <div className="payment-column">
        <div className="order-success">
          <h2>✅ Order Placed!</h2>
          <p>Thank you for your order.</p>
          <p>Type: <strong>{orderType}</strong></p>
          <p>Total: <strong>${total}</strong></p>
          <button className="place-order-btn" style={{marginTop: '24px'}} onClick={() => setOrderPlaced(false)}>
            New Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-column">
      <h2>Payment</h2>

      <div className="order-type">
        <label>Order Type:</label>
        <div className="order-type-buttons">
          {['Dine-in', 'Pickup', 'Delivery'].map((type) => (
            <button
              key={type}
              className={orderType === type ? 'active' : ''}
              onClick={() => setOrderType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="payment-total">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <button
        className="place-order-btn"
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0}
      >
        Place Order
      </button>
    </div>
  );
}

export default Payment;