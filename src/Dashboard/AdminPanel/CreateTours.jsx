import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BASE_URL from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
import Loader from "react-js-loader";

const CreateTours = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    desc: '',
    address: '',
    price: 0,
    maxGroupSize: 1,
    photo: '',
    distance: 0,
    featured: false,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'featured' ? value === 'true' : value,
    });
  };

  const handleDescChange = (value) => {
    setFormData({
      ...formData,
      desc: value,
    });
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'chat-app');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dfdaorp57/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let photoUrl = formData.photo;
    if (imageFile) {
      photoUrl = await handleImageUpload(imageFile);
      if (!photoUrl) {
        toast.error('Image upload failed');
        setIsLoading(false);
        return;
      }
    }

    const tourData = { ...formData, photo: photoUrl };

    try {
      const response = await fetch(`${BASE_URL}/tour`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tourData),
      });

      const { message } = await response.json();

      if (response.ok) {
        toast.success(message);
        navigate('/all-tours');
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error('Server not responding');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:min-h-[400px] flex items-center justify-center bg-gray-100">
      <div className="bg-white mx-6 p-6 md:p-8 rounded-lg text-center shadow-md w-full max-w-xl m-8 md:max-w-[80%]">
        <div className="flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Create Tour</h2>
            <p className="text-sm md:text-base text-GrayColor">Create a new tour by filling all fields.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
            <div className="md:grid grid-cols-2 gap-8">
              <div>
                <label htmlFor="title" className="block text-md md:text-lg font-medium text-GrayColor">Title</label>
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
                <label htmlFor="city" className="block text-md md:text-lg font-medium text-GrayColor">City</label>
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
                <label htmlFor="price" className="block text-md md:text-lg font-medium text-GrayColor">Price</label>
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
                <label htmlFor="distance" className="block text-md md:text-lg font-medium text-GrayColor">Distance</label>
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
              <label htmlFor="address" className="block text-md md:text-lg font-medium text-GrayColor">Address</label>
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
            <div className="mb-4">
              <label htmlFor="desc" className="block text-md md:text-lg font-medium text-GrayColor">Description</label>
              <ReactQuill
                theme="snow"
                value={formData.desc}
                onChange={handleDescChange}
                placeholder="Enter Description"
                className="w-full h-auto mb-4"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photo" className="block text-md md:text-lg font-medium text-GrayColor">Photo</label>
              <input
                type="file"
                name="photo"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="featured" className="text-TextColor text-[15px] font-semibold leading-7 px-4">
                Featured
                <select name="featured" value={formData.featured} onChange={handleInput} className="text-TextColor text-[15px] leading-7 px-4 py-3 focus:outline-none">
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </label>
            </div>
            <div>
              <button type="submit" className="w-full Greenbtn my-3 h-12 flex align-middle justify-center" disabled={isLoading}>
                {isLoading ? (
                  <Loader type="ping-cube" bgColor={"white"} color={"white"} size={50} />
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTours;
