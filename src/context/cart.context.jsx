import { createContext, useState } from "react";

//Value we want to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

//Actual Component
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
