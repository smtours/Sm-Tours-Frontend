import React from 'react';
import img from '../assets/images/check.png';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../utils/config';

export default function Confirm() {
  const { tokenlink } = useParams();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.get(`${BASE_URL}/verify/${tokenlink}`);
      } catch (error) {
        console.error('Verification failed', error);
      }
    };

    verifyUser();
  }, [tokenlink]);

  return (
    <div className="flex align-middle justify-center flex-col items-center mt-24">
      <img 
        src={img} 
        alt="Confirmation Check" 
        style={{ width: '150px', height: 'auto', margin: '0 auto' }} 
      />
      <h3 className="text-center mt-4">Your account has been confirmed</h3>
      <Link className="w-4- btn my-3" to="/login">
        Click Here
      </Link>
    </div>
  );
}
