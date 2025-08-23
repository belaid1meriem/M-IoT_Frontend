import { DataTable } from './table/DataTable'
import { Card, CardContent } from './ui/card'
import { useState } from 'react'
import { useNavigate } from 'react-router'


type CapteurData = {
  id: number;
  temps: string; // e.g. '02-10-2024\n11:01'
  capteur: string; // e.g. 'NST TH 001'
  temperature: number;
  luminosite: number;
  humidite: number;
  amperage: number;
  voltage: number;
  pression: number;
  vibration: number;
};



// Column configuration
const sensorColumns = [
    { 
      header: 'Temps', 
      accessor: 'temps', 
      className: 'font-medium rounded-l-sm rounded-b-none px-4',
    },
    { 
      header: 'Capteur', 
      accessor: 'capteur', 
    },
    { 
      header: 'Température (C°)', 
      accessor: 'temperature', 
    },
    { 
      header: 'Luminosité (Lumens)', 
      accessor: 'luminosite', 
    },
    { 
      header: 'Humidité', 
      accessor: 'humidite',
      render: (row: CapteurData) => `${row.humidite}%`
    },
    { 
      header: 'Ampérage (A)', 
      accessor: 'amperage', 
    },
    { 
      header: 'Voltage (V)', 
      accessor: 'voltage', 
    },
    { 
      header: 'Pression (Pa)', 
      accessor: 'pression', 
    },
    { 
      header: 'Vibration (m/s)', 
      accessor: 'vibration', 
      className: 'rounded-r-sm rounded-b-none',
    },
];

const mockData: CapteurData[] = [
    {
      id: 1,
      temps: '02-10-2024\n11:01',
      capteur: 'NST TH 001',
      temperature: 23.5,
      luminosite: 450,
      humidite: 65,
      amperage: 2.3,
      voltage: 12.1,
      pression: 1013.2,
      vibration: 0.02
    },
    {
      id: 2,
      temps: '02-10-2024\n11:01',
      capteur: 'NST TH 001',
      temperature: 24.1,
      luminosite: 420,
      humidite: 63,
      amperage: 2.1,
      voltage: 12.3,
      pression: 1012.8,
      vibration: 0.01
    },
    {
      id: 3,
      temps: '02-10-2024\n11:01',
      capteur: 'NST TH 001',
      temperature: 22.8,
      luminosite: 380,
      humidite: 68,
      amperage: 2.5,
      voltage: 11.9,
      pression: 1014.1,
      vibration: 0.03
    },
    {
      id: 4,
      temps: '02-10-2024\n11:02',
      capteur: 'NST TH 002',
      temperature: 25.3,
      luminosite: 520,
      humidite: 58,
      amperage: 1.9,
      voltage: 12.4,
      pression: 1011.5,
      vibration: 0.01
    },
    {
      id: 5,
      temps: '02-10-2024\n11:02',
      capteur: 'NST TH 002',
      temperature: 26.1,
      luminosite: 610,
      humidite: 55,
      amperage: 2.0,
      voltage: 12.2,
      pression: 1010.9,
      vibration: 0.02
    },
    {
      id: 6,
      temps: '02-10-2024\n11:03',
      capteur: 'NST TH 003',
      temperature: 21.7,
      luminosite: 320,
      humidite: 72,
      amperage: 2.8,
      voltage: 11.8,
      pression: 1015.3,
      vibration: 0.04
    },
    {
      id: 7,
      temps: '02-10-2024\n11:03',
      capteur: 'NST TH 003',
      temperature: 22.2,
      luminosite: 340,
      humidite: 70,
      amperage: 2.6,
      voltage: 12.0,
      pression: 1014.8,
      vibration: 0.02
    },
    {
      id: 8,
      temps: '02-10-2024\n11:04',
      capteur: 'NST TH 004',
      temperature: 27.8,
      luminosite: 720,
      humidite: 48,
      amperage: 1.7,
      voltage: 12.6,
      pression: 1009.2,
      vibration: 0.01
    }
  ];


export const MachineTable = () => {
  const [data, setData] = useState<CapteurData[]>(mockData)
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Return all data if no query provided
    if (!query || query.trim() === '') {
      return 
    }

    const searchQuery = query.trim().toLowerCase()

    setData(mockData.filter((row) => {
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

  const handleRowClick = (row: CapteurData, index: number) => {
    // navigate(`machine/${row.numeroSerie}`)
  }

  return (
    <Card>
      <CardContent>
      <DataTable
        data={data}
        columns={sensorColumns}
        searchable={true}
        searchKey="capteur"
        scrollable={true}
        paginated={true}
        rowsPerPage={10}
        clickableRows={false}
        title='Dernières données des capteurs'
      />
      </CardContent>
    </Card>
  )
}

export default MachineTable