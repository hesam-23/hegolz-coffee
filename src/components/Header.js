import React from 'react';
import '../styles/Header.css';

function Header({ onShowHistory, orderCount }) {
  return (
    <div className="header">
      <img src="/27.svg" alt="Hegolz Coffee" className="header-logo" />
      <div className="header-info">
        <h1 className="header-title">Hegolz Coffee</h1>
        <p className="header-subtitle">Modern Cafe Experience</p>
      </div>
      <button className="history-btn" onClick={onShowHistory}>
        Orders
        {orderCount > 0 && <span className="order-badge">{orderCount}</span>}
      </button>
    </div>
  );
}

export default Header;