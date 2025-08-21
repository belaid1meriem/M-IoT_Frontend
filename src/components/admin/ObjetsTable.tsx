"use client"

import { useState, useMemo } from 'react'
import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import Loading from '../Loading'
import { useObjets } from '@/hooks/useObjets'

interface Objet {
  num_serie: string;
  type: string; // e.g. "actif", "passif"
  date_install: string; // ISO date string (e.g. "2025-08-14")
}

interface ObjetsTableProps {
  siteId: number
  clientId: number
}

export const ObjetsTable = ({ siteId }: ObjetsTableProps) => {
  const { objets, isLoading, error } = useObjets(siteId)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return objets
    }

    const query = searchQuery.trim().toLowerCase()

    return objets.filter((row) => {
      if (
        row.num_serie.toLowerCase().includes(query) ||
        row.type.toLowerCase().includes(query) ||
        row.date_install.toLowerCase().includes(query)
      )
        return true
      return false
    })
  }, [objets, searchQuery])

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
    setSearchQuery(query)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        <p>Erreur lors du chargement des objets: {error}</p>
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
      )}
    </>
  )
}