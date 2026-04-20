import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

function Cart() {
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const updateQty = (id, delta) => {
        setCartItems(prev =>
            prev
                .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
                .filter(item => item.quantity > 0)
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? (subtotal > 500 ? 0 : 49) : 0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <div className="cart-empty__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                </div>
                <h2 className="cart-empty__title">Your cart is empty</h2>
                <p className="cart-empty__sub">Looks like you haven't added anything yet.</p>
                <button className="cart-empty__btn" onClick={() => navigate('/products')}>
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="cart__header">
                <p className="cart__eyebrow">Your Selection</p>
                <h1 className="cart__title">Shopping Cart</h1>
                <span className="cart__count">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</span>
            </div>

            <div className="cart__layout">
                {/* Items */}
                <div className="cart__items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item__image-wrap">
                                <img className="cart-item__image" src={item.image} alt={item.title} />
                            </div>

                            <div className="cart-item__info">
                                <p className="cart-item__category">{item.category}</p>
                                <h3 className="cart-item__title">{item.title}</h3>
                                <p className="cart-item__unit-price">₹{item.price} each</p>
                            </div>

                            <div className="cart-item__controls">
                                <div className="cart-item__qty">
                                    <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                                    <span className="cart-item__qty-num">{item.quantity}</span>
                                    <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                                </div>
                                <p className="cart-item__subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
                                <button className="cart-item__remove" onClick={() => removeItem(item.id)} title="Remove">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}

                    <button className="cart__continue" onClick={() => navigate('/products')}>
                        ← Continue Shopping
                    </button>
                </div>

                {/* Summary */}
                <div className="cart__summary">
                    <h2 className="cart__summary-title">Order Summary</h2>

                    <div className="cart__summary-rows">
                        <div className="cart__summary-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="cart__summary-row">
                            <span>Shipping</span>
                            <span className={shipping === 0 ? 'cart__free' : ''}>
                                {shipping === 0 ? 'Free' : `₹${shipping}`}
                            </span>
                        </div>
                        {shipping > 0 && (
                            <p className="cart__shipping-note">
                                Add ₹{(500 - subtotal).toFixed(2)} more for free shipping
                            </p>
                        )}
                        <div className="cart__summary-divider" />
                        <div className="cart__summary-row cart__summary-row--total">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="cart__checkout-btn">
                        Proceed to Checkout
                    </button>

                    <div className="cart__summary-badges">
                        {['Secure Checkout', '256-bit SSL', 'Easy Returns'].map(b => (
                            <span key={b} className="cart__summary-badge">✓ {b}</span>
                        ))}
                    </div>
                </div>
            </div>
            <button className="cart__checkout-btn" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
            </button>
        </div>
    );
}

export default Cart;