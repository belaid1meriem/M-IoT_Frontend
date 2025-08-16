

type FormSwitcherProps = {
  currentIndex: number,
  getForm: (currentIndex: number)=> React.ReactNode
  className?: string
}

const FormSwitcher = ({ currentIndex, getForm, className }: FormSwitcherProps) => {

  return (
    getForm(currentIndex)
  )
}

export default FormSwitcher