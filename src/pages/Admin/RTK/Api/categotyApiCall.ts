import { apiClient } from "@/lib/api-client";
import { CATEGORIES_ROUTE } from "@/utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

type Props={
    data: string;
}
type PropsID={
    id: string;
}


export const getCategoryRTK = createAsyncThunk("categorySlice/getCategory", async()=>{
    const res = await apiClient.get(CATEGORIES_ROUTE);    
    return await res.data.data.categories;
})

export const createCategory = createAsyncThunk("categorySlice/createCategory", async({data}: Props)=>{
    const res = await apiClient.post(CATEGORIES_ROUTE, {title: data});  
      
    return await res.data.data.category;
})

export const deleteCategory = createAsyncThunk("categorySlice/deleteCategory", async({id}: PropsID)=>{
    const res = await apiClient.delete(`${CATEGORIES_ROUTE}/${id}`);    
    return await res.data.data.deletedCat;
})