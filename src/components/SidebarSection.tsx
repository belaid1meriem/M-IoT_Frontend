"use client"

import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router"
import type { SideBarItem } from "@/types/SidebarItem"
import SidebarElt from "./SidebarElt"
import SidebarSubElt from "./SidebarSubElt"

export function SidebarSection({
  items, title
}: {
  items: SideBarItem[],
  title?: string
}) {
  return (
    <SidebarGroup>
      { title && <SidebarGroupLabel>{title}</SidebarGroupLabel> }
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild >
        <SidebarMenuItem>
            <SidebarElt item={item} />
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                            <SidebarSubElt subItem={subItem} />
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}