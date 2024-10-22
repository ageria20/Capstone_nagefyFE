import { createSlice } from "@reduxjs/toolkit";
import { ICash, ICashed } from "../../interfaces/ICash";

interface CashState {
    cash: ICash | null;
    isPayed: boolean
    cashList: ICashed[]
}

const initialState: CashState ={
    cash: null,
    isPayed: false, 
    cashList: []
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
    },
    setCashList: (state, action) => {
        state.cashList = action.payload
    }
}
})

export const {setCash, setIsPayed, setCashList} = cashSlice.actions;
export default cashSlice.reducer;