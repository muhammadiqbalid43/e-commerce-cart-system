const ShippingPage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800">
          Shipping form will be implemented in Day 5
        </p>
      </div>
      <div className="flex justify-between">
        <a href="/checkout/cart" className="text-blue-600 hover:underline">
          ← Back to Cart
        </a>
        <a href="/checkout/confirm" className="bg-gray-200 px-4 py-2 rounded">
          Continue to Confirmation
        </a>
      </div>
    </div>
  );
};

export default ShippingPage;
