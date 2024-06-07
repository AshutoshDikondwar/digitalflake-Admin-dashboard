


import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaList, FaThLarge, FaBoxes } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="fixed top-16 left-0 w-64 h-full bg-[#f4f4f4] text-black flex flex-col space-y-4 py-4">
      <NavLink
        exact
        to="/"
        className="sidebar-link flex text-xl items-center px-6 py-3 hover:bg-purple-200"
        activeClassName="bg-[#f4edaf]"
      >
        <FaHome className="sidebar-icon mr-3 w-8 h-8" />
        <span className="sidebar-text">Home</span>
      </NavLink>
      <NavLink
        to="/categories"
        className="sidebar-link flex text-xl items-center px-6 py-3 hover:bg-purple-200"
        activeClassName="bg-[#f4edaf]"
      >
        <FaList className="sidebar-icon mr-3 w-8 h-8" />
        <span className="sidebar-text">Category</span>
      </NavLink>
      <NavLink
        to="/subcategories"
        className="sidebar-link flex text-xl items-center px-6 py-3 hover:bg-purple-200"
        activeClassName="bg-[#f4edaf]"
      >
        <FaThLarge className="sidebar-icon mr-3 w-8 h-8" />
        <span className="sidebar-text">Sub Category</span>
      </NavLink>
      <NavLink
        to="/products"
        className="sidebar-link flex text-xl items-center px-6 py-3 hover:bg-purple-200"
        activeClassName="bg-[#f4edaf]"
      >
        <FaBoxes className="sidebar-icon mr-3 w-8 h-8" />
        <span className="sidebar-text">Products</span>
      </NavLink>
    </div>

  );
};

export default Sidebar;
