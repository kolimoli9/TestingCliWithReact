import {  createSlice } from "@reduxjs/toolkit";
const initialState = {
    config1: {headers:{'Content-Type':'application/json'}},
    config2:{headers:{'Content-Type':'application/json',Authorization:'Bearer '+localStorage.getItem('token')}},
    url : 'https://n2mu-server.herokuapp.com/media/'
};
 
export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setConfig: (state,actions) => {
            state.config2 = actions;
        },
    }
});
 
export const { setConfig} = configSlice.actions;
export const selectConfig1 = (state) => state.config.config1;
export const selectConfig2 = (state) => state.config.config2;
export const selectUrl = (state) => state.config.url;
export default configSlice.reducer;