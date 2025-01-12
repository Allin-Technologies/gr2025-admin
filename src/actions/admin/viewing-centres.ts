"use server";

import { api } from "@/lib/api";
import {
  PaginationState,
  PaginatedResponse,
  ViewingCenter,
  BaseResponse,
  viewingCenterResponseSchema,
} from "@/lib/zod";
import { auth } from "../../../auth";

interface GetVewingCenters {
  pagination: PaginationState;
  search?: string;
  country?: string;
  state?: string;
}

export async function getVewingCenter(
  id: string
): Promise<BaseResponse<ViewingCenter | null>> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(viewingCenterResponseSchema, {
      url: `/admin/viewing-centers/${id}`,
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
    console.error("Error requesting viewing centre data", error);
    return {
      data: null,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}

export async function getViewingCenters(
  params: GetVewingCenters
): Promise<PaginatedResponse<ViewingCenter>> {
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
    const response = await api(viewingCenterResponseSchema.array(), {
      url: "/admin/viewing-centers",
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
    console.error("Error requesting viewing centres data", error);
    return {
      rows: [],
      pageCount: 0,
      rowCount: 0,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}
