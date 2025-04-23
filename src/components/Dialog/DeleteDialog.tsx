import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
 
import { useAppDispatch } from "@/hooks/useApp"
import { deleteUserANALY } from "@/pages/Admin/RTK/Slices/UsersSlices";
import { delteCommentRTK } from "@/store/Api/commentApi";
import { deletePostRTK } from "@/store/Api/postsApi";
import { deleteUserProfile } from "@/store/Api/userProfileApi";
import { deleteProfileAuth } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

type Props={
  isOpen: boolean;
  setShowDialog: (e: boolean) => void;
  value: {
    text: string,
    id: string,
    admin?:boolean
  },
  mode: "comment" | "profile" | "post"
}

const DeleteDialog = ({isOpen, value, setShowDialog, mode}: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onClose = () => {
    setShowDialog(false);
    }
  
    const handleDelete = ()=>{
      if (mode === "comment") {
      dispatch(delteCommentRTK({id: value.id}));
      }else if (mode === "profile") {
        dispatch(deleteUserProfile({id: value.id}))
        .then((res)=>{          
          if (res.payload.status === "OK") {
            if (!value.admin) {
              dispatch(deleteProfileAuth());
              return navigate("/");
            }else{
              dispatch(deleteUserANALY({id:value.id}));
            }
          }
        })}
        else if(mode === "post"){
          dispatch(deletePostRTK({postID: value.id}))
        }
      onClose();
    }
    
    return (
      <div>      
    <AlertDialog open={isOpen} onOpenChange={onClose} >
      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this {mode}?</AlertDialogTitle>
          <AlertDialogDescription>
          "{value.text}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer bg-red-400">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </div>
    )
}

export default DeleteDialog