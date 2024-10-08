


import { useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { List, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar';

import { ToggleSidebarAction } from '../../redux/actions/action';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';

interface ICustomer {
    id: number | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    notes: string | null;
}

const Rubrica = () => {
const dispatch = useAppDispatch()
const isOpen = useAppSelector((state) => state.sidebar.isOpen)
const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);

  const handleCustomerClick = (customer: ICustomer) => {
    setSelectedCustomer(customer);
  };

  const customers: ICustomer[] = [
    {
      id: 1,
      name: "Mario Rossi",
      email: "mario.rossi@example.com",
      phone: "123-456-7890",
      address: "Via Roma 10, Milano",
      notes: "Cliente da 3 anni.",
    },
    {
      id: 2,
      name: "Luigi Verdi",
      email: "luigi.verdi@example.com",
      phone: "987-654-3210",
      address: "Corso Italia 5, Torino",
      notes: "Preferisce la comunicazione via email.",
    },
    {
      id: 3,
      name: "Anna Bianchi",
      email: "anna.bianchi@example.com",
      phone: "456-789-1234",
      address: "Piazza Venezia 12, Roma",
      notes: "Richiede aggiornamenti mensili.",
    },
    // Aggiungi altri clienti
  ];

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' } as ToggleSidebarAction);
};

  return (
    <div>
       <Button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <X/>:<List />} 
      </Button>
        {isOpen ? <Sidebar/> : ""}
       
        
        <Container fluid>
      <Row className="min-vh-100">
        {/* Colonna sinistra - Lista clienti */}
        <Col xs={12} md={3} className="border-end">
          <h4 className="my-3">Clienti</h4>
          <ListGroup>
            {customers.map((customer) => (
              <ListGroup.Item
                key={customer.id}
                action
                onClick={() => handleCustomerClick(customer)}
                active={selectedCustomer?.id === customer.id}
              >
                {customer.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Colonna destra - Dettagli cliente selezionato */}
        <Col xs={12} md={9} className="p-4">
          {selectedCustomer ? (
            <Card>
              <Card.Body>
                <Card.Title>{selectedCustomer.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {selectedCustomer.email}
                </Card.Text>
                <Card.Text>
                  <strong>Telefono:</strong> {selectedCustomer.phone}
                </Card.Text>
                <Card.Text>
                  <strong>Indirizzo:</strong> {selectedCustomer.address}
                </Card.Text>
                <Card.Text>
                  <strong>Note:</strong> {selectedCustomer.notes}
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