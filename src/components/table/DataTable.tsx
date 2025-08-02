import { Table } from '@/components/ui/table'
import { type DataTableProps } from '../../types/Table'
import { Pagination } from './Pagination'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { useTableData } from '../../hooks/useTableData'
import { cn } from '../../lib/utils'

export function DataTable<T>({
  data,
  columns,
  searchKey,
  paginated = true,
  rowsPerPage = 10,
  className,
  onRowClick,
  rowClassName,
  clickableRows = false
}: DataTableProps<T>) {
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
    <Table >
      <TableHeader columns={columns} />
      <TableBody data={paginatedData}
        columns={columns}
        onRowClick={onRowClick}
        rowClassName={rowClassName}
        clickableRows={clickableRows} />
    </Table>
  )

  return (
    <div className={cn("", className)}>
      
      <div className="p-0">
        {/* Table Section */}
        <div className="p-6">
          <div className="">
              <TableComponent />
          </div>
        </div>

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

