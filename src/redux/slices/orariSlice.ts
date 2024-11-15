import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface OrariState {
    days: DaySchedule[]
}

const initialState: OrariState = {
    days: [
        {
            day: "Domenica", open: false, hours: [{from: "08:30", to: "19:30"}], pauses: [{from: "12:30", to: "15:00"}]
        }, 
        {
            day: "Lunedì", open: false, hours: [{from: "08:30", to: "19:30"}], pauses: [{from: "12:30", to: "15:00"}]
        }, 
        {
            day: "Martedì", open: true, hours: [{from: "08:30", to: "19:30"}], pauses: [{from: "12:30", to: "15:00"}]
        }, 
        {
            day: "Mercoledì", open: true, hours: [{from: "08:30", to: "19:30"}], pauses: [{from: "12:30", to: "15:00"}]
        }, 
        {
            day: "Giovedì", open: true, hours: [{from: "08:30", to: "19:30"}], pauses: [{from: "12:30", to: "15:00"}]
        }, 
        {
            day: "Venerdì", open: true, hours: [{from: "08:30", to: "19:30"}], pauses: [{from: "12:30", to: "15:00"}]
        }, 
        {
            day: "Sabato", open: true, hours: [{from: "08:30", to: "19:30"}], pauses: [{from: "12:30", to: "15:00"}]
        }
    ]
}

const orariSlice = createSlice({
    name: "orari",
    initialState,
    reducers: {
        toggleDay: (state, action: PayloadAction<string>) => {
            const day = state.days.find(d => d.day === action.payload)
            if(day){
                day.open = !day.open
            }
        },
        updateOrari: (state, action: PayloadAction<{day: string, hours: ITimeSlot[], pauses: ITimeSlot[]}> ) => {
            const day = state.days.find(d => d.day === action.payload.day)
            if(day){
                day.hours = action.payload.hours
                day.pauses = action.payload.pauses
            }
        }
    }
})

export const {toggleDay, updateOrari} = orariSlice.actions
export default orariSlice.reducer