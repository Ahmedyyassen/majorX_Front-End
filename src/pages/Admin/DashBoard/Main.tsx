import { FaRegUser } from "react-icons/fa";
import { BsFillFilePostFill } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useApp";
import { getCategoryRTK } from "../RTK/Api/categotyApiCall";
import { apiClient } from "@/lib/api-client";
import { COMMENTS_COUNT_ROUTE, POST_COUNT_ROUTE, USER_COUNT_ROUTE } from "@/utils/constants";
import BarChartComp from "@/components/admin/BarChartComp";

const MainDash = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [postCount, setPostCount] = useState<number>(0);
  const [commentCount, setcommentsCount] = useState<number>(0);

  const dispatch = useAppDispatch();

      useEffect(()=>{
        const getCount = async()=>{
          const resUser = await apiClient.get(USER_COUNT_ROUTE);
          const resPost = await apiClient.get(POST_COUNT_ROUTE);
          const resComments = await apiClient.get(COMMENTS_COUNT_ROUTE);
          setUserCount(resUser.data.data.count);   
          setPostCount(resPost.data.data.count);
          setcommentsCount(resComments.data.data.count);
        }
        getCount();
        dispatch(getCategoryRTK())  
      },[dispatch])

      // const addCategory =()=>{       
      //   dispatch(createCategory({data: categoryName}));
      //   setCategoryName("");
      // }
      
  return (
    <>
        <div className="w-full p-2 xl:p-4 grid grid-cols-1 gap-4 xl:gap-8 md:grid-cols-2 xl:grid-cols-4">
      <div className="p-3 rounded-xl border border-gray-300 space-y-4">
        <h1 className="font-bold text-2xl">Users</h1>
        <span className="font-bold text-lg text-gray-500">{userCount}</span>
        <div className="flex justify-between items-center p-2">
          <Link to={"users"} className="py-1 px-4 cursor-pointer font-semibold text-sm rounded-2xl text-white bg-blue-400">See all users</Link>
          <span className="text-2xl text-blue-400"><FaRegUser/></span>
        </div>
      </div>
      <div className="p-3 rounded-xl border border-gray-300 space-y-4">
        <h1 className="font-bold text-2xl">Posts</h1>
        <span className="font-bold text-lg text-gray-500">{postCount}</span>
        <div className="flex justify-between items-center p-2">
          <Link to={"posts"} className="py-1 px-4 cursor-pointer font-semibold text-sm rounded-2xl text-white bg-blue-400">See all posts</Link>
          <span className="text-2xl text-blue-400"><BsFillFilePostFill/></span>
        </div>
      </div>
      <div className="p-3 rounded-xl border border-gray-300 space-y-4">
        <h1 className="font-bold text-2xl ">Comments</h1>
        <span className="font-bold text-lg text-gray-500">{commentCount}</span>
        <div className="flex justify-between items-center p-2">
          <Link to={"comments"} className="py-1 px-4 cursor-pointer font-semibold text-sm rounded-2xl text-white bg-blue-400">See all comments</Link>
          <span className="text-2xl text-blue-400"><TfiCommentAlt/></span>
        </div>
      </div>
      <div className="p-3 rounded-xl border border-gray-300 space-y-4">
        <h1 className="font-bold text-2xl ">Categories</h1>
        <span className="font-bold text-lg text-gray-500">{1}</span>
        <div className="flex justify-between items-center p-2">
          <Link to={""} className="py-1 px-4 cursor-pointer font-semibold text-sm rounded-2xl text-white bg-blue-400">See all categories</Link>
          <span className="text-2xl text-blue-400"><TfiCommentAlt/></span>
        </div>
      </div>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-8 p-8">
           {/* <Input placeholder="Add Category" value={categoryName} onChange={(e)=> setCategoryName(e.target.value)} style={{width: "350px", fontSize: "1.2rem"}}  />
           <Button onClick={addCategory}>Add</Button> */}
          
           <BarChartComp  />
           <BarChartComp />
      </div>
    </>
  )
}

export default MainDash