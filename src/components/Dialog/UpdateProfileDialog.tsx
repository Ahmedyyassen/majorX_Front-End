import { FormEvent, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CiCamera } from "react-icons/ci";
import { USERS } from "@/models/usermodel";
import { Input } from "../ui/input";
import { imageTo64Base } from "@/utils/base64";
import { useAppDispatch } from "@/hooks/useApp";
import { Button } from "../ui/button";
import { updateUserProfile } from "@/store/Api/userProfileApi";


type Props = {
    isOpen: boolean;
    setShowDialog: (e: boolean) => void;
    user: USERS
}
const UpdateProfileDialog = ({ isOpen, setShowDialog, user }: Props) => {

    const [image, setImage] = useState<File | undefined>(undefined);
    const [userData, setUserData] = useState({username:user.username, bio:user.bio, image:""});
    const dispatch = useAppDispatch();

    const handleImage = async(e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e?.target.files) {
            const imageBase64 = await imageTo64Base(e.target.files[0]);
            setUserData((prev)=> ({...prev, image: imageBase64}));
            setImage(e.target.files[0]);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append("avatar", image);
        }
        if (userData.username !== user.username) {
            formData.append("username", userData.username);
        }
        if (userData.bio !== user.bio) {
            formData.append("bio", userData.bio!);
        }
        dispatch(updateUserProfile({id: user._id, data: formData}))

        setShowDialog(false);
    }

    const activeButton = () => {
        if (userData.username===user.username && userData.bio===user.bio && !userData.image) {
            return true;           
        }else{
            return false
        }
      }
  return (
    <div>
        <Dialog open={isOpen} onOpenChange={()=> setShowDialog(false)} >
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>
                    Update Profile
                    </DialogTitle>
                </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">

                <div className="flex justify-center p-4">
                  <span className="relative">
                    <img src={ userData.image || user.profilePhoto.url } className="w-64 h-64 rounded-full object-cover" />
                    <CiCamera className="text-4xl bg-white rounded-full text-black p-1 z-10  absolute right-0 bottom-2" />
                    <input
                      type="file"
                      onChange={handleImage}
                      className="w-full h-full absolute top-0 rounded-full opacity-0 hover:opacity-15 bg-gray-900 transition-all cursor-pointer"
                    />
                  </span>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="username"
                    value={userData.username}
                    type="text"
                    onChange={(e) => setUserData((prev) => ({ ...prev, username: e.target.value }))}
                    className="col-span-3"/>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="name"
                    value={userData.bio}
                    type="text"
                    onChange={(e) => setUserData((prev) => ({ ...prev, bio: e.target.value }))}
                    className="col-span-3" />
                </div>

               </div>
                <DialogFooter>
                    <Button className="cursor-pointer" type="submit" disabled={activeButton()} >update</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateProfileDialog;