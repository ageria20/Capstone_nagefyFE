
import { useAppDispatch } from "../../redux/store/store";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { updateOrari } from "../../redux/slices/orariSlice";
import { useEffect, useState } from "react";


interface UpdateHoursModalProps {
    show: boolean;
    handleClose: () => void;
    selectedDay: DaySchedule;
}

const OrariModal: React.FC<UpdateHoursModalProps> = ({show, handleClose, selectedDay}) => {
    const dispatch = useAppDispatch()
    const [hours, setHours] = useState(selectedDay.hours)


    const handleHourChange = (index: number, field: 'from' | 'to', value: string) => {
        const updatedHours = [...hours];
        updatedHours[index] = {
          ...updatedHours[index],
          [field]: value,
        };
        setHours(updatedHours);
      };

      const handleSave = () => {
        // Dispatch per aggiornare gli orari nel Redux store
        dispatch(updateOrari({ day: selectedDay.day, hours }));
        handleClose(); // Chiudi il modale
      };

  useEffect(() => {
    setHours(selectedDay.hours)
  }, [selectedDay])

  return (
    <Container>
        <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modifica orari</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {hours.map((hour, index) => (
          <Form.Group key={index} className="mb-3">
            <Form.Label><h5>{selectedDay.day}</h5></Form.Label>
            <div className="d-flex">
              <Form.Control
                type="time"
                value={hour.from}
                onChange={(e) => handleHourChange(index, 'from', e.target.value)}
              />
              <span className="mx-2">-</span>
              <Form.Control
                type="time"
                value={hour.to}
                onChange={(e) => handleHourChange(index, 'to', e.target.value)}
              />
            </div>
          </Form.Group>
        ))}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Annulla
      </Button>
      <Button variant="primary" onClick={handleSave}>
          Salva Modifiche
        </Button>
    </Modal.Footer>
  </Modal>
    </Container>
  )
}

export default OrariModal