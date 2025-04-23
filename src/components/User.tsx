import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { IoIosMore } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUserLogout } from "@/store/slices/userProfileSlice";
import { logoutUserRTK } from "@/store/Api/authApi";

const User= () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openDrop, setOpen] = useState<boolean>(false);
  const user = useAppSelector((state)=>state.user);

const logOut= ()=>{
    dispatch(logoutUserRTK())
      navigate("/", {replace: true});
      dispatch(clearUserLogout())
    }

  return (
    <>
             <div className="user relative border xl:border-none" onClick={()=> setOpen(true)}>
              <div  className="absolute w-full h-full top-0 left-0 rounded-full hover:bg-gray-400 hover:opacity-20 z-1"></div>
                <img src={user.data?.profilePhoto?.url} className="w-10 h-10 xl:w-12 xl:h-12 rounded-full" /> 
                 <div className="hidden xl:flex flex-col ml-4">
                   <h4 className='text-gray-800 dark:text-white font-bold text-sm'>{user.data?.username}</h4>
                   <p className='text-gray-400 text-sm'>@{user.data?.username}1234</p>
                 </div>
            <DropdownMenu open={openDrop} onOpenChange={()=> setOpen(false)}>
              <DropdownMenuTrigger asChild>
                        <IoIosMore  className="text-2xl
                            xl:ml-4 text-gray-800 dark:text-white"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-transparent">
                {user.data.role === "ADMIN" && 
                  <DropdownMenuItem onClick={()=> navigate("/dashboard")}>
                  Dash board
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>}
                <DropdownMenuItem onClick={logOut}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              
             </div>
          
    </>
  )
}

export default User