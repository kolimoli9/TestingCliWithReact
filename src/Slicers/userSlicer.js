import {  createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: null,
    token:null
};
 
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state,actions) => {
            state.value = actions.payload;
        },
    }
});
 
export const { setUser} = userSlice.actions;
export const selectUser = (state) => state.user.value;
export default userSlice.reducer;
