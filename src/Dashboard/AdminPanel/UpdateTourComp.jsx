import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Loader from "react-js-loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateTours = ({ tour, id }) => {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    desc: "",
    address: "",
    price: 0,
    maxGroupSize: 1,
    photo: "",
    distance: 0,
    featured: false,
  });

  useEffect(() => {
    if (tour) {
      const {
        title,
        city,
        desc,
        address,
        price,
        maxGroupSize,
        photo,
        distance,
        featured,
      } = tour || {};

      setFormData((prevData) => ({
        ...prevData,
        title: title || "",
        city: city || "",
        desc: desc || "",
        address: address || "",
        price: price || 0,
        maxGroupSize: maxGroupSize || 1,
        photo: photo || "",
        distance: distance || 0,
        featured: featured || false,
      }));
    }
  }, [tour]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const newValue = name === "featured" ? value === "true" : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "chat-app");

    setIsLoading(true);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dfdaorp57/image/upload`,
        uploadData
      );
      const photoUrl = res.data.secure_url;
      setFormData((prevData) => ({ ...prevData, photo: photoUrl }));
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/tour/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await response.json();

      if (response.ok) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  const handleDescChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      desc: value,
    }));
  };

  return (
    <div className="min-h-screen md:min-h-[400px] flex items-center justify-center bg-gray-100">
      <div className="bg-white mx-6 p-6 md:p-8 rounded-lg text-center shadow-md w-full max-w-2xl m-8 md:max-w-[90%]">
        <div className="flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Update Tour
            </h2>
            <p className="text-sm md:text-base text-GrayColor">
              Update tour details by filling in all fields.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
            <div className="md:grid grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="title"
                  className="block text-md md:text-lg font-medium text-GrayColor"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Tour Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                  value={formData.title}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-md md:text-lg font-medium text-GrayColor"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter City Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                  value={formData.city}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div className="md:grid grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="price"
                  className="block text-md md:text-lg font-medium text-GrayColor"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                  value={formData.price}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="distance"
                  className="block text-md md:text-lg font-medium text-GrayColor"
                >
                  Distance
                </label>
                <input
                  type="text"
                  name="distance"
                  placeholder="Enter Total Distance"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                  value={formData.distance}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-md md:text-lg font-medium text-GrayColor"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter Destination Address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                value={formData.address}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label
                htmlFor="desc"
                className="block text-md md:text-lg font-medium text-GrayColor"
              >
                Description
              </label>
              <ReactQuill
                theme="snow"
                value={formData.desc}
                onChange={handleDescChange}
              />
            </div>

            <div>
              <label
                htmlFor="photo"
                className="block text-md md:text-lg font-medium text-GrayColor"
              >
                Photo URL
              </label>
              <input
                type="file"
                name="photo"
                placeholder="Upload Picture"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                onChange={handleFileInput}
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="featured"
                className="text-TextColor text-[15px] font-semibold leading-7 px-4"
              >
                Featured
                <select
                  name="featured"
                  value={formData.featured}
                  onChange={handleInput}
                  className="text-TextColor text-[15px] leading-7 px-4 py-3 focus:outline-none"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full Bluebtn my-3 h-11 flex align-middle justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader type="ping-cube" bgColor={"white"} color={"white"} size={50} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTours;
