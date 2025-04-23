import { IoIosMore } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppSelector } from "@/hooks/useApp";
import { POST } from "@/models/usermodel";
import EditPostDialog from "../Dialog/EditPostDialog";
import { useState } from "react";
import DeleteDialog from "../Dialog/DeleteDialog";

type Props={
    openMenu: boolean;
    setOpenMenu: (e: boolean)=> void;
    post: POST
}
const PostMenu = ({openMenu, setOpenMenu, post}: Props) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDel, setOpenDel] = useState(false);


  const localID = useAppSelector((state)=>state.auth).data;
  const profileID = useAppSelector((state)=> state.user).data._id;

  function showMenu(){
        if (post.user._id === localID) {
            return true;
        }else if(profileID === localID){
            return true;
        }else{
            return false;
        }
  }

  return (
    <div>
            <DropdownMenu open={openMenu} onOpenChange={()=> setOpenMenu(false)}>
              <DropdownMenuTrigger asChild>
                        <IoIosMore onClick={()=> setOpenMenu(true)} className="text-xl
                            xl:ml-4"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                { showMenu() &&
                <>
                <DropdownMenuItem onClick={()=> setOpenEdit(true)}>
                  Edit Post
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=> setOpenDel(true)}>
                  Delete Post
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
                </>
                }
                <DropdownMenuItem>
                  Share Post
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> 
              {openEdit && <EditPostDialog post={post} open={openEdit} setOpen={setOpenEdit}  />   }
              {openDel &&  <DeleteDialog isOpen={openDel} setShowDialog={setOpenDel} mode="post" value={{id: post._id, text: post.decsription}}  /> }
    </div>
  )
}

export default PostMenu