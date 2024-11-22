import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ITreatment } from '../../interfaces/ITreatment';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { IAppointment, IAppointments, IFreeSlots } from '../../interfaces/IAppointment';
import DatePicker from 'react-datepicker';
import { createAppointmentClient, getFreeSlots } from '../../redux/actions/actionAppointment';
import dayjs from 'dayjs';
import { getStaffs } from '../../redux/actions/actionStaff';
import { getTreatments } from '../../redux/actions/actionTreatment';
import { getClientMe } from '../../redux/actions/usersAction';

import { notifyErr } from '../../redux/actions/action';



interface BookingModalProps {
    show: boolean;
    handleClose: () => void;
    setSelectedTreatment: React.Dispatch<React.SetStateAction<ITreatment[]>>;
    selectedTreatment: ITreatment[];
    startDateTime?: string;
    onAppointmentCreated?: (newAppointment: IAppointments) => void;
    setIsLoading: (b: boolean) => void
}

const BookingModal: React.FC<BookingModalProps> = ({show, handleClose, selectedTreatment, setSelectedTreatment, startDateTime = "", onAppointmentCreated, setIsLoading}) => {

    const treatments = useAppSelector((state) => state.treatments.treatments);
    const dispatch = useAppDispatch();
    const meProfile = useAppSelector((state) => state.clientsList.clientMe);
    const freeSlots = useAppSelector((state) => state.appointments.freeSlots);
    const staffs = useAppSelector((state) => state.staffList.staffs);
    const [newAppointment, setNewAppointment] = useState<IAppointment>({
    user: meProfile?.id, 
    treatments: [],
    staff: "", 
    startTime: startDateTime,
});

    const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

const handleSlotSelect = (slotStartTime: Date) => {
    setSelectedSlot(slotStartTime);
    setNewAppointment(prevAppointment => ({
        ...prevAppointment,
    startTime: dayjs(slotStartTime).format("YYYY-MM-DD"),  // Imposta l'orario di inizio dell'appuntamento
    }));
    
};
console.log("CLIENT: ", meProfile?.id)
console.log("SELECTED SLOT: ", dayjs(selectedSlot).format("YYYY-MM-DDTHH:mm"))

useEffect(() => {
    if (!meProfile) {
        dispatch(getClientMe());
    }
    if (!staffs.length) {
        dispatch(getStaffs(setIsLoading));
    }
    if (!treatments.length) {
        dispatch(getTreatments(setIsLoading));
    }
    
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dispatch, meProfile, staffs.length, treatments.length]);

useEffect(() => {
    if (selectedStaff && selectedStaff.id) {
        setNewAppointment(prevAppointment => ({ 
            ...prevAppointment, 
            staff: selectedStaff.id
        }));
    }
  }, [selectedStaff]);

useEffect(() => {
    if(selectedStaff?.id && currentDate) {
      const formattedDateTime = dayjs(currentDate).startOf("day").format("YYYY-MM-DD");
    dispatch(getFreeSlots(selectedStaff?.id, formattedDateTime));
    dispatch(getStaffs(setIsLoading))
    dispatch(getTreatments(setIsLoading))
    
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dispatch]);

const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const staffMemberName = e.target.value;
    const staffObject = staffs.find((s: IStaff) => s.name === staffMemberName);
    setSelectedStaff(staffObject || null);
};

const handleDateChange = (date: Date | null) => {
    if (date && selectedStaff?.id) {
        setCurrentDate(date);
        const formattedDate = dayjs(date).format("YYYY-MM-DD"); 
        dispatch(getFreeSlots(selectedStaff?.id, formattedDate)); 
    }
  };

  const handleTreatmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const treatmentName = e.target.value;
    const selectedTreatmentObject = treatments.find((treatment: ITreatment) => treatment.name === treatmentName);
    if (selectedTreatmentObject) {
        setSelectedTreatment(prevSelected => {
            const alreadySelected = prevSelected.some(t => t.id === selectedTreatmentObject.id);
            return alreadySelected
                ? prevSelected.filter(treatment => treatment.id !== selectedTreatmentObject.id)
                : [...prevSelected, selectedTreatmentObject];
        });
    }
};

