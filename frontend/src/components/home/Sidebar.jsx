import React, { useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { FaRegStar, FaRegCheckCircle } from "react-icons/fa";
import { MdCheckroom } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();//to know active current tab

  const data = [
    { title: "All Tasks", icons: <CgNotes />, path: "/" },
    { title: "Important Tasks", icons: <FaRegStar />, path: "/importanttasks" },
    { title: "Completed Tasks", icons: <FaRegCheckCircle />, path: "/completedtasks" },
    { title: "Incompleted Tasks", icons: <MdCheckroom />, path: "/incompletetasks" },
  ];

  const [Data, setData] = useState("");

  const handleLogout = async () => {
     const result = confirm("Are you sure you want to Logout?");
      if (!result) {
        return;
      }

    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:4000/api/v2/get-all-tasks", { headers });
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {Data && (
        <div className='rounded-xl p-4'>
          <h2 className='text-xl text-violet-500 font-semibold'>{Data.username}</h2>
          <h4 className='mb-2 text-gray-400 text-sm'>{Data.email}</h4>
          <hr className='text-gray-300' />
        </div>
      )}

      <div className="mt-4">
        {data.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={i}
              className={`my-2 flex items-center gap-2 font-medium p-2 rounded transition-all duration-300 ${
                isActive
                  ? "bg-gray-400 text-white font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="text-xl">{item.icons}</span>
              {item.title}
            </Link>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        className="btn-primary mt-auto w-full bg-gray-100 font-semibold text-black border-1 border-gray-400 p-2 rounded hover:bg-gray-600 hover:text-white"
      >
        Logout
      </button>
    </>
  );
};

export default Sidebar;
