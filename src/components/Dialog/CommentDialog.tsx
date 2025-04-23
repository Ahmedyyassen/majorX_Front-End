import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormEvent, useState } from "react"
import { useAppDispatch } from "@/hooks/useApp"
import { updateCommentRTK } from "@/store/Api/commentApi"

type Props={
  isOpen: boolean;
  setShowDialog: (e: boolean) => void;
  value: {
    text: string,
    id: string
  };
}
const CommentDialog = ({isOpen, value, setShowDialog}: Props) => {
  const [comment, setComment] = useState(value.text);
  const dispatch = useAppDispatch();
  const onClose = () => {
  setShowDialog(false);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    dispatch(updateCommentRTK({id: value.id, text: comment}));
    onClose();
  }
  
  return (
    <div>
        <Dialog open={isOpen} onOpenChange={onClose} >
          <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Update Comment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Input id="comment" name="comment" placeholder="comment" value={comment} onChange={(e)=> setComment(e.target.value)} />
             <DialogFooter>
              <Button type="submit" className="cursor-pointer mt-4">Update</Button>
            </DialogFooter>
          </form>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default CommentDialog;