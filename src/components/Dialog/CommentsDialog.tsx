import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { COMMENT } from "@/models/commentModel";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { useState } from "react";
import Comment from "../Comments";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createCommentRTK } from "@/store/Api/commentApi";

type Props={
  comments: COMMENT[],
  scroll: boolean,
  setScroll: (e:boolean)=> void;
  postID:string
}
export default function CommentsDialog ({comments, postID, scroll, setScroll}:Props){
    const userID = useAppSelector((state)=> state.auth).data;
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState("")

    const createComment = ()=>{
      dispatch(createCommentRTK({id: postID.toString(), text:comment}))
      .then(()=>{
        setComment("")
      })
    }

   
      
  return (
     <Sheet open={scroll} onOpenChange={()=> setScroll(false)} key={"bottom"} >
        <SheetContent className="border-transparent mx-auto w-[500px] transition-all sm:w-[750px] rounded-2xl p-4 pb-6" aria-describedby={undefined} side="bottom">
          <SheetHeader>
            <SheetTitle>Post Comments</SheetTitle>
            </SheetHeader>
                  <section  className=" space-y-4 w-full">
                    <div style={{height: comments.length > 5? "380px" : "fit-content"}} className="overflow-y-scroll ">
                    {comments.length > 0 ? (
                    comments.map((com)=>(
                      <Comment key={com._id} comment={com} userID={userID} />
                    ))) : <span className="text-center block">There is no any comments</span>}

                    </div>
                    <div className="flex gap-3 items-center">
                    <Input type="text"
                    id="comment"
                    name="comment"
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    placeholder="Write your comment"
                    className="w-full h-11 rounded-full" />
                    <Button className="rounded-full cursor-pointer" size={"lg"} onClick={createComment}>Create</Button>
                    </div>
                    </section>   
        </SheetContent>
    </Sheet>
  )
}