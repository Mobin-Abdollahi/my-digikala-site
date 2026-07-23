/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useMemo, useReducer, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartAction, CartItem, CartState } from "../types/cart";
import type { Product } from "../types/product";

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const initialState: CartState = {
  items: [],
};



function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  // ۱. پس از لود کلاینت، مقادیر ذخیره شده را بازیابی می‌کنیم
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart);
        parsedItems.forEach((item: CartItem) => {
          // برای تک تک آیتم‌ها اکشن اضافه کردن را اجرا می‌کنیم تا در state بارگذاری شوند
          for (let i = 0; i < item.quantity; i++) {
            dispatch({ type: "ADD_TO_CART", payload: item });
          }
        });
      } catch (e) {
        console.error("خطا در خواندن سبد خرید:", e);
      }
    }
    setIsMounted(true);
  }, []);

  // ۲. هر زمان که state تغییر کرد، آن را ذخیره می‌کنیم (فقط روی کلاینت)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }, [state.items, isMounted]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const value: CartContextType = {
    // تا قبل از لود کامل کلاینت، یک آرایه خالی نشان می‌دهیم تا Hydration Mismatch رخ ندهد
    items: isMounted ? state.items : [],
    totalItems: isMounted ? totalItems : 0,
    addToCart: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
    removeFromCart: (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    increaseQuantity: (id) => dispatch({ type: "INCREASE_QUANTITY", payload: id }),
    decreaseQuantity: (id) => dispatch({ type: "DECREASE_QUANTITY", payload: id }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
