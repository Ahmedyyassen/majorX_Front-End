import { NavLink, NavLinkRenderProps } from "react-router-dom"
import Logo from "./Logo"
import User from "./User";
import { IoHomeSharp } from "react-icons/io5";
import { FaFeather, FaHashtag } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useAppSelector } from "@/hooks/useApp";
import { Button } from "./ui/button";




const SideBar = () => {
        const navigateStyle = ({ isActive }: NavLinkRenderProps)=>{
          return{
            color : isActive ? 'oklch(0.707 0.165 254.624)' : ''
          }
        }
    const user = useAppSelector((state)=> state.auth);
  return (
    <aside className="w-14 h-full flex flex-col xl:w-1/5 xl:pr-4">
    <Logo width={25} />
  <nav className="mt-5 ">
       <NavLink  style={navigateStyle} to={ "home"} className="link items-center mb-8"  >
        <IoHomeSharp className="text-2xl" />
        <span className="hidden font-bold xl:block xl:ml-4">Home</span>
        </NavLink>  

        <NavLink  style={navigateStyle} to={ "/gg" } className="link items-center mb-8"  >
        <FaHashtag className="text-2xl" />
        <span className="hidden font-bold xl:block xl:ml-4">New</span>
        </NavLink>  

        <NavLink  style={navigateStyle} to={ "/das" } className="link items-center mb-8"  >
        <IoIosNotifications className="text-2xl" />
        <span className="hidden font-bold xl:block xl:ml-4">Notifications</span>
        </NavLink>  

        <NavLink  style={navigateStyle} to={ "/asja" } className="link items-center mb-8"  >
        <FaEnvelope className="text-2xl" />
        <span className="hidden font-bold xl:block xl:ml-4">Messages</span>
        </NavLink>  

        <NavLink  style={navigateStyle} to={ "/asdjad" } className="link items-center mb-8"  >
        <FaBookmark className="text-2xl" />
        <span className="hidden font-bold xl:block xl:ml-4">Bookmark</span>
        </NavLink>  

        <NavLink  style={navigateStyle} to={ `profile/${user.data}` } className="link items-center mb-8"  >
        <FaUser className="text-2xl" />
        <span className="hidden font-bold xl:block xl:ml-4">Profile</span>
        </NavLink>  


        <NavLink  style={navigateStyle} to={ "/wqw" } className="link items-center mb-8"  >
        <IoIosMore className="text-2xl" />
        <span className="hidden font-bold xl:block xl:ml-4">More</span>
        </NavLink>  
  </nav>
      <Button className="w-10 h-10 xl:w-full  xl:h-10 text-lg rounded-full bg-blue-400 dark:bg-blue-400 dark:text-white dark:hover:text-black cursor-pointer">
        <span className="hidden xl:block">Tweet</span>
        <FaFeather className="xl:hidden" />
        </Button>
      <User />
</aside>
  )
}

export default SideBar
