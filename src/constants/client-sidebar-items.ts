import type { SidebarSection } from "@/types/SidebarSection"


import {
  Home,
  Bell,
  MapPinned,
  FileText,
  Ticket,
  Wrench,
} from "lucide-react"


const sidebarItems: SidebarSection[] = [
  {
    items: [
      {
        title: "Accueil",
        url: "/client",
        icon: Home,
        end: false
      },
    ]
  },
  {
    title: "Centre de supervision",
    items: [
      {
        title: "Alertes",
        url: "/client/alerts",
        icon: Bell,
      },
      {
        title: "Assets Tracking",
        icon: MapPinned,
        items: [
          {
            title: "Statistiques",
            url: "/client/assets-tracking/statistics",
          },
          {
            title: "Localisation",
            url: "/client/assets-tracking/localisation",
          },
        ],
      },
      {
        title: "Rapports",
        icon: FileText,
        items: [
          {
            title: "Historique des mesures",
            url: "/client/reports/historique",
          },
          {
            title: "Analyse graphique",
            url: "/client/reports/analyse-graphique",
          },
          {
            title: "Analyse par seuil",
            url: "/client/reports/analyse-seuil",
          },
          {
            title: "Résumé journalier",
            url: "/client/reports/resume-journalier",
          },
        ],
      },
      {
        title: "Tickets",
        url: "/client/tickets",
        icon: Ticket,
      },
      {
        title: "Maintenance",
        icon: Wrench,
        items: [
          {
            title: "Vue d'ensemble",
            url: "/client/maintainance/overview",
          },
          {
            title: "Historique d'alertes",
            url: "/client/maintainance/alerts",
          },
        ],
      }
    ]
  }
]

export default sidebarItems