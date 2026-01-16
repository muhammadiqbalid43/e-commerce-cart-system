"use client";

import { CheckCircle, LucideIcon, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface stepsProps {
  id: string;
  name: string;
  icon: LucideIcon;
  path: string;
}

const steps: stepsProps[] = [
  { id: "cart", name: "Cart", icon: ShoppingCart, path: "/checkout/cart" },
  { id: "shipping", name: "Shipping", icon: Truck, path: "/checkout/shipping" },
  {
    id: "confirm",
    name: "Confirm",
    icon: CheckCircle,
    path: "/checkout/confirm",
  },
];

const CheckoutSteps = () => {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex((step) =>
    pathname.includes(step.id)
  );
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => {
        const isActive = index === currentStepIndex;
        const isCompleted = index < currentStepIndex;

        return (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step circle */}

            <Link href={step.path} className="flex flex-col items-center">
              <div
                className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${isCompleted ? "bg-green-500 text-white" : ""}
                ${isActive ? "bg-black text-white" : ""}
                ${!isActive && !isCompleted ? "bg-gray-200 text-gray-400" : ""}
              `}
              >
                <step.icon size={20} />
              </div>
              <span className="mt-2 text-sm font-medium">{step.name}</span>
            </Link>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`
                flex-1 h-1 mx-4
                ${isCompleted ? "bg-green-500" : "bg-gray-200"}
              `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
