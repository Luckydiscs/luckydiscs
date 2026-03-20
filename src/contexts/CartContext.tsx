import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  plastic: string;
  price: number;
  originalPrice?: number;
  weight: string;
  color: string;
  image: string;
  quantity: number;
  flightNumbers?: { speed: number; glide: number; turn: number; fade: number };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, weight: string, color: string) => void;
  updateQuantity: (id: string, weight: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getKey = (id: string, weight: string, color: string) => `${id}-${weight}-${color}`;

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.weight === item.weight && i.color === item.color
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.weight === item.weight && i.color === item.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string, weight: string, color: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.weight === weight && i.color === color))
    );
  };

  const updateQuantity = (id: string, weight: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, weight, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.weight === weight && i.color === color
          ? { ...i, quantity }
          : i
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
