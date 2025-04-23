import { apiClient } from "@/lib/api-client";
import { LIKE_POST_ROUTE, POSTS_ROUTES } from "@/utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

type ID={
    postID:string
}

type Update={
    postID:string;
    data: FormData
}

export const getAllPosts = createAsyncThunk("postsSlice/getAllPosts", async()=>{
    const res = await apiClient.get(POSTS_ROUTES);
    return await res.data.data.post;
})


export const createPostRTK = createAsyncThunk("postsSlice/createPostRTK", async({data}: {data:FormData})=>{
    const res = await apiClient.post(POSTS_ROUTES, data)       
    return await res.data.data.post;
})

export const likePostRTK = createAsyncThunk("postsSlice/likePostRTK", async({postID}: ID)=>{    
    const res = await apiClient.put(`${LIKE_POST_ROUTE}/${postID}`)       
    return await res.data.data.post;
});

export const updatePostRTK = createAsyncThunk("postsSlice/updatePostRTK", async({postID,data}: Update)=>{
    const res = await apiClient.post(`${POSTS_ROUTES}/${postID}`, data)       
    return await res.data;
})
export const deletePostRTK = createAsyncThunk("postsSlice/deletePostRTK", async({postID}: ID)=>{
    const res = await apiClient.delete(`${POSTS_ROUTES}/${postID}`)       
    return await res.data;
})

