import React, { useEffect, useState } from "react";
import Cards from "../components/home/Cards";
import { FcAddRow } from "react-icons/fc";
import { RiAddCircleLine } from "react-icons/ri";
import InputData from "../components/home/InputData";
import axios from "axios";

const AllTasks = () => {
  const [Inputdiv, setInputdiv] = useState("hidden");
  const [Data, setData] = useState("");
  //for update task
  const [UpdatedData , setUpdatedData] = useState({id:"",title:"",desc:""})


  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data.tasks);
    };
    // console.log("response is : ", response.data.data.tasks);
    fetch();
  },);
  

  return (
    <>
      <div>
        <div className=" w-full flex items-center justify-end gap-1 p-1  ">
          <button onClick={() => setInputdiv("fixed")}>
            <RiAddCircleLine className="text-4xl text-gray-600 hover:text-gray-400 transition-all duration-300" />
          </button>
        </div>
        {Data && <Cards home={true} setInputdiv={setInputdiv} data={Data} setUpdatedData={setUpdatedData} />}
      </div>

      {/* for add notes modal */}
      <InputData Inputdiv={Inputdiv} setInputdiv={setInputdiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />
    </>
  );
};

export default AllTasks;
