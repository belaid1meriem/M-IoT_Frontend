import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SearchInput } from '../ui/SearchInput'

type TableActionsProps = {
  onSearch?: (query: string) => void
  onSecondaryAction?: () => void
  onPrimaryAction?: () => void
  primaryActionText?: string
  secondaryActionText?: string
  hasActions?: {
    hasPrimaryAction: boolean,
    hasSecondaryAction: boolean
  }
}

export const TableActions = ({ 
  onSearch, 
  onSecondaryAction, 
  onPrimaryAction,
  primaryActionText = 'Exporter',
  secondaryActionText = 'Filtrer',
  hasActions = {
    hasPrimaryAction: true,
    hasSecondaryAction: true
  }
}: TableActionsProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  return (
    <div className="flex items-center justify-between">
      <SearchInput
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Rechercher"
      />

      <div className='flex items-center gap-3'>
        {hasActions.hasSecondaryAction && 
        <Button variant="outline" onClick={onSecondaryAction} className='hidden lg:inline-flex'>
          {secondaryActionText}
        </Button>
        }

        {hasActions.hasPrimaryAction && 
        <Button onClick={onPrimaryAction}  className='hidden lg:inline-flex'>
          {primaryActionText}
        </Button>
        }
      </div>

    </div>
  )
}
