import React, { useState } from "react";
import { Calendar, dayjsLocalizer, NavigateAction, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from "dayjs";
import "./Agenda.css";
import CustomToolbar from "./CustomToolbar";


const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar)

const Agenda: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  

  const staff = [
    { id: 1, name: "Desiree" },
    { id: 2, name: "Mariagrazia" },
    { id: 3, name: "Elena" },
  ];

  const events = [
    {
      title: "Taglio e Piega",
      start: new Date(2024, 9, 9, 9, 0),
      end: new Date(2024, 9, 9, 10, 30),
      staff: "Desiree",
    },
    {
      title: "Colore e Piega",
      start: new Date(2024, 9, 9, 11, 0),
      end: new Date(2024, 9, 9, 12, 30),
      staff: "Mariagrazia",
    },
  ];

  const handleNavigate = (
    newDate: Date,
    view: View,
    action: NavigateAction
  ) => {
    // Imposta la data corrente in base alla navigazione
    setCurrentDate(newDate);
  };

  const filterStaffEvents = selectedStaff
    ? events.filter((e) => e.staff === selectedStaff)
    : events;

  const handleToday = () => {
    setCurrentDate(new Date());
  };






  
  const formattedDate = currentDate.toLocaleDateString("default", {
    month: "long",
    day: "numeric"
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <DnDCalendar
        localizer={localizer}
        events={filterStaffEvents}
        defaultView="day"
        draggableAccessor={(event) => true}
        step={30} // Slot di 30 minuti
        timeslots={1} // Mostra 1 slot di 30 minuti per riga
        min={new Date(2024, 9, 9, 8, 0)}
        max={new Date(2024, 9, 9, 20, 0)}
        date={currentDate}
        className="calendar"
        onNavigate={handleNavigate}
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
    </div>
  );
};

export default Agenda;
