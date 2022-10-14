import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  // On check si parmis les produits du panier
  // il y a déja le produit que l'on souhaite ajouter
  // grâce à leurs ID respectifs
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    // Si la produit se trouve dans le panier
    // J'augmenta sa quantité de 1
    // Sinon je ne fais rien
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // On veut retourner un tableau qui contient les produits déjà présent dans le panier
  // mais aussi le produit à ajouter ainsi que sa quantitité
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
