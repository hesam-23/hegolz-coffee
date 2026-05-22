import React from 'react';
import '../styles/Cart.css';

function Cart({ cartItems, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-column">
      <h2>Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span>
              <div className="item-controls">
                <button onClick={() => onDecrease(item.id)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item.id)}>+</button>
              </div>
              <span className="item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button className="remove-btn" onClick={() => onRemove(item.id)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;