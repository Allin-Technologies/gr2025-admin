import { DownloadCSV } from "@/components/download-csv-button";
import { Separator } from "@/components/ui/separator";
import { NewConvertTable } from "../data-table";
import { SearchFilters } from "@/components/search-filters";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  getNewConverts,
  getNewConvertMetrics,
} from "@/actions/admin/new-converts";
import { CountriesMetrics } from "../charts";
import { GenderMetrics } from "../charts";

export default async function Page() {
  const metrics = await getNewConvertMetrics({ reg_type: "first_timer" });
  const defaultData = await getNewConverts({
    pagination: { pageIndex: 0, pageSize: 10 },
    reg_type: "first_timer",
  });

  return (
    <>
      <div className='p-4 pb-0 flex gap-3 items-center'>
        <SidebarTrigger />
        <h1 className='text-[#2b2b2b] text-lg font-semibold leading-7'>
          Altar Call
        </h1>
      </div>

      <Separator />

      <div className='px-4 py-6 justify-start items-start gap-[42px] inline-flex'>
        <div className='w-[230px] h-[321px] flex-col justify-start items-start gap-[30px] inline-flex'>
          <div className='h-[104px] px-px flex-col justify-start items-start gap-2.5 flex'>
            <div className='self-stretch h-[104px] flex-col justify-start items-start gap-[7px] flex'>
              <div className='text-center text-[#98a1b2] text-base font-normal  leading-normal'>
                Total Number of First Timers
              </div>
              {/* <div className='justify-start items-center gap-1.5 inline-flex'>
                <div className='w-6 h-6 relative  overflow-hidden' />
                <div className='text-center'>
                  <span className="text-[#0f973d] text-[13px] font-semibold  leading-[18.20px]">
                    34%
                  </span>
                  <span className="text-[#667185] text-[13px] font-medium  leading-[18.20px]">
                    {" "}
                  </span>
                  <span className="text-[#98a1b2] text-[13px] font-normal  leading-[18.20px]">
                    (+20,904)
                  </span>
                </div>
              </div> */}
              <div className='text-neutral-900 text-[43px] font-semibold  leading-[43px]'>
                {metrics?.total_number?.toLocaleString()}
              </div>
            </div>
          </div>
          <div className='flex-col justify-start items-start gap-7 flex'>
            <div className='flex-col justify-start items-start flex'>
              <div className='text-center text-[#98a1b2] text-base font-normal  leading-normal'>
                Countries Represented
              </div>
              <div className='text-neutral-900 text-[43px] font-semibold  leading-[43px]'>
                {metrics?.countries?.count?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className='px-2'>
          <h2 className='text-left text-[#98a1b2] text-base font-normal leading-normal'>
            Gender Representation
          </h2>
          <GenderMetrics {...metrics} />
          <div className='flex-col justify-start items-start gap-2 flex w-full'>
            <div className='flex justify-between items-center gap-12 w-full'>
              <div className='justify-start items-center gap-2 flex'>
                <div className='w-2 h-2 bg-[#0F973D] rounded-full' />
                <span className='text-[#667185] text-sm font-normal'>Male</span>
              </div>
              <span className='text-right text-[#101828] text-sm font-medium'>
                {metrics?.male?.toLocaleString()}
              </span>
            </div>
            <div className='justify-between items-start flex gap-12 w-full'>
              <div className='justify-start items-center gap-2 flex'>
                <div className='w-2 h-2 bg-[#036b26] rounded-full' />
                <span className='text-[#667185] text-sm font-normal'>
                  Female
                </span>
              </div>
              <span className='text-right text-[#101828] text-sm font-medium'>
                {metrics?.female?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className='px-2'>
          <h2 className='text-left text-[#98a1b2] text-base font-normal  leading-normal'>
            Countries
          </h2>
          <CountriesMetrics {...metrics} />
          <div className='h-12'></div>
        </div>
      </div>

      <Separator />

      <SearchFilters />

      <div className='flex justify-between item-center p-4 pb-0'>
        <div id='table___timeline__' className='text-sm text-gray-60' />
        <div />
        <div className='flex justify-end'>
          <DownloadCSV data_type='new-converts' />
        </div>
      </div>
      <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min px-4 pt-0 space-y-3'>
        <div className='text-[#2b2b2b] text-sm font-semibold'>
          <p>All</p>
        </div>

        <NewConvertTable
          reg_type='first_timer'
          defaultData={defaultData?.rows ?? []}
          defaultPagination={{ pageIndex: 0, pageSize: 10 }}
        />
      </div>
    </>
  );
}
