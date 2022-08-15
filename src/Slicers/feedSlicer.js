import {  createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: [],
    PostID:0
};
 
export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        setFeed: (state,actions) => {
            state.value = actions.payload;
        },
        setPostID:(state,actions)=>{
            state.PostID = actions.payload
        }
    }
});
 
export const { setFeed, setPostID} = feedSlice.actions;
export const selectFeed = (state) => state.feed.value;
export const selectPostID = (state) => state.feed.PostID;
export default feedSlice.reducer;