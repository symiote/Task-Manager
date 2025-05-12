import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FcAddRow } from "react-icons/fc";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BiLogIn } from "react-icons/bi";

const Cards = ({ home, setInputdiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handle_toggle_completeTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      // console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handle_Important = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deletetask = async (id) => {
    try {
      const result = confirm("Are you sure you want to delete this task?");
      if (!result) {
        return;
      }

      const response = await axios.delete(
        `http://localhost:4000/api/v2/delete-task/${id}`,
        { headers }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = async (id, title, desc) => {
    try {
      //open task input model
      setInputdiv("fixed");
      setUpdatedData({ id: id, title: title, desc: desc });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 break-words">
  {data &&
    data.map((item, i) => (
      <div
        key={i}
        className="flex flex-col justify-between rounded-xl bg-white p-3 shadow transition-all duration-300 border border-gray-100 hover:shadow-xl hover:scale-[1.02] hover:bg-white hover:border-gray-100"
      >
        <div>
          <h3 className="text-lg font-medium">{item.title}</h3>
          <p className="text-gray-500 text-sm my-2">{item.desc}</p>
        </div>
        <div className="mt-1 w-full flex items-center justify-between">
          <button
            onClick={() => handle_toggle_completeTask(item._id)}
            className={`btn-primary ${
              item.complete === false ? "bg-red-400" : "bg-green-500"
            } text-white p-1 rounded text-sm`}
          >
            {item.complete === true ? "completed" : "Pending.."}
          </button>
          <div className="text-xl flex gap-4">
            <button onClick={() => handle_Important(item._id)} className="btn-primary">
              {item.important ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
            </button>

            {home && (
              <button
                onClick={() => handleEdit(item._id, item.title, item.desc)}
                className="btn-primary"
              >
                <FaEdit />
              </button>
            )}

            <button onClick={() => deletetask(item._id)} className="btn-primary">
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      </div>
    ))}

  {/* No Task Found Message */}
  {data?.length === 0 && (
    <div className="text-center text-gray-500 col-span-full text-lg font-medium">
      No Task Found
    </div>
  )}

  {/* Add Task Button - Only on Homepage */}
  {home && (
    <button
      onClick={() => setInputdiv("fixed")}
      className="flex flex-col justify-center items-center rounded-xl bg-white p-3 shadow transition-all duration-300 border border-gray-100 hover:shadow-xl hover:scale-[1.02] hover:bg-white hover:cursor-pointer"
    >
      <FcAddRow className="text-5xl" />
      <h2 className="text-xl font-semibold">Add Task</h2>
    </button>
  )}
</div>

  );
};

export default Cards;
