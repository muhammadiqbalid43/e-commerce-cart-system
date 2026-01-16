"use client";

import { useCartStore } from "@/lib/stores/cart";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, getSubtotal, updateQuantity, removeItem } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add items to your cart to continue</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left column - Cart items */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border p-6">
          <h1 className="text-2xl font-bold mb-6">Review Your Cart</h1>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-4 border-b"
              >
                <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Right column - Order summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Link
            href="/checkout/shipping"
            className="block w-full bg-black text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Continue to Shipping
          </Link>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By continuing, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
