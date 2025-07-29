import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/layout/Header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import sidebarItems from "@/constants/client-sidebar-items"


export default function Client() {
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
