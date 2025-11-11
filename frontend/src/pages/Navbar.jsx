import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShopping, AiOutlinePlus } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
// import logo from "../assets/vcartlogo.png";
import { AuthContextdata } from '../context/AuthContextdata';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [openItemDropdown, setOpenItemDropdown] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdownn] = useState(false);
  const [searchitem, setSearchitem] = useState("");

  const { curruser } = useContext(AuthContextdata);
 
  
const handleSearchKeyPress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (!searchitem) return;

    navigate(`/search?keyword=${searchitem}`);
    setSearchitem(""); // clear input
  }
};



  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/auth/logout", {
        withCredentials: true,
      });
       
      
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <nav className="w-full h-[75px] bg-white flex items-center px-8 shadow relative">

      {/* ✅ LEFT SIDE */}
      <div className="flex items-center gap-10">
     <h1
  className="text-3xl font-extrabold tracking-wide cursor-pointer bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text"
  onClick={() => navigate("/")}>
  Campus Bazar
</h1>


        <ul className="flex gap-8 font-semibold text-gray-800 tracking-wide text-sm">
           <li className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/allproducts")}>
            All
          </li>
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/electronics")}>
            Electronics
          </li>

          <li className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/studymaterial")}>
            Study Material
          </li>

          {/* ✅ All Items dropdown */}
          <li
            className="hover:text-blue-600 cursor-pointer relative"
            onClick={() => setOpenItemDropdown(!openItemDropdown)}
          >
            All Items ▾

            {openItemDropdown && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md w-[160px] z-10 py-2">
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/clothes")}>
                  Clothes
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/cosmetics")}>
                  Cosmetics
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/others")}>
                  Others
                </p>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* ✅ CENTER SEARCH BAR */}
      <div className="flex items-center bg-gray-100 rounded-md ml-auto w-[450px] h-[40px] px-3 gap-3">
        <AiOutlineSearch className="text-gray-500 text-lg" />
        <input
          type="search"
          placeholder="Search for anything on campus..."
          className="bg-transparent outline-none w-full text-sm"
          value={searchitem}
          onChange={(e)=>setSearchitem(e.target.value)}
           onKeyDown={handleSearchKeyPress}
        />
      </div>

      {/* ✅ RIGHT SIDE */}
      <div className="flex items-center gap-6 ml-6 text-gray-700 font-semibold text-sm tracking-wide">

        {/* Add Product */}
        <div
          className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => navigate("/addProduct")}
        >
          <AiOutlinePlus className="text-xl" />
          <span>Add Product</span>
        </div>

        {/* ✅ PROFILE SECTION */}
        <div className="relative">
          {!curruser ? (
            <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/login")}>
              <FaUserCircle className="text-2xl" />
              <span>Login</span>
            </div>
          ) : (
            <>
              {/* Round Profile with initial */}
              <div
                onClick={() => setOpenProfileDropdownn(!openProfileDropdown)}
                className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-black text-white cursor-pointer font-bold text-lg"
              >
                {curruser?.name?.charAt(0)?.toUpperCase()}
              </div>

              {openProfileDropdown && (
                <div className="absolute right-0 mt-2 w-[160px] bg-white shadow-lg rounded-md py-2 z-20 text-gray-700 font-medium">
                 <p
  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
  onClick={() => {
    setOpenProfileDropdownn(false);  // ✅ dropdown close
    navigate("/orders");
  }}
>
  Orders
</p>

<p
  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
  onClick={() => {
    setOpenProfileDropdownn(false);  // ✅ dropdown close
    navigate("/profile");
  }}
>
  Profile
</p>

<p
  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
  onClick={() => {
    setOpenProfileDropdownn(false);  // ✅ dropdown close
    handleLogout();
  }}
>
  Logout
</p>

                </div>
              )}
            </>
          )}
        </div>

        {/* Cart */}
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/cart")}>
          <AiOutlineShopping className="text-2xl" />
          <span>Bag</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
