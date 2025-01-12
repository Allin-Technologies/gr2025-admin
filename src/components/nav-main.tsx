"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavMain({
  items,
  role,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
    role: string[];
  }[];
  role: string;
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items
          ?.filter((i) => i.role?.includes(role))
          .map((item, index) => <NavLink key={index} {...item} />)}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavLink(item: {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}) {
  const pathname = usePathname();

  const otherHref = item.items?.map((i) => i.url) ?? [];

  const isSelected =
    (item.url === "/dashboard" && pathname === "/dashboard") ||
    (item.url !== "/dashboard" && pathname.startsWith(item.url)) ||
    (otherHref && otherHref.some((other) => pathname.startsWith(other)));

  return item.items ? (
    <Collapsible asChild defaultOpen={isSelected} className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 size-2' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <Link href={subItem.url} prefetch={true}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  ) : (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        className={cn({
          "bg-sidebar-accent group-data-[collapsible=icon]:bg-transparent text-sidebar-accent-foreground group-data-[collapsible=icon]:text-sidebar-accent":
            isSelected,
        })}
      >
        <Link href={item.url} prefetch={true}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
