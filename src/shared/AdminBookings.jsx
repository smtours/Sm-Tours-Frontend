import React, { useState } from "react";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";
import Modal from "react-modal";
import './Modal.css'

// Set the root element for the modal (required for accessibility)
Modal.setAppElement('#root');

const BookingCard = ({ booking }) => {
  const {
    tourName,
    fullName,
    userId,
    phone,
    totalPrice,
    maxGroupSize,
    date,
    createdAt,
    _id,
    photo
  } = booking;

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const setCreatedAt = new Date(createdAt);
  const newCreatedAt = setCreatedAt.toDateString(); // Get a string representing the date portion

  const booked = new Date(date);
  const bookedFor = booked.toDateString(); // Get a string representing the date portion

  const confirmDelete = async () => {
    const result = window.confirm("Is this booking completed?");
    if (result) {
      deleteBooking();
    }
  };

  const deleteBooking = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${_id}`, {
        method: "DELETE",
      });
      const { message } = await response.json();

      if (response.ok) {
        // toast.success(message)
        location.reload();
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true); // Open the modal when the image is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <tbody className="rounded overflow-hidden py-8 px-3 border-b-gray-500 border-b-[1px]">
        <tr className="w-full text-center overflow-hidden">
          <td className="">{tourName}</td>
          <td className="">{fullName}</td>
          <td className="">
            <img
              src={photo}
              alt="Booking"
              className="w-16 ml-1 h-16 object-cover cursor-pointer"
              onClick={handleImageClick}
            />
          </td>
          <td className="">{maxGroupSize}</td>
          <td className="">{phone}</td>
          <td className="">{bookedFor}</td>
          <td className="">{newCreatedAt}</td>
          <td className="">{totalPrice}</td>
          <td>
            <button onClick={confirmDelete} className="Redbtn my-2 mx-2">
              Completed
            </button>
          </td>
        </tr>
      </tbody>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Booking Photo"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="close-button">
          &times;
        </button>
        <img src={photo} alt="Booking" className="max-w-full max-h-full" />
      </Modal>
    </>
  );
};

export default BookingCard;
