import { Link } from "react-router-dom";
import  errorimg  from "../../assets/images/error.png";

const Error = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center font-inter">
      <img
        src={errorimg} 
        alt="Page not found"
        className="w-64 sm:w-72 md:w-80 mb-6"
      />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#272343] mb-2">
        Oops! Page not found.
      </h1>

      <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-md">
        The page you're looking for doesn’t exist or has been moved. Let’s get you back to shopping!
      </p>

      <Link
        to="/"
        className="inline-block bg-[#59b143] hover:bg-[#4ca035] text-white font-medium px-5 py-2.5 rounded-lg transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default Error;
