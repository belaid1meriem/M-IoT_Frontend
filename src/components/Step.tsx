import { cn } from "@/lib/utils"
import type { StepProps } from "@/types/Steps"
import { Check } from "lucide-react"


const Step = ({ index, state, text } : StepProps) => {

    const variants = {
        pending: 'bg-background text-primary/50',
        current: 'bg-primary text-background',
        completed: 'bg-[#4ADE80] text-background'
    }

    return (
        <div className={cn(
            "rounded-full p-4 w-2 h-2 flex items-center justify-center font-medium relative",
            variants[state]
        )}>
            {state === 'completed'
                ? <Check className="w-4 h-4 text-background shrink-0" />
                : index}
            <h1
                className={cn(
                    "absolute left-12 whitespace-nowrap",
                    state === "current" ? "text-primary" : "text-primary/50"
                )}
            >
                {text}
            </h1>
        </div>
    )
}

export default Step
