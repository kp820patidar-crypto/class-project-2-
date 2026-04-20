import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import './Wishlist.css';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { setCartItems } = useContext(CartContext);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
  };

  const addAllToCart = () => {
    setCartItems(prev => {
      const newItems = [...prev];
      wishlistItems.forEach(item => {
        const existing = newItems.find(i => i.id === item.id);
        if (existing) {
          existing.quantity = (existing.quantity || 0) + 1;
        } else {
          newItems.push({ ...item, quantity: 1 });
        }
      });
      return newItems;
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty</h2>
        <Link to="/products" className="btn btn--primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <h1>My Wishlist</h1>
      <div className="wishlist__grid">
        {wishlistItems.map(product => (
          <div key={product.id} className="wishlist-item">
            <img src={product.image} alt={product.title} />
            <div className="wishlist-item__info">
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
              <div className="wishlist-item__actions">
                <button className="btn--small" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="btn--small btn--danger" onClick={() => removeFromWishlist(product.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn--primary" onClick={addAllToCart}>Add All to Cart</button>
    </div>
  );
}

export default Wishlist;