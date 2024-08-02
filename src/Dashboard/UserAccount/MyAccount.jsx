import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import avatar from "../../assets/images/avatar.jpg";
import Bookings from "./Bookings";
import BASE_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const MyAccount = () => {
  const { user, dispatch, token } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");
  const navigate = useNavigate();

  const confirmDelete = async () => {
    const result = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (result) {
      deleteAccount();
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message);
      } else {
        dispatch({ type: "LOGOUT" });
        navigate("/register");
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  return (
    <section className="px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {/* Sidebar */}
          <div className="py-6 px-6 md:px-8 lg:px-10 bg-gray-50 rounded-md flex flex-col items-center">
            <figure className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-solid border-Color mb-4">
              <img src={avatar} alt="User Avatar" className="w-full h-full rounded-full" />
            </figure>
            <div className="text-center">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-HeadingColor">
                {user.username}
              </h3>
              <p className="text-sm md:text-base text-TextColor font-medium">
                {user.email}
              </p>
            </div>
            <div className="mt-6 w-full">
              <button
                onClick={() => setTab("settings")}
                className="w-full mb-2 btn"
              >
                Update Name
              </button>
              <button
                onClick={confirmDelete}
                className="w-full bg-black text-white hover:bg-gray-900 py-2 rounded"
              >
                Delete Account
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2">
            <div className="flex flex-col md:flex-row mb-6">
              <button
                onClick={() => setTab("bookings")}
                className={`${
                  tab === "bookings" && "bg-GrayColor text-white font-bold"
                } p-2 mb-4 md:mb-0 md:mr-4 rounded-md text-HeadingColor font-semibold text-sm md:text-base lg:text-lg border border-solid border-Color`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && "bg-GrayColor text-white font-bold"
                } p-2 rounded-md text-HeadingColor font-semibold text-sm md:text-base lg:text-lg border border-solid border-Color`}
              >
                Profile Settings
              </button>
            </div>
            {tab === "bookings" && <Bookings />}
            {tab === "settings" && (
              <Profile user={user} dispatch={dispatch} token={token} />
            )}
              <div className="mt-8">
              <h4 className="font-semibold text-base md:text-lg lg:text-xl">For Order Cancellation</h4>
              <a href="https://wa.me/923126067717" target="_blank" rel="noopener noreferrer">
                <button className="btn w-full md:w-1/2 lg:w-1/3 h-12 flex items-center justify-center mt-4 md:mt-8">
                  Contact on WhatsApp
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
