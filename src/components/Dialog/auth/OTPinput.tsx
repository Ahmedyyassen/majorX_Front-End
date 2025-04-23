import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useApp";
import { checkOTPAccountRTK, forgetPasswordAccountRTK, verifyUserAccountRTK } from "@/store/Api/authApi";
import { useEffect, useRef, useState } from "react";
import NewPassword from "./NewPassword";
   
type Props={
    isOpen: boolean,
    setOpen: (e: boolean)=> void;
    email: string;
    mode: string;
}
const OTPinput = ({isOpen,setOpen, email, mode}:Props) => {
    const [time, setTime]= useState<number>(60);
    const [openNew, setOpenNew] = useState(false);
    const dispatch = useAppDispatch();
    const [isResend, setIsResend] = useState(false);

    const interval = useRef<NodeJS.Timeout|null>(null);

    useEffect(()=>{
        interval.current = setInterval(()=>{
            setTime((prev)=> prev-1) } ,1000);
            if (time === 0) {
                setIsResend(true);
                clearInterval(interval.current);
            }
        return ()=>{
            if (interval.current) {
                clearInterval(interval.current);
            }
        }
    },[interval,time])


    const handleOTP = (e: string)=>{
        if (e.length === 6) {            
           if (mode === "account") {
            dispatch(verifyUserAccountRTK({email , otp:Number(e)}))
            .then((res)=>{
                if (res.payload.status === "OK") {
                    setOpen(false);
                }
            })
           }
           else if (mode === "password") {
            dispatch(checkOTPAccountRTK({email, otp:Number(e)}))
            .then((res)=>{
                if (res.payload.status === "OK") {
                    setOpenNew(true);
                }
            })
        }
        }
    }
    const resendOTP = ()=>{
         dispatch(forgetPasswordAccountRTK({email}))
                .then((res)=>{
                  if (res.payload.status === "OK") {
                    setTime(60);
                    setIsResend(false);
                }
                })
    }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={()=> setOpen(false)}>
        <DialogContent aria-describedby={undefined}>
            <DialogHeader >
                <DialogTitle className="text-center pb-4">
                Verify OTP code
                </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
            <InputOTP maxLength={6} onChange={handleOTP} >
                <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1}  />
                <InputOTPSlot index={2}  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                <InputOTPSlot index={3}  />
                <InputOTPSlot index={4}  />
                <InputOTPSlot index={5}  />
                </InputOTPGroup>
            </InputOTP>
            </div>
            <article className="text-center space-y-4">
                <h6 className="font-light text-sm text-gray-500 dark:text-gray-300">Please check your email</h6>
                    <div className="flex justify-center items-center gap-4">
                    <Button className="cursor-pointer dark:bg-white bg-gray-400" disabled={!isResend} 
                    onClick={resendOTP} >{isResend?"Resend code":"Please wait"}</Button>
                        <span>{ time }s</span>
                    </div>
            </article>
        </DialogContent>
    </Dialog>

    { openNew && <NewPassword  closeOTP={setOpen} email={email} isOpen={openNew} setOpen={setOpenNew} />}

    </>
  )
}

export default OTPinput