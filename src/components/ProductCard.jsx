import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext'; 
import './ProductCard.css';

function renderStars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext); 

  const existingItem = cartItems.find(item => item.id === product.id);
  const isInCart = Boolean(existingItem);

  const addToCart = (e) => {
    e.stopPropagation();
    setCartItems(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // add this function
  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="card" onClick={() => navigate(`/products/${product.id}`)}>
      <div className="card__image-wrap">
        <span className="card__category">{product.category}</span>
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <div className="card__body">
        <p className="card__title">{product.title}</p>

        {product.rating && (
          <div className="card__rating">
            <span className="card__stars">{renderStars(product.rating.rate)}</span>
            <span>({product.rating.count})</span>
          </div>
        )}

        <div className="card__footer">
          <span className="card__price">₹{product.price}</span>
          <div> 
            <button
              className={`card__btn ${isInCart ? 'card__btn--added' : 'card__btn--add'}`}
              onClick={addToCart}
            >
              {isInCart ? `In Cart (${existingItem.quantity})` : '+ Add'}
            </button>
            <button
              className="card__wishlist-btn"
              onClick={toggleWishlist}
            >
              {isInWishlist(product.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;