const handleSaveAppointment = async () => {
  if (!newAppointment.startTime) {
      notifyErr("Devi selezionare un orario!");
      return;
  }

  const updatedAppointment: IAppointment = {
      ...newAppointment,
      user: meProfile?.id || "",
      treatments: selectedTreatment,
      startTime: selectedSlot ? dayjs(selectedSlot).format("YYYY-MM-DDTHH:mm:ss") : dayjs(newAppointment.startTime).format("YYYY-MM-DDTHH:mm:ss"),
      };

  const newAppointmentResponse = await dispatch(createAppointmentClient(updatedAppointment, setIsLoading));
  if (onAppointmentCreated) {
    onAppointmentCreated(newAppointmentResponse);
  }

  handleClose();
  setNewAppointment({
      user: "",
      treatments: [],
      staff: "",
      startTime: new Date(),
  });
  setSelectedTreatment([]);
};



return (
  <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title className="text-center">
              Prenota un appuntamento
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form className='p-3'>
              <h2>{meProfile?.name}</h2>
               {/* Sezione Staff */}
               <Form.Group controlId="formStaffMember" className='mb-4'>
                  <Form.Label>Staff</Form.Label>
                  <select
                      onChange={(e) => {
                          handleStaffChange(e);
                      }}
                      value={selectedStaff ? selectedStaff.name : ""}
                      className="rounded-5 px-2 py-1 w-sm-100 me-auto m-2"
                  >
                      <option value="">Seleziona un membro dello staff</option>
                      {staffs.map((staff: IStaff) => (
                          <option key={staff.id} value={staff.name}>
                              {staff.name}
                          </option>
                      ))}
                  </select>
              </Form.Group>
              {/* Sezione Trattamenti */}
              <Form.Group controlId="formClientSurname" className='mb-4'>
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

             

              {/* Sezione Data */}
              <Row className='mt-5 p-3'>
                  <Col xs={12} md={6}>
                      <label>Seleziona il giorno</label>
                  </Col>
                  <Col xs={12} md={6}>
                      <DatePicker
                          dateFormat="dd-MM-yyyy"
                          className="form-control rounded-5 px-3"
                          selected={currentDate}
                          onChange={(date) => {
                              handleDateChange(date);
                          }}
                      />
                  </Col>
              </Row>

              {/* Sezione Slot Liberi */}
              {freeSlots.length > 0 && selectedStaff && currentDate ? (
                  <div>
                      <h5>Slot orari liberi:</h5>
                      <Row>
                          {freeSlots.map((slot: IFreeSlots, _i: number) => (
                              <Col className='w-25 p-1' key={_i} xs={12} md={6}>
                                  <Button
                                      className={selectedSlot && dayjs(selectedSlot).isSame(slot.startTime) ? `bg-primary border-primary text-white p-0 px-3`: `bg-transparent text-black border-secondary p-0 px-3 ${selectedSlot === slot.startTime ? 'selected-slot' : ''}`}
                                      onClick={() => handleSlotSelect(dayjs(slot.startTime).toDate())}
                                  >
                                      {dayjs(slot.startTime).format("HH:mm")} 
                                  </Button>
                              </Col>
                          ))}
                      </Row>
                  </div>
              ) : (
                  <div>
                      <p>Nessun slot libero per il giorno selezionato.</p>
                  </div>
              )}
          </Form>
      </Modal.Body>
      
      <Modal.Footer>
          <Button variant="secondary" className='my-3 border-secondary bg-transparent text-secondary undo-btn' onClick={handleClose}>
              Annulla
          </Button>
          <Button
              variant="primary"
              className={selectedSlot ? 'my-3 border-primary bg-primary save-btn' : 'my-3 border-primary bg-transparent text-primary save-btn'}
              onClick={handleSaveAppointment}
              disabled={!selectedSlot} 
          >
              Salva
          </Button>
      </Modal.Footer>
  </Modal>
);
}

export default BookingModal