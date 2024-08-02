import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpg";
import { FaPeopleGroup, FaLocationDot } from "react-icons/fa6";
import { FaStar, FaMapPin, FaCity, FaDollarSign } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";
import Booking from "../components/Booking/Booking";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import Loader from "react-js-loader";

const TourDetails = () => {
  const { user } = useContext(AuthContext);
  const reviewMsgRef = useRef();
  const [tourRating, setTourRating] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { apiData: tour, error } = useFetch(`${BASE_URL}/tour/${id}`, {
    method: "GET",
  });
  const {
    title = "",
    photo = "",
    desc = "",
    price = "",
    reviews = "",
    city = "",
    distance = "",
    maxGroupSize = "",
    address = "",
  } = tour || {};
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const { totalRating, avgRating } = CalculateAvg(reviewsArray);
  const options = { day: "numeric", month: "long", year: "numeric" };

  useEffect(() => {
    if (tour) {
      setLoading(false);
    }
  }, [tour]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const reviewText = reviewMsgRef.current.value;

    try {
      if (user) {
        const reviewData = {
          username: user.username,
          reviewText,
          rating: tourRating,
        };
        const response = await fetch(`${BASE_URL}/review/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        });
        const result = await response.json();
        if (response.ok) {
          setIsLoading(false);
          window.location.reload();
        } else {
          setIsLoading(false);
          toast.error(result.message);
        }
      } else {
        setIsLoading(false);
        toast.error("Please Sign In first");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Server not responding");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader type="ping-cube" bgColor={"#000"} color={"#000"} size={90} />
      </div>
    );
  }

  return (
    <section className="my-4 px-4 md:px-8 lg:px-12 w-full">
      <div>
        <div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-full md:w-2/3">
              <div className="max-w-full max-h-[400px] rounded-md overflow-hidden">
                <img className="object-cover w-full" src={photo} alt={title} />
              </div>
              <div className="my-8 border border-gray-200 shadow-sm rounded-md p-4 md:p-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center md:text-left text-BaseColor">
                  {title}
                </h2>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <div className="flex items-center gap-2">
                    <FaStar />
                    <span>
                      {avgRating} ({reviewsArray.length})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapPin />
                    <span>{address}</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <div className="flex items-center gap-2">
                    <FaCity />
                    <span>{city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLocationDot />
                    <span>{distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDollarSign />
                    <span>Rs. {price}/per head</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPeopleGroup />
                    <span>{maxGroupSize}</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-3xl text-center md:text-left">
                  Description
                </h3>
                <div
                  className="break-words"
                  dangerouslySetInnerHTML={{ __html: desc }}
                ></div>
              </div>

              <div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 text-center md:text-left">
                  Reviews ({reviewsArray.length} reviews)
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-1 my-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <span
                        key={rating}
                        className={`cursor-pointer ${
                          tourRating >= rating
                            ? "text-orange-800"
                            : "text-orange-500 hover:text-orange-800"
                        }`}
                        onClick={() => setTourRating(rating)}
                      >
                        <FaStar />
                      </span>
                    ))}
                  </div>

                  <div className="flex my-8 gap-4 w-full rounded-full">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder="Share your thoughts"
                      className="flex-1 py-2 px-4"
                    />
                    <button
                      className="bg-BaseColor hover:bg-BHoverColor transition duration-300 py-2 px-4 my-1 mx-1 text-white rounded-full h-11 w-32 flex align-middle justify-center"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader
                          type="ping-cube"
                          bgColor={"white"}
                          color={"white"}
                          size={30}
                        />
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </form>

                <div>
                  {reviewsArray.map((review) => (
                    <div className="py-3 px-4" key={review._id}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-black overflow-hidden">
                          <img src={avatar} alt={review.username} />
                        </div>
                        <div>
                          <h5 className="text-lg font-semibold">
                            {review.username}
                          </h5>
                          <p className="text-gray-700 text-sm">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              options
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center py-3 justify-between">
                        <h5 className="text-lg">{review.reviewText}</h5>
                        <span className="flex items-center gap-1">
                          {review.rating}
                          <FaStar className="text-BaseColor" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-6 rounded-md">
              <Booking
                title={title}
                price={price}
                avgRating={avgRating}
                reviewsArray={reviewsArray}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourDetails;
