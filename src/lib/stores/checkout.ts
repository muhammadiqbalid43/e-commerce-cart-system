import { create } from "zustand";
import { ShippingFormData } from "../validations/shipping";
import { createJSONStorage, persist } from "zustand/middleware";

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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ shippingData: state.shippingData }),
      skipHydration: true,
    }
  )
);
