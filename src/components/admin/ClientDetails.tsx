import { useParams } from 'react-router'
import Titles from '../Titles'

const ClientDetails = () => {
    const {id} = useParams()
  return (
    <div>
        <Titles title={'Clients/ '+id} />
    </div>
  )
}

export default ClientDetails