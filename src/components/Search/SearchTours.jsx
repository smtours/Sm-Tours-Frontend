import React, { useRef, useState } from "react";
import BASE_URL from "../../utils/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from 'react-js-loader'; // Import a loader component

const SearchTours = () => {
  const cityRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state

  const SubmitHandler = async () => {
    const searchTerm = cityRef.current.value;

    if (searchTerm === "") {
      toast.error("Please fill all the fields");
      return; // Return early to prevent further execution
    }

    setLoading(true); // Set loading to true when starting the search

    try {
      const response = await fetch(`${BASE_URL}/tour/search?search=${searchTerm}`);
      if (!response.ok) {
        toast.error("No Record Found!");
        setLoading(false); // Set loading to false if no record is found
        return; // Return early to prevent further execution
      }

      const result = await response.json();
      navigate(`/tours/search?search=${searchTerm}`, { state: result.data });
    } catch (error) {
      toast.error("An error occurred while fetching data.");
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      SubmitHandler();
    }
  };

  return (
    <div>
      <section className="py-4 px-6 md:px-12">
        <div className="container text-center">
          <h2 className="text-[30px] md:text-[40px] font-bold mb-4 text-center">
            Find a <span className="text-BaseColor">Tour</span>
          </h2>
          <div className="max-w-[570px] mt-[15px] mx-auto bg-gray-100 rounded-md flex items-center justify-between">
            <input
              type="search"
              ref={cityRef}
              onKeyPress={handleKeyPress}
              className="py-4 pl-4 bg-transparent w-full focus:outline-none placeholder:text-TextColor"
              placeholder="Search Tour"
              disabled={loading} // Disable input while loading
            />
            <button
              onClick={SubmitHandler}
              className="Searchbtn mt-0 rounded-[0px] rounded-r-md mx-2 hover:px-6 h-12"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <Loader type="ping-cube" bgColor={"#000"} color={"#000"} size={50} /> // Show loader while loading
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchTours;
