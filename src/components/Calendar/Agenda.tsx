import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import dayjs from "dayjs";
import "dayjs/locale/it";
import "./Agenda.css";
import CustomToolbar from "./CustomToolbar";
import { Container, ToastContainer } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { getStaffs } from "../../redux/actions/actionStaff";
import AgendaModal from './AgendaModal';
import { getAppointments, updateAppointment } from "../../redux/actions/actionAppointment";
import { IClient, IEvents } from "../../interfaces/IUser";
import {  IAppointment, IAppointments } from "../../interfaces/IAppointment";
import { getTreatments } from "../../redux/actions/actionTreatment";


dayjs.locale("it");
const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar);

const Agenda: React.FC = () => {
    const dispatch = useAppDispatch();
    const [selectedStaff, setSelectedStaff] = useState<string>("");
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedTreatment, setSelectedTreatment] = useState<ITreatment[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<IAppointments>({
        user: {} as IClient, 
        treatments: [] as ITreatment[],
        staff: {} as ISelectedStaff,
        startTime: new Date(),
        endTime: new Date()
    });
    const [selectedSlot, setSelectedSlot] = useState<Date>(new Date());
    
    
    const appointments = useAppSelector((state) => state.appointments.appointments);
    const orari = useAppSelector((state) => state.orari.days)

    
    const [events, setEvents] = useState<IEvents[]>([]);

    useEffect(() => {
        
        const formattedEvents = appointments.map((appointment: IAppointments) => ({
            id: appointment.id,
            title: `${appointment.user.name} ${appointment.user.surname}`, 
            start: new Date(dayjs(appointment.startTime).toISOString()),
            end: new Date(dayjs(appointment.endTime).toISOString()), 
            staff: `${appointment.staff.name}`,
        }));
        setEvents(formattedEvents);
        console.log("Formatted EVENTS: ", formattedEvents)
        console.log("APPOINTMENT: ", appointments)
        console.log("DATE: ", new Date(2024,10,13,21,56))
    }, [appointments]);


    const currentDay = dayjs(currentDate).format("dddd")
    const todayOrari = orari.find(day => day.day.toLocaleUpperCase() === currentDay.toLocaleUpperCase())
    const isDayOpen = todayOrari?.open && todayOrari.hours.length > 0

    const minTime = isDayOpen
    ? new Date(
        currentDate.getFullYear(), 
        currentDate.getMonth(), 
        currentDate.getDate(), 
        parseInt(todayOrari.hours[0].from.split(":")[0]),  
        parseInt(todayOrari.hours[0].from.split(":")[1])  
    ) 
    : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0);

const maxTime = isDayOpen
    ? new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        parseInt(todayOrari.hours[todayOrari.hours.length - 1].to.split(":")[0]), 
        parseInt(todayOrari.hours[todayOrari.hours.length - 1].to.split(":")[1])
    )
    : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59);

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

    const handleEventDrop = async ({ event, start, end }: any) => {
        const updatedEvent = {
            ...event,
            start: start,
            end: end,
        };
    
        
        const updatedEvents = events.map(evt => 
            evt.id === event.id ? updatedEvent : evt
        );
    
        console.log("UPDATED EVENTS", updatedEvent.id)
        console.log("START EVENTS", updatedEvent.start)
        setEvents(updatedEvents);
    
       
        // const fullAppointment = appointments.find(appointment => appointment.id === event.id);
        const fullAppointment = appointments.find(appointment => {
            const fullStartTime = new Date(dayjs(appointment.startTime).toISOString()).getTime();
            const eventStartTime = new Date(event.start).getTime();
            return fullStartTime === eventStartTime; 
        });
        if (fullAppointment) {
            console.log("FULL APPOINTMENT: ", fullAppointment)
            const updatedAppointment: IAppointment = {
                id: fullAppointment.id,
                treatments: fullAppointment.treatmentsList,
                staff: fullAppointment.staff.id,
                startTime: dayjs(start).format("YYYY-MM-DDTHH:mm:ss"),
            };
            console.log("UPDATED APPOINTMENT: ", updatedAppointment)
        
                try {
                    await dispatch(updateAppointment(updatedAppointment.id, updatedAppointment));
                    console.log("Appuntamento aggiornato con successo!");
                    dispatch(getAppointments()); // Recupera di nuovo gli appuntamenti dopo l'aggiornamento
                } catch (err) {
                    console.error("Errore nell'aggiornamento dell'appuntamento: ", err);
                }
            }
    };

    const handleSelectSlot = ({ start }: { start: Date }) => {
        const startString: string= dayjs(start).format("YYYY-MM-DDTHH:mm:ss");
        setSelectedSlot(startString);
        console.log("DATE: ",startString)
        console.log("SELECTED SLOT: ", selectedSlot)
        setShowModal(true);
    };

    const handleEventSelect = (event) => {
        console.log("CLICKED EVENT: ", event);
      
        
        const fullAppointment = appointments.find(appointment => {
          const fullStartTime = new Date(dayjs(appointment.startTime).toISOString()).getTime();
          const eventStartTime = new Date(event.start).getTime();
          return fullStartTime === eventStartTime; 
        });
      
        if (fullAppointment) {
          console.log("FULL APPOINTMENT: ", fullAppointment);
          setSelectedEvent(fullAppointment);
        }
      
        dispatch(getTreatments()); 
        setShowModal(true);
      };
    
    


    useEffect(() => {
        dispatch(getStaffs());
        dispatch(getAppointments());
        console.log("CURRENT DATE",dayjs(currentDate).format("dddd").toLocaleUpperCase())
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
                min={minTime}
                max={maxTime}
                scrollToTime={minTime}
                date={currentDate}
                className="calendar rounded-4 shadow-lg mt-2 p-2"
                onNavigate={handleNavigate}
                onEventDrop={handleEventDrop}
                onSelectEvent={handleEventSelect}
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
            />

            <AgendaModal 
                show={showModal}
                handleClose={() => setShowModal(false)}
                selectedTreatment={selectedTreatment}
                setSelectedTreatment={setSelectedTreatment}
                startDateTime={selectedSlot}
                selectedEvent={selectedEvent}
            />
        <ToastContainer/>
        </Container>
        
    );
};

export default Agenda;
