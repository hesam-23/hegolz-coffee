import React, { useState } from 'react';
import menuData from '../data/menuData';
import '../styles/Menu.css';

function Menu({ onAddItem }) {
  const [activeCategory, setActiveCategory] = useState('Coffee');

  return (
    <div className="menu-column">
      <h2>Menu</h2>

      <div className="category-tabs">
        {Object.keys(menuData).map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-items">
        {menuData[activeCategory].map((item) => (
          <div key={item.id} className="menu-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price.toFixed(2)}</span>
            <button onClick={() => onAddItem(item)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;