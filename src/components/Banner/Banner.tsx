import React from "react";
import Slider from "react-slick";
import { MoveRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const products = [
    {
      id: 1,
      title: "Protien Sattu at just Rs.99/-",
      subTitle: "Limited time offer",
      image: "/src/components/Banner/Banner JPG/gym-machine.png",
    },
    {
      id: 2,
      title: "Best Furniture collection for your interior",
      subTitle: "Welcome to chairs",
      image: "/src/components/Banner/Banner JPG/SAATU.png",
    },
    // {
    //   id: 3,
    //   title: "Best Furniture collection for your interior",
    //   subTitle: "Welcome to chairs",
    //   image: "/src/assets/Banner/banner_image.png",
    // },
    // {
    //   id: 4,
    //   title: "Best Furniture collection for your interior",
    //   subTitle: "Welcome to chairs",
    //   image: "/src/assets/Banner/banner_image.png",
    // },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="container mx-auto px-4">
      <div className="slider-container w-full h-full">
        <Slider {...settings}>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-20"
            >
              {/* Banner Text */}
              <div className="flex-1">
                <p className="text-sm font-inter text-[#272343] uppercase mb-2">
                  {product.subTitle}
                </p>
                <h3 className="text-3xl md:text-5xl lg:text-6xl text-[#272343] font-inter font-bold capitalize leading-tight max-w-[631px] mb-5">
                  {product.title}
                </h3>
                <button className="w-[171px] h-[52px] bg-[#59b143] rounded-lg text-white flex items-center justify-center gap-2 capitalize">
                  shop now <MoveRight />
                </button>
              </div>

              {/* Banner Image */}
              <div className="flex-1 flex justify-end items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[300px] md:h-[400px] lg:h-[500px] object-contain"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
