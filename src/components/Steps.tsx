import Step from "./Step"
import type { State, StepType } from "@/types/Steps"

type StepsProps = {
    currentIndex: number
}
const Steps = ({ currentIndex }: StepsProps) => {

    const getState = (index: number): State =>{
        if (index < currentIndex) return 'completed'
        if (index === currentIndex) return 'current'
        if (index > currentIndex) return 'pending' 
        return 'pending'
    }

    const steps: StepType[] = [
        {
            index: 1,
            text: 'Information du client',
        },
        {
            index: 2,
            text: 'Compte du client'
        }
    ]

  return (
    <div className="bg-muted w-fit py-6 px-1 rounded-full flex flex-col justify-center items-center gap-12">
        {
            steps.map((step: StepType)=>{
                return <Step key={step.index} index={step.index} text={step.text} state={getState(step.index)}/>
            })
        }
    </div>
  )
}

export default Steps