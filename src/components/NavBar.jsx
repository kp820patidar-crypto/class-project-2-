import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './NavBar.css';

function Navbar() {
    const { cartItems } = useContext(CartContext);
    const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar__logo">
                My<span>Store</span>
            </Link>

            <div className="navbar__links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/wishlist" className="navbar__wishlist-link">
                    🤍
                </Link>
                <Link to="/cart" className="navbar__cart-link">
                    <div className="navbar__cart-icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        {totalCount > 0 && <span className="navbar__badge">{totalCount}</span>}
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;