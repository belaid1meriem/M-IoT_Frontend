"use client"

import { useState, useMemo } from 'react'
import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import type { MachineGET } from '@/types/Machine'
import type { Capture } from '@/types/Site'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import CapteursTable from './CapteursTable'
import Loading from '../Loading'
import { useMachines } from '@/hooks/useMachines'

interface MachinesTableProps {
  siteId: number
  clientId: number
}

export const MachinesTable = ({ siteId, clientId }: MachinesTableProps) => {
  const { machines, isLoading, error } = useMachines(clientId,siteId)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Drawer state
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState<MachineGET | null>(null)

  const filteredData = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return machines
    }

    const query = searchQuery.trim().toLowerCase()

    return machines.filter((row) => {
      // Simple field search
      if (
        row.identificateur.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query) ||
        row.date_dernier_serv.toLowerCase().includes(query)
      )
        return true

      // Optional: search inside captures' num_serie
      return row.captures?.some((c: Capture) =>
        c.num_serie.toLowerCase().includes(query)
      )
    })
  }, [machines, searchQuery])

  const machineColumns: Column<MachineGET>[] = [
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
      render: (row: MachineGET) => row.date_dernier_serv ? new Date(row.date_dernier_serv).toLocaleDateString() : '-',
    },
    {
      header: ' ',
      accessor: 'detail',
      className: 'rounded-r-sm rounded-b-none',
      render: (row: MachineGET) => (
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
    setSearchQuery(query)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        <p>Erreur lors du chargement des machines: {error}</p>
      </div>
    )
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}

      {/* Slide-in with Capteurs table */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="sm:max-w-8xl p-4">
          <SheetHeader>
            <SheetTitle>
              Machine {selectedMachine?.identificateur} — Capteurs
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4">
            <CapteursTable 
              captures={selectedMachine?.captures || []}
              isLoading={false}
              error={null}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}