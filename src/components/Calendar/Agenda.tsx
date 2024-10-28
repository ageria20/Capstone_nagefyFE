import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer, EventPropGetter, EventProps, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop';
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
import {  IAppointments, IUpdateAppointment } from "../../interfaces/IAppointment";
import { getTreatments } from "../../redux/actions/actionTreatment";
import { ITreatment } from "../../interfaces/ITreatment";


dayjs.locale("it");
const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop<IEvents, object>(Calendar);

const Agenda: React.FC = () => {
    const dispatch = useAppDispatch();
    const [selectedStaff, setSelectedStaff] = useState<string>("");
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedTreatment, setSelectedTreatment] = useState<ITreatment[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<IAppointments | null>({
        user: {} as IClient, 
        treatmentsList: [] as ITreatment[],
        staff: {} as ISelectedStaff,
        startTime: new Date(),
        endTime: new Date(), 
    });
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    
    
    const appointments = useAppSelector((state) => state.appointments.appointments);
    const orari = useAppSelector((state) => state.orari.days)

    
    const [events, setEvents] = useState<IEvents[]>([]);
    useEffect(() => {
        const formattedEvents = appointments.map((appointment: IAppointments) => {
            const start = new Date(dayjs(appointment.startTime).toISOString());
            const end = new Date(dayjs(appointment.endTime).toISOString());
            return {
                id: appointment.id,
                title: `${appointment.user.name} ${appointment.user.surname}`,
                start,
                end,
                staff: `${appointment.staff.name}`,
                payed: appointment.payed,
                treatmentsList: appointment.treatmentsList
            };
        });
        setEvents(formattedEvents);
    }, [appointments]);


    const currentDay = dayjs(currentDate).format("dddd")
    const todayOrari = orari.find(day => day.day.toLocaleUpperCase() === currentDay.toLocaleUpperCase())
    const isDayOpen = todayOrari?.open && todayOrari.hours.length > 0

    const minTime = todayOrari && isDayOpen ? new Date(
        currentDate.getFullYear(), 
        currentDate.getMonth(), 
        currentDate.getDate(), 
        todayOrari ? parseInt(todayOrari.hours[0].from.split(":")[0]): 0,  
        todayOrari ? parseInt(todayOrari.hours[0].from.split(":")[1]):0 
    ) : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 30);
   

const maxTime = todayOrari && isDayOpen ? new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        todayOrari ? parseInt(todayOrari.hours[todayOrari.hours.length - 1].to.split(":")[0]): 23, 
        todayOrari ? parseInt(todayOrari.hours[todayOrari.hours.length - 1].to.split(":")[1]): 59
    ) : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 30);

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

    const handleEventDrop = async ({ event, start, end }: EventInteractionArgs<IEvents>) => {
        const updatedEvent: IEvents = {
            ...event,
            start: new Date(start),
            end: new Date(end),
        };
    
        
        const updatedEvents = events.map(evt => 
            evt.id === event.id ? updatedEvent : evt
        );
    
        
        setEvents(updatedEvents);
    
       
        // const fullAppointment = appointments.find(appointment => appointment.id === event.id);
        const fullAppointment = appointments.find(appointment => {
            const fullStartTime = new Date(dayjs(appointment.startTime).toISOString()).getTime();
            const eventStartTime = new Date(event.start).getTime();
            return fullStartTime === eventStartTime; 
        });
        if (fullAppointment && fullAppointment.id) {
            
            const updatedAppointment: IUpdateAppointment = {
                id: fullAppointment.id,
                treatments: fullAppointment.treatmentsList,
                staff: fullAppointment.staff.id,
                startTime: dayjs(start).format("YYYY-MM-DDTHH:mm:ss"),
            };
            
        
                try {
                    await dispatch(updateAppointment(updatedAppointment.id, updatedAppointment));
                    
                    dispatch(getAppointments()); // Recupera di nuovo gli appuntamenti dopo l'aggiornamento
                } catch (err) {
                    console.error("Errore nell'aggiornamento dell'appuntamento: ", err);
                }
            }
    };

    const handleSelectSlot = ({ start }: { start: Date }) => {
        const startString: string = dayjs(start).format("YYYY-MM-DDTHH:mm:ss");
        setSelectedSlot(startString);
        setSelectedEvent(null)
       
        setShowModal(true);
    };

    const handleEventSelect = (event: IEvents) => {
        if(event.payed){
            return;
        }
      
        
        const fullAppointment = appointments.find(appointment => {
          const fullStartTime = new Date(dayjs(appointment.startTime).toISOString()).getTime();
          const eventStartTime = new Date(event.start).getTime();
          return fullStartTime === eventStartTime; 
        });
      
        if (fullAppointment) {
          
          setSelectedEvent(fullAppointment);
        }
      
        dispatch(getTreatments()); 
        setShowModal(true);
      };

      const eventStyleGetter: EventPropGetter<IEvents> = (event) => {
        const backgroundColor = event.payed ? 'lightgray' : 'blue';
        const style = {
            backgroundColor: backgroundColor,
            borderRadius: '0.7rem',
            width: '100%',
            padding: '0.5rem',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    };
    
    


    useEffect(() => {
        dispatch(getStaffs());
        dispatch(getAppointments());
        setSelectedSlot("")
        
    }, [currentDate, dispatch]);

    
    const formattedDate = dayjs(currentDate).format("ddd DD MMMM").toLocaleUpperCase();
    
    return (
        
        <Container fluid className="d-flex flex-column justify-content-center align-items-center">
            <DnDCalendar
                localizer={localizer}
                events={filterStaffEvents}
                defaultView="day"
                draggableAccessor={(event) => !event.payed}
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
                selectable={isDayOpen}
                onSelectSlot={handleSelectSlot}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: (eventProps: EventProps<IEvents>) => {
                        const { event } = eventProps; 
                
                        return (
                            <div>
                                <h6>{event.title}</h6>
                                <p>{event.treatmentsList[0]?.name || "Nessun trattamento disponibile"}</p>
                            </div>
                        );
                    },
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
