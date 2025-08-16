import FirstStepForm from "./admin/AddClient/FirstStepForm"
import { SecondStepForm } from "./admin/AddClient/SecondStepForm"

type FormSwitcherProps = {
  currentIndex: number,
  className?: string
}

const FormSwitcher = ({ currentIndex, className }: FormSwitcherProps) => {
  const getForm = (currentIndex: number): React.ReactNode =>{
    if (currentIndex===1) return <FirstStepForm/>
    if (currentIndex===2) return <SecondStepForm/>
    return <div className={className}>Form {currentIndex}</div>
  }
  return (
    getForm(currentIndex)
  )
}

export default FormSwitcher