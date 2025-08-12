// Updated DataTable.tsx
import { Table } from '@/components/ui/table'
import { type DataTableProps } from '../../types/Table'
import { Pagination } from './Pagination'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { DataTableHeader } from './DataTableHeader'
import { useTableData } from '../../hooks/useTableData'
import { cn } from '../../lib/utils'

export interface DataTableWithHeaderProps<T> extends DataTableProps<T> {
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
  showHeader?: boolean
}

export function DataTable<T>({
  data,
  columns,
  searchKey,
  paginated = true,
  rowsPerPage = 10,
  className,
  onRowClick,
  rowClassName,
  clickableRows = false,
  title,
  onSearch,
  onSecondaryAction,
  onPrimaryAction,
  primaryActionText = 'Exporter',
  secondaryActionText = 'Filtrer',
  hasActions = {
    hasPrimaryAction: true,
    hasSecondaryAction: true
  },
  showHeader = true
}: DataTableWithHeaderProps<T>) {
  const {
    currentPage,
    filteredData,
    paginatedData,
    totalPages,
    startEntry,
    endEntry,
    handlePageChange,
  } = useTableData(data, searchKey, rowsPerPage)

  const TableComponent = () => (
    <Table>
      <TableHeader columns={columns} />
      <TableBody 
        data={paginatedData}
        columns={columns}
        onRowClick={onRowClick}
        rowClassName={rowClassName}
        clickableRows={clickableRows} 
      />
    </Table>
  )

  return (
    <div className={cn("", className)}>
      {/* Integrated Header */}
      {showHeader && (
        <DataTableHeader
          title={title}
          onSearch={onSearch}
          onSecondaryAction={onSecondaryAction}
          onPrimaryAction={onPrimaryAction}
          primaryActionText={primaryActionText}
          secondaryActionText={secondaryActionText}
          hasActions={hasActions}
        />
      )}
      
      <div className="p-0">
        <TableComponent />
        {/* Pagination Section */}
        {paginated && filteredData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            startEntry={startEntry}
            endEntry={endEntry}
            totalEntries={filteredData.length}
          />
        )}
      </div>
    </div>
  )
}