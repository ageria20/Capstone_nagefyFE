import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { List, Plus, Trash, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar';
import "./Staff.css"
import {  ToggleSidebarAction } from '../../redux/actions/action';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import NewStaffModal from './NewStaffModal';
import { ToastContainer } from 'react-toastify';
import { deleteStaff, getStaffs, searchStaff, updateStaff } from '../../redux/actions/actionStaff';

const Staff = () => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const [query, setQuery] = useState("")
    const staffs: IStaff[] = useAppSelector((state) => state.staffList.staffs)
    const [selectedStaff, setSelectedStaff] = useState<IStaff>({} as IStaff);
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
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSelectedStaff((prevStaff: IStaff) => ({
        ...prevStaff,
        [name]: value,
      }));
    };
    
    const handleUpdateStaff = (selectedStaffId: string | undefined) => {
      if (selectedStaffId) {
        dispatch(updateStaff(selectedStaffId, selectedStaff));
      }
    };
    
    
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
            <Container fluid className='d-flex align-items-center rounded-4 shadow-lg mt-4 p-3'>
          <Button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <X/>:<List />}
          </Button>
           <Sidebar/>
            <p className='mb-0'>{getTime()}</p>
            </Container>
          <Row className="min-vh-100 mt-4 p-3">
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
              {selectedStaff.id ? (
                <>
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
                      onClick={() => dispatch(deleteStaff(selectedStaff.id))}>
                      <Trash className='my-1 d-flex w-100'/>
                    </Button>
                    </Col>
                    </Row>
                  </Card.Body>
                </Card>
                 <Container className="mt-5">
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Label>Nome</Form.Label>
                   <Form.Control
                     type="text"
                     placeholder="Nome"
                     required
                     name="name"
                     value={selectedStaff.name}
                     onChange={handleInputChange}
                   />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Label>Cognome</Form.Label>
                   <Form.Control
                     type="text"
                     placeholder="Cognome"
                     required
                     name="surname"
                     value={selectedStaff.surname}
                     onChange={handleInputChange}
                   />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Label>Telefono</Form.Label>
                   <Form.Control
                     type="text"
                     placeholder="Telefono"
                     required
                     name="telephone"
                     value={selectedStaff.telephone}
                     onChange={handleInputChange}
                   />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Label>Email</Form.Label>
                   <Form.Control
                     type="email"
                     placeholder="Email"
                     required
                     name="email"
                     value={selectedStaff.email}
                     onChange={handleInputChange}
                   />
                 </Form.Group>
                 <Button
                   variant="primary"
                   className="my-3 border-primary bg-transparent text-primary save-btn"
                   onClick={() => handleUpdateStaff(selectedStaff.id)}
                 >
                   Salva
                 </Button>
               </Container>
               </>
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