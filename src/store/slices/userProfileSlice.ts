import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USERDATA, USERS } from "@/models/usermodel";
import { deleteUserProfile, followUser, getUserProfile, updateUserProfile } from "../Api/userProfileApi";


    const initialState ={
        isLoading: true,
        data: {} as USERS,
        message:"",
        status : ""
    }

const userProfileSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        clearUserLogout(state){
            state.data = {} as USERS;
            localStorage.removeItem('userID');
            return state;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserProfile.fulfilled,  (state, action: PayloadAction<USERDATA>)=> {                
                state.isLoading = false;
                state.message = action.payload.message;
                state.data = action.payload.data.user;
                state.status = action.payload.status;
                return state;
            })
            .addCase(updateUserProfile.fulfilled,  (state, action: PayloadAction<USERDATA>)=> {                
                state.isLoading = false;
                state.message = action.payload.message;                
                state.data = {...action.payload.data.user}
                state.status = action.payload.status;
                return state;
            })
            .addCase(deleteUserProfile.fulfilled,  (state, action: PayloadAction<USERDATA>)=> {                
                state.isLoading = false;
                state.message = action.payload.message;
                state.data = {} as USERS;
                state.status = action.payload.status;
                return state;
            })
            .addCase(followUser.fulfilled,  (state, action: PayloadAction<USERS>)=> {                
                state.isLoading = false;
                state.data.followers = action.payload.followers;
                return state;
            })
        },
})
export const { clearUserLogout } = userProfileSlice.actions;
export default userProfileSlice.reducer;