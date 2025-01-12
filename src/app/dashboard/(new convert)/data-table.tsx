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
import { NewConvert } from "@/lib/zod";
import { columns } from "./columns";
import { Portal } from "@/components/ui/portal";
import { filterRegistrationsByTimeline } from "@/lib/table-timeline";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { getNewConverts } from "@/actions/admin/new-converts";

interface NewConvertTableProps {
  reg_type: "alter_call" | "first_timer";
  defaultData: NewConvert[];
  defaultPagination: PaginationState;
}

export function NewConvertTable({
  reg_type,
  defaultData: _defaultData,
  defaultPagination,
}: NewConvertTableProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const country = searchParams.get("country");
  const state = searchParams.get("state");

  const [pagination, setPagination] =
    React.useState<PaginationState>(defaultPagination);

  const dataQuery = useQuery({
    queryKey: [reg_type, pagination, search, country, state],
    queryFn: () =>
      getNewConverts({
        pagination,
        reg_type,
        search: search ?? undefined,
        country: country ?? undefined,
        state: state ?? undefined,
      }),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

  const defaultData = React.useMemo(() => _defaultData, [_defaultData]);

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualFiltering: true,
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
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
