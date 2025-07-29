import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import type { SideBarItem } from "@/types/SidebarItem"
import { NavLink } from "react-router"


const SidebarElt = ({item}: {item: SideBarItem}) => {

    if (!item.url) {
        return (
        <SidebarMenuButton 
            asChild 
            tooltip={item.title}
            className="rounded-sm"
        >
            <div className="flex items-center gap-2 w-full">
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </div>
        </SidebarMenuButton>
        )
    }

  return (
    <NavLink to={item.url} end>
        {({ isActive }) => (
          <SidebarMenuButton 
            asChild 
            tooltip={item.title}
            isActive={isActive}
            className="data-[active=true]:border-l-3 data-[active=true]:border-primary data-[active=true]:bg-secondary rounded-sm"
          >
            <div className="flex items-center gap-2 w-full">
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </div>
          </SidebarMenuButton>
        )}
    </NavLink>
  )
}

export default SidebarElt