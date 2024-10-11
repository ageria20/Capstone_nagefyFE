import React, {  useEffect, useState } from "react";
import { Calendar, dayjsLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from "dayjs";
import "./Agenda.css";
import CustomToolbar from "./CustomToolbar";
import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { getStaffs } from "../../redux/actions/actionStaff";


const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar)

const Agenda: React.FC = () => {
  const dispatch = useAppDispatch()
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const staffs = useAppSelector((state) => state.staffList.staffs)
  const [events, setEvents]  = useState<IEvents[]>([
    {
      title: "Taglio e Piega",
      start: new Date(2024, 9, 11, 9, 0),
      end: new Date(2024, 9, 11, 10, 30),
      staff: staffs.length > 0 ? staffs[0].name : ""
    },
    {
      title: "Colore e Piega",
      start: new Date(2024, 9, 11, 10, 30),
      end: new Date(2024, 9, 11, 12, 30),
      staff: staffs.length > 1 ? staffs[1].name : ""
    },
  ])

  
  const handleNavigate = (
    newDate: Date,
    view: View
  ) => {
    console.log(view);
    
    setCurrentDate(newDate);
  };

  const filterStaffEvents = selectedStaff
    ? events.filter((e) => e.staff === selectedStaff)
    : events;

  const handleToday = () => {
    setCurrentDate(new Date());
  };



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  useEffect(() => {
    dispatch(getStaffs())
  }, [dispatch])

  
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
        draggableAccessor={() => true}
        step={15} // Slot di 30 minuti
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
