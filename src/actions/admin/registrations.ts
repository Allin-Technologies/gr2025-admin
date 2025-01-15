"use server";

import { api } from "@/lib/api";
import {
  PaginationState,
  PaginatedResponse,
  Registration,
  BaseResponse,
  registrationResponseSchema,
} from "@/lib/zod";
import { auth } from "../../../auth";
import { getTopCountriesWithOther } from "@/lib/country";
import { getCheckedInCount } from "@/lib/checked_in";

interface GetRegistrations {
  reg_type: "attendee" | "guest" | "minister";
  pagination: PaginationState;
  search?: string;
  country?: string;
  state?: string;
}

export async function getRegistration(
  id: string
): Promise<BaseResponse<Registration | null>> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(registrationResponseSchema, {
      url: `/admin/registrations/${id}`,
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
    console.error("Error requesting registration data", error);
    return {
      data: null,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}

export async function getRegistrations(
  params: GetRegistrations
): Promise<PaginatedResponse<Registration>> {
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
    const response = await api(registrationResponseSchema.array(), {
      url: "/admin/registrations",
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
    console.error("Error requesting registrations data", error);
    return {
      rows: [],
      pageCount: 0,
      rowCount: 0,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}

export async function getRegistrationMetrics({
  reg_type,
}: {
  reg_type?: "attendee" | "guest" | "minister";
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
      checked_in:  {
        minister_checked_in: 0,
        guest_checked_in: 0
      },
      attending: [],
    };
  }

  try {
    const response = await api(registrationResponseSchema.array(), {
      url: "/admin/registrations",
      method: "get",
      params: {
        page: -1,
        reg_type,
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
      attending: getUniqueAttendingVia(response?.data ?? []),
      checked_in: getCheckedInCount(response?.data ?? [])
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
      attending: [],
    };
  }
}

function getUniqueAttendingVia(data: Registration[]) {
  // Deduce unique attending via
  const attendingViaCounts: { [key: string]: number } = data.reduce(
    (acc, item) => {
      const attendingVia = item.attending_via || "Unknown";
      if (attendingVia) {
        acc[attendingVia] = (acc[attendingVia] || 0) + 1;
      }
      return acc;
    },
    {} as { [key: string]: number }
  ); // Type declaration for the accumulator

  // Convert counts into name-value pairs
  const attendingArray = Object.keys(attendingViaCounts).map((key) => ({
    name: key,
    value: attendingViaCounts[key],
  }));

  return attendingArray;
}
