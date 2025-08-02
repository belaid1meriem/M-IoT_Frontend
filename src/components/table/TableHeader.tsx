import { TableHead, TableHeader as ShadcnTableHeader, TableRow } from '@/components/ui/table'
import { type Column } from '../../types/Table'
import { cn } from '@/lib/utils'

type TableHeaderProps<T> = {
  columns: Column<T>[]
}

export function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <ShadcnTableHeader>
      <TableRow className='bg-accent'>
        {columns.map((col, i) => (
          <TableHead
            key={i}
            className={cn(col.className)}
            // style={col.width ? { width: col.width } : {}}
          >
            {col.header}
          </TableHead>
        ))}
      </TableRow>
    </ShadcnTableHeader>
  )
}