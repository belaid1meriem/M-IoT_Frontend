"use client"

import { useEffect, useState } from 'react'
import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import type { User } from '@/types/User'

// --- Mock data --------------------------------------------------------------
const MOCK_USERS: User[] = [
  {
    email: 'admin@example.com',
    password: '********',
    telephone: '+213555000111',
    role: 'admin',
  },
  {
    email: 'reader@example.com',
    password: '********',
    telephone: '+213555000222',
    role: 'canread',
  },
  {
    email: 'writer@example.com',
    password: '********',
    telephone: '+213555000333',
    role: 'canwrite',
  },
]

// --- Component --------------------------------------------------------------
export const UsersTable = () => {
  // Table state (copying your ClientTable pattern)
  const [filteredData, setFilteredData] = useState<User[]>([])

  useEffect(() => {
    setFilteredData(MOCK_USERS)
  }, [])

  const userColumns: Column<User>[] = [
    {
      header: 'Email',
      accessor: 'email',
      className: 'rounded-l-sm rounded-b-none px-4',
    },
    {
      header: 'Téléphone',
      accessor: 'telephone',
      className: '',
    },
    {
      header: 'Rôle',
      accessor: 'role',
      className: 'rounded-r-sm rounded-b-none',
    },
  ]

  const handleSearch = (query: string) => {
    if (!query || query.trim() === '') {
      setFilteredData(MOCK_USERS)
      return
    }

    const searchQuery = query.trim().toLowerCase()

    setFilteredData(
      MOCK_USERS.filter((row) => {
        if (
          row.email.toLowerCase().includes(searchQuery) ||
          row.telephone.toLowerCase().includes(searchQuery) ||
          row.role.toLowerCase().includes(searchQuery)
        )
          return true
        return false
      })
    )
  }

  return (
    <DataTable
      data={filteredData}
      columns={userColumns}
      searchable={true}
      searchKey="email"
      scrollable={true}
      paginated={true}
      rowsPerPage={4}
      onSearch={handleSearch}
      showHeader={false}
      hasActions={{ hasPrimaryAction: false, hasSecondaryAction: false }}
    />
  )
}
