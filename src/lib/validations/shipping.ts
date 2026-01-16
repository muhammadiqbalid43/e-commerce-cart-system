// src/lib/validations/shipping.ts
import { z } from "zod";

export const shippingFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z.string().email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]*$/, "Please enter a valid phone number"),

  addressLine1: z.string().min(5, "Address must be at least 5 characters"),

  addressLine2: z.string().optional(),

  city: z.string().min(2, "City is required"),

  postalCode: z.string().min(3, "Postal code is required"),

  country: z.string().min(2, "Country is required"),
});

export type ShippingFormData = z.infer<typeof shippingFormSchema>;
