import { createSlice } from "@reduxjs/toolkit";

interface StaffState {
    staffs: IStaff[];
    staff: INewStaff | null;
}

const initialState: StaffState ={
    staffs: [],
    staff: null
}

const staffSlice = createSlice({
    name: "staffs", 
    initialState, 
    reducers: {
        setStaffs: (state, action) => {
        state.staffs = action.payload;
    },
}
})

export const {setStaffs} = staffSlice.actions;
export default staffSlice.reducer;