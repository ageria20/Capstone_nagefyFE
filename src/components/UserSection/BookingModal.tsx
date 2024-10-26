import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { ITreatment } from '../../interfaces/ITreatment';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { IAppointment } from '../../interfaces/IAppointment';
import DatePicker from 'react-datepicker';
import { createAppointment, getFreeSlots } from '../../redux/actions/actionAppointment';
import dayjs from 'dayjs';
import { getStaffs } from '../../redux/actions/actionStaff';
import { getTreatments } from '../../redux/actions/actionTreatment';
import { getClientMe } from '../../redux/actions/usersAction';
import { getAppointmentsMe } from '../../redux/actions/actionClients';


interface BookingModalProps {
    show: boolean;
    handleClose: () => void;
    setSelectedTreatment: React.Dispatch<React.SetStateAction<ITreatment[]>>;
    selectedTreatment: ITreatment[];
    startDateTime?: string;
    formattedDate?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({show, handleClose, selectedTreatment, setSelectedTreatment, startDateTime = "", formattedDate =""}) => {

    const treatments = useAppSelector((state) => state.treatments.treatments);
    const dispatch = useAppDispatch();
    const meProfile = useAppSelector((state) => state.users.user);
    const freeSlots = useAppSelector((state) => state.appointments.freeSlots);
    const staffs = useAppSelector((state) => state.staffList.staffs);
    const [newAppointment, setNewAppointment] = useState<IAppointment>({
    user: meProfile?.id || "", 
    treatments: [],
    staff: "", 
    startTime: startDateTime,
});

    const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

useEffect(() => {
    if (!meProfile) {
        dispatch(getClientMe());
    }
    if (!staffs.length) {
        dispatch(getStaffs());
    }
    if (!treatments.length) {
        dispatch(getTreatments());
    }
    console.log("CLIENT ME", meProfile)
    console.log("STAFFS", staffs)
    console.log("TREATMENTS", treatments)
}, [dispatch]);

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
    dispatch(getFreeSlots(selectedStaff?.id, dayjs(currentDate).format("YYYY-MM-DDTHH:mm")));
    dispatch(getStaffs())
    dispatch(getTreatments())
    }
}, [dispatch, formattedDate, freeSlots, selectedStaff?.id]);

const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const staffMemberName = e.target.value;
    const staffObject = staffs.find(s => s.name === staffMemberName);
    setSelectedStaff(staffObject || null);
};

const handleDateChange = (date: Date | null) => {
    if (date && selectedStaff?.id) {
      setCurrentDate(date);
      dispatch(getFreeSlots(selectedStaff?.id, date.toLocaleDateString()));
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
    const updatedAppointment: IAppointment = {
      ...newAppointment,
      treatments: selectedTreatment,
    };
  
    if (!updatedAppointment.startTime) {
      console.error("Start time is missing or invalid!");
      return;
    }
  
    await dispatch(createAppointment(updatedAppointment));
    await dispatch(getAppointmentsMe());
  
    
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
            <Form>
                <h2>{meProfile?.name}</h2>
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
    onChange={(e) => {
        handleStaffChange(e);
        if (selectedStaff && selectedStaff.id) { // Verifica che selectedStaff sia definito
            getFreeSlots(selectedStaff.id, formattedDate);
        }
    }}
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
    <Form.Label>Seleziona il giorno</Form.Label>
    <Form.Group controlId="formClientSurname">
    <DatePicker
            className='datePicker'
            selected={currentDate}
            onChange={(date) => {
            handleDateChange(date);
            getFreeSlots(selectedStaff?.id as string, formattedDate);
            }}
            inline
    />
        {freeSlots.length > 0 && (
        <div>
            <h5>Slot orari liberi:</h5>
            <ul>
                {freeSlots.map((slot, _i) => (
                    <li key={_i}>{dayjs(slot.startTime).format("HH:mm")} - {dayjs(slot.endTime).format("HH:mm")}</li>
                ))}
            </ul>
        </div>
        )}
    </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className='my-3 border-secondary bg-transparent text-secondary undo-btn' onClick={handleClose}>
              Annulla
            </Button>
            <Button variant="primary" className='my-3 border-primary bg-transparent text-primary save-btn' onClick={handleSaveAppointment}>
              Salva
            </Button>
           
          </Modal.Footer>
        </Modal>
      );
}

export default BookingModal