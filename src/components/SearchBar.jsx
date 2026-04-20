import React from 'react';
import './SearchBar.css';

function SearchBar({ search, setSearch }) {
  return (
    <div className="searchbar">
      <svg className="searchbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        className="searchbar__input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />
      {search && (
        <button className="searchbar__clear" onClick={() => setSearch('')}>✕</button>
      )}
    </div>
  );
}

export default SearchBar;