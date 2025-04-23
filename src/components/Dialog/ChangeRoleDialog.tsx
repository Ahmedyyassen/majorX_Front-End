import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/useApp";
import { updateUserProfile } from "@/store/Api/userProfileApi";
import { updateRole } from "@/pages/Admin/RTK/Slices/UsersSlices";
import { toast } from "sonner";

  type Props={
    isOpen:boolean,
    setOpen:(e:boolean)=> void;
    data: {
      id:string,
      text: string
    }
  }
const ChangeRoleDialog = ({isOpen,setOpen, data}:Props) => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent)=>{
    e.preventDefault();
    const formData = new FormData();
    if (value) {
      formData.append("role", value);
      dispatch(updateUserProfile({id:data.id, data:formData}))
      .then((res)=>{
        if (res.payload.status === "OK") {
          dispatch(updateRole({id:data.id, role:value}));
          setOpen(false);
          return toast.success("Role changed successfully");
        }
      })
    }
  }
  return (
    <div>
        <Dialog open={isOpen} onOpenChange={()=> setOpen(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Change Role
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <article className="flex justify-center">
                  <Select onValueChange={(e)=> setValue(e)}>
                    <SelectTrigger className="w-[250px]" >
                        <SelectValue placeholder="Select a Role"  />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="MANGER">Manger</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                  </article>
                <DialogFooter>
                  <Button>
                    Change
                  </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ChangeRoleDialog