import { LOGIN } from "@/models/authModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUserRTK } from "../Api/authApi";

const userID : string = localStorage.getItem("userID")? 
    JSON.parse(localStorage.getItem("userID")!) : "";

    const initialState ={
        isLoading: true,
        data: userID,
        message:"",
    }

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        deleteProfileAuth(state){
            localStorage.removeItem('userID');
            state.data = "";
            state.isLoading = false;
            state.message = "";
            return state;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.fulfilled,  (state, action: PayloadAction<LOGIN>)=> {                
               if (action.payload.data) {
                localStorage.setItem('userID', JSON.stringify(action.payload.data.id))
                state.data = action.payload.data.id;
               }
                state.isLoading = false;
                state.message = action.payload.message;
                return state;
            })
            .addCase(logoutUserRTK.fulfilled,  (state)=> {                
                state.isLoading = false;
                state.message = "";
                state.data = "";
                return state;
            })
            
        },
})

export const { deleteProfileAuth } = authSlice.actions;

export default authSlice.reducer;