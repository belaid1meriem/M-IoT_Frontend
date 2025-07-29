import type { LucideIcon } from "lucide-react"

export type SideBarSubItem = {
  title: string
  url: string
  icon?: LucideIcon
}

export type SideBarItem = {
  title: string
  url?: string
  icon: LucideIcon
  items?: SideBarSubItem[]
}