import type { SidebarSection } from "@/types/SidebarSection"

import {
  Home,
  Bell,
  MapPinned,
  FileText,
  Ticket,
  Wrench,
} from "lucide-react"

const siteId = localStorage.getItem("siteId") || "1"

const sidebarItems: SidebarSection[] = [
  {
    items: [
      {
        title: "Accueil",
        url: `/client/${siteId}`,
        icon: Home,
        // end: false
      },
    ]
  },
  {
    title: "Centre de supervision",
    items: [
      {
        title: "Alertes",
        url: `/client/${siteId}/alerts`,
        icon: Bell,
      },
      {
        title: "Assets Tracking",
        icon: MapPinned,
        items: [
          {
            title: "Statistiques",
            url: `/client/${siteId}/assets-tracking/statistics`,
          },
          {
            title: "Localisation",
            url: `/client/${siteId}/assets-tracking/localisation`,
          },
        ],
      },
      {
        title: "Rapports",
        icon: FileText,
        items: [
          {
            title: "Historique des mesures",
            url: `/client/${siteId}/reports/historique`,
          },
          {
            title: "Analyse graphique",
            url: `/client/${siteId}/reports/analyse-graphique`,
          },
          {
            title: "Analyse par seuil",
            url: `/client/${siteId}/reports/analyse-seuil`,
          },
          {
            title: "Résumé journalier",
            url: `/client/${siteId}/reports/resume-journalier`,
          },
        ],
      },
      {
        title: "Tickets",
        url: `/client/${siteId}/tickets`,
        icon: Ticket,
      },
      {
        title: "Maintenance",
        icon: Wrench,
        items: [
          {
            title: "Vue d'ensemble",
            url: `/client/${siteId}/maintainance/overview`,
          },
          {
            title: "Historique d'alertes",
            url: `/client/${siteId}/maintainance/alerts`,
          },
        ],
      }
    ]
  }
]

export default sidebarItems