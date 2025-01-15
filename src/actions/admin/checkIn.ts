"use server"

import { api } from "@/lib/api";
import { z } from "zod";
import { auth } from "../../../auth";

interface CheckInMinister {
  id: string;
  checkIn: boolean;
}

export async function checkInMinister({ id, checkIn }: CheckInMinister) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(z.any(), {
      url: `/admin/registrations/${id}`,
      method: "PATCH",
      data: {
        minister_checked_in: checkIn,
      },
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });

    if (response.response_code === 200) {
    
      return {
        data: response.data,
        status: response?.response_code == 200,
        message: "Minister checked in successfully",
      };
    }

    return {
      data: null,
      status: false,
      message: response.message || "Something went wrong",
    };
  } catch (error) {
    console.error("Error checking in minister:", error);

    return {
      status: false,
      message: "Error checking in minister. Please try again later.",
      data: null,
    };
  }
}

export async function checkInGuest({ id, checkIn }: CheckInMinister) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(z.any(), {
      url: `/admin/registrations/${id}`,
      method: "PATCH",
      data: {
        guest_checked_in: checkIn,
      },
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });

    if (response.response_code === 200) {
    
      return {
        data: response.data,
        status: response?.response_code == 200,
        message: "Minister checked in successfully",
      };
    }

    return {
      data: null,
      status: false,
      message: response.message || "Something went wrong",
    };
  } catch (error) {
    console.error("Error checking in minister:", error);

    return {
      status: false,
      message: "Error checking in minister. Please try again later.",
      data: null,
    };
  }
}
