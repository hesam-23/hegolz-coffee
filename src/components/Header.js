import React from 'react';
import '../styles/Header.css';

function Header({ onShowHistory, orderCount }) {
  return (
    <div className="header">
      <div className="header-info">
        <h1 className="header-title">HEGOLZ</h1>
        <p className="header-subtitle">Real Time Order System</p>
      </div>
      <button className="history-btn" onClick={onShowHistory}>
        Orders
        {orderCount > 0 && <span className="order-badge">{orderCount}</span>}
      </button>
    </div>
  );
}

export default Header;