import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TanstackProvider } from "@/components/tanstack-query-provider";
import { auth } from "../../../auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session?.user) {
    redirect(`/auth/sign-in?callbackUrl=/`, RedirectType.replace);
  }

  return (
    <TanstackProvider>
      <SidebarProvider className='bg-background'>
        <AppSidebar role={session?.user?.role ?? ""} />
        <SidebarInset className='p-4'>
          <div className='flex flex-1 flex-col gap-4 bg-white rounded-xl'>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TanstackProvider>
  );
}
