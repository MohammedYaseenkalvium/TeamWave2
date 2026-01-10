import React, { useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Input/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login API call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });

      const { token, user } = response.data;

      if (token){
        localStorage.setItem("token",token);
        updateUser({ ...user, token });

        //Redirect based on role
        if (user.role === "admin"){
          navigate("/admin/dashboard");
        }else if (user.role === "member"){
          navigate("/user/dashboard");
        }
      }
    }catch(error){
      if (error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again")
      }
    }
  };

  return(
    <AuthLayout>
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Welcome back</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to continue collaborating
        </p>

        <form  onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input  
              type="email"
              required
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <Input  
              type="password"
              required
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
              Sign in
            </button>
        </form>

        <p className="text-sm text-center mt-4">
           Don’t have an account?
           <Link className="text-blue-500 cursor-pointer hover:underline" to="/SignUp">
            {" "}Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}