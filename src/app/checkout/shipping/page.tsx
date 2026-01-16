"use client";

import ShippingForm from "@/components/checkout/shipping-form";

const ShippingPage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Shipping Information</h1>
        <p className="text-gray-600">
          Please enter your shipping details. All fields marked with * are
          required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border p-6">
            <ShippingForm />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg border p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$109.97</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$10.99</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>$126.95</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
