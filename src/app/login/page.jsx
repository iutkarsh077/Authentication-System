"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
const LoginPage = () => {
  const router = useRouter();
  const [disabledButton, setDisabledButton] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const OnLogin = async () => {
    try {
      const response = await axios.post('/api/user/login', user);
      console.log("Response", response);
      router.push("/profile");
      toast.success("User Logged In Successfully", {
        duration: 2000,
        position: "top-center",
      })
    } catch (error) {
      console.log("Error in Login", error);
      toast.error("User LogIn Failed", {
        duration: 2000,
        position: "top-center",
      })
    }
  };

  useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0){
          setDisabledButton(false)
      }
      else{
          setDisabledButton(true)
      }
  }, [user])
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col p-4 gap-3 rounded-lg border-2">
        <label>Email</label>
        <input type="email" id="email"  className="outline-none rounded-md text-black" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
        <label>Password</label>
        <input type="text" id="password"  className="outline-none rounded-md text-black" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
        <button type="submit" id="submit" onClick={OnLogin}>{disabledButton === true ? "Empty Field" : "Login Now!"}</button>
        <Link href='/signup' className="w-full h-full flex justify-center">New User? <span className="pl-2 text-sky-800"> SignUp Now</span></Link>
        </div>
        <Toaster/>
    </div>
  );
};

export default LoginPage;
