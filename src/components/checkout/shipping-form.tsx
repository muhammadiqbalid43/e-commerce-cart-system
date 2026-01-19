"use client";

import { useCheckoutStore } from "@/lib/stores/checkout";
import {
  ShippingFormData,
  shippingFormSchema,
} from "@/lib/validations/shipping";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
];

const ShippingForm = () => {
  const router = useRouter();

  const { shippingData, setShippingData } = useCheckoutStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingFormSchema),
    mode: "onTouched",
    defaultValues: shippingData || {},
  });

  const onSubmit = async (data: ShippingFormData) => {
    console.log("Form data:", data);
    setShippingData(data);
    // Save to localStorage or store
    localStorage.setItem("shipping-form-data", JSON.stringify(data));
    router.push("/checkout/confirm");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="(123) 456-7890"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="addressLine1"
          className="block text-sm font-medium mb-2"
        >
          Street Address *
        </label>
        <input
          id="addressLine1"
          type="text"
          {...register("addressLine1")}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.addressLine1 ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="123 Main St"
        />
        {errors.addressLine1 && (
          <p className="mt-1 text-sm text-red-600">
            {errors.addressLine1.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="addressLine2"
          className="block text-sm font-medium mb-2"
        >
          Apartment, Suite, etc. (Optional)
        </label>
        <input
          id="addressLine2"
          type="text"
          {...register("addressLine2")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Apt 4B"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-2">
            City *
          </label>
          <input
            id="city"
            type="text"
            {...register("city")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="New York"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium mb-2"
          >
            Postal Code *
          </label>
          <input
            id="postalCode"
            type="text"
            {...register("postalCode")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.postalCode ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="10001"
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-2">
            Country *
          </label>
          <select
            id="country"
            {...register("country")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={() => router.push("/checkout/cart")}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </button>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`px-8 py-3 rounded-lg font-medium ${
            isValid
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Processing..." : "Continue to Payment"}
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;
