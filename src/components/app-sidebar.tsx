import * as React from "react"
import { SidebarSection } from "./SidebarSection"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import type { SidebarSection as SidebarSectionType } from "@/types/SidebarSection"
import logo from "@/assets/m-iot.svg"

const user =  {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

export function AppSidebar({ items, ...props }: React.ComponentProps<typeof Sidebar> & { items: SidebarSectionType[] }) {
  return (
    <Sidebar variant="inset" {...props}>

      {/* Header */}
      <SidebarHeader>
        <div className="" >
          {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Command className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Acme Inc</span>
            <span className="truncate text-xs">Enterprise</span>
          </div> */}
          <img src={logo} alt="M-IoT" className="h-14"  />
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="gap-0 mt-2">
        { items.map((section, index) => ( 
          <SidebarSection key={index} title={section.title} items={section.items}/>
          ))
        }
      </SidebarContent>


      {/* Footer */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
