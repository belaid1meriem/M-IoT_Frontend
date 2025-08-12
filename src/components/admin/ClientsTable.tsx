// Updated ClientTable.tsx
import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import { useState } from 'react'

type Client = {
  client: string
  industrie: string
  adresse: string
  email: string
}

const clientColumns: Column<Client>[] = [
  { 
    header: 'Client', 
    accessor: 'client', 
    className: 'font-medium rounded-l-sm rounded-b-none px-4',
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
    accessor: 'details', 
    className: 'rounded-r-sm rounded-b-none',
    // render: (row: Client) => {

    // }
  },
]

let clientsData: Client[] = [
  {
    client: 'Client A',
    industrie: 'Technologie',
    adresse: '123 Rue de la Tech, Paris',
    email: 'contact@clienta.com'
  },
  {
    client: 'Client B',
    industrie: 'Manufacturing',
    adresse: '456 Avenue Industrielle, Lyon',
    email: 'info@clientb.com'
  },
  {
    client: 'Client C',
    industrie: 'Services',
    adresse: '789 Boulevard Central, Marseille',
    email: 'hello@clientc.com'
  },
  {
    client: 'Client D',
    industrie: 'Retail',
    adresse: '321 Rue Commerce, Toulouse',
    email: 'support@clientd.com'
  },
]
clientsData = clientsData.map((client: Client)=>{
    return {...client, details:'Voir plus' }
  })

export const ClientTable = () => {
  const [data, setData] = useState<Client[]>(clientsData)

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Return all data if no query provided
    if (!query || query.trim() === '') {
      setData(clientsData)
      return 
    }

    const searchQuery = query.trim().toLowerCase()

    setData(clientsData.filter((row) => {
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
    <DataTable
      // Table props
      data={data}
      columns={clientColumns}
      searchable={true}
      searchKey="client"
      scrollable={true}
      paginated={true}
      rowsPerPage={4}
      
      // Header props (now integrated)
      onSearch={handleSearch}
      onPrimaryAction={handleAddClient}
      primaryActionText= 'Ajouter un Client'
      hasActions={{
        hasPrimaryAction: true,
        hasSecondaryAction: false
      }}
      showHeader={true}
    />
  )
}

export default ClientTable