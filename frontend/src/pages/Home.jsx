import React from "react";
import { useNavigate } from "react-router-dom";
import book from "../assets/bookexchnage.jpg"; 
import nitj from "../assets/nitj.jpg";  
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-24 py-16">

        {/* Left Side */}
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Buy Smart. <span className="text-blue-600">Sell Fast.</span><br />
            Save Big.
          </h1>

          <p className="text-lg text-gray-600">
            A campus marketplace for pre-loved electronics, books & essentials.
            Save money. Help the planet.
          </p>

          {/* Subheading / Bullet Section */}
          <ul className="text-gray-800 space-y-3 text-md font-medium">
            <li>✅ Trusted student-to-student transactions</li>
            <li>✅ Instant product listing — No fees</li>
            <li>✅ Chat & finalize deal inside campus</li>
            <li>✅ Safe meet-up, no delivery hassle</li>
          </ul>

          <div className="flex gap-5 pt-4">
            <button
              onClick={() => navigate("/addProduct")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Start Selling
            </button>

            <button
              onClick={() => navigate("/allproducts")}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white"
            >
              Browse Deals
            </button>
          </div>
        </div>

        {/* Right Side - Images */}
        <div className="hidden md:flex gap-4">
          <img
            className="w-[210px] h-[300px] object-cover rounded-lg shadow-lg"
            src={book}
            alt="Electronics deals"
          />
          <img
            className="w-[210px] h-[300px] object-cover rounded-lg shadow-lg mt-10"
            src={nitj}
            alt="Books and study material"
          />
        </div>

      </section>

      {/* FEATURE SECTION */}
      <section className="bg-white w-full py-14 px-8 md:px-24 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Why Students Love Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

          <div className="bg-gray-100 py-10 rounded-lg shadow-sm hover:shadow-lg transition">
            <img src="https://cdn-icons-png.flaticon.com/512/711/711239.png"
              className="w-16 mx-auto mb-4" alt="Instant listing" />
            <p className="font-semibold">Instant Listing</p>
            <p className="text-sm mt-1 text-gray-600">Upload and sell within minutes.</p>
          </div>

          <div className="bg-gray-100 py-10 rounded-lg shadow-sm hover:shadow-lg transition">
            <img src="https://cdn-icons-png.flaticon.com/512/2516/2516740.png"
              className="w-16 mx-auto mb-4" alt="Verify students" />
            <p className="font-semibold">Only College Students</p>
            <p className="text-sm mt-1 text-gray-600">No random buyers or spam.</p>
          </div>

          <div className="bg-gray-100 py-10 rounded-lg shadow-sm hover:shadow-lg transition">
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              className="w-16 mx-auto mb-4" alt="Secure meet-up" />
            <p className="font-semibold">Meet on Campus</p>
            <p className="text-sm mt-1 text-gray-600">Safe exchange at your convenience.</p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
