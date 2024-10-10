import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAppDispatch } from '../../redux/store/store';
import { createStaff } from '../../redux/actions/actionStaff';


interface AddStaffModalProps {
    show: boolean;
    handleClose: () => void;
}

const NewStaffModal: React.FC<AddStaffModalProps> = ({ show, handleClose }) => {

    const dispatch = useAppDispatch()
    const [newStaff, setNewStaff] = useState({ name: '', surname: '',telephone: '', email: ''});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStaff((prevStaff) => ({ ...prevStaff, [name]: value }));
    };

    const handleSaveClient = () => {
            dispatch(createStaff(newStaff)) 
            handleClose(); 
            setNewStaff({ name: '', surname: '',telephone: '', email: ''})
    };


  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Nuovo Staff</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formClientName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome"
            name="name"
            value={newStaff.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formClientSurname">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il cognome"
            name="surname"
            value={newStaff.surname}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formClientTelephone">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Inserisci il numero di telefono"
            name="telephone"
            value={newStaff.telephone}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formClientEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci l'email"
            name="email"
            value={newStaff.email}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Annulla
      </Button>
      <Button variant="primary" onClick={handleSaveClient}>
        Salva
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default NewStaffModal