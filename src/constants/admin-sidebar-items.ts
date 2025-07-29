import type { SidebarSection } from "@/types/SidebarSection"

import {
  Ticket,
  Wrench,
  Users,       
  ShieldCheck
} from "lucide-react"


const sidebarItems: SidebarSection[] = [
  {
    title: "Centre de gestion",
    items: [
      {
        title: "Clients",
        url: "/admin/clients",
        icon: Users,
      },
      {
        title: "Admins",
        url: "/admin/admins",
        icon: ShieldCheck,
      },

      {
        title: "Tickets",
        url: "/admin/tickets",
        icon: Ticket,
      },
      {
        title: "Maintenance",
        icon: Wrench,
        items: [
          {
            title: "Vue d'ensemble",
            url: "/admin/maintainance/overview",
          },
          {
            title: "Historique d'alertes",
            url: "/admin/maintainance/alerts",
          },
        ],
      }
    ]
  }
]

export default sidebarItems