import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import { useState, useMemo } from 'react'
import type { Capture } from '@/types/Site'
import Loading from '../Loading'

interface CapteursTableProps {
  captures: Capture[]
  isLoading?: boolean
  error: string | null
}

export const CapteursTable = ({ captures, isLoading = false, error }: CapteursTableProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return captures
    }

    const query = searchQuery.trim().toLowerCase()

    return captures.filter((row) => {
      if (
        row.num_serie.toLowerCase().includes(query) ||
        row.date_install.toLowerCase().includes(query)
      ) return true

      return row.parametres.some(p =>
        p.nom.toLowerCase().includes(query) ||
        p.unite.toLowerCase().includes(query) ||
        String(p.valeur_max).includes(query)
      )
    })
  }, [captures, searchQuery])

  const captureColumns: Column<Capture>[] = [
    { 
      header: 'Numéro de série', 
      accessor: 'num_serie', 
      className: 'rounded-l-sm rounded-b-none px-4',
    },
    { 
      header: "Date d'installation", 
      accessor: 'date_install',
      className: '',
      render: (row: Capture) => new Date(row.date_install).toLocaleDateString()
    },
    { 
      header: 'Paramètres', 
      accessor: 'parametres',
      className: '',
      render: (row: Capture) => (
        <div className="space-y-1">
          {row.parametres.map((p, idx) => (
            <div key={idx} className="text-sm">
              <span className="font-semibold">{p.nom}</span> ({p.unite}) - max: {p.valeur_max}
            </div>
          ))}
        </div>
      )
    }
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        <p>Erreur lors du chargement des capteurs: {error}</p>
      </div>
    )
  }

  return (
    isLoading 
      ? <Loading/>
      : (
        <DataTable
          data={filteredData}
          columns={captureColumns}
          searchable={true}
          searchKey="num_serie"
          scrollable={true}
          paginated={true}
          rowsPerPage={4}
          onSearch={handleSearch}
          showHeader={false}
          hasActions={{
            hasPrimaryAction: false,
            hasSecondaryAction: false
          }}
        />
      )
  )
}

export default CapteursTable