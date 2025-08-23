import type { Column } from '@/types/Table'
import { DataTable } from './table/DataTable'
import { Card, CardContent } from './ui/card'
import { StatusBadge } from './ui/StatusBadge'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

export type EspaceDeStockage = {
  objet: string
  numeroSerie: string
  statut: 'Actif' | 'En maintenance' | 'En panne'
  dateInstallation: string
  dateDernierService: string
}

interface DashboardTableProps {
  data?: EspaceDeStockage[]
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

// Fallback data for when no props are provided
const defaultEspacesDeStockage: EspaceDeStockage[] = [
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

export const DashboardTable = ({ data: propData }: DashboardTableProps) => {
  const navigate = useNavigate()
  
  // Use prop data or fallback to default data
  const sourceData = propData || defaultEspacesDeStockage
  const [filteredData, setFilteredData] = useState<EspaceDeStockage[]>(sourceData)

  // Update filtered data when source data changes
  useEffect(() => {
    setFilteredData(sourceData)
  }, [sourceData])

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Return all data if no query provided
    if (!query || query.trim() === '') {
      setFilteredData(sourceData)
      return 
    }

    const searchQuery = query.trim().toLowerCase()

    setFilteredData(sourceData.filter((row) => {
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
          data={filteredData}
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