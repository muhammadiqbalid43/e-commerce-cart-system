"use client";

import { useCartStore } from "@/lib/stores/cart";
import { ShippingFormData } from "@/lib/validations/shipping";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConfirmPage = () => {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotal();
  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  // Load shipping data dari localStorage
  useEffect(() => {
    const data = localStorage.getItem("shipping-form-data");
    if (data) {
      setShippingData(JSON.parse(data));
    } else {
      // Redirect ke shipping jika tidak ada data
      router.push("/checkout/shipping");
    }
  }, [router]);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate random order number
      const orderNumber = "STC-" + Date.now().toString().slice(-8);

      // Clear cart
      clearCart();

      // Clear shipping data
      localStorage.removeItem("shipping-form-data");

      // Redirect to success page
      router.push(`/checkout/success?order=${orderNumber}`);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!shippingData) {
    return <div className="text-center py-8">Loading shipping data...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Order Confirmation</h1>
      <p className="text-gray-600 mb-8">Review your order before placing</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Info */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-bold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{shippingData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{shippingData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{shippingData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">
                  {shippingData.addressLine1}
                  {shippingData.addressLine2 &&
                    `, ${shippingData.addressLine2}`}
                </p>
                <p className="font-medium">
                  {shippingData.city}, {shippingData.postalCode},{" "}
                  {shippingData.country}
                </p>
              </div>
            </div>
            <Link
              href="/checkout/shipping"
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              Edit shipping information
            </Link>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded"></div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
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

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className={`
              w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2
              ${
                isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }
            `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Order...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Place Order
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing your order, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
