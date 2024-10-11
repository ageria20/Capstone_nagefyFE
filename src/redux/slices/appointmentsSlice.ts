import { createSlice } from "@reduxjs/toolkit";

interface AppointmentState {
    appointments: IAppointment[];
}

const initialState: AppointmentState ={
    appointments: []
}

const appointmentsSlice = createSlice({
    name: "appointments", 
    initialState, 
    reducers: {
        setAppointment: (state, action) => {
        state.appointments = action.payload;
    },
}
})

export const {setAppointment} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;