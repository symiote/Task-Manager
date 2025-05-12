import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const InputData = ({ Inputdiv, setInputdiv, UpdatedData, setUpdatedData }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);

  //if data is updadte then yhis runs
  useEffect(() => {
    setTitle(UpdatedData.title);
    setDesc(UpdatedData.desc);
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handle_Create_Task = async () => {
    if (title === "" || desc === "") {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v2/create-task`,
        { title, desc },
        { headers }
      );
      // console.log(response.data.message);
      toast.success(response.data.message);

      setInputdiv("hidden"); //model will colse
      setTitle("");
      setDesc("");
      setError(null);
    } catch (error) {
      console.error(error.message);

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something Went Wrong.please try agian.");
      }
    }
  };

  const handle_Update_Task =async()=>{
    if (title === "" || desc === "") {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/v2/update-task/${UpdatedData.id}`,
        { title, desc },
        { headers }
      );
      // console.log(response.data.message);
      toast.success(response.data.message);

      setUpdatedData({ id: "", title: "", desc: "" });
      setTitle("");
      setDesc("");
      setInputdiv("hidden"); //model will colse
      setError(null);

    } catch (error) {
      console.error(error.message);

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something Went Wrong.please try agian.");
      }
    }
  }

  const handleCross = () => {
    setInputdiv("hidden"); //hide the input form
    setTitle("");
    setDesc("");
    setUpdatedData({ id: "", title: "", desc: "" });
  };

  

  return (
    <>
      <div
        className={` ${Inputdiv} top-0 left-0 bg-gray-500 opacity-70 h-screen w-full `}
      ></div>
      <div
        className={` ${Inputdiv} top-0 left-0 flex justify-center items-center h-screen w-full `}
      >
        <div className="lg:w-3/6 sm:w-4/6 bg-gray-600 rounded-xl p-6 ">
          <div className=" text-gray-200 text-2xl flex justify-end hover:text-gray-400 ">
            <button onClick={handleCross} className="btn-primary">
              <RxCross2 />{" "}
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded bg-gray-100 w-full my-2"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder="Enter Notes"
            className="px-3 py-2 rounded bg-gray-100 w-full my-3"
            value={desc}
            onChange={({ target }) => setDesc(target.value)}
          >
            {" "}
          </textarea>

          {error && <p className="text-red-200 text-[16px]">{error}</p>}
          
          {UpdatedData.id ==="" ?(<button
            onClick={handle_Create_Task}
            className="btn-primary w-full bg-blue-600 text-white px-3 py-2 rounded-xl font-semibold text-lg"
          >
            Save
          </button>) : (
            <button
              onClick={handle_Update_Task}
              className="btn-primary w-full bg-blue-600 text-white px-3 py-2 rounded-xl font-semibold text-lg"
            >
              update
            </button>
          )}

          
        </div>
      </div>
    </>
  );
};

export default InputData;
