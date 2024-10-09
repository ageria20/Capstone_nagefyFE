


import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { List, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar';
import "./Rubrica.css"
import {  ToggleSidebarAction } from '../../redux/actions/action';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { getClients } from '../../redux/actions/actionClients';


const Rubrica = () => {
const dispatch = useAppDispatch()
const isOpen = useAppSelector((state) => state.sidebar.isOpen)
const clients: IUser[] | undefined = useAppSelector((state) => state.clientsList.clients)
const [selectedClient, setSelectedClient] = useState<IUser | null>(null);

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
        <Col xs={12} md={3} className="border-end">
          <h4 className="my-3">Clienti</h4>
          <ListGroup>
           {clients?.map((client) => (
              <ListGroup.Item
                key={client.id}
                action
                onClick={() => handleCustomerClick(client)}
                active={selectedClient?.id === client.id}
              >
                {client.name}{" "}{client.surname}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Colonna destra - Dettagli cliente selezionato */}
        <Col xs={12} md={9} className="p-4">
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
    </Container>
    </div>
  )
}

export default Rubrica