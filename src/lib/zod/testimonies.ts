import { z } from "zod";
import { paginatedSchema } from "./pagination";

export const testimonyResponseSchema = z.object({
  _id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  picture: z.string().nullable(),
  phone_number: z.string(),
  area_of_testimony: z.string(),
  testimony_in_detail: z.string(),
  special_requirements: z.string(),
  image: z.string().array(),
  consent_for_public_sharing: z.enum(["Yes", "No"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number(),
});

export const testimoniessResponseSchema = paginatedSchema.extend({
  data: testimonyResponseSchema.array(),
});

export type Testimony = z.infer<typeof testimonyResponseSchema>;
