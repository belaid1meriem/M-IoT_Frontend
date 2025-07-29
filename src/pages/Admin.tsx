import { AppSidebar } from "@/components/layout/Sidebar/app-sidebar"
import Header from "@/components/layout/Header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import sidebarItems from "@/constants/admin-sidebar-items"


export default function Admin() {
  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />
      <SidebarInset>
        <Header/>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
