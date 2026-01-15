"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCheckoutPage = pathname?.startsWith("/checkout");

  return (
    <>
      {!isCheckoutPage && <Header />}
      {children}
      {!isCheckoutPage && <Footer />}
    </>
  );
}
