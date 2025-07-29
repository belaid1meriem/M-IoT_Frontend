import {
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import type { SideBarSubItem } from "@/types/SidebarItem"
import { NavLink } from "react-router"


const SidebarSubElt = ({subItem}: {subItem: SideBarSubItem}) => {

    if (!subItem.url) {
        return (
        <SidebarMenuSubButton 
            asChild 
            className="rounded-sm"
        >
            <div className="flex items-center gap-2 w-full">
              <span>{subItem.title}</span>
            </div>
        </SidebarMenuSubButton>
        )
    }

  return (
        <NavLink to={subItem.url} end>
        {({ isActive }) => (
          <SidebarMenuSubButton 
            asChild 
            isActive={isActive}
            className="data-[active=true]:border-l-3 data-[active=true]:border-primary data-[active=true]:bg-secondary rounded-sm"
          >
            <div className="flex items-center gap-2 w-full">
              <span>{subItem.title}</span>
            </div>
          </SidebarMenuSubButton>
        )}
    </NavLink>
  )
}

export default SidebarSubElt