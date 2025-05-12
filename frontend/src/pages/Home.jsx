import React, { useState } from "react";
import Sidebar from "../components/home/sidebar";
import { Outlet } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import NavBar from "../components/NavBar";

const Home = () => {

  return (
    <div>
      <NavBar />    
      <div className="flex h-[92vh]">
        <div className="max-[1080px]:hidden w-1/6 p-4 bg-white shadow-sm border-r-1 border-gray-100 flex flex-col justify-between">
          <Sidebar   />
        </div>
        <div className="w-full lg:w-5/6 p-4 shadow-sm border-gray-100 border-1  bg-gray-50 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
