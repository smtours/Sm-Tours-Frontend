// ServicesList.jsx
import React from 'react';
import ServicesCard from './ServicesCard';
import { MdHotel } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";
import { IoMdBus } from "react-icons/io";

const ServicesList = () => {
  const services = [
    {
      title: 'Adventure Tours',
      description: `Join us on an unforgettable adventure and discover the untouched beauty of Pakistan's Northern Areas. Let's explore together!`,
      icon: <IoMdBus />,
    },
    {
      title: 'Travel Planning',
      description: `At SM Tours and Travels , we believe that travel should be accessible to all. That's why we strive to offer the best value for your money, without sacrificing the quality of your experience.`,
      icon: <FaPlaneDeparture />,
    },
    {
      title: 'High-Quality Accommodations',
      description: `Our travel agency offers affordable packages without compromising on quality, ensuring you get the best value for your money. We provide expert guidance and personalized attention.`,
      icon: <MdHotel />,
    },
  ];
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServicesCard key={index} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;
