


import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { List, Plus, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar';
import "./Rubrica.css"
import {  ToggleSidebarAction } from '../../redux/actions/action';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { getClients, searchClients } from '../../redux/actions/actionClients';
import NewUserModal from './NewUserModal';


const Rubrica = () => {
const dispatch = useAppDispatch()
const isOpen = useAppSelector((state) => state.sidebar.isOpen)
const [query, setQuery] = useState("")
const clients: IUser[] | undefined = useAppSelector((state) => state.clientsList.clients)
const [selectedClient, setSelectedClient] = useState<IUser | null>(null);
const [showModal, setShowModal] = useState(false); 


  const handleCustomerClick = (client: IUser) => {
    setSelectedClient(client);
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
}

const handleSubmit = () =>{
  dispatch(searchClients(query))
}


const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSubmit();
  }
};

const clearSearch = () => {
  setQuery('');
  dispatch(getClients()); 
}

const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

 



useEffect(() => {
  dispatch(getClients())
  console.log(clients)
}, [dispatch])

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
          <h4 className="my-3">Clienti</h4>
        <Row className='align-items-center'>
          <Col>
          <div className="input-group">
                  <input
                    type='text'
                    className='form-control rounded-4 position-relative d-flex align-items-center'
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress} 
                    placeholder='Cerca cliente'
                  />
                    <X className='my-1 position-absolute' onClick={clearSearch} style={{right: '10px',
                  top: '39%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',}}/>
                  
                </div>
          </Col>
          <Col className='text-center px-0 mx-0'>
          <Button className='my-3 rounded-circle bg-transparent text-primary' onClick={handleShowModal}><Plus className='my-1 d-flex w-100'/></Button>
          </Col>
          </Row>
          <ListGroup>
           {clients?.map((client) => (
              <ListGroup.Item
                key={client.id}
                action
                className='border-0 bg-transparent text-secondary'
                onClick={() => handleCustomerClick(client)}
                active={selectedClient?.id === client.id}
              >
                {client.name}{" "}{client.surname}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Colonna destra - Dettagli cliente selezionato */}
        <Col xs={12} md={7} lg={9} className="p-4">
          {selectedClient ? (
            <Card>
              <Card.Body>
                <Card.Title>{selectedClient.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {selectedClient.email}
                </Card.Text>
                <Card.Text>
                  <strong>Telefono:</strong> {selectedClient.telephone}
                </Card.Text>
               
              </Card.Body>
            </Card>
          ) : (
            <p>Seleziona un cliente per vedere i dettagli.</p>
          )}
        </Col>
      </Row>
      <NewUserModal show={showModal} handleClose={handleCloseModal} />
    </Container>
    </div>
  )
}

export default Rubrica