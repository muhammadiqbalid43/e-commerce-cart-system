"use client";

import { selectTotalItems, useCartStore } from "@/lib/stores/cart";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";

const CartButton = () => {
  const totalItems = useCartStore(selectTotalItems);
  const openCart = useCartStore((state) => state.openCart);
  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={openCart}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge
          className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0"
          variant="destructive"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
