import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import TourCard from "../shared/TourCard";
import SearchTours from "../components/Search/SearchTours";
import Loader from 'react-js-loader';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const { apiData: tours, error, isLoading } = useFetch(`${BASE_URL}/tour?page=${page}`);
  const { apiData: tourCount } = useFetch(`${BASE_URL}/tour/count`);

  useEffect(() => {
    if (!isNaN(tourCount)) {
      const pages = Math.ceil(tourCount / 12);
      setPageCount(pages);
    } else {
      setPageCount(0);
    }
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <div>
      <SearchTours />
  
      <section className="min-h-screen py-8 px-6 md:px-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader type="ping-cube" bgColor={"#000"} color={"#000"} size={90} />
          </div>
        ) : (
          <>
            <div className="justify-center grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tours?.map((tour) => (
                <div key={tour._id}>
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
            <div className="flex pagination items-center justify-center mt-8 gap-3">
              {pageCount > 0 &&
                [...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active_page" : "spn"}
                  >
                    {number + 1}
                  </span>
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Tours;
