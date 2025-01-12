import { z } from "zod";

/**
 * Base schema for pagination.
 *
 * @deprecated This schema is deprecated and will be removed in future versions.
 * Pagination data is in reponse schema vaidated from the api handler.
 *
 * This schema is used to define the structure of a paginated response.
 *
 * @example
 * const somePaginatedResponseSchema = paginatedSchema.extend({
 *   data: z.object({ name: z.string() }).array(),
 * });
 */
export const paginatedSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  page_size: z.number(),
});

export interface PaginationState {
  pageIndex: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  rows: T[];
  pageCount: number;
  rowCount: number;
  message: string;
  status: boolean;
}
