import React, { useState, useContext, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import Loader from "react-js-loader"

const Booking = ({ price, title, reviewsArray, avgRating }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isLoading,setIsLoading]=useState(false)
  const [data, setData] = useState({
    userId: user && user._id,
    tourName: title,
    fullName: "",
    totalPrice: price,
    phone: "",
    maxGroupSize: 1,
    bookAt: currentDate,
    date: "",
    photo: "",
  });
  const [photo, setPhoto] = useState(null); // State to store the selected photo file
  const calculatedPrice = data.maxGroupSize * price;

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      tourName: title,
      totalPrice: calculatedPrice,
    }));
  }, [title, calculatedPrice]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "photo") {
      setPhoto(files[0]); // Set the selected photo file
    } else {
      setData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 setIsLoading(true)
    if (!user || user === null || user === undefined) {
      setIsLoading(false)
      toast.error("Please Sign In first");
      return;
    }

    try {
      // Upload photo to Cloudinary
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "chat-app"); // Replace with your Cloudinary upload preset

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dfdaorp57/image/upload", // Replace with your Cloudinary URL
        formData
      );

      const photoUrl = cloudinaryResponse.data.secure_url;

      // Include the photo URL in the data to be sent to your backend
      const bookingData = { ...data, photo: photoUrl };

      const response = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (response.ok) {
        setIsLoading(false)
        toast.success("Booked");
        navigate("/booked");
      } else {
        setIsLoading(false)
        toast.error(result.message);
      }
    } catch (err) {
      setIsLoading(false)
      toast.error("Server not responding");
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center ">
        <h3 className="text-[25px] md:text-[40px] font-bold mb-4 text-start text-BaseColor">
          Rs. {price} <span>/per person</span>
        </h3>
        <div className="flex items-center gap-2">
          <i>
            <FaStar />
          </i>
          <span className="flex gap-1">
            <div>{avgRating}</div>
            <div>({reviewsArray.length})</div>
          </span>
        </div>
      </div>

      <div className="py-6 space-y-4">
        <h5 className="text-[18px] md:text-2xl font-semibold">
          Booking Information
        </h5>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="booking_input"
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="booking_input"
              type="text"
              placeholder="Contact No."
              id="phone"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="booking_input"
              type="number"
              placeholder="Number of Persons?"
              id="maxGroupSize"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="booking_input"
              type="date"
              id="date"
              placeholder="For which date"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex my-4 justify-between">
            <span>EasyPaisa Or Jazzcash: </span>
            <p className="font-semibold">03126067717</p>
          </div>
          <div className="flex my-4 justify-center text-lg  flex-col">
            <span className="font-semibold">Bank Details: </span>
            <div className="flex justify-between flex-col">
            <span>Name: </span>
            <p className="font-semibold">Uzair Ali</p>
            <span>Account Number: </span>
            <p className="font-semibold">01040010122545960017</p>
            <span>Branch Code: </span>
            <p className="font-semibold">0104</p>
            <span>Bank: </span>
            <p className="font-semibold">Allied Bank Pakistan</p>
            </div>
          </div>
          <p>
            Once you have done payment attach screenshot with booking details.
          </p>
          <div>
            <input
              className="booking_input"
              type="file"
              id="photo"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mt-12">
          
          
            <div className="flex my-6 justify-between font-bold text-lg">
              <span>Net Price: </span>
              <p>Rs. {calculatedPrice}</p>
            </div>
          </div>
          <button type="submit" className="btn w-full h-12 flex align-middle justify-center" disabled={isLoading}>
          {isLoading ? (
                  
            
                  <Loader type="ping-cube" bgColor={"white"} color={"white"}  size={50}/>
               
               
              ) : (
                "Book"
              )}
          </button>
         <p className="text-center font-semibold mt-4 ">Or</p>
        </form>
        <a href="https://wa.me/923126067717" target="_blank">
          <button className="btn w-full h-12 flex align-middle justify-center mt-8">Contact on Whatsapp</button>

          </a>
      </div>
    </div>
  );
};

export default Booking;
