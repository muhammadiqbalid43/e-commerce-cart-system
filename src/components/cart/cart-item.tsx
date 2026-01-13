"use client";

import { CartItem as CartItemType, useCartStore } from "@/lib/stores/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { updateQuantity, removeItem } = useCartStore();
  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover rounded"
          sizes="80px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>

        {/* Quantity Controls */}

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border rounded">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1 hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-3 min-w-[40px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="text-right">
        <p className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
