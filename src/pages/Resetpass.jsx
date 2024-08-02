import React, { useState } from 'react'
import resetpass from '../assets/images/resetpass.png'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../utils/config";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from "react-js-loader"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Resetpass() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { id, token } = useParams();
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword(!showPassword);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
     setIsLoading(true)
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      setIsLoading(false)
      return toast.error('All fields are required');
    }
    if(newPassword.length<8 || confirmPassword.length<8){
      setIsLoading(false)
      return toast.error('Password length should be 8 charcaters')

    }
    if (newPassword !== confirmPassword) {
      setIsLoading(false)
      return toast.error('Password and confirm password should be the same');
    }
    try {
      const { data } = await axios.post(`${BASE_URL}/resetpass/${id}/${token}`, { newPassword ,confirmPassword});
      if (data) {
        setIsLoading(false)
        toast.success('Password has been changed');
        navigate('/login')
      }
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="min-h-screen md:min-h-[400px] flex items-center justify-center bg-gray-100">
      <div className="bg-white mx-6 p-6 md:p-8 rounded-lg shadow-md w-full max-w-xl m-8 md:max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        <div className="hidden md:block">
          <img
            src={resetpass}
            alt="Reset Password"
            className="mx-auto h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Change Password
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
            <div className='relative'>
              <label
                htmlFor="newPassword"
                className="block text-md md:text-lg font-medium text-GrayColor"
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-BaseColor"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
               <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="absolute right-4 top-2/3 transform -translate-y-1/2 cursor-pointer text-gray-600"
        onClick={togglePasswordVisibility}
      />
            </div>

            <div className='relative'>
              <label
                htmlFor="confirmPassword"
                className="block text-md md:text-lg font-medium text-GrayColor"
              >
                Confirm Password
              </label>
              <input
              type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Enter Confirm Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-BaseColor"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
               <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="absolute right-4 top-2/3 transform -translate-y-1/2 cursor-pointer text-gray-600"
        onClick={togglePasswordVisibility2}
      />
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn my-3 h-12 flex justify-center align-middle"
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
