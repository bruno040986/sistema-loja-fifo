import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  bulkPrice: number | null;
  bulkQuantity: number | null;
  stock: number;
  imageUrl?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          const quantityToAdd = item.quantity || 1;
          
          if (existingItem) {
            // Check stock limit
            const newQuantity = Math.min(existingItem.quantity + quantityToAdd, item.stock);
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: newQuantity } : i
              ),
              isDrawerOpen: true, // Auto open drawer when adding item
            };
          }

          return { 
            items: [...state.items, { ...item, quantity: Math.min(quantityToAdd, item.stock) }],
            isDrawerOpen: true 
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id === id) {
              return { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) };
            }
            return i;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          let itemPrice = item.price;
          // Apply bulk discount if applicable
          if (item.bulkPrice && item.bulkQuantity && item.quantity >= item.bulkQuantity) {
            itemPrice = item.bulkPrice;
          }
          return total + (itemPrice * item.quantity);
        }, 0);
      },

      getCartItemsCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'armazem-fifo-cart',
      partialize: (state) => ({ items: state.items }), // Persist only items
    }
  )
);
