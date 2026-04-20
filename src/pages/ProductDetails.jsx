import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductDetails.css';

function renderStars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const existingItem = product && cartItems.find(item => item.id === product.id);
  const isInCart = Boolean(existingItem);

  const addToCart = () => {
    setCartItems(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  if (loading) {
    return (
      <div className="pd-loading">
        <div className="pd-loading__img skeleton" />
        <div className="pd-loading__info">
          <div className="skeleton" style={{ height: 24, width: '60%', borderRadius: 6 }} />
          <div className="skeleton" style={{ height: 16, width: '40%', borderRadius: 6, marginTop: 12 }} />
          <div className="skeleton" style={{ height: 80, width: '100%', borderRadius: 6, marginTop: 20 }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pd-error">
        <div className="pd-error__content">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="btn btn--primary" onClick={() => navigate('/products')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="pd">
      <button className="pd__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="pd__layout">
        <div className="pd__image-wrap">
          <span className="pd__category">{product.category}</span>
          <img className="pd__image" src={product.image} alt={product.title} />
        </div>

        <div className="pd__info">
          <h1 className="pd__title">{product.title}</h1>

          {product.rating && (
            <div className="pd__rating">
              <span className="pd__stars">{renderStars(product.rating.rate)}</span>
              <span className="pd__rating-text">
                {product.rating.rate} — {product.rating.count} reviews
              </span>
            </div>
          )}

          <p className="pd__price">₹{product.price}</p>

          <p className="pd__desc">{product.description}</p>

          <div className="pd__divider" />

          <div className="pd__qty-row">
            <span className="pd__label">Quantity</span>
            <div className="pd__qty">
              <button className="pd__qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="pd__qty-num">{qty}</span>
              <button className="pd__qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="pd__actions">
            <button className="pd__add-btn" onClick={addToCart}>
              {isInCart
                ? `In Cart (${existingItem.quantity}) — Add ${qty} more`
                : `Add ${qty} to Cart`}
            </button>
            <button className="pd__cart-btn" onClick={() => navigate('/cart')}>
              View Cart
            </button>
          </div>

          <div className="pd__badges">
            {['Free Shipping', 'Easy Returns', 'Secure Payment'].map(b => (
              <div key={b} className="pd__badge">
                <span>✓</span> {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;