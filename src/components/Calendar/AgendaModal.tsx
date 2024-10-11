import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { Button, Form, Modal } from 'react-bootstrap';
import { createAppointment } from '../../redux/actions/actionAppointment';

interface AddAppointmentModalProps {
    show: boolean;
    handleClose: () => void;
    setSelectedTreatment: (treatments: string[]) => void; // Cambia il tipo in array
    selectedTreatment: ITreatmentsItem[];
}

const AgendaModal: React.FC<AddAppointmentModalProps> = ({ show, handleClose, selectedTreatment, setSelectedTreatment }) => {

    const dispatch = useAppDispatch();
    const clients = useAppSelector((state) => state.clientsList.clients);
    const treatments = useAppSelector((state) => state.treatments.treatments);
    const staffs = useAppSelector((state) => state.staffList.staffs);
    const [newAppointment, setNewAppointment] = useState<IAppointment>({ user: '', treatments: [], staffMember: '', startDateTime: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAppointment((prevAppointment) => ({ ...prevAppointment, [name]: value }));
    };

    const handleSaveAppointment = () => {
        newAppointment.treatments = selectedTreatment; 
        dispatch(createAppointment(newAppointment));
        handleClose();
        setNewAppointment({ user: '', treatments: [], staffMember: '', startDateTime: '' });
        setSelectedTreatment([]); 
    };

    const handleTreatmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const treatmentName = e.target.value;

        // Aggiungi o rimuovi il trattamento selezionato
        setSelectedTreatment(prevSelected => {
            if (prevSelected.includes(treatmentName)) {
                // Rimuovere il trattamento se già selezionato
                return prevSelected.filter(treatment => treatment !== treatmentName);
            } else {
                // Aggiungi il trattamento se non è già selezionato
                return [...prevSelected, treatmentName];
            }
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nuovo Appuntamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formClientName">
                        <Form.Label>Cliente</Form.Label>
                        {clients.map(client => (
                            <Form.Control
                                key={client.id}
                                type="text"
                                placeholder="Inserisci il Cliente"
                                name="name"
                                value={client.name}
                                onChange={handleInputChange}
                            />
                        ))}
                    </Form.Group>
                    <Form.Group controlId="formClientSurname">
                       
                    </Form.Group>
                    <Form.Group controlId="formClientTelephone">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Inserisci il numero di telefono"
                            name="telephone"
                            value={newAppointment.telephone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Inserisci l'email"
                            name="email"
                            value={newAppointment.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annulla
                </Button>
                <Button variant="primary" onClick={handleSaveAppointment}>
                    Salva
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AgendaModal;
