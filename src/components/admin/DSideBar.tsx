import { Link, NavLink, NavLinkRenderProps } from "react-router-dom"
import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BsFillFilePostFill } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { GiReturnArrow } from "react-icons/gi";
import { TbCategory2 } from "react-icons/tb";
import { useAppDispatch } from "@/hooks/useApp";
import { clearUsers } from "@/pages/Admin/RTK/Slices/UsersSlices";
import { clrearCategories } from "@/pages/Admin/RTK/Slices/CategorySlices";



const DSideBar = () => {
    const dispatch = useAppDispatch();

    const clearDashStates = ()=>{
        dispatch(clrearCategories());
        dispatch(clearUsers());
    }

    const navigateLink = ( {isActive} : NavLinkRenderProps)=>{
        return{
            backgroundColor: isActive? "oklch(0.882 0.059 254.128)" : "" ,
            color: isActive? "#000000" : ""
        }
    }
  return (
    <div className="fixed top-0 bottom-0 w-16 xl:w-75 border-r border-gray-300">
        <div className="px-2 py-8 xl:px-8 h-full ">
        <Link to={"/dashboard"} title="main" className="flex items-center justify-center gap-2 text-2xl font-bold"><MdDashboard className="text-blue-400 text-3xl"/> <span className="hidden xl:block">Dashboard</span></Link>
        <div className="py-8 flex flex-col space-y-6 h-full ">
            <NavLink style={navigateLink} title="users" to={"users"}         className="flex items-center justify-center xl:justify-start text-xl gap-2 xl:p-2 hover:bg-blue-200 transition-all rounded-full px-2 py-3"> <FaRegUser /> <span className="hidden xl:block">Users</span> </NavLink>
            <NavLink style={navigateLink} title="posts" to={"posts"}         className="flex items-center justify-center xl:justify-start text-xl gap-2 xl:p-2 hover:bg-blue-200 transition-all rounded-full px-2 py-3"> <BsFillFilePostFill/> <span className="hidden xl:block">Posts</span> </NavLink>
            <NavLink style={navigateLink} title="comments" to={"comments"}   className="flex items-center justify-center xl:justify-start text-xl gap-2 xl:p-2 hover:bg-blue-200 transition-all rounded-full px-2 py-3"> <TfiCommentAlt/> <span className="hidden xl:block">Comments</span> </NavLink>
            <NavLink style={navigateLink} title="category" to={"category"}   className="flex items-center justify-center xl:justify-start text-xl gap-2 xl:p-2 hover:bg-blue-200 transition-all rounded-full px-2 py-3"> <TbCategory2/> <span className="hidden xl:block">Category</span> </NavLink>
            <NavLink style={navigateLink} onClick={clearDashStates} to={"/"} className="flex items-center justify-center xl:justify-start text-xl gap-2 mt-auto hover:bg-red-200 transition-all rounded-full p-3 xl:p-2"> <GiReturnArrow/> <span className="hidden xl:block">Home</span> </NavLink>
        </div>
        </div>
    </div>
  )
}

export default DSideBar