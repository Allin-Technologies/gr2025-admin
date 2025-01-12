import { DownloadCSV } from "@/components/download-csv-button";
import { Separator } from "@/components/ui/separator";
import { RegistrationsTable } from "./data-table";
import { SearchFilters } from "@/components/search-filters";
import { getRegistrations } from "@/actions/admin/registrations";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function Page() {
  const defaultData = await getRegistrations({
    reg_type: "attendee",
    pagination: { pageIndex: 0, pageSize: 10 },
  });

  return (
    <>
      <div className='p-4 pb-0 flex gap-3 items-center'>
        <SidebarTrigger />
        <h1 className='text-[#2b2b2b] text-lg font-semibold leading-7'>
          Attendee
        </h1>
      </div>
      <Separator />

      <SearchFilters />

      <div className='flex justify-between item-center p-4 pb-0'>
        <div id='table___timeline__' className='text-sm text-gray-60' />
        <div />
        <div className='flex justify-end'>
          <DownloadCSV data_type='registrations' />
        </div>
      </div>
      <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min px-4 pt-0 space-y-3'>
        <div className='text-[#2b2b2b] text-sm font-semibold'>
          <p>All</p>
        </div>

        <RegistrationsTable
          reg_type='attendee'
          defaultData={defaultData?.rows ?? []}
          defaultPagination={{ pageIndex: 0, pageSize: 10 }}
        />
      </div>
    </>
  );
}
