import { getCSVContent } from "@/actions/admin/download";
import "client-only";

import { saveAs } from "file-saver";

export function downloadCSV(fileContent: Blob, fileName = "data.csv") {
  const blob = new Blob([fileContent], { type: "text/csv;charset=utf-8" });

  // Check for iOS Safari fallback
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

  if (isIOS) {
    // Use FileSaver for iOS
    saveAs(blob, fileName);
  } else {
    // Standard download method for other browsers
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export async function fetchCSVContent(
  data_type:
    | "testimonies"
    | "new-converts"
    | "viewing-centers"
    | "registrations"
) {
  const result = await getCSVContent(data_type);
  if (!result.status) {
    throw new Error(result.message || "Failed to fetch the CSV content");
  }
  return result.data;
}
