import { z } from "zod";
import { paginatedSchema } from "./pagination";

export const registrationResponseSchema = z.object({
  _id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  country: z.string(),
  state: z.string().optional(),
  gender: z.string(),
  phone_number: z.string(),
  new_member: z.boolean().optional(),
  country_of_ministry: z.string().optional(),
  state_of_ministry: z.string().optional(),
  minister_status: z.boolean().optional(),
  name_of_ministry: z.string().optional(),
  attending_via: z.string().optional(),
  updatedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime().optional(),
  __v: z.number(),
});

export const registrationsResponseSchema = paginatedSchema.extend({
  data: registrationResponseSchema.array(),
});

export type Registration = z.infer<typeof registrationResponseSchema>;
