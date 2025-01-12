import { z } from "zod";

export const AddressSchema = z.object({
  _id: z.string(),
  address1: z.string(),
  address2: z.string(),
  formattedAddress: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
  lat: z.number(),
  lng: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
