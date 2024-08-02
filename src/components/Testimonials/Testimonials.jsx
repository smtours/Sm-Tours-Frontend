import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import m from "../../assets/images/m.jpeg";
import k from "../../assets/images/k.jpeg";
import e from "../../assets/images/e.jpeg";
import mr from "../../assets/images/mr.png";
import sq from "../../assets/images/sq.jpg";




const Testimonials = () => {
  const testimonialsData = [
    {
      pic: m,
      name: "Muazan Ali",
      description:
        "I recently visited Hunza with SM Tours and Travels and had an incredible experience! The scenery was breathtaking, and our guide was knowledgeable and friendly. The package was affordable and included everything we needed. Highly recommend",
    },
    {
      pic: mr,
      name: "Maryam Ahmed",
      description:
        "I was skeptical about traveling to Skardu alone, but SM Tours and Travels made it so easy and enjoyable! The itinerary was perfect, and the accommodations were comfortable. The team was always available to answer my questions. Can't wait for my next trip with them!"
    },
    {
      pic: sq,
      name: "Najam ul Saqlain",
      description:
        "We took our family to Naran with SM Tours and Travels and had a wonderful time! The kids loved the activities, and we appreciated the flexibility in the itinerary. The only suggestion is to improve the meal options. Overall, great value for money!",
    },
    {
      pic: k,
      name: "Kamran Gillani",
      description:
        "I've traveled with several agencies, but SM Tours and Travels stands out for their personalized attention and expertise. Our guide was passionate about the region and shared so much history and culture. The price was unbeatable too! Highly recommend for a authentic experience!",
    },
    {
      pic: e,
      name: "Syed Ehsaan Shah",
      description:
        "I was impressed by SM Tours and Travels's responsiveness and organization. Our trip to Hunza was smooth and enjoyable, with beautiful scenery and comfortable stays. The only suggestion is to add more adventure activities. Overall, great experience!"
    },
  ];

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {testimonialsData.map((data, index) => (
        <div className=" py-4 px-6" key={index}>
          <p>{data.description}</p>
          <div className="flex items-center gap-4 mt-8">
            <div className="w-[75px] h-[55px] rounded-md overflow-hidden">
              <img
                src={data.pic}
                className="w-full h-full object-contain rounded-2"
                alt=""
              />
            </div>
            <div>
              <div>
                <h5 className="mb-0 mt-3">{data.name}</h5>
                <p className="text-GrayColor">Customer</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
