import { getProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    meta: {
      errorMessage: toast("Failed to load products"),
    },
  });
}
