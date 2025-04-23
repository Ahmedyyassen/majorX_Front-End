import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USERDATA, USERS } from "@/models/usermodel";
import { getClientProfile } from "../Api/userProfileApi";

    const initialState ={
        isLoading: true,
        data: {} as USERS,
        message:"",
        status : ""
    }

const clientSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        clearClient(state){
            state.data = {} as USERS;
            state.message = "";
            return state;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getClientProfile.fulfilled,  (state, action: PayloadAction<USERDATA>)=> {                
                state.isLoading = false;
                state.message = action.payload.message;
                state.data = action.payload.data.user;
                state.status = action.payload.status;
                return state;
            })
        },
})
export const { clearClient } = clientSlice.actions;
export default clientSlice.reducer;