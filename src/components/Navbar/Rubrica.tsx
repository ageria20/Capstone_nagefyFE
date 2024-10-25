


import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { List, Plus, Trash, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar';
import "./Rubrica.css"
import {  ToggleSidebarAction } from '../../redux/actions/action';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { deleteClient, getClients, searchClients, updateClient } from '../../redux/actions/actionClients';
import NewUserModal from './NewUserModal';
import { ToastContainer } from 'react-toastify';
import { IClient } from '../../interfaces/IUser';


const Rubrica = () => {
const dispatch = useAppDispatch()
const isOpen = useAppSelector((state) => state.sidebar.isOpen)
const [query, setQuery] = useState("")
const clients: IClient[] | undefined = useAppSelector((state) => state.clientsList.clients)
const [selectedClient, setSelectedClient] = useState<IClient>({} as IClient);
const [showModal, setShowModal] = useState(false); 


  const handleCustomerClick = (client: IClient) => {
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
  if(query.length > 0 ){
  dispatch(searchClients(e.target.value))
}else {
  dispatch(getClients())
}
}


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setSelectedClient((prevStaff: IClient) => ({
    ...prevStaff,
    [name]: value,
  }));
};

const handleUpdateClient = (selectedClientId: string | undefined) => {
  if (selectedClientId) {
    dispatch(updateClient(selectedClientId, selectedClient));
  }
};


const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

 



useEffect(() => {
  dispatch(getClients())
  console.log(clients)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
        <Container fluid>
        <Container fluid className='d-flex align-items-center rounded-4 shadow-lg mt-4 p-3'>
      <Button className="toggle-button me-3" onClick={toggleSidebar}>
        {isOpen ? <X/>:<List />}
      </Button>
       <Sidebar/>
       
        <p className='mb-0'>{getTime()}</p>
        </Container>
      <Row className="min-vh-100">
        <Col xs={12} md={5} lg={3} className="border-end px-4">
          <h4 className="mb-3 mt-5">Clienti</h4>
        <Row className='align-items-center'>
          <Col xs={10}>
          <div className="input-group">
                  <input
                    type='search'
                    className='form-control rounded-4 position-relative d-flex align-items-center'
                    value={query}
                    onChange={handleChange}
                    placeholder='Cerca cliente'
                  />
                    
                </div>
          </Col>
          <Col xs={2} className='text-center px-0 mx-0'>
          <Button className='my-3 rounded-circle bg-transparent text-primary' onClick={handleShowModal} ><Plus className='my-1 d-flex w-100'/></Button>
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
        <Col xs={12} md={7} lg={9} className="p-4 mt-4">
          {selectedClient.id ? (
            <>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={12} md={3}>
                <Image src={selectedClient.avatar} width={100} className='rounded-circle'/>
                </Col>
                <Col xs={12} md={9}>
                <Card.Title>{selectedClient.name}{" "}{selectedClient.surname}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {selectedClient.email}
                </Card.Text>
                <Card.Text>
                  <strong>Telefono:</strong> {selectedClient.telephone}
                </Card.Text>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                <Button 
                  className='my-3 rounded-circle border-danger bg-transparent text-danger' 
                  onClick={() => dispatch(deleteClient(selectedClient.id))}>
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
                 placeholder="nome"
                 required
                 name="name"
                 value={selectedClient.name}
                 onChange={handleInputChange}
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Cognome</Form.Label>
               <Form.Control
                 type="text"
                 placeholder="cognome"
                 required
                 name="surname"
                 value={selectedClient.surname}
                 onChange={handleInputChange}
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Telefono</Form.Label>
               <Form.Control
                 type="text"
                 placeholder="telefono"
                 required
                 name="telephone"
                 value={selectedClient.telephone}
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
                 value={selectedClient.email}
                 onChange={handleInputChange}
               />
             </Form.Group>
             <Button
               variant="primary"
               className="my-3 border-primary bg-transparent text-primary save-btn"
               onClick={() => handleUpdateClient(selectedClient.id)}
             >
               Salva
             </Button>
           </Container>
           </>
          ) : (
            <p>Seleziona un cliente per vedere i dettagli.</p>
          )}
        </Col>
      </Row>
      <NewUserModal show={showModal} handleClose={handleCloseModal} />
    </Container>
    <ToastContainer/>
    </div>
  )
}

export default Rubrica