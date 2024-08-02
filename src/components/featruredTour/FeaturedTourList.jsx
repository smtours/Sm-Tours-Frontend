import React from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import TourCard from "../../shared/TourCard";
import Loader from 'react-js-loader';
const FeaturedTourList = () => {
  const { apiData: featuredToursData, error,isLoading } = useFetch(
    `${BASE_URL}/tour/featured`
  );

  return (
    <>
      {isLoading&& (
        <div className="flex justify-center items-center h-full">
          <Loader type="ping-cube" bgColor={"#000"} color={"#000"} size={64} />
        </div>
      )}
      {error && <h4 className="text-center font-semibold mt-12 ">{"No Featured tours available right now"}</h4>}
      {!isLoading && !error && (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredToursData?.map((tour) => (
            <div key={tour._id}>
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FeaturedTourList;
