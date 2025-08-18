import { useParams } from 'react-router'
import Titles from '../Titles'
import SiteDetailsTable from './SiteDetailsTable'
import { MachinesTable } from './MachinesTable'
import { ObjetsTable } from './ObjetsTable'
import { UsersTable } from './UsersTable'

const SiteDetails = () => {
    const {id, siteId} = useParams()
    const handleAddSite = () => {
    
  };

  const handleEdit = () => {
    alert('Modifier les détails du site');
  };
  return (
    <div>
        <Titles title={'Clients/ '+id+'/ Site/ '+siteId} showBackButton />
        <SiteDetailsTable
          onEdit={handleEdit}
      />
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Machines</h3>
          <MachinesTable />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Objets (Tag RFID)</h3>
          <ObjetsTable />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Utilisateurs</h3>
          <UsersTable />
        </div>
    </div>
  )
}

export default SiteDetails
