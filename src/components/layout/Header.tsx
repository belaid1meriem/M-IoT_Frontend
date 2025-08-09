import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

const Header = () => {
  return (
        <header className="flex h-16 shrink-0 items-center gap-2 sticky top-0 right-0 z-10 bg-background">
          <div className="flex items-center gap-2 px-3 py-2 border-b-1 w-full ">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical" 
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
  )
}

export default Header