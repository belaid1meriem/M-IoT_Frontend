import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import { useEffect, useState } from 'react'
import type { Capture } from '@/types/Site'
import Loading from '../Loading'

export const CapteursTable = () => {
  // ---- Mock data ----
  const mockCaptures: Capture[] = [
    {
      num_serie: 'CAP-001',
      date_install: '2025-08-09',
      parametres: [
        { nom: 'Température', unite: '°C', valeur_max: 100 },
        { nom: 'Pression', unite: 'bar', valeur_max: 10 }
      ]
    },
    {
      num_serie: 'CAP-002',
      date_install: '2025-07-15',
      parametres: [
        { nom: 'Humidité', unite: '%', valeur_max: 90 },
        { nom: 'CO2', unite: 'ppm', valeur_max: 2000 }
      ]
    },
    {
      num_serie: 'CAP-003',
      date_install: '2025-06-01',
      parametres: [
        { nom: 'Vitesse', unite: 'm/s', valeur_max: 50 }
      ]
    }
  ]

  // Simulate loading
  const [isLoading, setIsLoading] = useState(true)
  const [filteredData, setFilteredData] = useState<Capture[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setFilteredData(mockCaptures)
    }, 1000) // fake API delay
    return () => clearTimeout(timer)
  }, [])

  const captureColumns: Column<Capture>[] = [
    { 
      header: 'Numéro de série', 
      accessor: 'num_serie', 
      className: 'rounded-l-sm rounded-b-none px-4',
    },
    { 
      header: 'Date d’installation', 
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
    if (!query || query.trim() === '') {
      setFilteredData(mockCaptures)
      return 
    }

    const searchQuery = query.trim().toLowerCase()

    setFilteredData(mockCaptures.filter((row) => {
      if (
        row.num_serie.toLowerCase().includes(searchQuery) ||
        row.date_install.toLowerCase().includes(searchQuery)
      ) return true

      return row.parametres.some(p =>
        p.nom.toLowerCase().includes(searchQuery) ||
        p.unite.toLowerCase().includes(searchQuery) ||
        String(p.valeur_max).includes(searchQuery)
      )
    }))
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
