import { apiClient } from "@/lib/api-client";
import { COMMENT } from "@/models/commentModel";
import { COMMENTS_ROUTE } from "@/utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

type Prop={
    id: string,
    text: string
}
type ID={
    id: string
}

export const getAllComments = createAsyncThunk("CommentSlice/getComments", async()=>{
    const res = await apiClient.get(COMMENTS_ROUTE);    
    return await res.data.data.comments
})

export const createCommentRTK = createAsyncThunk("commentSlice/createCommentRTK", async({id, text}: Prop)=>{
    const res = await apiClient.post(COMMENTS_ROUTE, { postID: id, text } );    
    return await res.data.data.comment;
})

export const updateCommentRTK = createAsyncThunk("commentSlice/updateCommentRTK", async({id, text}: Prop)=>{    
    const res = await apiClient.put(`${COMMENTS_ROUTE}/${id}`, { text } );
    return await res.data.data.comment as COMMENT;
})

export const delteCommentRTK = createAsyncThunk("commentSlice/delteCommentRTK", async({id}: ID)=>{
    const res = await apiClient.delete(`${COMMENTS_ROUTE}/${id}` );
    return  await res.data.data.comment as COMMENT;
})


