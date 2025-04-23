import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginForm } from "@/models/authModel";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { CHECK_OTP_ROUTE, FORGET_PASSWORD_ROUTE, LOGOUT_ROUTE, RESET_PASSWORD_ROUTE, SIGNIN_ROUTE, VERIFY_ACCOUNT_ROUTE } from "@/utils/constants";



export const loginUser = createAsyncThunk("authSlice/loginUser", async(user: loginForm)=>{
    const res = await apiClient.post(SIGNIN_ROUTE,user)
    .then((res)=>{
        return res.data;
    }).catch((err)=>{
        toast.error((err.response?.data.message));
        return err.response.data;
    })
    return res;
})

export const logoutUserRTK = createAsyncThunk("authSlice/logoutUser", async()=>{
    const res = await apiClient.post(LOGOUT_ROUTE)
    .then((res)=>{
        if ( res.status === 200 ) {
             toast.success( `GoodBye` ,res.data.message);
             return res.data; 
        }
    }).catch((err)=>{
        toast.error((err.response?.data.message));
        return err.response.data;
    })
    return res;
})

type Props={
    email: string,
    otp: number
}
export const verifyUserAccountRTK = createAsyncThunk("authSlice/verifyUserAccountRTK", async({email, otp}:Props)=>{
    const res = await apiClient.post(VERIFY_ACCOUNT_ROUTE, {email,otp})
    .then((res)=>{
        if ( res.status === 200 ) {
             toast.success( `Account verified` ,res.data.message);
             return res.data; 
        }
    }).catch((err)=>{
        toast.error("Error", (err.response?.data.message));
        return err.response.data;
    })
    return res;
})


export const forgetPasswordAccountRTK = createAsyncThunk("authSlice/forgetPasswordAccountRTK", async({email}:{email:string})=>{
    
    const res = await apiClient.post(FORGET_PASSWORD_ROUTE, {email})
    .then((res)=>{
        if ( res.status === 200 ) {
             toast.success( `OTP verified successfully` ,res.data.message);
             return res.data; 
        }
    }).catch((err)=>{
        toast.error("Error", (err.response?.data.message));
        return err.response.data;
    })
    return res;
})

export const checkOTPAccountRTK = createAsyncThunk("authSlice/checkOTPAccountRTK", async({email, otp}:Props)=>{    
    const res = await apiClient.post(CHECK_OTP_ROUTE, {email,otp})
    .then((res)=>{
        if ( res.status === 200 ) {
             toast.success( `OTP verified successfully` ,res.data.message);
             return res.data; 
        }
    }).catch((err)=>{
        toast.error("Error", (err.response?.data.message));
        return err.response.data;
    })
    return res;
})

type NewPass={
    email: string,
    password: string
}
export const resetPasswordRTK = createAsyncThunk("authSlice/resetPasswordRTK", async({email, password}:NewPass)=>{    
    const res = await apiClient.post(RESET_PASSWORD_ROUTE, {email,password})
    .then((res)=>{
        if ( res.status === 200 ) {
             toast.success( `Password changed successfully` ,res.data.message);
             return res.data; 
        }
    }).catch((err)=>{
        toast.error("Error", (err.response?.data.message));
        return err.response.data;
    })
    return res;
})

