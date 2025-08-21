import { useNavigate } from "react-router"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TitlesProps {
  title: string
  subTitle?: string
  description?: string
  showBackButton?: boolean 
}

const Titles = ({ title, subTitle, description, showBackButton }: TitlesProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="py-3 text-xl font-semibold">{title}</h1>
      </div>

      {subTitle && (
        <div className="text-muted-foreground flex flex-col gap-2 py-2 text-sm">
          <p>{subTitle}</p>
          {description && <p>{description}</p>}
        </div>
      )}
    </div>
  )
}

export default Titles
