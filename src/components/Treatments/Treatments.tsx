
import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { List, Plus, Trash, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar';
import "./Treatment.css"
import {  ToggleSidebarAction } from '../../redux/actions/action';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import NewUserModal from './NewTreatmentModal';
import { ToastContainer } from 'react-toastify';
import { deleteTreatment, getTreatments, searchTreatments } from '../../redux/actions/actionTreatment';

const Treatments = () => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const [query, setQuery] = useState("")
    const treatments: ITreatment[] = useAppSelector((state) => state.treatments.treatments)
    const [selectedTreatment, setSelectedTreatment] = useState<ITreatment | null>(null);
    const [showModal, setShowModal] = useState(false); 
    
    
      const handleCustomerClick = (treatment: ITreatment) => {
        setSelectedTreatment(treatment);
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
      dispatch(searchTreatments(e.target.value))
    }else {
      dispatch(getTreatments())
    }
    }
    
    
    
    
    
    const clearSearch = () => {
      setQuery('');
      dispatch(getTreatments()); 
    }
    
    const handleShowModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);
    
     
    
    
    
    useEffect(() => {
      dispatch(getTreatments())
      
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
              <h4 className="my-3">Trattamenti</h4>
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
               {treatments?.map((treatment) => (
                  <ListGroup.Item
                    key={treatment.id}
                    action
                    className='border-0 bg-transparent text-secondary'
                    onClick={() => handleCustomerClick(treatment)}
                    active={selectedTreatment?.id === treatment.id}
                  >
                    {treatment.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
    
            <Col xs={12} md={7} lg={9} className="p-4">
              {selectedTreatment ? (
                <Card>
                  <Card.Body>
                    <Row>
                    <Col xs={12} md={9}>
                    <Card.Title>{selectedTreatment.name}</Card.Title>
                    <Card.Text>
                      <strong>Prezzo:</strong> {selectedTreatment.price}{" "}€
                    </Card.Text>
                    <Card.Text>
                      <strong>Durata:</strong> {selectedTreatment.duration}{" "}min
                    </Card.Text>
                    </Col>
                    <Col>
                    <Button 
                      className='my-3 rounded-circle border-danger bg-transparent text-danger' 
                      onClick={() => {dispatch(deleteTreatment(selectedTreatment.id))
                        setSelectedTreatment(null)
                        console.log(selectedTreatment.id)}}>
                      <Trash className='my-1 d-flex w-100'/>
                    </Button>
                    </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ) : (
                <p>Seleziona un trattamento per vedere i dettagli.</p>
              )}
            </Col>
          </Row>
          <NewUserModal show={showModal} handleClose={handleCloseModal} />
        </Container>
        <ToastContainer/>
        </div>
      )
}

export default Treatments