"use client";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState('Nothing');
  const logout = async () => {
    try {
        await axios.get('/api/user/logout')
        toast.success('Logout successful')
        router.push('/login')
    } catch (error) {
        console.log(error.message);
        toast.error(error.message)
    }
}

const getUserDetails = async () =>{
      const res = await axios.get('/api/user/me');
      console.log(res);
      setData(res.data.data._id);
      console.log(data);
}
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>Profile Page</h1>
      <h2>{data === 'Nothing' ? "" : <Link className="bg-red-500" href={`/profile/${data}`}>{data}</Link>}</h2>
      <button
        className="text-white bg-sky-500 w-24 h-8 rounded-lg outline-none hover:bg-sky-700 mt-4"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="text-white bg-orange-500 text-sm w-24 h-8 rounded-lg outline-none hover:bg-sky-700 mt-4"
        onClick={getUserDetails}
      >
        User Details
      </button>
      <Toaster />
    </div>
  );
};

export default Profile;
