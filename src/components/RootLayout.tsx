import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"
import RightLayout from "./RightLayout"
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { useEffect } from "react";
import { getUserProfile } from "@/store/Api/userProfileApi";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector((state)=> state.auth);  
  useEffect(()=>{
    dispatch(getUserProfile({id:data}));
  },[data,dispatch])

  return (
    <>
        <div className=" bg-white dark:bg-black">
        <div className="container mx-auto flex h-screen xl:max-w-[1200]">
        <SideBar />

        <main className="w-[calc(100%-56px)] xl:w-1/2">
          <Outlet />
        </main>

        <RightLayout />
      </div>
        </div>
    </>
  )
}

export default RootLayout