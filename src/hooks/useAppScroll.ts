import { useEffect, useState } from "react"
import axios, { Canceler } from "axios";
import { useAppDispatch } from "./useApp";
import { reciveAppPosts } from "@/store/slices/postsSlice";
import { apiClient } from "@/lib/api-client";
import { POSTS_ROUTES } from "@/utils/constants";

export default function useAppScroll(limit:number, page:number) {

    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(()=>{

        let cancel: Canceler;
        setLoading(true);
        setError(false);

        const getPosts = async()=>{
        await apiClient.get(POSTS_ROUTES,{
            params: {page, limit},
            cancelToken: new axios.CancelToken((c)=> cancel=c)
        }).then((res)=>{
            dispatch(reciveAppPosts(res.data.data.post));
            setHasMore(res.data.data.post.length > 0);            
            setLoading(false);
        }).catch((e)=>{
            if(axios.isCancel(e)) return;
            setError(false)
        })
    }
    getPosts();
    
    return ()=> cancel();
    },[limit,page,dispatch])

  return { loading, hasMore, error}
}
