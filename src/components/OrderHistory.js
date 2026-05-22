import React from 'react';
import '../styles/OrderHistory.css';

function OrderHistory({ orders, onClose }) {
  if (orders.length === 0) {
    return (
      <div className="history-overlay" onClick={onClose}>
        <div className="history-modal" onClick={(e) => e.stopPropagation()}>
          <div className="history-header">
            <h2>Order History</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          <p className="no-orders">No orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-overlay" onClick={onClose}>
      <div className="history-modal" onClick={(e) => e.stopPropagation()}>
        <div className="history-header">
          <h2>Order History</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-card-header">
                <span className="order-number">Order #{orders.length - index}</span>
                <span className="order-type-badge">{order.type}</span>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item-row">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-card-footer">
                <span>{order.state}</span>
                <span className="order-total">${order.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;