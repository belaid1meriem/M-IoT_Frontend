import Steps from '../../Steps'
import FormSwitcher from '../../FormSwitcher'
import FirstStepForm from "./FirstStepForm"
import { SecondStepForm } from "./SecondStepForm"
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext'
import type { StepType } from '@/types/Steps'

const AddClient = () => {
  const {
    currentIndex,
  } = useMultiStepsForm()

  const getForm = (currentIndex: number): React.ReactNode =>{
    if (currentIndex===1) return <FirstStepForm/>
    if (currentIndex===2) return <SecondStepForm/>
    return <div>Form {currentIndex}</div>
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
    <div className='grid grid-cols-3 gap-0 py-8 items-start'>
      <Steps currentIndex={currentIndex} steps={steps} />
      <FormSwitcher currentIndex={currentIndex} className='col-span-2' getForm={getForm}/>
    </div>
  )
}

export default AddClient