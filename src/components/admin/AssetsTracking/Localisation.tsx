import { useTrajets } from '@/hooks/useTrajets'
import Titles from '../../Titles'

const Localisation = () => {
    const {message: trajets, error} = useTrajets()
  return (
    <div>
        <Titles title='Assets Tracking/ Localisation'/>
    </div>
  )
}

export default Localisation