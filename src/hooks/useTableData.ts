import { useState, useMemo } from 'react'

export const useTableData = <T>(
  data: T[],
  searchKey?: keyof T,
  rowsPerPage: number = 10
) => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchKey || !search) return data
    
    return data.filter((row) =>
      String(row[searchKey]).toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search, searchKey])

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, currentPage, rowsPerPage])

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startEntry = (currentPage - 1) * rowsPerPage + 1
  const endEntry = Math.min(currentPage * rowsPerPage, filteredData.length)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1) // Reset to first page on search
  }

  return {
    search,
    currentPage,
    filteredData,
    paginatedData,
    totalPages,
    startEntry,
    endEntry,
    handlePageChange,
    handleSearchChange
  }
}
