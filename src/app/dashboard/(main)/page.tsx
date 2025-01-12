import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  getRegistrations,
  getRegistrationMetrics,
} from "@/actions/admin/registrations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getNewConvertMetrics } from "@/actions/admin/new-converts";
import { auth } from "../../../../auth";
import { getTestimonyMetrics } from "@/actions/admin/testimonies";
import { DataTable } from "./data-table";
import { columns as ministers_columns } from "../ministers/columns";
import { columns as testimony_columns } from "../testimonies/columns";
import { columns as attendees_columns } from "../attendees/columns";
import { columns as convert_columns } from "../(new convert)/columns";

export default async function Page() {
  const session = await auth();

  const defaultData = await getRegistrations({
    reg_type: "attendee",
    pagination: { pageIndex: 0, pageSize: 10 },
  });

  const total_reg = await getRegistrationMetrics({ reg_type: "attendee" });
  const attendee_reg = await getRegistrationMetrics({ reg_type: "attendee" });
  const minister_reg = await getRegistrationMetrics({ reg_type: "minister" });
  const alter_call_metrics = await getNewConvertMetrics({
    reg_type: "alter_call",
  });
  const first_timer_metrics = await getNewConvertMetrics({
    reg_type: "first_timer",
  });
  const testimony_metrics = await getTestimonyMetrics();

  return (
    <>
      <div className='p-4 pb-0 flex gap-3 items-center'>
        <SidebarTrigger />
        <h1 className='text-[#2b2b2b] text-lg font-semibold leading-7'>
          Dashboard
        </h1>
      </div>

      <Separator />

      <div className='p-4'>
        <div className='flex-col justify-start items-start gap-6 inline-flex'>
          <h1 className='text-neutral-900 text-4xl font-semibold'>
            Welcome, Salvation Ministries
          </h1>

          <div className='self-stretch justify-between items-center inline-flex'>
            <div className='flex-col justify-start items-start gap-3 inline-flex'>
              <p className='text-[#757575] text-sm leading-none'>
                Total Number of{" "}
                {(() => {
                  switch (session?.user?.role) {
                    case "admin":
                      return "Attendees and Metrics";
                    case "testimony":
                      return "Testimonies";
                    case "minister":
                      return "Ministers";
                    case "convert":
                      return "Altar Calls and First Timers";
                    case "attendee":
                      return "Attendees";
                    default:
                      return "";
                  }
                })()}
              </p>
              <h3 className='text-neutral-900 text-5xl font-semibold leading-none'>
                {(() => {
                  switch (session?.user?.role) {
                    case "admin":
                      return total_reg?.total_number?.toLocaleString();
                    case "testimony":
                      return (
                        testimony_metrics?.total_number?.toLocaleString() || "0"
                      );
                    case "minister":
                      return minister_reg?.total_number?.toLocaleString();
                    case "convert":
                      return (
                        (alter_call_metrics?.total_number || 0) +
                        (first_timer_metrics?.total_number || 0)
                      ).toLocaleString();
                    case "attendee":
                      return attendee_reg?.total_number?.toLocaleString();
                    default:
                      return "0";
                  }
                })()}
              </h3>
            </div>
          </div>
          <div className='grid grid-cols-5 gap-x-32 gap-y-6'>
            {session?.user?.role === "admin" ||
            session?.user?.role === "convert" ? (
              <div className='flex-col justify-start items-start gap-1 inline-flex'>
                <p className='text-[#757575] text-sm leading-none'>
                  Altar Call
                </p>
                <h4 className='text-neutral-900 text-3xl font-semibold leading-none'>
                  {alter_call_metrics?.total_number?.toLocaleString()}
                </h4>
              </div>
            ) : (
              <div />
            )}
            {session?.user?.role === "admin" ||
            session?.user?.role === "convert" ? (
              <div className='flex-col justify-start items-start gap-1 inline-flex'>
                <p className='text-[#757575] text-sm leading-none'>
                  First Timers
                </p>
                <h4 className='text-neutral-900 text-3xl font-semibold leading-none'>
                  {first_timer_metrics?.total_number?.toLocaleString()}
                </h4>
              </div>
            ) : (
              <div />
            )}
            <div></div>
            <div></div>
            <div></div>
            <div className='flex-col justify-start items-start gap-1 inline-flex'>
              <p className='text-[#757575] text-sm leading-none'>
                Registered Male
              </p>
              <h4 className='text-neutral-900 text-3xl font-semibold leading-none'>
                {total_reg?.male?.toLocaleString()}
              </h4>
            </div>
            <div className='flex-col justify-start items-start gap-1 inline-flex'>
              <p className='text-[#757575] text-sm leading-none'>
                Registered Female
              </p>
              <h4 className='text-neutral-900 text-3xl font-semibold leading-none'>
                {total_reg?.female?.toLocaleString()}
              </h4>
            </div>
            <div className='flex-col justify-start items-start gap-1 inline-flex'>
              <p className='text-[#757575] text-sm leading-none'>
                Total Ministers
              </p>
              <h4 className='text-neutral-900 text-3xl font-semibold leading-none'>
                {minister_reg?.total_number?.toLocaleString()}
              </h4>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min px-4 pt-0 space-y-3'>
        <div className='text-[#2b2b2b] text-sm font-semibold flex justify-between items-center'>
          <p>
            Recent{" "}
            {(() => {
              switch (session?.user?.role) {
                case "admin":
                  return "Attendees";
                case "testimony":
                  return "Testimonies";
                case "minister":
                  return "Ministers";
                case "convert":
                  return "First Timers";
                case "attendee":
                  return "Attendees";
                default:
                  return "";
              }
            })()}
          </p>

          <Button asChild size='small'>
            <Link
              href={`/dashboard/${(() => {
                switch (session?.user?.role) {
                  case "admin":
                    return "attendees";
                  case "testimony":
                    return "testimonies";
                  case "minister":
                    return "ministers";
                  case "convert":
                    return "first-timers";
                  case "attendee":
                    return "attendees";
                  default:
                    return "";
                }
              })()}`}
            >
              View All
            </Link>
          </Button>
        </div>

        <DataTable
          columns={(() => {
            switch (session?.user?.role) {
              case "admin":
                return attendees_columns as unknown as any;
              case "testimony":
                return testimony_columns as unknown as any;
              case "minister":
                return ministers_columns as unknown as any;
              case "convert":
                return convert_columns as unknown as any;
              case "attendee":
                return attendees_columns as unknown as any;
              default:
                return [];
            }
          })()}
          data={(() => {
            switch (session?.user?.role) {
              case "admin":
                return (
                  (attendee_reg?.data?.slice(0, 20) as unknown as any) ?? []
                );
              case "testimony":
                return (
                  (testimony_metrics?.data?.slice(0, 20) as unknown as any) ??
                  []
                );
              case "minister":
                return (
                  (minister_reg?.data?.slice(0, 20) as unknown as any) ?? []
                );
              case "convert":
                return (
                  (first_timer_metrics?.data?.slice(0, 20) as unknown as any) ??
                  []
                );
              case "attendee":
                return (
                  (attendee_reg?.data?.slice(0, 20) as unknown as any) ?? []
                );
              default:
                return [];
            }
          })()}
        />
      </div>
    </>
  );
}
