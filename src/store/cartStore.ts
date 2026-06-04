import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, FulfillmentType, Language, Product } from '../types';

interface CartState {
  items: CartItem[];
  language: Language;
  fulfillment: FulfillmentType;
  isCartOpen: boolean;
  coupon: string;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  clearCart: () => void;
  setLanguage: (language: Language) => void;
  setFulfillment: (type: FulfillmentType) => void;
  setCartOpen: (open: boolean) => void;
  setCoupon: (coupon: string) => void;
  itemCount: () => number;
  subtotal: () => number;
  deliveryCharge: () => number;
  discount: () => number;
  total: () => number;
}
const DELIVERY_CHARGE = 40;
export const useCartStore = create<CartState>()(
  persist((set, get) => ({
    items: [], language: 'en', fulfillment: 'delivery', isCartOpen: false, coupon: '',
    addItem: (product) => set((state) => {
      const stock = product.stock ?? 999;
      const found = state.items.find((item) => item.id === product.id);
      if (found && found.quantity >= stock) { toast.error('Out of stock limit reached'); return state; }
      toast.success(`${product.name} added`);
      return { items: found ? state.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...state.items, { ...product, quantity: 1 }] };
    }),
    removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    decreaseItem: (id) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0) })),
    clearCart: () => set({ items: [], coupon: '' }),
    setLanguage: (language) => set({ language }),
    setFulfillment: (fulfillment) => set({ fulfillment }),
    setCartOpen: (isCartOpen) => set({ isCartOpen }),
    setCoupon: (coupon) => set({ coupon }),
    itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    deliveryCharge: () => get().fulfillment === 'delivery' && get().items.length > 0 ? DELIVERY_CHARGE : 0,
    discount: () => get().coupon.trim().toUpperCase() === 'RAPID10' ? Math.min(50, Math.round(get().subtotal() * 0.1)) : 0,
    total: () => Math.max(0, get().subtotal() + get().deliveryCharge() - get().discount())
  }), { name: 'rapidely-cart', partialize: (s) => ({ items: s.items, language: s.language, fulfillment: s.fulfillment, coupon: s.coupon }) })
);
