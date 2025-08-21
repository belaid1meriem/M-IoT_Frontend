export type Column<T> = {
  header: string
  accessor: keyof T | string
  render?: (row: T) => React.ReactNode
  className?: string
  width?: string | number
  sortable?: boolean
}


export type RowClickHandler<T> = (row: T, index: number) => void

export type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  searchKey?: keyof T
  searchable?: boolean
  scrollable?: boolean
  paginated?: boolean
  rowsPerPage?: number
  title?: string
  className?: string
  minWidth?: string
  onRowClick?: RowClickHandler<T>
  rowClassName?: (row: T, index: number) => string
  clickableRows?: boolean
}
