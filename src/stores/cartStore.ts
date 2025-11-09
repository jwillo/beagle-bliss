import { create } from 'zustand';
// This interface should ideally be in a shared types file, but is defined here for simplicity.
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}
export interface CartItem extends Product {
  quantity: number;
}
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  addItem: (item: Product) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, action: 'increase' | 'decrease') => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { items: updatedItems };
      } else {
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  updateQuantity: (itemId, action) =>
    set((state) => ({
      items: state.items
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    })),
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));