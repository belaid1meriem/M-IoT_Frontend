

type FormSwitcherProps = {
  currentIndex: number,
  getForm: (currentIndex: number)=> React.ReactNode
  className?: string
}

const FormSwitcher = ({ currentIndex, getForm, className }: FormSwitcherProps) => {

  return (
    <div className={className}>
      { getForm(currentIndex) }
    </div>
  )
}

export default FormSwitcher