import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AdminBlogCard(props) {
  // Limit description to 15 characters and add ellipsis if it's longer
  const truncatedDescription = props.description.length > 15 
    ? `${props.description.substring(0, 15)}...`
    : props.description;

  return (
    <>
      <tbody className="rounded overflow-hidden py-8 px-3 bg-gray-100 shadow-lg ">
        <tr className="w-full text-center overflow-hidden px-4">
          <td className="py-2 object-cover overflow-hidden px-2">
            <img
              src={props.picture}
              alt=""
              className="object-cover h-[65px] w-[95px] rounded-xl py-2 px-2"
            />
          </td>
          <td className="tableData text-start">{props.title}</td>
          <td 
            className="tdFont" 
            dangerouslySetInnerHTML={{ __html: truncatedDescription }} 
          />
          <td className="flex gap-2 w-full my-6">
            <Link
              to={`/update-blog/${props.id}`}
              className="text-blue-500 hover:scale-125 hover:rotate-12 duration-200 hover:text-blue-900"
            >
              <FaEdit size={25} />
            </Link>
            /
            <button
              onClick={props.handleDelete}
              className="text-red-500 hover:scale-125 hover:rotate-12 duration-200 hover:text-red-900"
            >
              <MdDelete size={25} />
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}
