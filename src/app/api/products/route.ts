import { mockProducts } from "@/lib/data/products";
import { NextResponse } from "next/server";

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json(mockProducts);
}
