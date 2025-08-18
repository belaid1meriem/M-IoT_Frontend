"use client"

import { useEffect, useState } from 'react'
import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'

interface Objet {
  num_serie: string;
  type: string; // e.g. "actif", "passif"
  date_install: string; // ISO date string (e.g. "2025-08-14")
}


// --- Mock data --------------------------------------------------------------
const MOCK_OBJETS: Objet[] = [
  {
    num_serie: 'OBJ-001',
    type: 'actif',
    date_install: '2025-08-14',
  },
  {
    num_serie: 'OBJ-002',
    type: 'passif',
    date_install: '2025-07-30',
  },
  {
    num_serie: 'OBJ-003',
    type: 'actif',
    date_install: '2025-06-20',
  },
]

// --- Component --------------------------------------------------------------
export const ObjetsTable = () => {
  const [filteredData, setFilteredData] = useState<Objet[]>([])

  useEffect(() => {
    setFilteredData(MOCK_OBJETS)
  }, [])

  const objetColumns: Column<Objet>[] = [
    {
      header: 'Numéro de série',
      accessor: 'num_serie',
      className: 'rounded-l-sm rounded-b-none px-4',
    },
    {
      header: 'Type',
      accessor: 'type',
      className: '',
    },
    {
      header: "Date d'installation",
      accessor: 'date_install',
      className: 'rounded-r-sm rounded-b-none',
      render: (row: Objet) => new Date(row.date_install).toLocaleDateString(),
    },
  ]

  const handleSearch = (query: string) => {
    if (!query || query.trim() === '') {
      setFilteredData(MOCK_OBJETS)
      return
    }

    const searchQuery = query.trim().toLowerCase()

    setFilteredData(
      MOCK_OBJETS.filter((row) => {
        if (
          row.num_serie.toLowerCase().includes(searchQuery) ||
          row.type.toLowerCase().includes(searchQuery) ||
          row.date_install.toLowerCase().includes(searchQuery)
        )
          return true
        return false
      })
    )
  }

  return (
    <DataTable
      data={filteredData}
      columns={objetColumns}
      searchable={true}
      searchKey="num_serie"
      scrollable={true}
      paginated={true}
      rowsPerPage={4}
      onSearch={handleSearch}
      showHeader={false}
      hasActions={{ hasPrimaryAction: false, hasSecondaryAction: false }}
    />
  )
}
