import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DialogLogin from "@/components/Dialog/auth/DialogLogin";
import DialogRegister from "@/components/Dialog/auth/DialogRegister";
import OTPinput from "@/components/Dialog/auth/OTPinput";
import { ModeToggle } from "@/components/ModeToggle";


const AuthPage = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [mode, setMode] = useState< "Register" | "Login" | "Forget Password">();
  const [otp , setOTP]= useState<boolean>(false);
  const [email, setMail]= useState("");
  const [modeOTP, setModeOTP]= useState("");


  const signin= ()=>{
    setMode("Login");
    setShowDialog(true);
    
  }
  const signup= ()=>{
    setMode("Register");
    setShowDialog(true);
  }

  return (
    <>
    <div className="bg-white dark:bg-black relative">
    <span className="absolute top-4 right-4"><ModeToggle /></span>
    <div className=' mx-auto w-3/4 px-16 flex justify-center md:justify-between items-center h-screen text-demo-150'>
        <FaXTwitter className=' text-[400px] hidden md:block text-black dark:text-white' />
        <div className=''>
            <h1 className='text-4xl md:text-5xl lg:text-7xl font-extrabold mb-16 text-black dark:text-white'>Happening now</h1>
            <section className="w-80">
                <h3 className="text-xl lg:text-2xl font-extrabold text-black dark:text-white">Join today.</h3>
                    <div className="flex flex-col gap-2 mt-8">
                    <button className="text-white dark:text-black bg-black dark:bg-white rounded-full text-center flex items-center justify-center gap-2 h-10 outline-0 font-bold text-md cursor-pointer">
                    <FaGoogle />
                    Sign up with Google
                </button>
                <button className="text-white dark:text-black bg-black dark:bg-white  rounded-full text-center flex items-center justify-center gap-2 h-10 outline-0 font-bold text-md cursor-pointer">
                    <FaApple />
                    Sign up with Apple
                </button> 
                    <div className="flex items-center">
                        <div className="border w-full border-gray-400"></div>
                        <p className="px-2 text-black dark:text-white">or</p>
                        <div className="border w-full border-gray-400"></div>
                        </div>
                    <Button onClick={signup} className="rounded-full text-center flex items-center justify-center gap-2 h-10 outline-0 text-white bg-blue-400 dark:text-white dark:bg-blue-400 font-bold text-md cursor-pointer">
                        Create Account
                    </Button> 
                    <p className="text-xs text-gray-400">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                    </div>

                    <h5 className="text-black dark:text-white text-lg mt-16 mb-4">Already have an account?</h5>
                    <Button onClick={signin} className="border border-gray-400 w-full rounded-full text-center flex items-center justify-center gap-2 h-10 outline-0 text-blue-400 font-bold text-md cursor-pointer bg-transparent">
                        Sign in
                    </Button> 
            </section>
        </div>
    </div>
    </div>
      {showDialog && mode ==="Login" && <DialogLogin setModeOTP={setModeOTP} setEmail={setMail} openOTP={setOTP} isOpen={showDialog} setOpen={setShowDialog} />}
      {showDialog && mode ==="Register" && <DialogRegister setModeOTP={setModeOTP} setEmail={setMail} openOTP={setOTP} isOpen={showDialog} setOpen={setShowDialog} />}
      {otp && <OTPinput mode={modeOTP} email={email} isOpen={otp} setOpen={setOTP} />  }


    </>
  )
}

export default AuthPage;
