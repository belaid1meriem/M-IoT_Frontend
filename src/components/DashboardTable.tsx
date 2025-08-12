import type { Column } from '@/types/Table'
import { DataTable } from './table/DataTable'
import { Card, CardContent } from './ui/card'
import { StatusBadge } from './ui/StatusBadge'
import { useState } from 'react'
import { useNavigate } from 'react-router'

type EspaceDeStockage = {
  objet: string
  numeroSerie: string
  statut: 'Actif' | 'En maintenance' | 'En panne'
  dateInstallation: string
  dateDernierService: string
}

const storageColumns: Column<EspaceDeStockage>[] = [
  { 
    header: 'Objet', 
    accessor: 'objet', 
    className: 'font-medium rounded-l-sm rounded-b-none px-4',
  },
  { 
    header: 'Numéro de série', 
    accessor: 'numeroSerie', 
    className: 'text-muted-foreground'
  },
  { 
    header: 'Statut', 
    accessor: 'statut',
    render: (item: EspaceDeStockage) => <StatusBadge statut={item.statut} />
  },
  { 
    header: "Date d'installation", 
    accessor: 'dateInstallation', 
    className: 'text-muted-foreground'
  },
  { 
    header: 'Date du dernier service', 
    accessor: 'dateDernierService', 
    className: 'rounded-r-sm rounded-b-none',
  },
]

const espacesDeStockage: EspaceDeStockage[] = [
  {
    objet: 'Cab 01',
    numeroSerie: 'IOT-001',
    statut: 'Actif',
    dateInstallation: '03/04/2024',
    dateDernierService: '03/04/2024'
  },
  {
    objet: 'Cab 02',
    numeroSerie: 'IOT-002',
    statut: 'En maintenance',
    dateInstallation: '03/04/2024',
    dateDernierService: '03/04/2024'
  },
  {
    objet: 'Cab 03',
    numeroSerie: 'IOT-003',
    statut: 'En panne',
    dateInstallation: '03/04/2024',
    dateDernierService: '03/04/2024'
  },
  {
    objet: 'Cab 04',
    numeroSerie: 'IOT-004',
    statut: 'Actif',
    dateInstallation: '05/04/2024',
    dateDernierService: '15/05/2024'
  },
  {
    objet: 'Cab 05',
    numeroSerie: 'IOT-005',
    statut: 'En maintenance',
    dateInstallation: '10/04/2024',
    dateDernierService: '20/05/2024'
  }
]

export const DashboardTable = () => {
  const [data, setData] = useState<EspaceDeStockage[]>(espacesDeStockage)
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Return all data if no query provided
    if (!query || query.trim() === '') {
      setData(espacesDeStockage)
      return 
    }

    const searchQuery = query.trim().toLowerCase()

    setData(espacesDeStockage.filter((row) => {
      // Search through all fields in the row
      return Object.values(row).some(value => {
        // Skip null, undefined, or non-primitive values
        if (value == null || typeof value === 'object') {
          return false
        }

        const stringValue = String(value).toLowerCase()
        return stringValue.includes(searchQuery)
      })
    }))
  }

  const handleFilter = () => {
    console.log('Filter clicked')
    // Implement filter logic here
  }

  const handleExport = () => {
    console.log('Export clicked')
    // Implement export logic here
  }


  const handleRowClick = (row: EspaceDeStockage, index: number) => {
    navigate(`machine/${row.numeroSerie}`)
  }

  return (
    <Card>
      <CardContent>
        <DataTable
          // Table props
          data={data}
          columns={storageColumns}
          searchable={true}
          searchKey="objet"
          scrollable={true}
          paginated={true}
          rowsPerPage={3}
          onRowClick={handleRowClick}
          clickableRows={true}
          
          // Header props (now integrated)
          title="Espaces de Stockage"
          onSearch={handleSearch}
          onSecondaryAction={handleFilter}
          onPrimaryAction={handleExport}
          showHeader={true}
        />
      </CardContent>
    </Card>
  )
}

export default DashboardTable