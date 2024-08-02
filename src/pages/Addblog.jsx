import React, { useState, useContext } from 'react'
import Loader from "react-js-loader"
import ReactQuill from 'react-quill'
import axios from "axios"
import { toast } from 'react-toastify'
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../utils/config'
import { AuthContext } from '../context/AuthContext'

export default function Addblog() {
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState("")
    const [picture, setPicture] = useState(null)
    const [title, setTitle] = useState("")
    

    const isValid = () => {
        return title.trim() !== "" && description.trim() !== ""
    }
  

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isValid()) {
            return toast.error("All fields are required")
        }

        setIsLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            let imageUrl = ""

            if (picture) {
                const formData = new FormData()
                formData.append("file", picture)
                formData.append("upload_preset", "chat-app")  // Replace with your Cloudinary upload preset
                formData.append("cloud_name", "dfdaorp57")  // Replace with your Cloudinary cloud name

                const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/dfdaorp57/image/upload", // Replace with your Cloudinary API URL
                    formData
                )
                imageUrl = res.data.url
                // Debug: log the uploaded image URL
            }

            const newBlog = {
                title,
                description,
                picture: imageUrl
            }

            const response = await axios.post(`${BASE_URL}/addblog`, newBlog, config) // Pass the config object
          // Debug: log the response from API
            toast.success("Blog created successfully!")
            setDescription('')
            setTitle("")
            setPicture('')

        } catch (error) {
            console.error('Error creating blog:', error)
            toast.error("Failed to create blog!")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen md:min-h-[400px] flex items-center justify-center bg-gray-100">
            <div className="bg-white mx-6 p-6 md:p-8 rounded-lg text-center shadow-md w-full max-w-xl m-8 md:max-w-[80%] ">
                <div className="flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Create Blog</h2>
                        <p className="text-sm md:text-base text-GrayColor">Create a new Blog by filling all fields.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
                        <div className="md:grid grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="title" className="block text-md md:text-lg font-medium text-GrayColor">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="picture" className="block text-md md:text-lg font-medium text-GrayColor">Picture</label>
                                <input
                                    type="file"
                                    name="picture"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-GreenColor"
                                    onChange={(e) => setPicture(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="desc" className="block text-md md:text-lg font-medium text-GrayColor">Description</label>
                            <ReactQuill
                                theme="snow"
                                placeholder="Enter Description"
                                className="w-full h-auto mb-4"
                                value={description}
                                onChange={setDescription}
                            />
                        </div>

                        <div>
                            <button type="submit" className="w-full Greenbtn my-3 h-12 flex align-middle justify-center mt-14" >
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
    )
}
