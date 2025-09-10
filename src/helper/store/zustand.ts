import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

interface StoreState {
  productStore: Product[];
  addItemToStore: (item: Product) => void;
  removeItemFromStore: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  emptyCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      productStore: [],

      addItemToStore: (item) => {
        const existing = get().productStore.find((p) => p.id === item.id);
        if (existing) {
          set({
            productStore: get().productStore.map((p) =>
              p.id === item.id
                ? { ...p, quantity: p.quantity + item.quantity }
                : p
            ),
          });
        } else {
          set({ productStore: [...get().productStore, item] });
        }
      },

      removeItemFromStore: (id) =>
        set((state) => ({
          productStore: state.productStore.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          productStore: state.productStore.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          productStore: state.productStore
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      emptyCart: () => set({ productStore: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
