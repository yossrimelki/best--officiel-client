// components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, CubeIcon } from '@heroicons/react/24/outline'; // Import necessary icons

const Sidebar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAccessoriesOpen, setIsAccessoriesOpen] = useState(false);

  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleAccessories = () => setIsAccessoriesOpen(!isAccessoriesOpen);

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <img src="logo.png" alt="logo" className="w-12 h-auto" />
      </div>
      <nav className="mt-10 flex flex-col gap-4">
        <div className="flex flex-col">
          <button onClick={toggleCategory} className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 transition duration-300 focus:outline-none">
            <HomeIcon className="w-6 h-6" />
            Category
          </button>
          {isCategoryOpen && (
            <div className="ml-10 flex flex-col gap-2">
              <a href="#category1" className="text-sm hover:text-gray-400 transition duration-300">Nike</a>
              <a href="#category2" className="text-sm hover:text-gray-400 transition duration-300">Adidas</a>
              <a href="#category3" className="text-sm hover:text-gray-400 transition duration-300">Puma</a>
            </div>
          )}
        </div>
        
        <div className="flex flex-col">
          <button onClick={toggleAccessories} className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 transition duration-300 focus:outline-none">
            <CubeIcon className="w-6 h-6" />
            Accessories
          </button>
          {isAccessoriesOpen && (
            <div className="ml-10 flex flex-col gap-2">
              <a href="#watchs" className="text-sm hover:text-gray-400 transition duration-300">Watchs</a>
              <a href="#lunette" className="text-sm hover:text-gray-400 transition duration-300">Lunettes</a>
            </div>
          )}
        </div>
        
        <Link to="/reclamation" className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 transition duration-300">
          <CubeIcon className="w-6 h-6" />
          Reclamation
        </Link>
        {/* Add other menu items with appropriate icons here */}
      </nav>
    </aside>
  );
}

export default Sidebar;
