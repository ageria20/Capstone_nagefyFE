import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { Button, Form, Modal } from "react-bootstrap";
import { createAppointment } from "../../redux/actions/actionAppointment";
import { getClients } from "../../redux/actions/actionClients";
import { getStaffs } from "../../redux/actions/actionStaff";
import { getTreatments } from "../../redux/actions/actionTreatment";
import dayjs from "dayjs";

interface AddAppointmentModalProps {
    show: boolean;
    handleClose: () => void;
    setSelectedTreatment: (treatments: ITreatment[]) => void; // Cambia il tipo qui
    selectedTreatment: ITreatment[];
    startDateTime: string
  }

const AgendaModal: React.FC<AddAppointmentModalProps> = ({
  show,
  handleClose,
  selectedTreatment,
  setSelectedTreatment,
 startDateTime
}) => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clientsList.clients);
  const treatments = useAppSelector((state) => state.treatments.treatments);
  const staffs = useAppSelector((state) => state.staffList.staffs);
  const [newAppointment, setNewAppointment] = useState<IAppointment>({
    user: "",
    treatments: [],
    staffMember: "",
    startDateTime: startDateTime,
  });
  const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);
  const [queryClient, setQueryClient] = useState("");
  const [filteredClients, setFilteredClients] = useState<IClient[]>([]);

 

  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const staffMemberName = e.target.value;
    const staffObject = staffs.find(s => s.name === staffMemberName);
    if (staffObject) {
        setNewAppointment(prevAppointment => ({ ...prevAppointment, staffMember: staffObject.id }));
        setSelectedStaff(staffObject); 
    } else {
        setSelectedStaff(null); 
    }
};

  const handleClientSelect = (client: IClient) => {
    setNewAppointment((prevAppointment) => ({ ...prevAppointment, user: client.id }));
    setQueryClient(client.name);  
    setFilteredClients([]); 
};





  const handleSaveAppointment = async () => {
    const updatedAppointment: IAppointment = {
        user: newAppointment.user, 
        treatments: selectedTreatment, 
        staffMember: newAppointment.staffMember, 
        startDateTime: newAppointment.startDateTime, 
    };
    dispatch(createAppointment(updatedAppointment));
    handleClose();
    setNewAppointment({
      user: "",
      treatments: [],
      staffMember: "",
      startDateTime: "",
    });
    setSelectedTreatment([]);
    setQueryClient("");
  };

  const handleTreatmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const treatmentName = e.target.value;

    // Trova il trattamento corrispondente nell'array dei trattamenti
    const selectedTreatmentObject = treatments.find(treatment => treatment.name === treatmentName);

    if (selectedTreatmentObject) {
        setSelectedTreatment(prevSelected => {
            if (prevSelected.some(treatment => treatment.id === selectedTreatmentObject.id)) {
                return prevSelected.filter(treatment => treatment.id !== selectedTreatmentObject.id);
            } else {
                return [...prevSelected, selectedTreatmentObject]; // Assicurati di passare l'oggetto ITreatment
            }
        });
    }
};
useEffect(() => {
    // Quando startDateTime cambia, aggiorna newAppointment
    setNewAppointment((prev) => ({
        ...prev,
        startDateTime: startDateTime,
    }));
}, [startDateTime]);

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
    dispatch(getTreatments())
  }, [dispatch]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuovo Appuntamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="formClientSearch">
    <Form.Label>Cliente</Form.Label>
    <Form.Control
        type="text"
        placeholder="Cerca cliente"
        value={queryClient}
        onChange={(e) => setQueryClient(e.target.value)} 
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
              className="rounded-5 px-2 py-1 w-sm-100 me-auto"
            >
              <option value="">Seleziona un trattamento</option>
              {treatments.map((treatment) => (
                <option key={treatment.id} value={treatment.name}>
                  {treatment.name}
                </option>
              ))}
            </select>
            {selectedTreatment.length > 0 && (
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
              className="rounded-5 px-2 py-1 w-sm-100 me-auto"
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
