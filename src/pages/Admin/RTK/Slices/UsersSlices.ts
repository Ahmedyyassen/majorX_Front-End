import { USERS } from "@/models/usermodel";
import { fetchUsers } from "@/store/Api/userProfileApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userdata : USERS[]= [];
 const initailUserValue = {
    isLoading: true,
    data: userdata,
    error: ""
}

const usersSlice = createSlice({
    name: "userSlice",
    initialState: initailUserValue,
    reducers: {
        deleteUserANALY:(state, action: PayloadAction<{id: string}>)=>{
            state.data = state.data.filter((post)=> post._id !== action.payload.id);
            return state;
        },
        updateRole(state,action:PayloadAction<{id:string,role:string}>){
            const index = state.data.findIndex((user)=> user._id === action.payload.id);
            state.data[index].role = action.payload.role;
            return state;
        },
        clearUsers(state){
            state.data = []
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchUsers.fulfilled, (state, action : PayloadAction<USERS[]>)=>{
            state.isLoading = false
            state.data = action.payload
            return state;
        })
    }
})
export const { deleteUserANALY,updateRole,clearUsers } = usersSlice.actions;
export default usersSlice.reducer;