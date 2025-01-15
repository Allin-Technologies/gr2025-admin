"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRegistrations } from "@/actions/admin/registrations";
import { Registration } from "@/lib/zod";
import { columns } from "./columns";
import { Portal } from "@/components/ui/portal";
import { filterRegistrationsByTimeline } from "@/lib/table-timeline";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { checkInMinister } from "@/actions/admin/checkIn";
import toast from "react-hot-toast";

interface RegistrationsTableProps {
  reg_type: "attendee" | "minister";
  defaultData: Registration[];
  defaultPagination: PaginationState;
}

export function RegistrationsTable({
  reg_type,
  defaultData: _defaultData,
  defaultPagination,
}: RegistrationsTableProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const country = searchParams.get("country");
  const state = searchParams.get("state");

  const [pagination, setPagination] =
    React.useState<PaginationState>(defaultPagination);

  const dataQuery = useQuery({
    queryKey: [reg_type, pagination, search, country, state],
    queryFn: () =>
      getRegistrations({
        reg_type,
        pagination,
        search: search ?? undefined,
        country: country ?? undefined,
        state: state ?? undefined,
      }),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

  const defaultData = React.useMemo(() => _defaultData, [_defaultData]);

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    pageCount: dataQuery.data?.pageCount ?? -1,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className='space-y-5'>
      <Portal targetId='table___timeline__' className='flex gap-3 item-center'>
        {dataQuery?.isFetching && (
          <Spinner className='size-4' spinnerClass='fill-gray-5' />
        )}
        <span className='leading-none'>
          {filterRegistrationsByTimeline(dataQuery?.data?.rows ?? defaultData)}
        </span>
      </Portal>
      <div className='rounded-xl overflow-clip'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                <TableRow>
                  Action
                </TableRow>
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableRow className="flex justify-center items-center">
                    {row.original.minister_checked_in ? 
                      <Button
                        className="text-white h-[30px] mt-1 bg-gray-600 text-nowrap"
                      >Checked in</Button> :
                       <Button
                        className="text-white h-[30px] mt-1 text-nowrap"
                        onClick={() => checkInMinister({id:row.original._id, checkIn:true})
                        .then(() => {
                          toast(`${row.original.first_name} ${row.original.last_name} has been checked in successfully`)
                          getRegistrations({
                            reg_type,
                            pagination,
                            search: search ?? undefined,
                            country: country ?? undefined,
                            state: state ?? undefined,
                          })
                        })
                        .catch(() => toast.error("Something went wrong"))}
                      >Check in</Button>
                  }
                  </TableRow>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-56 text-center'
                >
                  {dataQuery?.isFetching ? (
                    <Spinner
                      className='size-4 mx-auto'
                      spinnerClass='fill-gray-5'
                    />
                  ) : (
                    "No results."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Separator />

      <div className='flex justify-between items-center'>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium text-gray-50'>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className='flex items-center justify-end space-x-3 py-4'>
          <Button
            variant='outline'
            className='text-[#344054] rounded-xl disabled:opacity-40'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
              />
            </svg>

            <span>Previous</span>
          </Button>
          <Button
            variant='outline'
            className='text-[#344054] rounded-xl disabled:opacity-40'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span>Next</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
