import { z } from "zod";
import { paginatedSchema } from "./pagination";

export const newConvertResponseSchema = z.object({
  _id: z.string(),
  reg_type: z.enum(["alter_call", "first_timer"]),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  country: z.string(),
  state: z.string(),
  phone_number: z.string(),
  gender: z.string(),
  date_of_birth: z.string().date().optional(),
  address: z
    .object({
      address1: z.string(),
      landmark: z.string(),
    })
    .optional(),
  service_number: z.string().optional(),
  attending_via: z.string().optional(),
  name_of_satellite_church: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  __v: z.number(),
});

export const newConvertsResponseSchema = paginatedSchema.extend({
  data: newConvertResponseSchema.array(),
});

export type NewConvert = z.infer<typeof newConvertResponseSchema>;
