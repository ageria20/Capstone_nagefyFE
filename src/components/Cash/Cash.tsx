import { Button, Container } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { List, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar'
import { ToggleSidebarAction } from '../../redux/actions/action'
import { useState } from 'react'
import { ICashed } from '../../interfaces/ICash'
import { IAppointments } from '../../interfaces/IAppointment'
import { useParams } from 'react-router-dom'


const Cash = () => {

    const cash = useAppSelector((state) => state.cash.cash)
    const { appointmentId } = useParams();
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const dispatch = useAppDispatch()
    const [newCash, setNewCash] = useState<ICashed>({
        paymentMethod: cash?.paymentMethod || 'N/A',
        appointment: {} as IAppointments,
        total: 0.00, 
    });
    

    const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR' } as ToggleSidebarAction);
    };

  return (
    
    <Container fluid className='d-flex align-items-center rounded-4 shadow-lg mt-2 p-2'>
         <Button className="toggle-button me-3" onClick={toggleSidebar}>
        {isOpen ? <X/>:<List />}
      </Button>
    <Container className='mx-auto rounded-4 shadow-sm'>
       { <h4>{}</h4>}
    </Container>
       <Sidebar/>

    </Container>
  )
}

export default Cash