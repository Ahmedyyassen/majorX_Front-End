import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { POST } from "@/models/usermodel"
import { FormEvent, useState } from "react"
import { imageTo64Base } from "@/utils/base64"
// import { useAppDispatch } from "@/hooks/useApp"

type Props={
    post: POST;
    open: boolean;
    setOpen: (e: boolean)=> void;
}
const EditPostDialog = ({post, open, setOpen}:Props) => {
    const [editPost, setEditPost] = useState({decsription: post.decsription, image: ""});
    const [imageFile, setImageFile] = useState<File | undefined>(undefined)

    // const dispatch = useAppDispatch();

   async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const image64 = await imageTo64Base(e.target.files[0]);
            setEditPost((prev)=> ({...prev, image: image64}));
            setImageFile(e.target.files[0]);
        }
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setEditPost((prev)=> ({...prev, decsription: e.target.value}));
    }
    const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData();
        if (imageFile) {
            formData.append("post", imageFile);
        }
        if (editPost.decsription) {
            formData.append("decsription", editPost.decsription);
        }
        // dispatch();
    }
  return (
    <div>
        <Dialog open={open} onOpenChange={()=> setOpen(false)}>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>
                    Edit Post
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center" >
                    {post.image?.public_id && 
                    <div className="relative w-112  h-96">
                    <img src={ editPost.image || post.image?.url} alt={post.decsription} className="w-full h-full object-cover rounded-2xl" />
                    <input type="file" onChange={handleImage} className="absolute w-full h-full top-0 opacity-10" />
                    </div>}
                    <Input placeholder="Post Context" 
                    value={editPost.decsription}
                    onChange={handleChange}
                    />
                    <DialogFooter className="self-end">
                        <Button type="submit" disabled={editPost.decsription === post.decsription && editPost.image ===""} >Confirm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default EditPostDialog;