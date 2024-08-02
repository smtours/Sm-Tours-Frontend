import React, { useState } from 'react';
import img from "../assets/images/forgetpass.png";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../utils/config";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Loader from "react-js-loader"


export default function Forgetpass() {
  const [email, setEmail] = useState("");
  const [isLoading,setIsLoading]=useState(false)
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (email.trim() === "") {
      setIsLoading(false)
      return toast.error("Email field is required");
    }
    
    try {
      const {data}= await axios.post(`${BASE_URL}/resetpass`, { email });
      setIsLoading(false)
      toast.success(data.message)
      setEmail("")
    
      
     
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-100">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-xl md:max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        {/* Login Photo */}
        <div className="hidden md:block">
          <img
            src={img}
            alt="SM TOURS"
            className="mx-auto h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Forget Password
            </h2>
            <p className="text-sm md:text-base text-gray-500">
              Enter your email to get password reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-md md:text-lg font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-BaseColor"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn my-3 h-12 flex align-middle justify-center"
               
              >
               {isLoading ? (
                  
            
                  <Loader type="ping-cube" bgColor={"white"} color={"white"}  size={50}/>
               
               
              ) : (
                "Send"
              )}
              </button>
            </div>
          </form>
        </div>
      </div>
    
    </div>
  );
}
