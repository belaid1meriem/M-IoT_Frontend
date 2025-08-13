import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import { useEffect, useState } from 'react'
import type { Client } from '@/types/Client'
import { useClients } from '@/hooks/useClients'
import Loading from '../Loading'
import { useNavigate } from 'react-router'


export const ClientTable = () => {
  const { clients, isLoading } = useClients()
  const navigate = useNavigate()
  
  // Local state for filtered/searched data
  const [filteredData, setFilteredData] = useState<Client[]>([])

  // Update filtered data when clients change
  useEffect(() => {
    setFilteredData(clients)
  }, [clients])

  const clientColumns: Column<Client>[] = [
  { 
    header: 'Client', 
    accessor: 'client', 
    className: 'rounded-l-sm rounded-b-none px-4',
  },
  { 
    header: 'Industrie', 
    accessor: 'industrie', 
    className: ''
  },
  { 
    header: 'Adresse', 
    accessor: 'adresse',
    className: ''
  },
  { 
    header: 'Email', 
    accessor: 'email', 
    className: '',
  },
  { 
    header: ' ', 
    accessor: 'detail', 
    className: 'rounded-r-sm rounded-b-none',
    render: (row: Client) => {
      return (<p className='cursor-pointer' onClick={()=>navigate('/admin/clients/1')}>Voir plus</p>)
    }
  },
]

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    
    // Return all data if no query provided
    if (!query || query.trim() === '') {
      setFilteredData(clients)
      return 
    }

    const searchQuery = query.trim().toLowerCase()

    setFilteredData(clients.filter((row) => {
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

  const handleAddClient = () => {
    // navigate('add-client')
    // Or implement add client modal logic
  }

  return (
    isLoading 
      ? <Loading/>
      : (
        <DataTable
          // Table props
          data={filteredData}
          columns={clientColumns}
          searchable={true}
          searchKey="client"
          scrollable={true}
          paginated={true}
          rowsPerPage={4}
          
          // Header props (now integrated)
          onSearch={handleSearch}
          onPrimaryAction={handleAddClient}
          primaryActionText='Ajouter un Client'
          hasActions={{
            hasPrimaryAction: true,
            hasSecondaryAction: false
          }}
          showHeader={true}
        />
      )
  )
}

export default ClientTable