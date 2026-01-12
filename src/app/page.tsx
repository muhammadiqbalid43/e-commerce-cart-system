import ProductGrid from "@/components/products/product-grid";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Our Products</h1>
      <p className="text-gray-600 mb-8">
        Discover our collection of premium items
      </p>
      <ProductGrid />
    </div>
  );
}
