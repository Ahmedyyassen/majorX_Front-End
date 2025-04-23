import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { POST, USERS } from "../../models/usermodel";
import { createPostRTK, likePostRTK } from "../Api/postsApi";
import { createCommentRTK, delteCommentRTK, updateCommentRTK } from "../Api/commentApi";
import { COMMENT } from "@/models/commentModel";
import { followUser } from "../Api/userProfileApi";

const dataValue :POST[] = [];

const initialState = {
    isLoading: true,
    data: dataValue,
    error: ""
}

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: initialState,
    reducers:{
        reciveAppPosts(state, action: PayloadAction<POST[]>){
            state.isLoading = false;
            state.data = [...new Set([...state.data, ...action.payload])];
            state.error = "";
            return state;
            }
    },
    extraReducers:(builder)=>{
        builder
                .addCase(createPostRTK.fulfilled, (state, action: PayloadAction<POST>)=>{
                    state.isLoading = false;                    
                    state.data = [...new Set([action.payload, ...state.data])];
                    state.error = "";
                    return state;
                })
                .addCase(likePostRTK.fulfilled, (state, action: PayloadAction<POST>)=>{
                    state.isLoading = false;  
                    const index = state.data.findIndex((post)=> post._id === action.payload._id);
                    state.data[index].likes = action.payload.likes;
                    state.error = "";
                    return state;
                })
                .addCase(createCommentRTK.fulfilled, (state, action: PayloadAction<COMMENT>)=>{
                    state.isLoading = false;  
                    const index = state.data.findIndex((post)=> post._id === action.payload.postID);
                    state.data[index].comments = [...state.data[index].comments, action.payload]                    
                    state.error = "";
                    return state;
                })
                .addCase(followUser.fulfilled, (state, action: PayloadAction<USERS>)=>{
                    state.isLoading = false;   
                    if (state.data.length > 0) {
                        state.data = state.data?.map((post)=>{
                            if (post.user._id === action.payload._id) {
                                 post.user.followers = action.payload.followers;
                            }
                            return post;
                        })  
                    }     
                    state.error = "";
                    return state;
                })
                .addCase(updateCommentRTK.fulfilled, (state, action: PayloadAction<COMMENT>)=>{
                    state.isLoading = false;
                    const pindex = state.data.findIndex((post)=> post._id === action.payload.postID);
                    const cIndex = state.data[pindex].comments.findIndex((com)=> com._id === action.payload._id);
                    state.data[pindex].comments[cIndex].text = action.payload.text;
                    state.error = "";
                    return state;
                })
                .addCase(delteCommentRTK.fulfilled, (state, action: PayloadAction<COMMENT>)=>{
                    state.isLoading = false;   
                    const pindex = state.data.findIndex((post)=> post._id === action.payload.postID);
                    state.data[pindex].comments = state.data[pindex].comments.filter((com)=> com._id !== action.payload._id);
                    state.error = "";
                    return state;
                })

                
    }
})
export const { reciveAppPosts } = postsSlice.actions;
export default postsSlice.reducer;