import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import AdminBookingCard from "../../shared/AdminBookings";
import Loader from "react-js-loader"; // Import a loader component

const Bookings = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const { apiData: bookings } = useFetch(`${BASE_URL}/booking`);

  useEffect(() => {
    if (bookings) {
      setLoading(false); // Set loading to false when data is loaded
    }
  }, [bookings]);

  return (
    <div className="py-8 px-8 w-full">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader type="ping-cube" bgColor={"#000"} color={"#000"} size={64} />
        </div>
      ) : (
        <div className="flex flex-col gap-5 overflow-x-scroll">
          <table className="table-auto gap-4 text-xs md:text-sm border-collapse w-[120%] border-gray-400 lg:w-full border">
            <thead className="w-full bg-gray-200">
              <tr>
                <th className="tableData">TourName</th>
                <th className="tableData">UserName</th>
                <th className="tableData">Photo</th>
                <th className="tableData">Persons</th>
                <th className="tableData">Phone</th>
                <th className="tableData">Booked for</th>
                <th className="tableData">Booked on</th>
                <th className="tableData">Price</th>
                <th className="tableData">Status</th>
              </tr>
            </thead>
            {bookings?.map((booking) => (
              <AdminBookingCard booking={booking} key={booking._id} />
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
