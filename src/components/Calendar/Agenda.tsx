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
import { getAppointments, updateAppointment } from "../../redux/actions/actionAppointment";
import { IClient, IEvents } from "../../interfaces/IUser";
import {  IAppointments } from "../../interfaces/IAppointment";
import { getTreatments } from "../../redux/actions/actionTreatment";



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

    
    const [events, setEvents] = useState<IEvents[]>([]);

    useEffect(() => {
        
        const formattedEvents = appointments.map((appointment: IAppointments, _i: number) => ({
            id: _i + 1,
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

    const handleEventDrop = ({ event, start, end }) => {
        const updatedEvent = {
            ...event,
            start: start,
            end: end,
        };
    
        // Aggiorna l'appuntamento nel tuo stato
        const updatedEvents = events.map(evt => 
            evt.id === event.id ? updatedEvent : evt
        );
    
        // Aggiorna lo stato degli eventi
        setEvents(updatedEvents);
    
        // Qui chiami la tua funzione per aggiornare l'appuntamento nel server
        const fullAppointment = appointments.find(appointment => appointment.id === event.id);
        if (fullAppointment) {
            const updatedAppointment = {
                ...fullAppointment,
                startTime: dayjs(start).toISOString(),
                endTime: dayjs(end).toISOString(),
            };
    
            dispatch(updateAppointment(fullAppointment.id, updatedAppointment))
                .then(() => {
                    console.log("Appuntamento aggiornato con successo!");
                    dispatch(getAppointments()); // Recupera di nuovo gli appuntamenti
                })
                .catch(err => {
                    console.error("Errore nell'aggiornamento dell'appuntamento: ", err);
                });
        }
    };

    // const handleEventDrop = ({ event, start, end }: any) => {
       
    //     const fullAppointment = appointments.find(appointment => {
    //         const fullStartTime = new Date(dayjs(appointment.startTime).toISOString()).getTime();
    //         const eventStartTime = new Date(event.start).getTime();
    //         return fullStartTime === eventStartTime; 
    //       });
    //       if(fullAppointment){
    //         const updatedAppointment = {
    //             ...fullAppointment, 
    //             startTime: dayjs(start).toISOString(), // Nuovo start time
    //             endTime: dayjs(end).toISOString() // Nuovo end time
    //         };
    //         const updatedEvents = events.map((evt) => {
    //             if (evt.id === event.id) {
    //                 return {
    //                     ...evt,
    //                     start: new Date(start),
    //                     end: new Date(end)
    //                 };
    //             } 
    //             return evt; 
    //         });
    //         setEvents(updatedEvents);
    //         console.log("APPUNTAMENTO AGGIORNATO: ", updatedAppointment);
    //         console.log("EVENTO AGGIORNATO: ", updatedEvents);
    //         console.log("FULL APPOINTMENT: ",fullAppointment)
    //         if(selectedEvent.id){
    //         dispatch(updateAppointment(selectedEvent.id, updatedAppointment))
    //         .then(() => {
    //             console.log("Appuntamento aggiornato con successo!");
    //             dispatch(getAppointments());
                
                
    //         })
    //         .catch(err => {
    //             console.error("Errore nell'aggiornamento dell'appuntamento: ", err);
    //         }); 
    //     }
    //       }
    //     }

    const handleSelectSlot = ({ start }: { start: Date }) => {
        const startString: string= dayjs(start).format("YYYY-MM-DDTHH:mm:ss");
        setSelectedSlot(startString);
        console.log("DATE: ",startString)
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
        </Container>
    );
};

export default Agenda;
