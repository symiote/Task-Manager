import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Sidebar from './home/sidebar';

const NavBar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className='flex items-center gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-3 px-7 sticky top-0 z-30'>
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-gray-600">Task Manager</h2>

      {/* Mobile Sidebar */}
      {openSideMenu && (
        <div className="fixed px-5 top-[61px] left-0 z-40 w-64 h-screen bg-white shadow-md border-r border-gray-200">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
