"use client";

import { Registration } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Registration>[] = [
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
    accessorKey: "phone_number",
    header: "Phone Number",
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
    accessorKey: "attending_via",
    header: "Attending Via",
    cell({ row }) {
      const value: string = row.getValue("attending_via");

      return (
        <span className='text-center capitalize'>{!value ? " - " : value}</span>
      );
    },
  },
  {
    accessorKey: "organization_name",
    header: "Organization",
  },
  {
    accessorKey: "role_at_organization",
    header: "Role",
  },
];
