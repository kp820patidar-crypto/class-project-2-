import React,{createContext,useState,useEffect} from 'react'

export const CartContext = createContext();
function CartProvider({children}) {

    const [cartItems,setCartItems] = useState(() => {
       try{
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
       }catch(err){
        return [];
       }
    })

    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cartItems))
    },[cartItems])
  return (
    <CartContext.Provider value={{cartItems,setCartItems}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider