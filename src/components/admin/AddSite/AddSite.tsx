import Steps from '../../Steps'
import FormSwitcher from '../../FormSwitcher'
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext'
import { SecondStepForm } from './SecondStepForm'
import FirstStepForm from './FirstStepForm'
import type { StepType } from '@/types/Steps'
import { ThirdStepForm } from './ThirdStepForm'
import { FourthStepForm } from './FourthStepForm'
import { FifthStepForm } from './FifthStepForm'
const AddSite = () => {
    const {
      currentIndex,
    } = useMultiStepsForm()
    const getForm = (currentIndex: number): React.ReactNode =>{
      if (currentIndex===1) return <FirstStepForm/>
      if (currentIndex===2) return <SecondStepForm/>
      if (currentIndex===3) return <ThirdStepForm/>
      if (currentIndex===4) return <FourthStepForm/>
      if (currentIndex===5) return <FifthStepForm/>
      return <div>Form {currentIndex}</div>
    }

    const steps: StepType[] = [
      {
        index: 1,
        text: 'Information du Site',
      },
      {
        index: 2,
        text: 'Capteurs et paramètres du Site'
      },
      {
        index: 3,
        text: 'Configuration des Machines'
      },
      {
        index: 4,
        text: 'Asset Tracking'
      },
      {
        index: 5,
        text: 'Configuration des utilisateurs'
      }
    ]
      
  return (
    <div className='grid grid-cols-3 gap-0 py-8 items-start'>
      <Steps currentIndex={currentIndex} steps={steps} />
      <FormSwitcher currentIndex={currentIndex} className='col-span-2' getForm={getForm} />
    </div>
  )
}

export default AddSite