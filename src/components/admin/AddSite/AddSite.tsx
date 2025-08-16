import Steps from '../../Steps'
import FormSwitcher from '../../FormSwitcher'
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext'

const AddSite = () => {
    const {
      currentIndex,
      setCurrentIndex,
    } = useMultiStepsForm()
  return (
    <div className='grid grid-cols-3 gap-0 py-8'>
      <Steps currentIndex={currentIndex}/>
      <FormSwitcher currentIndex={currentIndex} className='col-span-2'/>
    </div>
  )
}

export default AddSite