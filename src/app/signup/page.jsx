"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import axios from "axios";
const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

const [buttonDisabled, setButtonDisabled] = useState(true);
const OnSignUp = async () => {
      try {
        const res = await axios.post('/api/user/signup', user);
        console.log("Success", res.data);
        router.push('/login');
        toast.success("User Created Successfully", {
          duration: 2000,
          position: "top-center",
        })
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          duration: 2000,
          position: "top-center",
        })
      }
  };

  useEffect(()=>{
      if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(true);
      }
  }, [user])
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col p-4 gap-3 rounded-lg border-2">
        <label>Username</label>
        <input type="text" id="username" className="outline-none rounded-md text-black" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})}/>
        <label>Email</label>
        <input type="email" id="email"  className="outline-none rounded-md text-black" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
        <label>Password</label>
        <input type="text" id="password"  className="outline-none rounded-md text-black" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
        <button type="submit" id="submit" onClick={OnSignUp}>{buttonDisabled === true ? "Empty Fields" : "Sign Up Now!"}</button>
        <Link href='/login' className="w-full h-full flex justify-center text-sky-700">Login</Link>
        </div>
        <Toaster position="top-center"/>
    </div>
  );
};

export default SignupPage;
