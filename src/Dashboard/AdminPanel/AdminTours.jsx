import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import AdminToursCards from "../../shared/AdminToursCards";
import Loader from 'react-js-loader'; // Import a loader component

const AdminTours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  const { apiData: tours, error } = useFetch(`${BASE_URL}/tour?page=${page}`);
  const { apiData: tourCount } = useFetch(`${BASE_URL}/tour/count`);

  useEffect(() => {
    if (tourCount && tours) {
      const pages = Math.ceil(tourCount / 12);
      setPageCount(pages);
      setLoading(false); // Set loading to false when data is loaded
      window.scrollTo(0, 0);
    }
  }, [page, tourCount, tours]);

  useEffect(() => {
    setLoading(true); // Set loading to true when page changes
  }, [page]);

  return (
    <div className="py-8 px-2 md:px-5 lg:px-8 w-full">
      {loading ? (
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
                  <th className="tableData">City</th>
                  <th className="tableData">Featured</th>
              
                  <th className="tableData">Reviews</th>
                </tr>
              </thead>
              {tours?.map((tour) => (
                <AdminToursCards tour={tour} key={tour._id} />
              ))}
            </table>
          </div>
          <div className="flex pagination items-center justify-center mt-8 gap-3">
            {pageCount &&
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
    </div>
  );
};

export default AdminTours;
