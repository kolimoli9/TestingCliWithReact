import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    Add1: (state) => {
      state.value += 1;
    },
    reset:(state)=>{
      state.value=initialState.value
    }
  }})
    

export const { Add1} = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export default counterSlice.reducer;