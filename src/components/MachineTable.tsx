import { DataTable } from './table/DataTable'
import { Card, CardContent } from './ui/card'
import { useState } from 'react'

export interface SensorData {
  num_serie: string;
  temps?: string | null;
  temperateur?: number;
  luminosite?: number;
  humidite?: number;
  vibration?: number;
  voltage?: number;
  pression?: number;
  amperage?: number;
  temperature?: number;
}

// Helper function to format sensor values
const formatSensorValue = (value: number | undefined, unit?: string) => {
  if (value === undefined || value === null) return '-';
  return unit ? `${value}${unit}` : value.toString();
};

// Helper function to format timestamp
const formatTimestamp = (temps: string | null | undefined) => {
  if (!temps) return '-';
  try {
    const date = new Date(temps);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '\n');
  } catch {
    return temps; // Return original if parsing fails
  }
};

// Column configuration
const sensorColumns = [
  { 
    header: 'Temps', 
    accessor: 'temps',
    className: 'font-medium rounded-l-sm rounded-b-none px-4',
    render: (row: SensorData) => formatTimestamp(row.temps)
  },
  { 
    header: 'Capteur', 
    accessor: 'num_serie',
  },
  { 
    header: 'Température (C°)', 
    accessor: 'temperature',
    render: (row: SensorData) => formatSensorValue(row.temperature, '°C')
  },
  { 
    header: 'Luminosité (Lumens)', 
    accessor: 'luminosite',
    render: (row: SensorData) => formatSensorValue(row.luminosite)
  },
  { 
    header: 'Humidité', 
    accessor: 'humidite',
    render: (row: SensorData) => formatSensorValue(row.humidite, '%')
  },
  { 
    header: 'Ampérage (A)', 
    accessor: 'amperage',
    render: (row: SensorData) => formatSensorValue(row.amperage, 'A')
  },
  { 
    header: 'Voltage (V)', 
    accessor: 'voltage',
    render: (row: SensorData) => formatSensorValue(row.voltage, 'V')
  },
  { 
    header: 'Pression (Pa)', 
    accessor: 'pression',
    render: (row: SensorData) => formatSensorValue(row.pression, 'Pa')
  },
  { 
    header: 'Vibration (m/s)', 
    accessor: 'vibration',
    className: 'rounded-r-sm rounded-b-none',
    render: (row: SensorData) => formatSensorValue(row.vibration, 'm/s')
  },
];


interface MachineTableProps {
  data: SensorData[];
}

export const MachineTable = ({ data: initialData }: MachineTableProps) => {
  const [data, setData] = useState<SensorData[]>(initialData)

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Return all data if no query provided
    if (!query || query.trim() === '') {
      setData(initialData);
      return;
    }

    const searchQuery = query.trim().toLowerCase()

    setData(initialData.filter((row) => {
      // Search through all fields in the row
      return Object.entries(row).some(([key, value]) => {
        // Skip null, undefined, or non-primitive values
        if (value == null) {
          return false;
        }

        // Special handling for numeric values
        if (typeof value === 'number') {
          return value.toString().includes(searchQuery);
        }

        // String values
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery);
        }

        return false;
      });
    }));
  }

  return (
    <Card>
      <CardContent>
        <DataTable
          data={data}
          columns={sensorColumns}
          searchable={true}
          onSearch={handleSearch}
          searchKey="num_serie"
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