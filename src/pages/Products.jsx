import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Sort from '../components/Sort';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) setCategory(catParam);
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (sort === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setFilteredProducts(result);
  }, [products, category, search, sort]);

  return (
    <div className="products-page">
      <div className="products-page__header">
        <div>
          <p className="products-page__eyebrow">Our Collection</p>
          <h1 className="products-page__title">Products</h1>
        </div>
        <span className="products-page__count">
          {filteredProducts.length} items
        </span>
      </div>

      <div className="products-page__toolbar">
        <div className="products-page__filters">
          <CategoryFilter category={category} setCategory={setCategory} />
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <Sort setSort={setSort} />
      </div>

      {loading ? (
        <div className="products-page__loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 360 }} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="products-page__empty">
          <span>🛍️</span>
          <p>No products found.</p>
          <button
            className="btn btn--primary"
            onClick={() => {
              setCategory('all');
              setSearch('');
              setSort('');
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="products-page__grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;