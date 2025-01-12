"use server";

import { auth } from "../../../auth";
import { env } from "../../../env";

export async function getCSVContent(
  data_type:
    | "testimonies"
    | "new-converts"
    | "viewing-centers"
    | "registrations"
) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await fetch(
      `${env.API_BASE_URL}/admin/download/${data_type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-GLORY-REIGN-KEY": env.GLORY_REIGN_KEY,
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Failed to register: ${response.status} ${response.statusText}. Details: ${errorDetails}`
      );
    }

    const data = await response?.blob();

    return {
      data,
      status: response?.status == 200,
      message:
        response?.status == 200
          ? "File content retrieved sucessfully"
          : "Something went wrong",
    };
  } catch (error) {
    console.error("Error requesting file content", error);
    return {
      data: null,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}
