

import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#662671] text-white flex justify-between items-center px-6 z-50">
      <div className="navbar-left">
        <h1 className="font-bold text-[25px]">digital<span className='font-thin'>flake</span></h1>
      </div>
      <div className="navbar-right relative">
        <div className="profile-icon cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
          <FaUserCircle size={30} />
        </div>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-purple-200 text-black rounded-lg shadow-lg  ">
            <button className="w-full h-full text-left px-2 py-4 bg-purple-200 hover:bg-gray-100 active:bg-[#662671]" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
