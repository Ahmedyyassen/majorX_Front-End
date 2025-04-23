import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { apiClient } from "@/lib/api-client"
import { SIGNUP_ROUTE } from "@/utils/constants"
import { useActionState } from "react"
import { toast } from "sonner"


type Props={
    isOpen: boolean,
    setOpen: (e: boolean)=> void;
    openOTP:(e:boolean)=> void;
    setEmail: (e:string)=> void;
    setModeOTP: (e:string)=> void;
}
const DialogRegister = ({isOpen,setOpen, openOTP, setEmail, setModeOTP}:Props) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_data ,action, pending] = useActionState(handleSubmit, undefined)

    async function handleSubmit(_prevState:unknown, formData:FormData){

      const username = String(formData.get("username"));
      const email =    String(formData.get("email"));
      const password = String(formData.get("password"));
      const cPassword =String(formData.get("cPassword"));

         if (!username&&!email&&!password&&!cPassword) {
            return toast.error("All fields are required");
              }
              if (password.trim()) {
                if (password.trim() !== cPassword.trim())
                return toast.error("Passwords do not match");
              }
              
              const res = await apiClient.post(SIGNUP_ROUTE, {username,email,password})
                .then((res) => {
                  if (res.data.status === "Created") {
                    toast.success("Success", res.data.message);
                    setEmail(email);
                    setOpen(false);
                    openOTP(true);
                    setModeOTP("account");
                    return res.data
                  }
                })
                .catch((err) => {          
                  return toast.error(String(err.response?.data.message).replace('"', "").replace('"', ""))
                })
                return res;
    }    
  return (
    <>
     <Dialog open={isOpen} onOpenChange={()=> setOpen(false)}>
    <DialogContent className="w-[600px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>Register Account</DialogTitle>
      </DialogHeader>

      <form action={action}>
            <div className="grid gap-5 py-4">

            <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="col-span-4 h-11 rounded-2xl p-4"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="col-span-4 h-11 rounded-2xl p-4"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="col-span-4 h-11 rounded-2xl p-4"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="cPassword"
                    type="password"
                    name="cPassword"
                    placeholder="Confirm Password"
                    className="col-span-4 h-11 rounded-2xl p-4"
                  />
                </div>
             </div>
             <DialogFooter>
              <Button className="rounded-full" size={"lg"} disabled={pending}>{pending? "...Loading": "Register"}</Button>
             </DialogFooter>
             </form>
      </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogRegister;