import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import BASE_URL from "../utils/config";
import Loader from 'react-js-loader';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Blogcard from "../shared/Blogcard";

const Tours = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const getallblogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/getallblogs`);
      if (data) {
        setBlogs(data.allBlogs || []); // Ensure to set the blogs array
      }
    } catch (error) {
      toast.error("Failed to fetch blogs!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getallblogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center text-center mt-11">
        <h2 className="text-[30px] md:text-[40px] font-bold mb-4 text-center">
          Popular <span className="text-BaseColor">Blogs</span>
        </h2>
      </div>

      <section className="min-h-screen py-8 px-6 md:px-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader type="ping-cube" bgColor={"#000"} color={"#000"} size={90} />
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] text-center">
            <p className="text-lg font-semibold text-gray-700">No blogs available at the moment.</p>
          </div>
        ) : (
          <div className="justify-center grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id}>
                <Blogcard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Tours;
