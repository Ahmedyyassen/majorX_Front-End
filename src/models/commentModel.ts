import {  USERS } from "./usermodel";

export interface COMMENT{
    postID: string,
    text: string,
    user: USERS ,
    username: string,
    _id: string,
    createdAt: Date,
    updatedAt: Date,
}