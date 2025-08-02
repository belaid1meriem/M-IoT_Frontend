import { useState } from 'react'
import { Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchInput } from '../ui/SearchInput'

type TableActionsProps = {
  onSearch?: (query: string) => void
  onFilter?: () => void
  onExport?: () => void
}

export const TableActions = ({ 
  onSearch, 
  onFilter, 
  onExport 
}: TableActionsProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  return (
    <div className="flex items-center gap-3">
      <SearchInput
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Rechercher"
      />
      
      <Button variant="outline" onClick={onFilter} className='hidden lg:inline-flex'>
        <Filter className="w-4 h-4 mr-2" />
        Filtrer
      </Button>
      
      <Button onClick={onExport}  className='hidden lg:inline-flex'>
        <Download className="w-4 h-4 mr-2" />
        <p>Exporter</p>
        
      </Button>
    </div>
  )
}
