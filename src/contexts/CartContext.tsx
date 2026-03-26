import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  plastic?: string;
  price: number;
  originalPrice?: number;
  weight?: string;
  color?: string;
  image: string;
  quantity: number;
  flightNumbers?: { speed: number; glide: number; turn: number; fade: number };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, weight?: string, color?: string) => void;
  updateQuantity: (id: string, quantity: number, weight?: string, color?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const STORAGE_KEY = "luckydiscs-cart";

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage full or unavailable
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const getItemKey = (item: { id: string; weight?: string; color?: string }) =>
    `${item.id}-${item.weight || ""}-${item.color || ""}`;

  const matchItem = (i: CartItem, id: string, weight?: string, color?: string) =>
    i.id === id && (i.weight || "") === (weight || "") && (i.color || "") === (color || "");

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => matchItem(i, item.id, item.weight, item.color));
      if (existing) {
        return prev.map((i) =>
          matchItem(i, item.id, item.weight, item.color)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string, weight?: string, color?: string) => {
    setItems((prev) => prev.filter((i) => !matchItem(i, id, weight, color)));
  };

  const updateQuantity = (id: string, quantity: number, weight?: string, color?: string) => {
    if (quantity <= 0) {
      removeItem(id, weight, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        matchItem(i, id, weight, color) ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
