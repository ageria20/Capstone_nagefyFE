import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { Button, Form, Modal } from "react-bootstrap";
import { createAppointment, deleteAppointment, getAppointments, updateAppointment } from "../../redux/actions/actionAppointment";
import { getClients } from "../../redux/actions/actionClients";
import { getStaffs } from "../../redux/actions/actionStaff";
import { getTreatments } from "../../redux/actions/actionTreatment";

import { IClient } from "../../interfaces/IUser";
import { IAppointment, IAppointments } from "../../interfaces/IAppointment";
import dayjs from "dayjs";
import { Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ITreatment } from "../../interfaces/ITreatment";

interface AddAppointmentModalProps {
    show: boolean;
    handleClose: () => void;
    setSelectedTreatment:  React.Dispatch<React.SetStateAction<ITreatment[]>>; 
    selectedTreatment: ITreatment[];
    startDateTime: string
    selectedEvent: IAppointments | null
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
  const staffs = useAppSelector((state) => state.staffList.staffs);
  const treatments = useAppSelector((state) => state.treatments.treatments);
  const [newAppointment, setNewAppointment] = useState<IAppointment>({
    user: "", 
    treatments: [],
    staff: "", 
    startTime: startDateTime,
});
const [queryClient, setQueryClient] = useState("");
const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);
const navigate = useNavigate()

const [filteredClients, setFilteredClients] = useState<IClient[]>([]);

const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const staffMemberName = e.target.value;
    const staffObject = staffs.find(s => s.name === staffMemberName);
    if (staffObject) {
      
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
    
    await dispatch(createAppointment(updatedAppointment));
    
    await dispatch(getAppointments());
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

  const selectedTreatmentObject: ITreatment | undefined = treatments.find(
    (treatment: ITreatment) => treatment.name === treatmentName
  );

  if (selectedTreatmentObject) {
    setSelectedTreatment((prevSelected: ITreatment[]) => {
      const alreadySelected = prevSelected.some(
        (treatment: ITreatment) => treatment.id === selectedTreatmentObject.id
      );
      
      if (alreadySelected) {
        // Rimuove il trattamento se è già stato selezionato
        return prevSelected.filter(treatment => treatment.id !== selectedTreatmentObject.id);
      } else {
        // Aggiunge il trattamento se non è già selezionato
        return [...prevSelected, selectedTreatmentObject];
      }
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
      
      
      setNewAppointment({
        user: selectedEvent.user?.id || "",
        treatments: selectedEvent.treatmentsList, 
        staff: selectedEvent.staff.id, 
        startTime: selectedEvent.startTime, 
        id: selectedEvent.id, 
      });
      setQueryClient(selectedEvent.user?.name); 
      setSelectedTreatment(selectedEvent.treatmentsList); 
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent, startDateTime]);

  useEffect(() => {
    if (queryClient) {
        const results = clients.filter((client: IClient) => 
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
        <Modal.Title className="text-center">
      <p >
      {selectedEvent ? 
        dayjs(selectedEvent.startTime).format('ddd D - HH:mm').toLocaleUpperCase()
        : dayjs(startDateTime).format('ddd D - HH:mm').toLocaleUpperCase()}
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
    className=""
  />
  {filteredClients.length > 0 && (
    <ul className="p-2 rounded-3 border border-1">
      {filteredClients.map(client => (
        <li 
          key={client.id}
          onClick={() => handleClientSelect(client)} 
          className="dropdown-item"
          style={{cursor: "pointer"}}
        >
          {client.name}{" "}{client.surname}
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
    {treatments.map((treatment: ITreatment) => (
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
    {selectedEvent &&  
    <Button 
            className='my-3 border-danger bg-transparent me-auto text-danger delete-btn'
            onClick={() => {
              dispatch(deleteAppointment(selectedEvent.id))
              handleClose()
              }}>
            <Trash className='my-1 d-flex w-100'/>
        </Button>}
        <Button variant="secondary" className='my-3 border-secondary bg-transparent text-secondary undo-btn' onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="primary" className='my-3 border-primary bg-transparent text-primary save-btn' onClick={handleSaveAppointment}>
          Salva
        </Button>
        <Button variant="primary" className='my-3 border-primary bg-transparent text-primary save-btn' onClick={() => {
          navigate(`/cash/${selectedEvent?.id}`)
          }}>
          Cassa
        </Button>
       
      </Modal.Footer>
    </Modal>
  );
};

export default AgendaModal;
