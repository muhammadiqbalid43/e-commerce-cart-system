"use client";

import { selectSubtotal, useCartStore } from "@/lib/stores/cart";
import { X } from "lucide-react";
import CartItem from "./cart-item";
import { useIsMounted } from "@/hooks/use-is-mounted";
import Link from "next/link";
import { useEffect } from "react";

const CartSheet = () => {
  const isMounted = useIsMounted();
  const { isCartOpen, closeCart, items, subtotal } = useCartStore((state) => ({
    isCartOpen: state.isCartOpen,
    closeCart: state.closeCart,
    items: state.items,
    subtotal: selectSubtotal(state),
  }));

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Overlay */}{" "}
      <div
        className={`
          fixed inset-0 bg-black/50 z-40
          transition-opacity duration-300
          ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={closeCart}
        aria-hidden="true"
      />
      {/* Cart Panel */}
      <div
        className={`
          fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl
          transition-transform duration-300 ease-in-out
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="border-t p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout/cart"
              onClick={closeCart}
              className="block w-full bg-black text-white py-3 rounded-lg font-medium text-center"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSheet;
