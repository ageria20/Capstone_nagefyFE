import { createSlice } from "@reduxjs/toolkit";
import { ICash } from "../../interfaces/ICash";

interface CashState {
    cash: ICash | null;
    
}

const initialState: CashState ={
    cash: null
}

const cashSlice = createSlice({
    name: "cash", 
    initialState, 
    reducers: {
        setCash: (state, action) => {
        state.cash = action.payload;
    },
}
})

export const {setCash} = cashSlice.actions;
export default cashSlice.reducer;