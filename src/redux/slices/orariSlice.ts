import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface OrariState {
    days: DaySchedule[]
}

const initialState: OrariState = {
    days: [
        {
            day: "Domenica", open: false, hours: []
        }, 
        {
            day: "Lunedì", open: false, hours: []
        }, 
        {
            day: "Martedì", open: true, hours: [{from: "08:30", to: "19:30"}]
        }, 
        {
            day: "Mercoledì", open: true, hours: [{from: "08:30", to: "19:30"}]
        }, 
        {
            day: "Giovedì", open: true, hours: [{from: "08:30", to: "19:30"}]
        }, 
        {
            day: "Venerdì", open: true, hours: [{from: "08:30", to: "19:30"}]
        }, 
        {
            day: "Sabato", open: true, hours: [{from: "08:30", to: "19:30"}]
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
        updateOrari: (state, action: PayloadAction<{day: string, hours: ITimeSlot[]}>) => {
            const day = state.days.find(d => d.day === action.payload.day)
            if(day){
                day.hours = action.payload.hours
            }
        }
    }
})

export const {toggleDay, updateOrari} = orariSlice.actions
export default orariSlice.reducer