import { z } from "zod";
import { paginatedSchema } from "./pagination";
import { AddressSchema } from "./address";

export const viewingCenterResponseSchema = z.object({
  _id: z.string(),
  country: z.string(),
  state: z.string(),
  name_of_host_church: z.string(),
  total_no_of_centres: z.number(),
  church_address: AddressSchema,
  contact_phone_number: z.string(),
  viewing_centre_locations: AddressSchema.array(),
});

export const viewingCentersResponseSchema = paginatedSchema.extend({
  data: viewingCenterResponseSchema.array(),
});

export type ViewingCenter = z.infer<typeof viewingCenterResponseSchema>;
