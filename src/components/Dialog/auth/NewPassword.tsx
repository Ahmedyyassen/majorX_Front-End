import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/hooks/useApp"
import { resetPasswordRTK } from "@/store/Api/authApi"
import { useActionState } from "react"

type Props={
    isOpen: boolean,
    setOpen: (e: boolean)=> void;
    email: string;
    closeOTP: (e: boolean)=> void
}
const NewPassword = ({isOpen, setOpen, email, closeOTP}: Props) => {
    const [, action, pending] = useActionState(handleSubmit, undefined);
    const dispatch = useAppDispatch();

    function handleSubmit (_prevState:unknown, formData:FormData){
        dispatch(resetPasswordRTK({email, password: String(formData.get("password"))}))
        .then((res)=>{
            if (res.payload.status === "OK" && !pending) {
                setOpen(false);
                closeOTP(false);
            }
        })
    }
  return (
    <Dialog open={isOpen} onOpenChange={()=> setOpen(false)} >
    <DialogContent className="w-[500px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>Create New Password</DialogTitle>
      </DialogHeader>

      <form action={action}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4 ">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="New Password"
                    className="col-span-4"
                  />
                </div>
             </div>
             <DialogFooter >
              <Button className="cursor-pointer rounded-full" type="submit" disabled={pending}>{pending?"...Loading":"Confirm"}</Button>
             </DialogFooter>
             </form>
      </DialogContent>
      </Dialog>
  )
}

export default NewPassword