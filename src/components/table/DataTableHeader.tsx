import { TableActions } from './TableActions'

type DataTableHeaderProps = {
  title: string
  onSearch?: (query: string) => void
  onFilter?: () => void
  onExport?: () => void
}


export const DataTableHeader = ({
  title,
  onSearch,
  onFilter,
  onExport
}: DataTableHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold ">
          {title}
        </h1>
        <TableActions 
          onSearch={onSearch}
          onFilter={onFilter}
          onExport={onExport}
        />
      </div>
    </div>
  )
}