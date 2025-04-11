import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

import { toast } from "react-toastify";
import { useMode } from "../Context/modeContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { darkMode } = useMode() // Assuming you have a mode context for dark mode

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  let res= await fetch("my-backend-production-17a5.up.railway.app/api/auth/Sign-Up",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name:formData.username,
      email:formData.email,
      password:formData.password

  })
  });
  let data = await res.json();
  if(data.status){
    toast.success(data.message)
  }
  setFormData({
    username:"",
    email:"",
    password:""
  })
  
  console.log(data);
  };

  return (
    <div className="flex my-10 justify-center min-h-60  ">
      <div className={`w-full max-w-md p-8 space-y-6  shadow-lg rounded-lg`}>
        <h2 className={`text-2xl font-bold text-center ${darkMode ?"text-slate-100":"text-slate-900"}  flex items-center justify-center gap-2`}>
          <FaUserPlus /> Sign Up
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className={`block ${darkMode?"text-slate-100":"text-gray-700"} `}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${darkMode?"bg-slate-700 text-slate-100":"bg-white text-slate-800"}`}
              required
            />
          </div>
          <div>
            <label className={`block ${darkMode?"text-slate-100":"text-gray-700"} `}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${darkMode?"bg-slate-700 text-slate-100":"bg-white text-slate-800"}`}
              required
            />
          </div>
          <div>
            <label className={`block ${darkMode?"text-slate-100":"text-gray-700"} `}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${darkMode?"bg-slate-700 text-slate-100":"bg-white text-slate-800"}`}
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <p className={`mt-4 text-center text-sm ${darkMode?"text-slate-100":"text-slate-800"}`}>
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

