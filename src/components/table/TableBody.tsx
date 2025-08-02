
import { TableBody as ShadcnTableBody, TableCell, TableRow } from '@/components/ui/table'
import type { Column, RowClickHandler } from '../../types/Table'
import { cn } from '@/lib/utils'

type TableBodyProps<T> = {
  data: T[]
  columns: Column<T>[]
  // ADDED: Row click functionality props
  onRowClick?: RowClickHandler<T>
  rowClassName?: (row: T, index: number) => string
  clickableRows?: boolean
}

// Single Responsibility: Render table body with data and handle row clicks
export function TableBody<T>({ 
  data, 
  columns, 
  onRowClick, 
  rowClassName,
  clickableRows = false 
}: TableBodyProps<T>) {
  if (data.length === 0) {
    return (
      <ShadcnTableBody>
        <TableRow>
          <TableCell 
            colSpan={columns.length} 
            className="text-center py-8 text-muted-foreground"
          >
            Aucune donnée disponible
          </TableCell>
        </TableRow>
      </ShadcnTableBody>
    )
  }

  return (
    <ShadcnTableBody>
      {data.map((row, i) => (
        <TableRow 
          key={i}
          onClick={onRowClick ? () => onRowClick(row, i) : undefined}
          className={cn(
            // Base styles
            "transition-colors",
            // Clickable styles
            clickableRows && "cursor-pointer hover:bg-muted/50",
            // Custom row styles
            rowClassName ? rowClassName(row, i) : ""
          )}
        >
          {columns.map((col, j) => (
            <TableCell 
              key={j} 
              className={cn(col.className)}
            >
              {col.render ? col.render(row) : String(row[col.accessor as keyof T])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </ShadcnTableBody>
  )
}