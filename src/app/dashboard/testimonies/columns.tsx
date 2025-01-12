"use client";

import { ImageVideoGallery } from "@/components/ImageVideoGallery";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Testimony } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Testimony>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      return (
        <span>
          {row.original.first_name} {row.original.last_name}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "picture",
    header: "Picture",
    cell({ row }) {
      const value: string | undefined = row.getValue("picture");

      if (!value || value?.length === 0) return <span>-</span>;

      return <ImageVideoGallery items={value ? [value] : []} label='View' />;
    },
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "area_of_testimony",
    header: "Area of testimony",
  },
  {
    accessorKey: "testimony_in_detail",
    header: "Testimony in detail",
  },
  {
    accessorKey: "special_requirements",
    header: "Pictures or videos",
    cell({ row }) {
      const value: string = row.getValue("special_requirements");

      if (value === "No")
        return (
          <div className='h-6 px-2 py-1 bg-[#fbeae9] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#d3251f] text-xs font-medium'>
                  No
                </span>
              </div>
            </div>
          </div>
        );
      else if (value == "Yes")
        return (
          <div className='h-6 px-2 py-1 bg-[#e7f6ec] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#036b26] text-xs font-medium'>
                  Yes
                </span>
              </div>
            </div>
          </div>
        );
      else return <span>-</span>;
    },
  },
  {
    accessorKey: "consent_for_public_sharing",
    header: "Concent to public sharing",
    cell({ row }) {
      const value: string = row.getValue("consent_for_public_sharing");

      if (value === "No")
        return (
          <div className='h-6 px-2 py-1 bg-[#fbeae9] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#d3251f] text-xs font-medium'>
                  No
                </span>
              </div>
            </div>
          </div>
        );
      else if (value == "Yes")
        return (
          <div className='h-6 px-2 py-1 bg-[#e7f6ec] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#036b26] text-xs font-medium'>
                  Yes
                </span>
              </div>
            </div>
          </div>
        );
      else return <span>-</span>;
    },
  },
  {
    accessorKey: "image",
    header: "Media",
    cell({ row }) {
      const value: Array<string> | undefined = row.getValue("image");

      if (!value || value?.length === 0) return <span>-</span>;

      return <ImageVideoGallery items={value ?? []} />;
    },
  },
];
