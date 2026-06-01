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

function Payment({ cartItems, selectedState, onOrderComplete, onPrev }) {
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Hegolz Coffee — Invoice</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #111; }
            h1 { font-size: 1.6rem; margin-bottom: 4px; }
            p { color: #888; font-size: 0.9rem; margin-bottom: 32px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            th { text-align: left; padding: 10px 0; border-bottom: 2px solid #111; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
            td { padding: 10px 0; border-bottom: 1px solid #eee; font-size: 0.9rem; }
            .summary { margin-top: 16px; }
            .summary-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 0.9rem; color: #555; border-bottom: 1px solid #eee; }
            .summary-row.total { font-size: 1.1rem; font-weight: 700; color: #111; border-bottom: none; margin-top: 8px; }
            .footer { margin-top: 48px; text-align: center; font-size: 0.8rem; color: #aaa; }
          </style>
        </head>
        <body>
          <h1>Hegolz Coffee</h1>
          <p>Invoice — ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="summary">
            <div class="summary-row"><span>Subtotal</span><span>$${subtotal}</span></div>
            <div class="summary-row"><span>Tax (${selectedState || 'N/A'} — ${(taxRate * 100).toFixed(2)}%)</span><span>$${(subtotal * taxRate).toFixed(2)}</span></div>
            <div class="summary-row total"><span>Total</span><span>$${total}</span></div>
          </div>
          <div class="footer">Thank you for visiting Hegolz Coffee ☕</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (orderPlaced) {
    return (
      <div className="payment-column">
        <div className="order-success">
          <h2>✅ Order Placed!</h2>
          <p>Thank you for your order.</p>
          <p>Type: <strong>{orderType}</strong></p>
          <p>Total: <strong>${total}</strong></p>
          <button className="print-btn" onClick={handlePrint}>
            🖨️ Print Invoice
          </button>
          <button className="place-order-btn" style={{marginTop: '12px'}} onClick={() => setOrderPlaced(false)}>
            New Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-column">
      <div className="column-header">
        <button className="nav-prev mobile-only" onClick={onPrev}>← Back</button>
        <h2>Payment</h2>
      </div>

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