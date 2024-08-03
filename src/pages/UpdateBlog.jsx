import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactQuill from 'react-quill';
import Loader from 'react-js-loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BASE_URL from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function UpdateBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  





  const handleImageUpload = async () => {
    if (!fileInputRef.current.files[0]) return picture;
    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);
    formData.append('upload_preset', 'chat-app'); // replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dfdaorp57/image/upload', // replace with your Cloudinary cloud name
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return picture;
    }
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const imageUrl = await handleImageUpload();
    const updatedBlog = {
      title,
      description,
      picture: imageUrl, // Use the uploaded image URL or the existing picture
    };

    try {
      await axios.put(`${BASE_URL}/updateblog/${id}`, updatedBlog, config);
      toast.success('Blog Updated');
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Blog not Updated');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:min-h-[400px] flex items-center justify-center bg-gray-100">
      <div className="bg-white mx-6 p-6 md:p-8 rounded-lg text-center shadow-md w-full max-w-2xl m-8 md:max-w-[90%]">
        <div className="flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Update Blog
            </h2>
            <p className="text-sm md:text-base text-GrayColor">
              Update blog details by filling in all fields.
            </p>
          </div>

          <form className="space-y-2 md:space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-md md:text-lg font-medium text-GrayColor">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter Blog Title"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-md md:text-lg font-medium text-GrayColor">
                Description
              </label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>

            <div>
              <label htmlFor="photo" className="block text-md md:text-lg font-medium text-GrayColor">
                Photo URL
              </label>
              <input
                type="file"
                name="photo"
                ref={fileInputRef}
                placeholder="Upload Picture"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
              />
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
                  'Update'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
