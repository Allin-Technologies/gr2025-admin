"use server";

import { api } from "@/lib/api";
import {
  PaginationState,
  PaginatedResponse,
  NewConvert,
  BaseResponse,
  newConvertResponseSchema,
} from "@/lib/zod";
import { auth } from "../../../auth";
import { getTopCountriesWithOther } from "@/lib/country";

interface GetNewConverts {
  pagination: PaginationState;
  reg_type: "alter_call" | "first_timer";
  search?: string;
  country?: string;
  state?: string;
}

export async function getNewConvert(
  id: string
): Promise<BaseResponse<NewConvert | null>> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(newConvertResponseSchema, {
      url: `/admin/new-converts/${id}`,
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
          ? "New convert data retrieved sucessfully"
          : (response?.message ?? "Something went wrong"),
    };
  } catch (error) {
    console.error("Error requesting new convert data", error);
    return {
      data: null,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}

export async function getNewConverts(
  params: GetNewConverts
): Promise<PaginatedResponse<NewConvert>> {
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
    const response = await api(newConvertResponseSchema.array(), {
      url: "/admin/new-converts",
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
      pageCount: 1, // TODO: update to use `total_pages`
      rowCount: response?.count ?? (response?.data ?? [])?.length ?? 0,
      status: response?.response_code == 200,
      message:
        response?.response_code == 200
          ? "New converts data retrieved sucessfully"
          : (response?.message ?? "Something went wrong"),
    };
  } catch (error) {
    console.error("Error requesting new converts data", error);
    return {
      rows: [],
      pageCount: 0,
      rowCount: 0,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}

export async function getNewConvertMetrics(params: {
  reg_type: "alter_call" | "first_timer";
}) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      total_number: 0,
      male: 0,
      female: 0,
      nigeria: 0,
      outside_nigeria: 0,
      data: [],
      countries: {
        result: [],
        count: 0,
      },
    };
  }

  try {
    const response = await api(newConvertResponseSchema.array(), {
      url: "/admin/new-converts",
      method: "get",
      params: {
        ...params,
        page: -1,
      },
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    return {
      total_number: response?.count ?? 0,
      male: response?.data?.filter((nc) => nc.gender === "M")?.length ?? 0,
      female: response?.data?.filter((nc) => nc.gender === "F")?.length ?? 0,
      nigeria:
        response?.data?.filter((nc) => nc.country === "Nigeria")?.length ?? 0,
      outside_nigeria:
        response?.data?.filter((nc) => nc.gender !== "Nigeria")?.length ?? 0,
      data: response?.data ?? [],
      countries: getTopCountriesWithOther(response?.data ?? []),
    };
  } catch (error) {
    console.error("Error requesting new converts metrics data", error);
    return {
      total_number: 0,
      male: 0,
      female: 0,
      nigeria: 0,
      outside_nigeria: 0,
      data: [],
      countries: {
        result: [],
        count: 0,
      },
    };
  }
}
