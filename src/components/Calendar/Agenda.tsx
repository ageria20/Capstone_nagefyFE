import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import dayjs from "dayjs";
import "./Agenda.css";
import CustomToolbar from "./CustomToolbar";
import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { getStaffs } from "../../redux/actions/actionStaff";
import AgendaModal from './AgendaModal'; // Importa il tuo componente modale
import { getAppointments } from "../../redux/actions/actionAppointment";

const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar);

const Agenda: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false); // Stato per il modale
  const [selectedTreatment, setSelectedTreatment] = useState<ITreatment[]>([]); // Stato per i trattamenti
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const staffs = useAppSelector((state) => state.staffList.staffs);
  const appointments = useAppSelector((state) => state.appointments.appointments)
  const [events, setEvents] = useState<IEvents[]>([
    {
      id: 1,
      title: "Taglio e Piega",
      start: new Date(2024, 9, 11, 9, 0),
      end: new Date(2024, 9, 11, 10, 30),
      staff: staffs.length > 0 ? staffs[0].name : ""
    },
    {
      id: 2,
      title: "Colore e Piega",
      start: new Date(2024, 9, 11, 10, 30),
      end: new Date(2024, 9, 11, 12, 30),
      staff: staffs.length > 1 ? staffs[1].name : ""
    },
  ]);

  const handleNavigate = (newDate: Date, view: View) => {
    console.log(view);
    setCurrentDate(newDate);
  };

  const filterStaffEvents = selectedStaff
    ? events.filter((e) => e.staff === selectedStaff)
    : events;

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventDrop = ({ event, start, end }: any) => {
    // Trova e aggiorna l'evento spostato
    const updatedEvent = { ...event, start: new Date(start), end: new Date(end) };
    const updatedEvents = events.map((evt) =>
      evt.id === event.id && evt.staff === event.staff
        ? updatedEvent
        : evt
    );
    setEvents(updatedEvents);
  };
  
  const handleSelectSlot = ({ start }: { start: Date }) => {
    // Imposta l'orario di inizio direttamente dal slot selezionato
    const startString = dayjs(start).format("YYYY-MM-DDTHH:mm:ss");
    
    setSelectedSlot(startString); 
    setShowModal(true); 
};
  useEffect(() => {
    dispatch(getStaffs());
    dispatch(getAppointments())
  }, [dispatch]);

  useEffect(() => {
    const formattedEvents = appointments.map((appointment) => ({
        id: appointment.id ? String(appointment.id) : undefined, // Converti a number
        title: appointment.treatments.map(t => t.name).join(', '), // Mostra i nomi dei trattamenti
        start: new Date(appointment.startDateTime), // Assicurati che il formato sia corretto
        end: new Date(new Date(appointment.startDateTime).getTime() + 30 * 60000), // Aggiungi 30 minuti come esempio per la fine
        staff: appointment.staffMember || "Staff non disponibile", // Usa un valore di fallback
    }));

    setEvents(formattedEvents);
}, [appointments]);

  const formattedDate = currentDate.toLocaleDateString("default", {
    month: "long",
    day: "numeric"
  });

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center">
      <DnDCalendar
        localizer={localizer}
        events={filterStaffEvents}
        defaultView="day"
        draggableAccessor={() => false}
        step={15} // Slot di 30 minuti
        timeslots={1} // Mostra 1 slot di 30 minuti per riga
        min={new Date(2024, 9, 9, 8, 0)}
        max={new Date(2024, 9, 9, 20, 0)}
        date={currentDate}
        className="calendar  rounded-4 shadow-lg mt-2 p-2"
        onNavigate={handleNavigate}
        onEventDrop={handleEventDrop}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        components={{
          toolbar: (props) => (
            <>
              <CustomToolbar
                {...props}
                selectedStaff={selectedStaff}
                setSelectedStaff={setSelectedStaff}
                handleToday={handleToday}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                formattedDate={formattedDate}
              />
            </>
          ),
        }}
        onSelectEvent={() => {
          // Apri il modale quando un evento è selezionato
          setShowModal(true);
        }}
      />

      {/* Aggiungi il Modale per la creazione dell'appuntamento */}
      <AgendaModal 
        show={showModal}
        handleClose={() => setShowModal(false)} // Chiude il modale
        selectedTreatment={selectedTreatment}
        setSelectedTreatment={setSelectedTreatment}
        startDateTime={selectedSlot}
      />
    </Container>
  );
};

export default Agenda;
