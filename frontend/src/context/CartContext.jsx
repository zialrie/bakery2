import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += 1;
        return { ...state, cart: newCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "LOAD_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  // Muat dari localStorage saat pertama kali mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) });
  }, []);

  // Simpan ke localStorage saat cart berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Sinkronisasi antar tab
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "cart") {
        dispatch({ type: "LOAD_CART", payload: e.newValue ? JSON.parse(e.newValue) : [] });
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Action creators
  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
