import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { List, Plus, Trash, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar';
import "./Staff.css"
import {  ToggleSidebarAction } from '../../redux/actions/action';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import NewStaffModal from './NewStaffModal';
import { ToastContainer } from 'react-toastify';
import { deleteStaff, getStaffs, searchStaff } from '../../redux/actions/actionStaff';

const Staff = () => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const [query, setQuery] = useState("")
    const staffs: IStaff[] = useAppSelector((state) => state.staffList.staffs)
    const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);
    const [showModal, setShowModal] = useState(false); 
    
    
      const handleCustomerClick = (staff: IStaff) => {
        setSelectedStaff(staff);
      };
    
    
      const getTime = () =>{
        const today = new Date()
        const time = today.toLocaleString("it", { hour: '2-digit', minute: '2-digit'});
        return time
      }
      const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR' } as ToggleSidebarAction);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setQuery(e.target.value)
      if(query.length > 0 ){
      dispatch(searchStaff(e.target.value))
    }else {
      dispatch(getStaffs())
    }
    }
    
    
    
    
    
    const clearSearch = () => {
      setQuery('');
      dispatch(getStaffs()); 
    }
    
    const handleShowModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);
    
     
    
    
    
    useEffect(() => {
      dispatch(getStaffs())
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
      return (
        <div>
            <Container fluid>
            <Container fluid className='d-flex align-items-center'>
          <Button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <X/>:<List />}
          </Button>
           <Sidebar/>
            <p className='mb-0'>{getTime()}</p>
            </Container>
          <Row className="min-vh-100">
            <Col xs={12} md={5} lg={3} className="border-end">
              <h4 className="my-3">STAFF</h4>
            <Row className='align-items-center'>
              <Col xs={10}>
              <div className="input-group">
                      <input
                        type='text'
                        className='form-control rounded-4 position-relative d-flex align-items-center'
                        value={query}
                        onChange={handleChange}
                        placeholder='Cerca'
                      />
                        <X className='my-1 position-absolute' onClick={clearSearch} style={{right: '10px',
                      top: '39%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',}}/>
                      
                    </div>
              </Col>
              <Col xs={2} className='text-center px-0 mx-0'>
              <Button className='my-3 rounded-circle bg-transparent text-primary' onClick={handleShowModal} ><Plus className='my-1 d-flex w-100'/></Button>
              </Col>
              </Row>
              <ListGroup>
               {staffs?.map((staff) => (
                  <ListGroup.Item
                    key={staff.id}
                    action
                    className='border-0 bg-transparent text-secondary'
                    onClick={() => handleCustomerClick(staff)}
                    active={selectedStaff?.id === staff.id}
                  >
                    {staff.name}{" "}{staff.surname}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
    
            <Col xs={12} md={7} lg={9} className="p-4">
              {selectedStaff ? (
                <Card>
                  <Card.Body>
                    <Row>
                    <Col xs={12} md={9}>
                    <Card.Title>{selectedStaff.name}</Card.Title>
                    <Card.Text className='mb-0 mt-3'>
                      <strong>Email:</strong> {selectedStaff.email}
                    </Card.Text>
                    <Card.Text>
                      <strong>Ruolo:</strong> {selectedStaff.role}
                    </Card.Text>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                    <Button 
                      className='my-3 rounded-circle border-danger bg-transparent text-danger' 
                      onClick={() => {dispatch(deleteStaff(selectedStaff.id))
                        setSelectedStaff(null)
                        console.log(selectedStaff.id)}}>
                      <Trash className='my-1 d-flex w-100'/>
                    </Button>
                    </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ) : (
                <p>Seleziona un membro dello Staff per vedere i dettagli.</p>
              )}
            </Col>
          </Row>
          <NewStaffModal show={showModal} handleClose={handleCloseModal} />
        </Container>
        <ToastContainer/>
        </div>
      )
}

export default Staff