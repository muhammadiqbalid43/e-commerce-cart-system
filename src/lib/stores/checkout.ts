import { create } from "zustand";
import { ShippingFormData } from "../validations/shipping";
import { persist } from "zustand/middleware";

interface CheckoutStore {
  shippingData: ShippingFormData | null;
  setShippingData: (data: ShippingFormData) => void;
  clearCheckoutData: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      shippingData: null,
      setShippingData: (data) => set({ shippingData: data }),
      clearCheckoutData: () => set({ shippingData: null }),
    }),
    {
      name: "checkout-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
