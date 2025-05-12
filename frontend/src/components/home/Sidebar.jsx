import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { FaRegStar } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCheckroom } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate =useNavigate();
    
    const data = [
        { title:"All Tasks",icons:<CgNotes />,path:"/"},
        { title:"Important Tasks",icons:<FaRegStar /> ,path:"/importanttasks"  },
        { title:"Completed Tasks",icons:<FaRegCheckCircle />,path:"/completedtasks" },
        { title:"Incompleted Tasks",icons:<MdCheckroom /> ,path:"/incompletetasks" },
    ]

    const [Data, setData] = useState("");
    const handleLogout =async()=>{
      dispatch(authActions.logout());
      localStorage.clear("id");
      localStorage.clear("token");
      console.log("logout ho gye");
      navigate("/signup")
    }
    
//not mind
    const headers = {
      id : localStorage.getItem("id"),
      Authorization : `Bearer ${localStorage.getItem("token")}`,
    };
    
    useEffect(() => {
      const fetch = async()=>{
        const response = await axios.get("http://localhost:4000/api/v2/get-all-tasks",{headers})
        console.log("response is : ",response.data.data);
        setData(response.data.data);
      };
      fetch();
    }, [])
    
    
  return (
    <>
       {Data && <div className='bg-violet-100 rounded-xl p-4'>
            <h2 className='text-xl font-semibold '>{Data.username}</h2>
            <h4 className='mb-2 text-gray-400 text-sm  '>{Data.email}</h4>
            <hr className='text-gray-300' />
        </div>}
          {/* <hr  /> */}
        <div>
            {data.map((item,i)=>
                <Link to={item.path} key={i} className='my-2 flex items-center gap-2 font-medium hover:bg-gray-200 p-2 rounded transition-all duration-300'  ><span className='text-xl'>{item.icons}</span> {item.title}</Link>
            )}
        </div>
        <button className='btn-primary bg-black text-white p-2 rounded ' onClick={handleLogout} >Logout</button>
    </>
  )
}

export default Sidebar
