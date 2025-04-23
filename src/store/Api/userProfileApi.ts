import { apiClient } from "@/lib/api-client";
import { FOLLOW_USER_ROUTE, USER_PROFILE_ROUTE } from "@/utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";


type PropID={
    id: string;
}
type UserData={
    id: string
    data: FormData;
}
export const getUserProfile = createAsyncThunk("userProfileSlice/getUserProfile", async({id}: PropID)=>{    
    const res = await apiClient.get(`${USER_PROFILE_ROUTE}/${id}`);    
    return await res.data;
})

export const fetchUsers = createAsyncThunk("userSlice/fetchUsers", async()=>{
    const res = await apiClient.get(USER_PROFILE_ROUTE);    
    return await res.data.data.users
})


export const updateUserProfile = createAsyncThunk("userProfileSlice/updateUserProfile", async({id , data}: UserData)=>{
    const res = await apiClient.put(`${USER_PROFILE_ROUTE}/${id}`, data);
    return await res.data;
})


export const deleteUserProfile = createAsyncThunk("userProfileSlice/deleteUserProfile", async({id}: PropID)=>{
    const res = await apiClient.delete(`${USER_PROFILE_ROUTE}/${id}`);
    return await res.data;
})

export const followUser = createAsyncThunk("userProfileSlice/followusers", async({id}: PropID)=>{
    const res = await apiClient.put(`${FOLLOW_USER_ROUTE}/${id}`);        
    return await res.data.data.user;
})

export const getClientProfile = createAsyncThunk("userProfileSlice/getClientProfile", async({id}: PropID)=>{    
    const res = await apiClient.get(`${USER_PROFILE_ROUTE}/${id}`);    
    return await res.data;
})
