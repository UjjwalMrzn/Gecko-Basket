import { Link } from 'react-router-dom';
import Slider, { Settings } from "react-slick";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import { bannerData, BannerSlide } from "../../../data/bannerData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="group absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-[#59b143] transition"
      aria-label="Next"
    >
      <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-white transition" />
    </button>
  );
  
const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="group absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-[#59b143]  transition"
      aria-label="Previous"
    >
      <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-white transition" />
    </button>
);

const Banner: React.FC = () => {
    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        cssEase: "ease-in-out",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: (dots) => (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <ul className="flex space-x-2">{dots}</ul>
          </div>
        ),
        customPaging: () => (
          <div className="w-2.5 h-2.5 rounded-full bg-white/70 hover:bg-white transition cursor-pointer" />
        ),
      };

  return (
    <div className="w-full overflow-hidden relative font-inter">
      <Slider {...settings}>
        {bannerData.map((slide: BannerSlide) => (
          <div key={slide.id} className={`${slide.bgColor} py-6 md:py-8 lg:py-10`}>
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10 xl:gap-16">
                
                <div className="flex-1 order-2 md:order-1 text-center md:text-left px-4">
                  <p className="text-xs md:text-sm font-medium text-gray-600 uppercase mb-2 tracking-wider">
                    {slide.subTitle}
                  </p>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-800 font-bold capitalize leading-tight mb-4 md:mb-5">
                    {slide.title}
                  </h3>
                  
                  <Link to={slide.link}>
                    <button
                      className={`${slide.buttonColor} w-36 md:w-40 h-11 md:h-12 rounded-lg text-white flex items-center justify-center gap-2 capitalize mx-auto md:mx-0 transition hover:scale-[1.03] shadow-md`}
                    >
                      <span className="font-medium text-sm md:text-base">Shop Now</span>
                      <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </Link>

                </div>

                <div className="flex-1 order-1 md:order-2 flex justify-center items-center min-h-[200px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
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