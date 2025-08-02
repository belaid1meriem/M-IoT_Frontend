import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Search...",
  className = ""
}: SearchInputProps) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`pl-10 w-64 w-full ${className}`}
    />
  </div>
)