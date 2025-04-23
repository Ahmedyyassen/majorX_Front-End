import { COMMENT } from "@/models/commentModel";
import { getAllComments } from "@/store/Api/commentApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const dataValue :COMMENT[] = [];

const initialState = {
    isLoading: true,
    data: dataValue,
    error: ""
}

const commentsSlice = createSlice({
    name: "postsSlice",
    initialState: initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllComments.fulfilled, (state, action: PayloadAction<COMMENT[]>)=>{
            state.isLoading = false;
            state.data = [...action.payload]
            state.error = "";
            return state;
            })
    }
})
export default commentsSlice.reducer;