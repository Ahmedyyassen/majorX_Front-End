import { useCallback, useRef, useState } from "react"
import useAppScroll from "@/hooks/useAppScroll"
import { useAppSelector } from "@/hooks/useApp"
import Spinner from "@/components/Spinner"
import Header from "@/components/Header"
import Post from "@/components/Post"
import Tweet from "@/components/Tweet"


const Home = () => {
  const [page, setPage] = useState(1);

  const { loading, hasMore, error} = useAppScroll(4, page);
  const postsData = useAppSelector((state)=> state.posts);
  
  const observer = useRef<IntersectionObserver| null>(null);

  const lastElemRef = useCallback((node: HTMLDivElement|null)=>{
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting && hasMore){
        setPage((prev)=> (prev+1));        
      }
    })
    if(node) observer.current.observe(node);
  },[loading, hasMore]);

    
  return (
    <div className="w-full h-screen overflow-auto ">
        <Header />
        <Post />
        { postsData.data.map( (post, index)=>{
          if (postsData.data.length === index+1) {
            return <div key={post._id+index} ref={lastElemRef}><Tweet  post={post}  /></div>
          }else{
            return <div key={post._id+index} > <Tweet post={post}  /></div>
          }
        })}
       
        {loading &&  <Spinner />}
        <div>{error && "Error"}</div>
    </div>
  )
}

export default Home;