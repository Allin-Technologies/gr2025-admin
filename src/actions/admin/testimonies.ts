"use server";

import { api } from "@/lib/api";
import {
  PaginationState,
  PaginatedResponse,
  Testimony,
  BaseResponse,
  testimonyResponseSchema,
} from "@/lib/zod";
import { auth } from "../../../auth";

interface GetTestimonies {
  pagination: PaginationState;
  search?: string;
  country?: string;
  state?: string;
}

export async function getTestimony(
  id: string
): Promise<BaseResponse<Testimony | null>> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(testimonyResponseSchema, {
      url: `/admin/testimonies/${id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    return {
      data: response?.data ?? null,
      status: response?.response_code == 200,
      message:
        response?.response_code == 200
          ? "Registration data retrieved sucessfully"
          : response?.message ?? "Something went wrong",
    };
  } catch (error) {
    console.error("Error requesting testimony data", error);
    return {
      data: null,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}

export async function getTestimonies(
  params: GetTestimonies
): Promise<PaginatedResponse<Testimony>> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      rows: [],
      pageCount: 0,
      rowCount: 0,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(testimonyResponseSchema.array(), {
      url: "/admin/testimonies",
      method: "get",
      params: {
        ...params,
        page: params.pagination.pageIndex + 1,
        page_size: params.pagination.pageSize,
      },
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    return {
      rows: response?.data ?? [],
      pageCount: Math.ceil(
        (response?.count ?? 0) / (params.pagination.pageSize ?? 10)
      ),
      rowCount: (response?.data ?? [])?.length ?? 0,
      status: response?.response_code == 200,
      message:
        response?.response_code == 200
          ? "Registrations data retrieved sucessfully"
          : response?.message ?? "Something went wrong",
    };
  } catch (error) {
    console.error("Error requesting testimonies data", error);
    return {
      rows: [],
      pageCount: 0,
      rowCount: 0,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}

export async function getTestimonyMetrics() {
  const session = await auth();

  if (!session || !session.user) {
    return {
      total_number: 0,
      data: [],
      countries: {
        result: [],
        count: 0,
      },
    };
  }

  try {
    const response = await api(testimonyResponseSchema.array(), {
      url: "/admin/testimonies",
      method: "get",
      params: {
        page: -1,
      },
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    return {
      total_number: response?.count ?? 0,
      data: response?.data ?? [],
      countries: {
        result: [],
        count: 0,
      },
    };
  } catch (error) {
    console.error("Error requesting testimonies data", error);
    return {
      total_number: 0,
      data: [],
      countries: {
        result: [],
        count: 0,
      },
    };
  }
}
