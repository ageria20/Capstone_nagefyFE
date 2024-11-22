import React, { useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useAppDispatch } from '../../redux/store/store';
import { createTreatment } from '../../redux/actions/actionTreatment';


interface AddTreatmentModalProps {
    show: boolean;
    handleClose: () => void;
    isLoading: boolean
    setIsLoading: (b: boolean) => void
}

const NewTreatmentModal: React.FC<AddTreatmentModalProps> = ({ show, handleClose, isLoading, setIsLoading }) => {

    const dispatch = useAppDispatch()
    const [newTreatment, setNewTreatment] = useState({ name: '', price: 0 ,duration: 0});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTreatment((prevTreatment) => ({ ...prevTreatment, [name]: value }));
    };

    const handleSaveTreatment = () => {
            dispatch(createTreatment(newTreatment, setIsLoading)) 
            handleClose(); 
            setNewTreatment({ name: '', price: 0 ,duration: 0})
    };


  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Aggiungi Nuovo Trattamento</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formClientName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome"
            name="name"
            value={newTreatment.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formClientSurname">
          <Form.Label>Prezzo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il prezzo"
            name="price"
            value={newTreatment.price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formClientTelephone">
          <Form.Label>Durata</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Inserisci la durata"
            name="duration"
            value={newTreatment.duration}
            onChange={handleInputChange}
          />
        </Form.Group>
       
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Annulla
      </Button>
      <Button variant="primary" onClick={handleSaveTreatment}>
        {isLoading ? <Spinner animation="border" /> : "Salva"}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default NewTreatmentModal