// context/CartContext.js
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

// Initial state
const initialState = {
  cart: [],
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (existingIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1,
        };
        return { ...state, cart: newCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Muat dari localStorage saat pertama kali mount (hanya sekali)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validasi: pastikan array
        if (Array.isArray(parsed)) {
          dispatch({ type: "SET_CART", payload: parsed });
        }
      }
    } catch (err) {
      console.error("Gagal muat keranjang dari localStorage:", err);
    }
  }, []); // ← Penting: dependency array kosong

  // Simpan ke localStorage saat cart berubah
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } catch (err) {
      console.error("Gagal simpan ke localStorage:", err);
    }
  }, [state.cart]);

  // Sinkronisasi antar tab
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "cart") {
        try {
          const value = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(value)) {
            dispatch({ type: "SET_CART", payload: value });
          }
        } catch (err) {
          console.error("Gagal parsing dari storage event:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Action creators
  const addToCart = (item) => {
    // Validasi input
    if (!item || !item.id) {
      console.error("Item tidak valid untuk ditambahkan ke keranjang:", item);
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Hitung total
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
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
