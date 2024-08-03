import React, { useContext } from 'react'
import AdminBlogcard from '../shared/AdminBlogcard'
import Loader from "react-js-loader"
import BASE_URL from '../utils/config'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

export default function Allblogs() {
    const [isLoading, setIsLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const {token}=useContext(AuthContext)
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
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const deleteblog=async(id)=>{
    const {data}=await axios.delete(`${BASE_URL}/deleteblog/${id}`,config)
    if(data){
      setBlogs(blogs.filter(blog => blog._id !== id));
      return toast.success("Blog Deleted")

    }else{
      toast.error("Blog Not Deleted")
    }
    }
 
  return (
    <div className="py-8 px-2 md:px-5 lg:px-8 w-full">
    {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <Loader type="ping-cube" bgColor={"#000"} color={"#000"} size={64} />
      </div>
    ) : (
      <>
        <div className="flex flex-col gap-5 overflow-x-scroll">
          <table className="table-auto gap-4 border-collapse border w-[120%] md:w-full">
            <thead className="w-full py-2">
              <tr>
                <th></th>
                <th className="tableData text-start">Title</th>
                <th className="tableData">Description</th>
              </tr>
            </thead>
            {blogs?.map((blog) => (
              <AdminBlogcard title={blog.title} description={blog.description} picture={blog.picture} id={blog._id} key={blog._id} handleDelete={()=>deleteblog(blog._id)} />
            ))}
          </table>
        </div>
       
      </>
    )}
  </div>
  )
}
