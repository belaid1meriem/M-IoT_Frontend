import { useParams } from 'react-router'
import Titles from '../Titles'
import ClientDetailsTable from './ClientDetailsTable'

const ClientDetails = () => {
    const {id} = useParams()
    const handleAddSite = () => {
    
  };

  const handleEdit = () => {
    alert('Modifier les détails du client');
  };
  return (
    <div>
        <Titles title={'Clients/ '+id} showBackButton />
        <ClientDetailsTable
          onEdit={handleEdit}
          onAddSite={handleAddSite}
      />
    </div>
  )
}

export default ClientDetails