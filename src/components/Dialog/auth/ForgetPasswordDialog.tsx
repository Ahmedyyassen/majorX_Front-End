import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/hooks/useApp"
import { forgetPasswordAccountRTK } from "@/store/Api/authApi"
import { FormEvent, useRef, useState } from "react"

type Props={
    isOpen: boolean,
    setOpen: (e: boolean)=> void;
    openOTP: (e: boolean)=> void;
    setModeOTP: (e:string)=> void;
    setEmailN: (e:string)=> void;
}
const ForgetPasswordDialog = ({isOpen,setOpen,openOTP, setModeOTP, setEmailN}:Props) => {
    const input = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    function handleSubmit(e:FormEvent){
      e.preventDefault();
      setLoading(true);
        dispatch(forgetPasswordAccountRTK({email:String(input.current?.value)}))
        .then((res)=>{
          if (res.payload.status === "OK") {
            setModeOTP("password");
            setEmailN(String(input.current?.value));
            setOpen(false);
            openOTP(true);
            setLoading(false);
          }
        })
    }
  return (
  <>
    <Dialog open={isOpen} onOpenChange={()=> setOpen(false)} >
    <DialogContent className="w-[450px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>Forget Password Account</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              
                <div className="grid grid-cols-4 items-center gap-4 ">
                  <Input
                  ref={input}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="col-span-4 h-11 p-4 rounded-2xl"
                  />
                </div>
             </div>
             <DialogFooter >
              <Button className="cursor-pointer" type="submit" disabled={loading}>{loading?"...Loading": "Send Code"}</Button>
             </DialogFooter>
             </form>
      </DialogContent>
      </Dialog>
  </>
  )
}

export default ForgetPasswordDialog