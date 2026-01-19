"use client";

import { CheckCircle, Clock, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Langsung ambil dari searchParams tanpa state
  const orderNumber = searchParams.get("order") || "";

  useEffect(() => {
    // Hanya untuk redirect logic
    if (!searchParams.get("order")) {
      router.push("/");
    }
  }, [searchParams, router]);

  // Calculate estimated delivery (3-5 days from now)
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  const deliveryDate = estimatedDelivery.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order has been received and is being
        processed.
      </p>

      {/* Order Details */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShoppingBag className="w-5 h-5" />
          <h2 className="text-lg font-bold">Order Details</h2>
        </div>

        <div className="mb-6">
          <p className="text-2xl font-bold text-gray-800 mb-2">{orderNumber}</p>
          <p className="text-gray-600">We&apos;ve sent a confirmation email</p>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium">Estimated Delivery</h3>
          </div>
          <p className="text-lg font-semibold">{deliveryDate}</p>
          <p className="text-sm text-gray-600 mt-2">
            Standard Shipping (3-5 business days)
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
        <h3 className="font-bold mb-4">What happens next?</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-medium">Order Processing</h4>
              <p className="text-sm text-gray-600">
                We&apos;ll prepare your items for shipping
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium">Shipping Confirmation</h4>
              <p className="text-sm text-gray-600">
                You&apos;ll receive an email with tracking information
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-medium">Delivery</h4>
              <p className="text-sm text-gray-600">
                Your order will arrive by {deliveryDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
        >
          <Home size={18} />
          Continue Shopping
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
