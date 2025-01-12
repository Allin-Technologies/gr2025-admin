"use server";

import { api } from "@/lib/api";
import { verifyLoginSchema, verifyLoginResponseSchema } from "@/lib/zod";
import { z } from "zod";
import { getServerUserAgent } from "@/hooks/use-user-agent";

export async function getOtp(email: string) {
  const userAgent = await getServerUserAgent();

  try {
    const response = await api(z.any(), {
      url: "/auth/login",
      method: "post",
      data: { email },
      headers: {
        "User-Agent": userAgent,
      },
    });

    return response;
  } catch (error) {
    console.error("Error requesting login otp", error);
    return {
      status: false,
      message: "Error",
      data: null,
    };
  }
}

export async function login(data: z.infer<typeof verifyLoginSchema>) {
  try {
    const response = await api(verifyLoginResponseSchema, {
      url: "/login/verify",
      method: "post",
      data,
    });

    return response.data;
  } catch (error) {
    console.error("Error requesting login otp", error);
    return {
      status: false,
      message: "Error",
      data: null,
    };
  }
}
