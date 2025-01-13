"use client";

import { NewConvert } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<NewConvert>[] = [
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
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
    cell({ row }) {
      const value: string = row.getValue("date_of_birth");

      return <span>{value ? format(value, "dd MMMM") : " - "}</span>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell({ row }) {
      const value: string = row.getValue("gender");

      return (
        <span>{value === "F" ? "Female" : value === "M" ? "Male" : " - "}</span>
      );
    },
  },
  {
    accessorKey: "service_number",
    header: "Service attended",
    cell({ row }) {
      const value: string = row.getValue("service_number");

      return (
        <span>
          {!value
            ? " - "
            : value === "1"
            ? "First service"
            : value === "2"
            ? "Second service"
            : value === "3"
            ? "Third service"
            : value === "4"
            ? "Fourth service"
            : value}
        </span>
      );
    },
  },
  {
    accessorKey: "attending_via",
    header: "Attended via",
    cell({ row }) {
      const value: string = row.getValue("attending_via");

      return <span>{!value ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "name_of_satellite_church",
    header: "Name of satellite church",
    cell({ row }) {
      const value: string = row.getValue("name_of_satellite_church");

      return <span>{!value ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell({ row }) {
      // const value: string = row.getValue("address");
      const value = row.original.address;

      return (
        <span className='text-center capitalize'>
          {!value ? " - " : value.address1},{" "}
          {value?.landmark && value?.landmark.length >= 1 && (
            <>
              <span className='text-gray-40'>Landmark</span>: {value?.landmark}
            </>
          )}
        </span>
      );
    },
  },
];
