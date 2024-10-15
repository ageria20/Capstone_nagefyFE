import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { Button, Form, Modal } from "react-bootstrap";
import { createAppointment, updateAppointment } from "../../redux/actions/actionAppointment";
import { getClients } from "../../redux/actions/actionClients";
import { getStaffs } from "../../redux/actions/actionStaff";
import { getTreatments } from "../../redux/actions/actionTreatment";

import { IClient } from "../../interfaces/IUser";
import { IAppointment, IAppointments } from "../../interfaces/IAppointment";
import dayjs from "dayjs";

interface AddAppointmentModalProps {
    show: boolean;
    handleClose: () => void;
    setSelectedTreatment: (treatments: ITreatment[]) => void; 
    selectedTreatment: ITreatment[];
    startDateTime: Date
    selectedEvent: IAppointments 
}

const AgendaModal: React.FC<AddAppointmentModalProps> = ({
  show,
  handleClose,
  selectedTreatment,
  setSelectedTreatment,
  startDateTime,
  selectedEvent
}) => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clientsList.clients);
  const treatments = useAppSelector((state) => state.treatments.treatments);
  const staffs = useAppSelector((state) => state.staffList.staffs);
  const [newAppointment, setNewAppointment] = useState<IAppointment>({
    user: "", 
    treatments: [],
    staff: "", 
    startTime: startDateTime,
});
const [queryClient, setQueryClient] = useState("");
const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);

const [filteredClients, setFilteredClients] = useState<IClient[]>([]);

const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const staffMemberName = e.target.value;
    const staffObject = staffs.find(s => s.name === staffMemberName);
    if (staffObject) {
      console.log("STAFF: ", staffObject)
        setSelectedStaff(staffObject);
        setNewAppointment(prevAppointment => ({ ...prevAppointment, staff: staffObject.id }));
    } else {
        setSelectedStaff(null);
    }
};

const handleClientSelect = (client: IClient) => {
    setNewAppointment((prevAppointment) => ({ ...prevAppointment, user: client.id }));
    setQueryClient(client.name);
    setFilteredClients([]);
};

useEffect(() => {
  setNewAppointment((prev) => ({
      ...prev,
      startTime: startDateTime, 
  }));
}, [startDateTime]);

const handleSaveAppointment = async () => {
  const updatedAppointment: IAppointment = {
      ...newAppointment,
      treatments: selectedTreatment,
  };

  if (!updatedAppointment.startTime) {
    console.error("Start time is missing or invalid!");
    return; 
  }
  
 if (selectedEvent && selectedEvent.id) {
    await dispatch(updateAppointment(selectedEvent.id, updatedAppointment));
  } else {
    // Create new appointment
    await dispatch(createAppointment(updatedAppointment));
  }

  // Reset del form e chiusura del modale
  handleClose();
  setNewAppointment({
      user: "",
      treatments: [],
      staff: "",
      startTime: new Date(),
  });
  setSelectedTreatment([]);
  setQueryClient("");
};

const handleTreatmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const treatmentName = e.target.value;

  const selectedTreatmentObject = treatments.find(treatment => treatment.name === treatmentName);

  if (selectedTreatmentObject) {
      setSelectedTreatment(prevSelected => {
          // Verifica che prevSelected sia un array prima di chiamare .some()
          if (Array.isArray(prevSelected)) {
              if (prevSelected.some(treatment => treatment.id === selectedTreatmentObject.id)) {
                  return prevSelected.filter(treatment => treatment.id !== selectedTreatmentObject.id);
              } else {
                  return [...prevSelected, selectedTreatmentObject];
              }
          }
          // Se prevSelected non è un array, restituisci un array contenente il trattamento selezionato
          return [selectedTreatmentObject];
      });
  }
};

  useEffect(() => {
    setNewAppointment((prev) => ({
        ...prev,
        startTime: startDateTime,
    }));
  }, [startDateTime]);

  useEffect(() => {
    if (selectedEvent) {
      
      console.log("SELECTED EVENT", selectedEvent)
      setNewAppointment({
        user: selectedEvent.user?.id || "",
        treatments: selectedEvent.treatments, 
        staff: selectedEvent.staff.id, 
        startTime: selectedEvent.startTime, 
        id: selectedEvent.id, 
      });
      setQueryClient(selectedEvent.user?.name); 
      setSelectedTreatment(selectedEvent.treatments); 
      setSelectedStaff(selectedEvent.staff); 
    } else {
      
      setNewAppointment({
        user: "",
        treatments: [],
        staff: "",
        startTime: startDateTime,
        id: undefined,
      });
      setQueryClient("");
      setSelectedTreatment([]);
      setSelectedStaff(null);
    }
  }, [selectedEvent, startDateTime]);

  useEffect(() => {
    if (queryClient) {
        const results = clients.filter(client => 
            client.name.toLowerCase().includes(queryClient.toLowerCase())
        );
        setFilteredClients(results);
    } else {
        setFilteredClients([]);
    }
  }, [queryClient, clients]);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getStaffs());
    dispatch(getTreatments());
  }, [dispatch]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuovo Appuntamento <p>
      {selectedEvent ? 
        dayjs(selectedEvent.startTime).format(' HH:mm') 
        : dayjs(startDateTime).format(' HH:mm')}
    </p>
    </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="formClientSearch">
  <Form.Label>Cliente</Form.Label>
  <Form.Control
    type="text"
    placeholder="Cerca cliente"
    value={queryClient ?? ""}
    onChange={(e) => setQueryClient(e.target.value)} 
    className="m-2"
  />
  {filteredClients.length > 0 && (
    <ul className="client-dropdown">
      {filteredClients.map(client => (
        <li 
          key={client.id}
          onClick={() => handleClientSelect(client)} 
          className="dropdown-item"
        >
          {client.name} - {client.telephone}
        </li>
      ))}
    </ul>
  )}
</Form.Group>

<Form.Group controlId="formClientSurname">
  <Form.Label>Trattamenti</Form.Label>
  <select
    onChange={handleTreatmentChange}
    value={selectedTreatment && selectedTreatment.length > 0 ? selectedTreatment[0].name : ""} 
    className="rounded-5 px-2 py-1 w-sm-100 me-auto m-2"
  >
    <option value="">Seleziona un trattamento</option>
    {treatments.map((treatment) => (
      <option key={treatment.id} value={treatment.name}>
        {treatment.name}
      </option>
    ))}
  </select>
  {selectedTreatment && selectedTreatment.length > 0 && (
    <div>
      <h5>Trattamenti Selezionati:</h5>
      <ul>
        {selectedTreatment.map((treatment) => (
          <li key={treatment.id}>{treatment.name}</li>
        ))}
      </ul>
    </div>
  )}
</Form.Group>

<Form.Group controlId="formStaffMember">
  <Form.Label>Staff</Form.Label>
  <select
    onChange={handleStaffChange}
    value={selectedStaff ? selectedStaff.name : ""} 
    className="rounded-5 px-2 py-1 w-sm-100 me-auto m-2"
  >
    <option value="">Seleziona un membro dello staff</option>
    {staffs.map((staff) => (
      <option key={staff.id} value={staff.name}>
        {staff.name}
      </option>
    ))}
  </select>
  {selectedStaff && (
    <div>
      <h5>Membro dello staff selezionato:</h5>
      <p>{selectedStaff.name}</p>
    </div>
  )}
</Form.Group>
          {/* <Form.Group controlId="formStaffMember">
            <Form.Label>Ora inizio</Form.Label>
            <p>{(newAppointment.startTime).toDateString()}</p>
          </Form.Group> */}
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
};

export default AgendaModal;
