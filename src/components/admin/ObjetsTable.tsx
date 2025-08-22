"use client"

import { useState, useMemo } from 'react'
import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import Loading from '../Loading'
import { useObjets } from '@/hooks/useObjets'
import type { ObjetGET } from '@/types/Objet'

interface ObjetsTableProps {
  siteId: number
  clientId: number
}

export const ObjetsTable = ({ siteId, clientId }: ObjetsTableProps) => {
  const { objets, isLoading, error } = useObjets(siteId, clientId)
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

  const objetColumns: Column<ObjetGET>[] = [
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
      header: 'Status',
      accessor: 'status',
      className: '',
    },
    {
      header: 'Date dernière surviellance ',
      accessor: 'type',
      className: '',
      render: (row: ObjetGET) => row.date_dernier_serveillance ? new Date(row.date_dernier_serveillance).toLocaleDateString() : '-',
    },
    {
      header: "Date d'installation",
      accessor: 'date_install',
      className: 'rounded-r-sm rounded-b-none',
      render: (row: ObjetGET) => row.date_install ? new Date(row.date_install).toLocaleDateString() : '-',
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