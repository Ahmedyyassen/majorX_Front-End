import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/hooks/useApp"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import UpdateProfileDialog from "@/components/Dialog/UpdateProfileDialog";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import { clearClient } from "@/store/slices/clientSlice";
import { followUser, getClientProfile } from "@/store/Api/userProfileApi";
import Tweet from "@/components/Tweet";

const Profile = () => {

  const user = useAppSelector((state)=> state.user);
  const userID = useAppSelector((state)=> state.auth).data;
  const dispatch = useAppDispatch();
  const { id } = useParams();

    const [open, setOpen] = useState<boolean>(false);
    const [showDelDialog, setDelShowDialog] = useState<boolean>(false);


    useEffect(()=>{
      dispatch(getClientProfile({id: String(id)}));
      return()=>{
        dispatch(clearClient());
      }
    },[id,dispatch]);

      const followingUser = ()=>{
        dispatch(followUser({id: String(id)}))
      } 

      function isFollow(){
        if (user.data.followers) {
          const exist = user.data.followers.find((u)=> u === userID);
          return Boolean(exist);
        }
      } 
    
  return (
    <div className="w-full h-screen overflow-auto border ">
      <header className=" sticky top-0 px-8 py-1 z-20 bg-white dark:bg-black">
        <h1 className="text-xl font-bold">{user.data.username}</h1>
        <p className="text-sm text-gray-500">{user.data.posts?.length} posts</p>
      </header>
      <section className="border-b">
          <div className="h-46 md:h-65 bg-gray-500"></div>
          <main className="p-6 relative flex justify-between">
            <div>
              <div className="p-1 bg-white dark:bg-black rounded-full w-28 h-28 md:h-40 md:w-40 overflow-hidden absolute -top-20 left-4 md:left-8">
               { !user.isLoading ?  <img src={user.data.profilePhoto?.url} className="w-full h-full object-cover rounded-full" />
               : <Skeleton className="w-full h-full object-cover rounded-full bg-gray-400" /> }
              </div>  
                <article className="mt-14 md:mt-18 space-y-2">
                  <div className=" flex items-center">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">{user.data.username}</h2>
                  { !user.isLoading && user.data._id !== userID &&
                   <span onClick={followingUser}
                   style={{color: isFollow() ? "#ffffff" : "", borderColor: isFollow() ? "#ffffff" : "" }}
                     className="ml-8 py-1 px-3 font-bold text-xs rounded-full cursor-pointer transition border-2 border-blue-400 text-blue-400">
                      { isFollow() ? "Following" : "Follow" }
                      </span>}
                  </div>
                  <article>
                  <p className="text-md text-gray-500">@{user.data.username}</p>
                  <p className="text-md text-gray-500">Joined at { new Date(user.data.createdAt).toDateString()}</p>
                  </article>
                  <div className="flex gap-8">
                    <span ><strong>{user.data.following?.length } </strong><span className="text-md text-gray-500">Follwoing</span></span>
                    <span ><strong>{user.data.followers?.length } </strong><span className="text-md text-gray-500">Follwers</span></span>
                  </div>
                </article>
            </div>
          { user.data._id === userID  && 
          <span className="flex gap-1 md:gap-4">
          <Button onClick={()=> setOpen(true)} className="text-[12px] font-semibold w-18 md:w-25 rounded-full cursor-pointer" variant={"outline"} >Edit profile</Button>
          <Button onClick={()=> setDelShowDialog(true)} className="text-[12px] font-semibold w-18 md:w-25 rounded-full cursor-pointer  " variant={"destructive"} >Delete profile</Button>
          </span>
           }
          </main>
          {!user.isLoading && user.data._id === userID && <UpdateProfileDialog  isOpen={open} setShowDialog={setOpen} user={user.data} />   }
          {!user.isLoading && user.data._id === userID && 
          <DeleteDialog mode="profile" isOpen={showDelDialog} setShowDialog={setDelShowDialog} value={{id:userID, text:user.data.username}}  />}
            </section>
      <section>
        {user.data.posts && user.data.posts.map((post)=>(
          <Tweet key={post._id} post={post}  />
        ))}
      </section>
    </div>
  )
}

export default Profile;
