import React from 'react';
import '../styles/Invoice.css';

const TAX_RATES = {
  'California': 0.0725,
  'New York': 0.08,
  'Texas': 0.0625,
  'Florida': 0.06,
  'Illinois': 0.0625,
  'Michigan': 0.06,
};

function Invoice({ cartItems, selectedState, onStateChange, onNext, onPrev }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const taxRate = TAX_RATES[selectedState] || 0;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  

  return (
    <div className="invoice-column">
      <div className="column-header">
        <button className="nav-prev mobile-only" onClick={onPrev}>← Back</button>
        <h2>Invoice</h2>
        <button className="nav-next mobile-only" onClick={onNext}>Next →</button>
      </div>

      <div className="state-selector">
        <label>State:</label>
        <select value={selectedState} onChange={(e) => onStateChange(e.target.value)}>
          <option value="">Select State</option>
          {Object.keys(TAX_RATES).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div className="invoice-details">
        <div className="invoice-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="invoice-row">
          <span>Tax ({selectedState ? (taxRate * 100).toFixed(2) + '%' : '0%'})</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="invoice-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

     
    </div>
  );
}

export default Invoice;