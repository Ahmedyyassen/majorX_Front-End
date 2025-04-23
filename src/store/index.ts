import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import PostsSlice from "./slices/postsSlice";
import userProfileSlice from "./slices/userProfileSlice";
import ClientSlice from "./slices/clientSlice";
import AllUsersSlice from "../pages/Admin/RTK/Slices/UsersSlices";
import CategorySlice from "../pages/Admin/RTK/Slices/CategorySlices";
import CommentsSlice from "../pages/Admin/RTK/Slices/commentSlice";



export const store = configureStore({
    reducer:{
        auth: authReducer,
        posts: PostsSlice,
        user: userProfileSlice,
        client:ClientSlice,
        allUsers:AllUsersSlice,
        category: CategorySlice,
        comments: CommentsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;