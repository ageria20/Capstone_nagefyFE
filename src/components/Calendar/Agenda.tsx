// Agenda.tsx

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
import AgendaModal from './AgendaModal';
import { getAppointments } from "../../redux/actions/actionAppointment";

const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar);

const Agenda: React.FC = () => {
    const dispatch = useAppDispatch();
    const [selectedStaff, setSelectedStaff] = useState<string>("");
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedTreatment, setSelectedTreatment] = useState<ITreatment[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    
    const treatments = useAppSelector((state) => state.treatments.treatments);
    const staffs = useAppSelector((state) => state.staffList.staffs);
    const appointments = useAppSelector((state) => state.appointments.appointments);
    
    const [events, setEvents] = useState<IEvents[]>([]);

    const handleNavigate = (newDate: Date, view: View) => {
        setCurrentDate(newDate);
    };

    const handleEvents = () => {
     
    }

    const filterStaffEvents = selectedStaff
        ? events.filter((e) => e.staff === selectedStaff)
        : events;

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleEventDrop = ({ event, start, end }: any) => {
        const updatedEvent = { ...event, start: new Date(start), end: new Date(end) };
        const updatedEvents = events.map((evt) =>
            evt.id === event.id ? updatedEvent : evt
        );
        setEvents(updatedEvents);
    };

    const handleSelectSlot = ({ start }: { start: Date }) => {
        const startString = dayjs(start).format("YYYY-MM-DDTHH:mm:ss");
        setSelectedSlot(startString); 
        console.log("DATE", startString)
        setShowModal(true); 
    };

   
    useEffect(() => {
      const formattedEvents = appointments.map((appointment, _i) =>({
        id: _i + 1,
        title: appointment.user, 
        start: appointment.startDateTime,
        end: appointment.ednDateTime,
        allDay: false,
        user: appointment.user,
        staff: appointment.staffMember
      }))
      setEvents(formattedEvents)
      console.log("formatted", formattedEvents)
        dispatch(getStaffs());
        console.log("Staffs", staffs)
        dispatch(getAppointments());
        console.log(appointments)
    }, [dispatch]);


    const formattedDate = dayjs(currentDate).format("MMMM D, YYYY");

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center">
            <DnDCalendar
                localizer={localizer}
                events={filterStaffEvents}
                defaultView="day"
                draggableAccessor={() => true}
                step={15} 
                timeslots={1}
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
                        <CustomToolbar
                            {...props}
                            selectedStaff={selectedStaff}
                            setSelectedStaff={setSelectedStaff}
                            handleToday={handleToday}
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            formattedDate={formattedDate}
                        />
                    ),
                }}
                onSelectEvent={() => setShowModal(true)}
            />

            <AgendaModal 
                show={showModal}
                handleClose={() => setShowModal(false)}
                selectedTreatment={selectedTreatment}
                setSelectedTreatment={setSelectedTreatment}
                startDateTime={selectedSlot}
            />
        </Container>
    );
};

export default Agenda;
