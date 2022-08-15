import {  createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: [],
    commentsPost:null
};
 
export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setAllComments: (state,actions) => {
            state.value = actions.payload;
        },
        setCommentsPost:(state,actions)=>{
            state.commentsPost = actions.payload
        }
    }
});
 
export const { setAllComments, setCommentsPost} = commentsSlice.actions;
export const selectAllComments = (state) => state.comments.value;
export const selectCommentsPost= (state) => state.comments.commentsPost;
export default commentsSlice.reducer;