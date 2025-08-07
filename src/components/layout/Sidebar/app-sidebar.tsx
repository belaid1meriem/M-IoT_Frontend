import * as React from "react"
import { SidebarSection } from "./SidebarSection"
import { NavUser } from "@/components/layout/Sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import type { SidebarSection as SidebarSectionType } from "@/types/SidebarSection"
import logo from "@/assets/m-iot.svg"
import Logo from "@/components/Logo"

const user =  {
    name: "Admin IoT",
    email: "mm_belaid@esi.dz",
    avatar: "/avatars/shadcn.jpg",
}

export function AppSidebar({ items, ...props }: React.ComponentProps<typeof Sidebar> & { items: SidebarSectionType[] }) {
  return (
    <Sidebar variant="inset" {...props}>

      {/* Header */}
      <SidebarHeader className="mb-10">
        <Logo/>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="gap-4">
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
