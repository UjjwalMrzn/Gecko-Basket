import React from "react";
import Slider, { Settings } from "react-slick";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  bgColor: string;
  buttonColor: string;
}

const Banner: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      title: "Protein Sattu at just Rs.99/-",
      subTitle: "Limited time offer",
     
      image: "/src/components/Banner/Banner JPG/SAATU.png",
      bgColor: "bg-gradient-to-r from-amber-100 to-amber-50",
      buttonColor: "bg-amber-500 hover:bg-amber-600",
    },
    {
      id: 2,
      title: "Best Furniture Collection for Your Interior",
      subTitle: "New Arrivals",
       image: "/src/components/Banner/Banner JPG/gym-machine.png",
      bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
      buttonColor: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      id: 3,
      title: "Premium Quality Gym Equipment",
      subTitle: "Summer Sale",
      image: "/src/assets/Banner/banner_image.png",
      bgColor: "bg-gradient-to-r from-green-50 to-teal-50",
      buttonColor: "bg-teal-500 hover:bg-teal-600",
    },
    {
      id: 4,
      title: "Exclusive Deals on Home Essentials",
      subTitle: "Limited Stock",
      image: "/src/assets/Banner/banner_image.png",
      bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        id="banner-next-arrow"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-300"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    );
  };

  const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        id="banner-prev-arrow"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-300"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
    );
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 rounded-full bg-white/70 hover:bg-white transition-all duration-300 cursor-pointer" />
    ),
  };

  return (
    <div className="w-full overflow-hidden relative">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className={`${product.bgColor} py-6 md:py-8 lg:py-10`}>
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10 xl:gap-16">
                {/* Banner Text */}
                <div className="flex-1 order-2 md:order-1 text-center md:text-left px-4">
                  <p className="text-xs md:text-sm font-medium text-gray-600 uppercase mb-2 tracking-wider">
                    {product.subTitle}
                  </p>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-800 font-bold capitalize leading-tight mb-4 md:mb-5">
                    {product.title}
                  </h3>
                  <button
                    id="banner-button"
                    className={`${product.buttonColor} w-36 md:w-40 h-11 md:h-12 rounded-lg text-white flex items-center justify-center gap-2 capitalize mx-auto md:mx-0 transition-all duration-300 hover:scale-[1.02] shadow-md`}
                  >
                    <span className="font-medium text-sm md:text-base">Shop Now</span>
                    <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>

                {/* Banner Image - Made smaller */}
                <div className="flex-1 order-1 md:order-2 flex justify-center items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-contain transition-transform duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;