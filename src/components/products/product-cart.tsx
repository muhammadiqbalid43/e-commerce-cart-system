"use client";

import { useCartStore } from "@/lib/stores/cart";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
