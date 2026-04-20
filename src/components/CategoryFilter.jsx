import React from 'react';
import './CategoryFilter.css';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelery', label: 'Jewellery' },
  { value: "men's clothing", label: 'Men' },
  { value: "women's clothing", label: 'Women' },
];

function CategoryFilter({ category, setCategory }) {
  return (
    <div className="cat-filter">
      {categories.map(cat => (
        <button
          key={cat.value}
          className={`cat-filter__btn ${category === cat.value ? 'cat-filter__btn--active' : ''}`}
          onClick={() => setCategory(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;