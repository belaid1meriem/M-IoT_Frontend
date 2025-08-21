import { TableActions } from './TableActions'

type DataTableHeaderProps = {
  title?: string
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


export const DataTableHeader = ({
  title,
  onSearch,
  onSecondaryAction,
  onPrimaryAction,
  primaryActionText = 'Exporter',
  secondaryActionText = 'Filtrer',
  hasActions = {
    hasPrimaryAction: true,
    hasSecondaryAction: true
  }
}: DataTableHeaderProps) => {
  return (
    <div className="mb-6">
      { title && 
        <h1 className="text-lg font-semibold ">
          {title}
        </h1>
      }
      <TableActions 
        onSearch={onSearch}
        onSecondaryAction={onSecondaryAction}
        onPrimaryAction={onPrimaryAction}
        primaryActionText={primaryActionText}
        secondaryActionText={secondaryActionText}
        hasActions={hasActions}
      />
    </div>
  )
}