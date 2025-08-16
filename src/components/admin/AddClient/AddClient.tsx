import Steps from '../../Steps'
import FormSwitcher from '../../FormSwitcher'
import FirstStepForm from "./FirstStepForm"
import { SecondStepForm } from "./SecondStepForm"
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext'

const AddClient = () => {
    const {
      currentIndex,
    } = useMultiStepsForm()
    const getForm = (currentIndex: number): React.ReactNode =>{
      if (currentIndex===1) return <FirstStepForm/>
      if (currentIndex===2) return <SecondStepForm/>
      return <div>Form {currentIndex}</div>
  }
  return (
    <div className='grid grid-cols-3 gap-0 py-8'>
      <Steps currentIndex={currentIndex}/>
      <FormSwitcher currentIndex={currentIndex} className='col-span-2' getForm={getForm}/>
    </div>
  )
}

export default AddClient