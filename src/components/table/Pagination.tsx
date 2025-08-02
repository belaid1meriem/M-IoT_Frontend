import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  startEntry: number
  endEntry: number
  totalEntries: number
}


export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  startEntry,
  endEntry,
  totalEntries
}: PaginationProps) => (
  <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/50">
    <div className="text-sm text-muted-foreground">
      Affichage : {startEntry} - {endEntry} sur {totalEntries} enregistrements
    </div>
    
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      
      <Button
        variant="default"
        size="sm"
        className="w-8 h-8 p-0"
      >
        {currentPage}
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  </div>)