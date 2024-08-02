import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../utils/config';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-js-loader";

export default function Fullblog() {
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const getSingleBlog = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${BASE_URL}/getsingleblog/${id}`);
            if (data) {
                setBlog(data.singleBlog || {});
            }
        } catch (error) {
            toast.error("Failed to fetch blog!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSingleBlog();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader type="ping-cube" bgColor={"#000"} color={"#000"} size={90} />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>No blog found</p>
            </div>
        );
    }

    const { title, picture, description } = blog;

    return (
        <main className="mt-10">
            <div
                className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
                style={{ height: "24em" }}
            >
                <div
                    className="absolute left-0 bottom-0 w-full h-full z-10"
                    style={{
                        backgroundImage: "linear-gradient(180deg,transparent,rgba(0,0,0,.7))"
                    }}
                />
                <img
                    src={picture}
                    alt={title}
                    className="absolute left-0 top-0 w-full h-full z-0 object-fill"
                />
                <div className="p-4 absolute bottom-0 left-0 z-20">
                    <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                        {title}
                    </h2>
                </div>
            </div>
            <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed break-words">
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </main>
    );
}
