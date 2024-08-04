import React, { useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterImg from "../assets/images/Signup2.png";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/config";
import Loader from 'react-js-loader'


const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
 


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
    role: "user",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if(formData.username.length<3){
      setIsLoading(false)
      return toast.error('Username must be atleast 3 characters')
    }
    if(formData.password.length<8){
      setIsLoading(false)
      return toast.error('Password length should be 8 characters')
    }
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message } = await response.json();

      if (response.ok) {
        // console.log('User registered successfully:', message);
       
        setIsLoading(false)
      
        navigate("/email-send");
      } else {
        setIsLoading(false)
        toast.error(message);
      }
    } catch (err) {
      setIsLoading(false)
      toast.error("Server not responding");
    }
  };

  return (
    <div className="min-h-screen md:min-h-[400px] flex items-center justify-center bg-gray-100">
      <div className="bg-white mx-6 p-6 md:p-8 rounded-lg shadow-md w-full max-w-xl m-8 md:max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        {/* Sign Up Photo */}
        <div className="hidden md:block">
          <img
            src={RegisterImg}
            alt="Trips Travels Logo"
            className="mx-auto h-full object-cover"
          />
        </div>

        {/* Sign Up Form */}
        <div className="flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Register
            </h2>
            <p className="text-sm md:text-base text-GrayColor">
              Create your account to start your journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
            <div>
              <label
                htmlFor=""
                className="block text-md md:text-lg font-medium text-GrayColor"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-BaseColor"
                value={formData.username}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-md md:text-lg font-medium text-GrayColor"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-BaseColor"
                value={formData.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-md md:text-lg font-medium text-GrayColor"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-BaseColor"
                value={formData.password}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn my-3 flex align-middle justify-center h-12"
                disabled={isLoading}
              >
                  {isLoading ? (
                  
            
                    <Loader type="ping-cube" bgColor={"white"} color={"white"}  size={50}/>
                 
                 
                ) : (
                  "Register"
                )}
              </button>
              <p className="text-sm md:text-base text-center">
                Already have an Account?{" "}
                <Link
                  className="text-BaseColor hover:text-BHoverColor"
                  to="/login"
                >
                  Login here
                </Link>
              </p>
              <p className="text-sm md:text-base text-center">
                Forget Password?{" "}
                <Link
                  className="text-BaseColor hover:text-BHoverColor"
                  to="/resetpass"
                >
                  Click Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
