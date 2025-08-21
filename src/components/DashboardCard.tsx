import { type LucideIcon } from "lucide-react"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"

export interface DashboardCardProps {
    Icon: LucideIcon
    paramName: string
    value: string
    unit: string
    maxValue: string
    lastUpdated: string
}
const DashboardCard = ({Icon, paramName, value, unit, maxValue, lastUpdated}: DashboardCardProps) => {
  return (
    <Card className="gap-6 pb-3 w-full">

        <CardContent className="flex items-center justify-start gap-5" >
            <div className="bg-accent rounded-full flex items-center justify-center p-3 h-18 w-18">
                <Icon className=" h-full w-full text-primary" />
            </div>
            <div className="flex flex-col items-start gap-2">
                <h1 className="text-xs text-muted-foreground"> {paramName} ({unit}) </h1>
                <p className="text-4xl font-semibold "> {value} {unit} </p>
            </div>
            
        </CardContent>

        <CardFooter className="flex justify-between items-center gap-3">
            <Badge variant={"outline"}> Max {maxValue} {unit} </Badge>
            <p className="text-muted-foreground text-xs" >Le {lastUpdated} </p>
        </CardFooter>

    </Card>
  )
}

export default DashboardCard


