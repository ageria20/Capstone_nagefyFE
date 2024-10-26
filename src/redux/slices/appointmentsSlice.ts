import { createSlice } from "@reduxjs/toolkit";
import { IAppointments, IFreeSlots } from "../../interfaces/IAppointment";

interface AppointmentState {
    appointments: IAppointments[];
    selectedAppointment: IAppointments | null;
    clientAppointment: IAppointments | null;
    freeSlots: IFreeSlots[]
}

const initialState: AppointmentState ={
    appointments: [],
    selectedAppointment: null, 
    clientAppointment: null,
    freeSlots: []
}

const appointmentsSlice = createSlice({
    name: "appointments", 
    initialState, 
    reducers: {
        setAppointment: (state, action) => {
        state.appointments = action.payload;
    },
    setSelectedAppointment: (state, action) => {
        state.selectedAppointment = action.payload
    },
    setClientAppointment: (state, action) => {
        state.clientAppointment = action.payload
    },
    setFreeSlots: (state, action) => {
        state.freeSlots = action.payload
    }
}
})

export const {setAppointment, setSelectedAppointment, setClientAppointment, setFreeSlots} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;