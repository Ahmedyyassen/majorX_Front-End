import { COMMENT } from "@/models/commentModel"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CommentDialog from "./Dialog/CommentDialog";
import { useState } from "react";
import DeleteDialog from "./Dialog/DeleteDialog";

type Prop={
    comment: COMMENT,
    userID: string
}
const Comment = ({comment, userID}: Prop) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showDelDialog, setDelShowDialog] = useState<boolean>(false);


  return (
    <>
    <section key={comment._id} className="flex gap-6 p-2 border-y border-gray-300 dark:border-gray-700 items-center">
        <img src={comment.user.profilePhoto.url} className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full">
          <article>
            <h1 className="font-bold mb-1">{comment.username}</h1>
            <p>{comment.text}</p>
            </article>

        {comment.user._id === userID &&  
        <div className="self-end flex gap-3">
            <span className="hover:text-green-400 transition-all" onClick={()=> setShowDialog((p)=> !p)}><FaRegEdit/></span>
            <span className="hover:text-red-400 transition-all" onClick={()=> setDelShowDialog((p)=> !p)}><MdDeleteForever/></span>
          </div>}

        </div>
    </section>
    <CommentDialog value={{text: comment.text, id: comment._id}} setShowDialog={setShowDialog} isOpen={showDialog} />
    <DeleteDialog  mode="comment" value={{text: comment.text, id: comment._id}} isOpen={showDelDialog} setShowDialog={setDelShowDialog} />
    </>
  )
}


export default Comment;