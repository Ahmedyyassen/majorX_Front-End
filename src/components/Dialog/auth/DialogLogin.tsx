// import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useActionState, useState } from "react"
import ForgetPasswordDialog from "./ForgetPasswordDialog"
import { useAppDispatch } from "@/hooks/useApp"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { loginUser } from "@/store/Api/authApi"
import { toast } from "sonner"

type Props={
    isOpen: boolean,
    setOpen: (e: boolean)=> void;
    openOTP: (e: boolean)=> void;
    setEmail: (e:string)=> void;
    setModeOTP: (e:string)=> void;
}

const DialogLogin = ({isOpen,setOpen, openOTP, setEmail, setModeOTP}:Props) => {
  const [fPassword, setFPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


    async function handleSubmit (_prevState:unknown, formData:FormData){
        const email = formData.get("email");
        const password = formData.get("password");
        if (!email) {
          return toast.error("Email and password is requird")
        }
        if (!password) {
          return toast.error("Email and password is requird")
        }
       const res = await dispatch(loginUser({email:String(email), password: String(password)}))
        .then((res)=>{
          if (res.payload.data) {            
            setOpen(false);
            toast.success("Welcome "+res.payload.data.user.username, res.payload.message);
            navigate("/main");
            return res.payload;
          }else if(res.payload.status === 'Not Found'){
           return toast.error(res.payload.status, res.payload.message);
          }
          else if(res.payload.status === "Temporary Redirect"){            
            setEmail(String(email));
            openOTP(true);
            setModeOTP("account")
          }
        })
        return res;
    }
    
    const [, action, pending] = useActionState(handleSubmit, undefined)
    
  return (
      <>
       <Dialog open={isOpen} onOpenChange={()=> setOpen(false)}  >
    <DialogContent  className="w-[500px] rounded-2xl" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle >Login Account</DialogTitle>
      </DialogHeader>

      <form action={action}>
            <div className="grid gap-4 py-4">
              
                <div className="grid grid-cols-4 items-center gap-4 ">
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
             </div>
             <DialogFooter >
             <div className="flex justify-between items-center w-full">
             <span className="text-sm hover:underline cursor-pointer"
             onClick={()=> setFPassword(true)}
             >
                    Forgit password ?
                  </span>
              <Button  type="submit" disabled={pending} size={"lg"} className="rounded-full cursor-pointer" >{pending?"...Loading":"Login"}</Button>
             </div>
             </DialogFooter>
             </form>
      </DialogContent>
      </Dialog>
      {fPassword && <ForgetPasswordDialog setEmailN={setEmail} setModeOTP={setModeOTP} openOTP={openOTP}  isOpen={fPassword} setOpen={setFPassword} />}
      </>
  )
}

export default DialogLogin