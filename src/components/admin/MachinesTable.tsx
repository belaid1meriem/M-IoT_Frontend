"use client"

import { useEffect, useState } from 'react'
import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import type { Machine } from '@/types/Machine'
import type { Capture } from '@/types/Site'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import CapteursTable from './CapteursTable'

// --- Mock data --------------------------------------------------------------
const MOCK_MACHINES: Machine[] = [
  {
    site: 1,
    identificateur: 'M-001',
    status: 'active',
    date_installation: '2025-08-13T10:00:00Z',
    captures: [
      {
        num_serie: 'CAP-101',
        date_install: '2025-08-09',
        parametres: [
          { nom: 'Température', unite: '°C', valeur_max: 100 },
          { nom: 'Pression', unite: 'bar', valeur_max: 10 },
        ],
      },
    ],
  },
  {
    site: 2,
    identificateur: 'M-002',
    status: 'maintenance',
    date_installation: '2025-07-01T12:00:00Z',
    captures: [
      {
        num_serie: 'CAP-202',
        date_install: '2025-07-02',
        parametres: [
          { nom: 'Humidité', unite: '%', valeur_max: 90 },
          { nom: 'CO2', unite: 'ppm', valeur_max: 2000 },
        ],
      },
    ],
  },
  {
    site: 1,
    identificateur: 'M-003',
    status: 'inactive',
    date_installation: '2025-06-10T08:30:00Z',
    captures: [],
  },
]

// --- Component --------------------------------------------------------------
export const MachinesTable = () => {
  // Drawer state
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)

  // Table state (copying your ClientTable pattern)
  const [filteredData, setFilteredData] = useState<Machine[]>([])

  useEffect(() => {
    setFilteredData(MOCK_MACHINES)
  }, [])

  const machineColumns: Column<Machine>[] = [
    {
      header: 'Identificateur',
      accessor: 'identificateur',
      className: 'rounded-l-sm rounded-b-none px-4',
    },
    { header: 'Statut', accessor: 'status', className: '' },
    {
      header: "Date d'installation",
      accessor: 'date_installation',
      className: '',
      render: (row: Machine) => new Date(row.date_installation).toLocaleString(),
    },
    {
      header: ' ',
      accessor: 'detail',
      className: 'rounded-r-sm rounded-b-none',
      render: (row: Machine) => (
        <p
          className="cursor-pointer"
          onClick={() => {
            setSelectedMachine(row)
            setSheetOpen(true)
          }}
        >
          Voir plus
        </p>
      ),
    },
  ]

  const handleSearch = (query: string) => {
    if (!query || query.trim() === '') {
      setFilteredData(MOCK_MACHINES)
      return
    }

    const searchQuery = query.trim().toLowerCase()

    setFilteredData(
      MOCK_MACHINES.filter((row) => {
        // Simple field search
        if (
          row.identificateur.toLowerCase().includes(searchQuery) ||
          row.status.toLowerCase().includes(searchQuery) ||
          row.date_installation.toLowerCase().includes(searchQuery)
        )
          return true

        // Optional: search inside captures' num_serie
        return row.captures?.some((c: Capture) =>
          c.num_serie.toLowerCase().includes(searchQuery)
        )
      })
    )
  }

  return (
    <>
      <DataTable
        data={filteredData}
        columns={machineColumns}
        searchable={true}
        searchKey="identificateur"
        scrollable={true}
        paginated={true}
        rowsPerPage={4}
        onSearch={handleSearch}
        showHeader={false}
        hasActions={{ hasPrimaryAction: false, hasSecondaryAction: false }}
      />

      {/* Slide-in with Capteurs table */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="sm:max-w-8xl p-4">
          <SheetHeader>
            <SheetTitle>
              Machine {selectedMachine?.identificateur} — Capteurs
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4">
            <CapteursTable/>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
