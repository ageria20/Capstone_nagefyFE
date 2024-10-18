import { createSlice } from "@reduxjs/toolkit";
import { ICash } from "../../interfaces/ICash";

interface CashState {
    cash: ICash | null;
    isPayed: boolean
}

const initialState: CashState ={
    cash: null,
    isPayed: false
}

const cashSlice = createSlice({
    name: "cash", 
    initialState, 
    reducers: {
        setCash: (state, action) => {
        state.cash = action.payload;
    },
    setIsPayed: (state, action) => {
        state.isPayed = action.payload
    }
}
})

export const {setCash, setIsPayed} = cashSlice.actions;
export default cashSlice.reducer;