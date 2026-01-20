import { getProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export function useProducts() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (query.error) {
      toast.error("Failed to load products", {
        description: query.error.message,
      });
    }
  }, [query.error]);

  return query;
}
