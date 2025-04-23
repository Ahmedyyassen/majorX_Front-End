import { POST } from "@/models/usermodel"
import { FaHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { useNavigate } from "react-router-dom";
import PostMenu from "@/components/menu/PostMenu";
import { useState } from "react";
import CommentsDialog from "@/components/Dialog/CommentsDialog";
import { likePostRTK } from "@/store/Api/postsApi";
import { followUser } from "@/store/Api/userProfileApi";


type Props={
    post: POST,
}
const Tweet = ({post}: Props) => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector((state)=> state.auth).data;
  const navigate = useNavigate();

  const [scroll, setScroll] = useState<boolean>(false);


  const [openMenu, setOpenMenu ] = useState<boolean>(false);


  const likePost = ()=>{
    dispatch(likePostRTK( {postID: post._id} ));
  }  

  const followingUser = ()=>{
    dispatch(followUser({id: post.user._id}))
  } 

  function isFollow(){
    if (post.user.followers) {
      const exist = post.user.followers.find((u)=> u === userID);
      return Boolean(exist);
    }
  }  
  
  return (
   <>
    <div className="brd cursor-pointer">

{/*  post user detailes  */}
<section className="flex justify-between items-center">
{post.user._id &&      
    <div className="flex p-4 pb-0">
      <img onClick={()=> navigate(`/main/profile/${post.user._id}`)} src={post?.user?.profilePhoto?.url} className="rounded-full w-10 h-10 xl:w-14 xl:h-14 object-cover"  />
      <div className="ml-2 flex shrink-0 items-center font-medium   ">
         <article className="flex flex-col md:block">
         <span className="text-sm md:text-md">{post.user?.username}</span>
          <span className="ml-1 text-xs md:text-sm leading-5 text-gray-400">
              @{String(post.user?.email).substring(0,15)}
              </span>
         </article>
             {userID !== post.user._id &&  
             <span onClick={followingUser}
             style={{color: !isFollow() ? "#ffffff" : "", borderColor: !isFollow() ? "oklch(0.707 0.165 254.624)" : "", 
              backgroundColor : !isFollow()? "oklch(0.707 0.165 254.624)": "" }}
               className="ml-1 xl:ml-4 py-1 px-2 md:px-3 font-bold text-xs rounded-full transition border-2 border-blue-400 text-blue-400">
                { isFollow() ? "Following" : "Follow" }
                </span>}
          </div>
      </div>
  }
  <span className="mr-4">
    <PostMenu openMenu={openMenu} setOpenMenu={setOpenMenu} post={post} key={post._id} />
  </span>
</section>

        {/*    ******* post **********  */}
  <div className="pl-8 pr-4 xl:pl-16 relative mt-2">
        {/*    ******* post title**********  */}
      <p className="w-full text-sm md:text-md font-medium py-1 ">
              {post.decsription}
            <a href="#" className="text-blue-400"> #mistakes</a>
            </p>
        {/*    ******* post photo**********  */}
            {post.image?.public_id !== null && <img src={post.image?.url} alt={post.user.username} 
              className="rounded-2xl my-3 mr-2 border w-full object-cover object-center h-64 md:h-128 border-gray-600"/> }

          <div className="flex justify-between w-full my-4">

              <div  onClick={likePost} className="postIcon hover:text-red-400">
              <FaHeart className="mr-2 text-lg" style={{color: post.likes.includes(userID) ? "oklch(0.704 0.191 22.216)" :""}} />
              {post.likes.length}
              </div>

              <div onClick={()=> setScroll(true)} className="postIcon hover:text-blue-400 dark:hover:text-blue-400">
                  <FaComment className=" mr-2 text-lg"></FaComment>
                  <span>{ post.comments?.length }</span>
              </div>

              <div className="postIcon hover:text-green-400 dark:hover:text-green-400">
              <FaRetweet className="mr-2 text-lg"/>
                  <span>14 k</span>
              </div>
              <div title="share link" className="postIcon hover:text-blue-400 dark:hover:text-blue-400">
                  <FaShare className=" mr-2 text-lg" />
               </div>
          </div>
  </div>
</div>
  {scroll && <CommentsDialog postID={post._id} comments={post.comments} scroll={scroll} setScroll={setScroll} />}
   </>
  )
}

export default Tweet