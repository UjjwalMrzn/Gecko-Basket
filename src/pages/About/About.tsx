import React from "react";

const About: React.FC = () => {
  return (
    <div className="w-full min-h-screen p-6 bg-white font-sans-serif text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-green-500 text-center">
        About GeckoBasket
      </h1>

      <p className="mb-6 text-lg text-center">
        Your Friendly Online Shopping Partner.
      </p>

      <div className="mt-6 shadow-md p-8 bg-gray-50 rounded-lg text-left hover:scale-90 transition-transform">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-8">Our Mission</h2>
        <p className="mb-6 text-lg">
          To empower local communities by making high quality local products accessible to everyone. We are dedicated to supporting small businesses and celebrating local craftsmanship.
          At the same time, we strive to make online shopping easy, affordable and enjoyable for all no matter where you are. Through continuous improvement, we aim to deliver better products, better prices and exceptional service.
        </p>
      </div>

      <div className="mt-6 shadow-md p-8 bg-gray-50 rounded-lg text-left hover:scale-90 transition-transform">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-8">Our Story</h2>
        <p className="mb-6 text-lg">
          What started out as a straightforward concept to facilitate the purchase of local goods has developed into a platform that helps small businesses and builds stronger communities.
          <br /><br />
          Every local product, in our opinion, has a backstory. We made this platform in order to assist you in finding and assisting the skilled makers in your community.
          <br /><br />
          Our small but enthusiastic team is committed to providing you with the greatest possible shopping experience. Your satisfaction is what motivates us, from locating high quality local products to making sure delivery goes smoothly.
        </p>
      </div>

      <div className="mt-6 shadow-md p-8 bg-gray-50 rounded-lg text-left hover:scale-90 transition-transform">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-8">What Makes Us Different</h2>
        <ul className="mb-6 text-lg list-disc list-inside space-y-2">
          <li><strong>Quality-Tested Products</strong>: We handpick and test every product to ensure top-notch quality.</li>
          <li><strong>Fast & Reliable Delivery</strong>: Get your orders on time, every time.</li>
          <li><strong>Supporting Local Artisans</strong>: We promote handmade, locally crafted items that tell a story.</li>
          <li><strong>Community-Focused</strong>: We believe in uplifting local communities and small businesses.</li>
          <li><strong>Affordable Prices</strong>: Great products shouldn't come with a high price tag.</li>
          <li><strong>Personalized Customer Support</strong>: We're here to help, every step of the way.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-8 text-center">
        Let’s Stay in Touch!
      </h2>
      <p className="text-lg text-center">
        Have questions or suggestions?{" "}
        <a href="/contact" className="text-green-600 font-semibold hover:underline">
          Contact Us
        </a>{" "}
         we love hearing from our customers.
      </p>
    </div>
  );
};

export default About;
