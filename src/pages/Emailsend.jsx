import React from 'react'
import img from '../assets/images/check.png';
import { Link } from 'react-router-dom';


export default function Emailsend() {
  return (
    <div className="flex align-middle justify-center flex-col items-center mt-16">
    <img 
      src={img} 
      alt="Confirmation Check" 
      style={{ width: '120px', height: 'auto', margin: '0 auto' }} 
    />
    <h3 className="text-center mt-2">An email has been sent to your account</h3>
    <p className='text-center mt-3'>Click on link to verify your account.</p>
    <Link
                className="w-4- btn my-3"
                to="/"
              >
                Back to Home
              </Link>
  </div>
  )
}
