import Logo from "./../../assets/images/logo.png";
import React, { useContext, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok
} from "react-icons/fa";
import Newsletter from "../../shared/Newsletter";
import { AuthContext } from "../../context/AuthContext";


const Footer = () => {
  const { role } = useContext(AuthContext);

  return (
    <>
      {role === "admin" ? null : (
        <footer className="bg-gray-800 text-white px-5 py-8 w-full">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <img
                src={Logo}
                alt="Trips Travels Logo"
                className="h-20 md:mr-12 "
              />
              <div className="flex flex-col mt-8 text-center md:text-left">
                <p className="mb-2">Address:Sultanpur , Tehsil Havelian District Abbottabad , kpk , Pakistan</p>
                <p className="mb-2">Phone: +92 3126067717</p>
                <p className="mb-2">Email: uzairsmtoursntravels@gmail.com</p>
                <p>&copy; 2024 SM TOURS AND TRAVELS. All rights reserved.</p>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="flex md:flex-col gap-4 mt-4 md:mt-0">
              <a href="https://www.facebook.com/profile.php?id=61562649347433&mibextid=ZbWKwL" target="_blank" className="text-white hover:text-gray-300">
                <FaFacebookF />
              </a>
              <a href="https://www.tiktok.com/@sm.tour.and.trave?_t=8o9y4PRkwvo&_r=1" target="_blank" className="text-white hover:text-gray-300">
                <FaTiktok />
              </a>
              <a href="https://www.instagram.com/travelsmtourand?igsh=cHl0a2NnMzRqM3Q=" target="_blank" className="text-white hover:text-gray-300">
                <FaInstagram />
              </a>
              <a href="https://youtube.com/@smtoursandtravels?si=k1iq20XzEgH7fqt_" target="_blank" className="text-white hover:text-gray-300">
                <FaYoutube />
              </a>
             
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
