import React from 'react';
import './Sort.css';

function Sort({ setSort }) {
  return (
    <div className="sort">
      <select className="sort__select" onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort: Default</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
        <option value="rating">Top Rated</option>
      </select>
      <svg className="sort__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>
  );
}

export default Sort;