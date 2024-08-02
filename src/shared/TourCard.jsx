import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";

const TourCard = ({ tour }) => {
  const { photo, title, city, distance, price, desc, _id, reviews, featured } = tour;
  const { totalRating, avgRating } = CalculateAvg(reviews);

  return (
    <Link to={`/tours/${_id}`}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg h-[470px] flex flex-col">
      <div className="relative">
        <img className="w-full h-40 object-cover" src={photo} alt={title} />
        {featured && (
          <p className="absolute pr-8 pl-4 text-white font-semibold py-1 bottom-2 rounded-l-full right-0 bg-BHoverColor text-lg">
            Featured
          </p>
        )}
      </div>
      <div className="px-6 py-4 h-full flex flex-col justify-between flex-grow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-base">{city}</p>
          <div className="flex items-center gap-2">
            <i>
              <FaStar />
            </i>
            <span>
              {avgRating} ({reviews.length})
            </span>
          </div>
        </div>
        <div className="flex-grow mb-2">
          <Link to={`/tours/${_id}`} className="font-bold text-lg block">
            {title.length > 20 ? `${title.substring(0, 20)}...` : title}
          </Link>
          <p
            className="text-gray-700 text-base font-light overflow-hidden overflow-ellipsis"
            dangerouslySetInnerHTML={{ __html: desc.length > 80 ? `${desc.substring(0, 80)}...` : desc }}
          ></p>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            Starts From
          </p>
          <p className="text-xl">Rs. {price}</p>
        </div>
        <Link to={`/tours/${_id}`} className="btn text-sm w-24 text-center whitespace-nowrap flex align-middle justify-center">
          Book Now
        </Link>
      </div>
    </div>
    </Link>
  );
};

export default TourCard;
