"use client"

import { useState, useMemo } from 'react'
import type { Column } from '@/types/Table'
import { DataTable } from '../table/DataTable'
import type { User } from '@/types/User'
import Loading from '../Loading'
import { useUsers } from '@/hooks/useUsers'

interface UsersTableProps {
  siteId: number
  clientId: number
}

export const UsersTable = ({ siteId, clientId }: UsersTableProps) => {
  const { users, isLoading, error } = useUsers(siteId, clientId)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return users
    }

    const query = searchQuery.trim().toLowerCase()

    return users.filter((row) => {
      if (
        row.email.toLowerCase().includes(query) ||
        row.telephone.toLowerCase().includes(query) ||
        row.role.toLowerCase().includes(query)
      )
        return true
      return false
    })
  }, [users, searchQuery])

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
    setSearchQuery(query)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        <p>Erreur lors du chargement des utilisateurs: {error}</p>
      </div>
    )
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  )
}