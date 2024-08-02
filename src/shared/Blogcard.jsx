import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import BASE_URL from '../utils/config'

export default function Blogcard({blog}) {
    const { picture, title, description,_id } = blog;
  
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg h-[370px] flex flex-col">
    <div className="relative">
      <img className="w-full h-40 object-cover" src={picture} alt={title} />
      
    </div>
    <div className="px-6 py-4 h-full flex flex-col justify-between flex-grow">
     
      <div className="flex-grow mb-2">
        <Link  className="font-bold text-lg block">
          {title.length > 20 ? `${title.substring(0, 20)}...` : title}
        </Link>
        <p
          className="text-gray-700 text-base font-light break-words overflow-ellipsis"
          dangerouslySetInnerHTML={{ __html: description.length > 80 ? `${description.substring(0, 80)}...` : description }}
        ></p>
      </div>
    </div>
    <div className="flex items-center justify-between px-6 pb-4">
     
      <Link to={`/fullblog/${_id}`} className="btn text-sm w-24 text-center whitespace-nowrap flex align-middle justify-center">
        Read More
      </Link>
    </div>
  </div>
  )
}
