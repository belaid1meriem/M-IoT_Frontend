import Titles from '../Titles'
import ClientTable from './ClientsTable'

const Clients = () => {
  return (
    <div>
        <Titles title='Clients' subTitle='Cette interface permet à l’administrateur de consulter la liiste des clients et leurs detail.'/>
        <ClientTable/>
    </div>
  )
}

export default Clients