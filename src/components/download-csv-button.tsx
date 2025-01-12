"use client";

import { downloadCSV } from "@/lib/download-csv";
import { fetchCSVContent } from "@/lib/download-csv";
import { Button } from "./ui/button";

import { useMutation } from "@tanstack/react-query";
import { Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function DownloadCSV({
  data_type,
}: {
  data_type:
    | "testimonies"
    | "new-converts"
    | "viewing-centers"
    | "registrations";
}) {
  const mutation = useMutation({
    mutationFn: () => fetchCSVContent(data_type),
    onSuccess: (data: Blob | null) => {
      if (!data) {
        toast("An error occurred while downloading the file");
        return;
      }
      // Trigger the CSV download on success
      downloadCSV(data, `${data_type}.csv`);
    },
    onError: (error: any) => {
      console.error(error);
      toast(error.message ?? "An error occurred while downloading the file");
      return;
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {mutation.isPending ? (
        <Loader2 className='size-4 animate-spin' />
      ) : (
        <Download className='size-4' />
      )}

      <span>{mutation.isPending ? "Loading..." : "Export csv"}</span>
    </Button>
  );
}
