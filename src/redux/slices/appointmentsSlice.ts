import { createSlice } from "@reduxjs/toolkit";
import { IAppointments } from "../../interfaces/IAppointment";

interface AppointmentState {
    appointments: IAppointments[];
    selectedAppointment: IAppointments | null;
}

const initialState: AppointmentState ={
    appointments: [],
    selectedAppointment: null
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
    }
}
})

export const {setAppointment, setSelectedAppointment} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;