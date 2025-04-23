import { Category } from "@/models/dashboardModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, getCategoryRTK } from "../Api/categotyApiCall";

const initialState ={
    isLoading: true,
    data: {}as Category[],
    error:""
}

const categorySlice = createSlice({
    name: "categorySlice",
    initialState:initialState,
    reducers:{
       clrearCategories(state){
        state.data = [] 
       }
    },
    extraReducers: (builder)=>{
        builder 
            .addCase(getCategoryRTK.fulfilled, (state, action: PayloadAction<Category[]>)=>{
                state.isLoading = false;
                state.data = action.payload;
                return state;
            })
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>)=>{
                state.isLoading = false;
                state.data.push(action.payload);                
                return state;
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<Category>)=>{
                state.isLoading = false;
                state.data = state.data.filter((cat)=> cat._id !== action.payload._id);
                return state;
            })
    }
})
export const { clrearCategories } = categorySlice.actions;
export default categorySlice.reducer;