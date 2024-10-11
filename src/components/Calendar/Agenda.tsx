import React, { useCallback, useState } from "react";
import { Calendar, dayjsLocalizer, NavigateAction, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from "dayjs";
import "./Agenda.css";
import CustomToolbar from "./CustomToolbar";
import { Container } from "react-bootstrap";


const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar)

const Agenda: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents]  = useState<IEvents[]>([
    {
      title: "Taglio e Piega",
      start: new Date(2024, 9, 11, 9, 0),
      end: new Date(2024, 9, 11, 10, 30),
      staff: "Desiree",
    },
    {
      title: "Colore e Piega",
      start: new Date(2024, 9, 11, 10, 30),
      end: new Date(2024, 9, 11, 12, 30),
      staff: "Mariagrazia",
    },
  ])

  

  const staff = [
    { id: 1, name: "Desiree" },
    { id: 2, name: "Mariagrazia" },
    { id: 3, name: "Elena" },
  ];



  const handleNavigate = (
    newDate: Date,
    view: View,
    action: NavigateAction
  ) => {
   
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
    setEvents(updatedEvents)
  }


  
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
        draggableAccessor={(eventsDrag) => true}
        step={30} // Slot di 30 minuti
        timeslots={1} // Mostra 1 slot di 30 minuti per riga
        min={new Date(2024, 9, 9, 8, 0)}
        max={new Date(2024, 9, 9, 20, 0)}
        date={currentDate}
        className="calendar  rounded-4 shadow-lg mt-2 p-2"
        onNavigate={handleNavigate}
        onEventDrop={handleEventDrop} 
        components={{
          toolbar: (props) => (
            <>
              <CustomToolbar
                {...props}
                selectedStaff={selectedStaff}
                setSelectedStaff={setSelectedStaff}
                staff={staff}
                handleToday={handleToday}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                formattedDate={formattedDate}
              />
             
               
              
              
            </>
          ),
        }}
      />
    </Container>
  );
};

export default Agenda;
